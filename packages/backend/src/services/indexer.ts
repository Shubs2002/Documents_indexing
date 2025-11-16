import { readdir, readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import { generateEmbedding, categorizeDocument } from './gemini';
import { storeDocument, getAllDocuments, searchDocumentsByVector, getDocumentCount } from './supabase';
import mammoth from 'mammoth';

// Use require for CommonJS module
// @ts-ignore
const pdfParse = require('pdf-parse');

export interface Document {
  id: string;
  filename: string;
  path: string;
  content: string;
  embedding?: number[];
  category?: string;
  project?: string;
  team?: string;
  tags?: string[];
  size: number;
  modifiedAt: Date;
}

// Supported file types
const SUPPORTED_EXTENSIONS = ['.txt', '.md', '.pdf', '.docx', '.html', '.json'];

// Extract text from different file types
async function extractText(filePath: string): Promise<string> {
  const ext = extname(filePath).toLowerCase();
  
  try {
    // Text-based files
    if (['.txt', '.md', '.html', '.json'].includes(ext)) {
      return await readFile(filePath, 'utf-8');
    }
    
    // PDF files
    if (ext === '.pdf') {
      const dataBuffer = await readFile(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    }
    
    // DOCX files
    if (ext === '.docx') {
      const buffer = await readFile(filePath);
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }
  } catch (error) {
    console.error(`Error extracting text from ${filePath}:`, error);
  }
  
  return '';
}

// Extract text from buffer (for uploaded files)
async function extractTextFromBuffer(buffer: Buffer, filename: string): Promise<string> {
  const ext = extname(filename).toLowerCase();
  
  try {
    // Text-based files
    if (['.txt', '.md', '.html', '.json'].includes(ext)) {
      return buffer.toString('utf-8');
    }
    
    // PDF files
    if (ext === '.pdf') {
      const data = await pdfParse(buffer);
      return data.text;
    }
    
    // DOCX files
    if (ext === '.docx') {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }
  } catch (error) {
    console.error(`Error extracting text from buffer for ${filename}:`, error);
  }
  
  return '';
}

// Calculate cosine similarity between vectors
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magA * magB);
}

// Index a single document (stores original path, doesn't copy file)
export async function indexDocument(filePath: string, basePath?: string): Promise<Document | null> {
  try {
    const stats = await stat(filePath);
    const content = await extractText(filePath);
    
    if (!content) return null;

    // Use filename only if basePath provided, otherwise use full path
    const filename = basePath ? filePath.replace(basePath, '').replace(/^[\/\\]/, '') : filePath.split(/[\/\\]/).pop() || filePath;
    const id = Buffer.from(filePath).toString('base64');

    console.log(`📄 Indexing: ${filename} from ${filePath}`);

    // Generate embedding and categorize
    const [embedding, metadata] = await Promise.all([
      generateEmbedding(content.slice(0, 5000)),
      categorizeDocument(content, filename)
    ]);

    const doc: Document = {
      id,
      filename,
      path: filePath, // Store original absolute path
      content: content.slice(0, 1000), // Store preview
      embedding,
      category: metadata?.category,
      project: metadata?.project,
      team: metadata?.team,
      tags: metadata?.tags || [],
      size: stats.size,
      modifiedAt: stats.mtime
    };

    // Store in Supabase with original path
    await storeDocument({
      ...doc,
      modified_at: stats.mtime.toISOString()
    });

    console.log(`✅ Indexed with original path: ${filePath}`);
    return doc;
  } catch (error) {
    console.error(`Error indexing ${filePath}:`, error);
    return null;
  }
}

// Index an uploaded file from buffer with Cloudinary URL
export async function indexUploadedFile(
  buffer: Buffer,
  filename: string,
  cloudinaryUrl: string,
  fileSize: number
): Promise<Document | null> {
  try {
    const content = await extractTextFromBuffer(buffer, filename);
    
    if (!content) {
      console.log(`⚠️ No content extracted from ${filename}`);
      return null;
    }

    const id = Buffer.from(cloudinaryUrl).toString('base64');

    console.log(`📄 Indexing uploaded file: ${filename}`);

    // Generate embedding and categorize
    const [embedding, metadata] = await Promise.all([
      generateEmbedding(content.slice(0, 5000)),
      categorizeDocument(content, filename)
    ]);

    const doc: Document = {
      id,
      filename,
      path: cloudinaryUrl, // Store Cloudinary URL as path
      content: content.slice(0, 1000), // Store preview
      embedding,
      category: metadata?.category,
      project: metadata?.project,
      team: metadata?.team,
      tags: metadata?.tags || [],
      size: fileSize,
      modifiedAt: new Date()
    };

    // Store in Supabase with Cloudinary URL
    await storeDocument({
      ...doc,
      modified_at: new Date().toISOString()
    });

    console.log(`✅ Indexed uploaded file: ${filename} (${cloudinaryUrl})`);
    return doc;
  } catch (error) {
    console.error(`Error indexing uploaded file ${filename}:`, error);
    return null;
  }
}

// Recursively scan and index directory
export async function indexDirectory(dirPath: string, basePath?: string): Promise<number> {
  const base = basePath || dirPath;
  let count = 0;

  console.log(`📂 Scanning directory: ${dirPath}`);

  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    console.log(`📋 Found ${entries.length} entries in ${dirPath}`);

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);

      if (entry.isDirectory()) {
        console.log(`📁 Entering subdirectory: ${entry.name}`);
        count += await indexDirectory(fullPath, base);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        console.log(`📄 File: ${entry.name}, Extension: ${ext}`);
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          console.log(`✅ Supported file, indexing: ${entry.name}`);
          const doc = await indexDocument(fullPath, base);
          if (doc) count++;
        } else {
          console.log(`❌ Unsupported extension: ${ext}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning ${dirPath}:`, error);
  }

  return count;
}

// Search documents by semantic similarity
export async function searchDocuments(query: string, limit = 10): Promise<Document[]> {
  const count = await getDocumentCount();
  if (count === 0) {
    return [];
  }

  console.log(`🔍 Searching for: "${query}"`);
  const queryEmbedding = await generateEmbedding(query);
  
  // Use Supabase vector search
  const results = await searchDocumentsByVector(queryEmbedding, limit * 2); // Get more, then filter
  
  console.log(`📊 Found ${results.length} potential matches`);
  
  // Filter and map results
  const mappedResults = results
    .filter((doc: any) => {
      // Only include results with similarity > 0.4 (40% match)
      const similarity = doc.similarity || 0;
      return similarity > 0.4;
    })
    .slice(0, limit) // Take top N after filtering
    .map(doc => ({
      id: doc.id,
      filename: doc.filename,
      path: doc.path,
      content: doc.content,
      embedding: doc.embedding,
      category: doc.category,
      project: doc.project,
      team: doc.team,
      tags: doc.tags,
      size: doc.size,
      modifiedAt: new Date(doc.modified_at)
    }));

  console.log(`✅ Returning ${mappedResults.length} relevant results`);
  return mappedResults;
}
