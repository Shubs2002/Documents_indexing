import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { indexDirectory, searchDocuments, indexUploadedFile } from './services/indexer';
import { initializeDatabase, getDocumentCount, getDocumentStats, clearAllDocuments, getAllDocuments, deleteDocument } from './services/supabase';
import { mkdir } from 'fs/promises';
import { uploadToCloudinary } from './services/cloudinary';

const DOCUMENTS_PATH = process.env.DOCUMENTS_PATH || '../../documents';

// Initialize database on startup
await initializeDatabase();

// Ensure documents directory exists
try {
  await mkdir(DOCUMENTS_PATH, { recursive: true });
} catch (error) {
  console.log('Documents directory already exists');
}

const app = new Elysia()
  .use(cors())
  .get('/api/health', async () => ({ 
    status: 'running',
    timestamp: new Date().toISOString(),
    documentsIndexed: await getDocumentCount()
  }))
  .get('/api/search', async ({ query }) => {
    const searchQuery = query.q as string || '';
    
    if (!searchQuery) {
      return { query: '', results: [], message: 'Please provide a search query' };
    }

    const results = await searchDocuments(searchQuery, 20); // Increased limit to 20
    
    return {
      query: searchQuery,
      results: results.map(doc => ({
        id: doc.id,
        filename: doc.filename,
        preview: doc.content,
        category: doc.category,
        project: doc.project,
        team: doc.team,
        tags: doc.tags,
        modifiedAt: doc.modifiedAt
      })),
      count: results.length
    };
  })
  .post('/api/index', async ({ query }) => {
    console.log('🔄 Starting document indexing...');
    console.log('📁 Documents path:', DOCUMENTS_PATH);
    
    // Start indexing in background
    const indexPromise = (async () => {
      try {
        // Optional: clear existing documents if reindex=true
        if (query.reindex === 'true') {
          console.log('🗑️  Clearing existing documents...');
          await clearAllDocuments();
        }
        
        const count = await indexDirectory(DOCUMENTS_PATH);
        console.log(`✅ Indexed ${count} documents`);
        return count;
      } catch (error) {
        console.error('❌ Indexing error:', error);
        return 0;
      }
    })();

    // Return immediately
    return {
      success: true,
      message: 'Indexing started in background',
      indexing: true
    };
  })
  .get('/api/stats', async () => {
    return await getDocumentStats();
  })
  .get('/api/documents', async () => {
    const docs = await getAllDocuments();
    return {
      documents: docs.map(doc => ({
        id: doc.id,
        filename: doc.filename,
        path: doc.path, // Include path (Cloudinary URL for uploaded files)
        category: doc.category,
        team: doc.team,
        project: doc.project,
        size: doc.size,
        modified_at: doc.modified_at
      }))
    };
  })
  .post('/api/upload', async ({ body }) => {
    try {
      const formData = body as any;
      
      if (!formData || !formData.files) {
        return { success: false, message: 'No files provided' };
      }

      console.log('📤 Uploading files to Cloudinary and indexing...');

      const files = Array.isArray(formData.files) ? formData.files : [formData.files];
      let indexed = 0;
      let failed = 0;

      for (const file of files) {
        try {
          console.log(`📤 Processing: ${file.name}`);
          
          // Convert file to buffer
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          // Upload to Cloudinary
          console.log(`☁️ Uploading to Cloudinary: ${file.name}`);
          const uploadResult = await uploadToCloudinary(buffer, file.name);
          console.log(`✅ Uploaded to Cloudinary: ${uploadResult.url}`);
          
          // Index the file with Cloudinary URL
          const doc = await indexUploadedFile(buffer, file.name, uploadResult.url, uploadResult.bytes);
          if (doc) {
            indexed++;
            console.log(`✅ Indexed: ${file.name}`);
          } else {
            failed++;
            console.log(`❌ Failed to index: ${file.name}`);
          }
        } catch (error) {
          failed++;
          console.error(`❌ Error processing ${file.name}:`, error);
        }
      }

      return {
        success: indexed > 0,
        message: `Uploaded and indexed ${indexed} file(s)${failed > 0 ? `, ${failed} failed` : ''}`,
        indexed,
        failed
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        message: 'Upload failed',
        error: String(error)
      };
    }
  })
  .delete('/api/documents/:id', async ({ params }) => {
    try {
      await deleteDocument(params.id);
      return {
        success: true,
        message: 'Document deleted successfully'
      };
    } catch (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        message: 'Failed to delete document',
        error: String(error)
      };
    }
  })
  .delete('/api/documents', async () => {
    try {
      await clearAllDocuments();
      return {
        success: true,
        message: 'All documents deleted successfully'
      };
    } catch (error) {
      console.error('Clear all error:', error);
      return {
        success: false,
        message: 'Failed to delete all documents',
        error: String(error)
      };
    }
  })
  .listen(3001);

console.log(`🚀 Backend running at http://${app.server?.hostname}:${app.server?.port}`);