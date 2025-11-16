# 🔧 Extending the Search Tool

## Adding New File Format Support

Want to support more file types? Here's how:

### Example: Adding Excel (.xlsx) Support

1. **Install the parser**
```bash
cd packages/backend
bun add xlsx
```

2. **Update the indexer** (`packages/backend/src/services/indexer.ts`)

```typescript
import XLSX from 'xlsx';

// Add to SUPPORTED_EXTENSIONS
const SUPPORTED_EXTENSIONS = ['.txt', '.md', '.pdf', '.docx', '.html', '.json', '.xlsx'];

// Add to extractText function
if (ext === '.xlsx') {
  const buffer = await readFile(filePath);
  const workbook = XLSX.read(buffer);
  let text = '';
  
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    text += XLSX.utils.sheet_to_txt(sheet) + '\n';
  });
  
  return text;
}
```

### Popular Parsers

| Format | Package | Usage |
|--------|---------|-------|
| Excel | `xlsx` | Spreadsheets |
| PowerPoint | `pptx-parser` | Presentations |
| CSV | Built-in | `readFile` + parse |
| RTF | `rtf-parser` | Rich text |
| Images (OCR) | `tesseract.js` | Extract text from images |

## Adding Vector Database

Replace in-memory storage with a real vector DB:

### Option 1: ChromaDB (Recommended)

```bash
cd packages/backend
bun add chromadb
```

```typescript
import { ChromaClient } from 'chromadb';

const client = new ChromaClient();
const collection = await client.createCollection({ name: "documents" });

// Store document
await collection.add({
  ids: [doc.id],
  embeddings: [doc.embedding],
  metadatas: [{ filename: doc.filename, category: doc.category }],
  documents: [doc.content]
});

// Search
const results = await collection.query({
  queryEmbeddings: [queryEmbedding],
  nResults: 10
});
```

### Option 2: Pinecone

```bash
bun add @pinecone-database/pinecone
```

### Option 3: Weaviate

```bash
bun add weaviate-ts-client
```

## Enhancing AI Features

### Add Document Summarization

```typescript
// In gemini.ts
export async function summarizeDocument(content: string): Promise<string> {
  const prompt = `Summarize this document in 2-3 sentences:\n\n${content.slice(0, 3000)}`;
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}
```

### Add Question Answering

```typescript
export async function answerQuestion(question: string, context: string): Promise<string> {
  const prompt = `Based on this document:\n${context}\n\nAnswer: ${question}`;
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}
```

### Add Smart Recommendations

```typescript
export async function recommendDocuments(currentDoc: Document, allDocs: Document[]): Promise<Document[]> {
  // Find similar documents using embeddings
  const similarities = allDocs.map(doc => ({
    doc,
    score: cosineSimilarity(currentDoc.embedding!, doc.embedding!)
  }));
  
  return similarities
    .sort((a, b) => b.score - a.score)
    .slice(1, 6) // Skip first (same doc)
    .map(s => s.doc);
}
```

## Adding Authentication

### Using Clerk

```bash
cd frontend
bun add @clerk/clerk-react

cd ../packages/backend
bun add @clerk/backend
```

### Using Auth0

```bash
bun add @auth0/auth0-react
```

## Performance Optimizations

### 1. Caching Search Results

```typescript
const searchCache = new Map<string, Document[]>();

export async function searchDocuments(query: string, limit = 10): Promise<Document[]> {
  const cacheKey = `${query}-${limit}`;
  
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey)!;
  }
  
  const results = await performSearch(query, limit);
  searchCache.set(cacheKey, results);
  
  return results;
}
```

### 2. Batch Processing

```typescript
// Index multiple documents in parallel
const batchSize = 5;
for (let i = 0; i < files.length; i += batchSize) {
  const batch = files.slice(i, i + batchSize);
  await Promise.all(batch.map(file => indexDocument(file)));
}
```

### 3. Incremental Indexing

```typescript
// Only re-index changed files
const lastIndexed = new Map<string, Date>();

export async function incrementalIndex(dirPath: string) {
  const files = await getFiles(dirPath);
  
  for (const file of files) {
    const stats = await stat(file);
    const lastMod = lastIndexed.get(file);
    
    if (!lastMod || stats.mtime > lastMod) {
      await indexDocument(file);
      lastIndexed.set(file, stats.mtime);
    }
  }
}
```

## Deployment

### Deploy to Production

1. **Backend** - Deploy to Railway, Render, or Fly.io
2. **Frontend** - Deploy to Vercel, Netlify, or Cloudflare Pages
3. **Database** - Use managed Postgres or MongoDB
4. **Vector DB** - Use Pinecone cloud or self-hosted Weaviate

### Environment Variables

```bash
# Production .env
GEMINI_API_KEY=your_key
DOCUMENTS_PATH=/app/documents
DATABASE_URL=postgresql://...
VECTOR_DB_URL=https://...
NODE_ENV=production
```

## Need Help?

- Check the main `SETUP.md` for basics
- See `QUICKSTART.md` for getting started
- Open an issue for bugs or questions
