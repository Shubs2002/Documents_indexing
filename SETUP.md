# 🚀 Knowledge Discovery & Internal Search

AI-powered document search tool for marketing teams. Find documents instantly with semantic search, automatic categorization, and smart tagging.

## ✨ Features

- 🔍 **Semantic Search** - Find documents by meaning, not just keywords
- 🤖 **AI Categorization** - Auto-tag documents by topic, project, and team
- ⚡ **Fast Indexing** - Powered by Bun and Gemini API
- 🎨 **Clean UI** - Simple, intuitive interface
- 📊 **Smart Analytics** - Track document usage and categories

## 🛠️ Tech Stack

- **Backend**: Bun + Elysia.js + Google Gemini API
- **Frontend**: React 19 + Vite + TypeScript
- **AI**: Google Gemini Pro (embeddings + categorization)
- **Database**: Supabase (PostgreSQL + pgvector)
- **Storage**: Persistent vector database

## 🚀 Quick Start

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key

### 2. Set Up Supabase

Follow the detailed guide: **[SUPABASE-SETUP.md](SUPABASE-SETUP.md)**

Quick version:
1. Create account at https://supabase.com
2. Create new project
3. Run the SQL setup script
4. Copy your API keys

### 3. Configure Environment

```bash
# Edit packages/backend/.env
GEMINI_API_KEY=your_api_key_here
DOCUMENTS_PATH=../../documents

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Install Dependencies

```bash
bun install
```

### 5. Add Your Documents

Place your marketing documents in the `documents/` folder:
- ✅ Supported formats: `.txt`, `.md`, `.html`, `.json`, `.pdf`, `.docx`
- Sample documents included to get you started!

### 6. Run the Application

```bash
# Option 1: Run both servers together
bun run dev

# Option 2: Run separately
bun run dev:backend  # Terminal 1
bun run dev:frontend # Terminal 2
```

### 7. Index Your Documents

1. Open `http://localhost:5173`
2. Click "🚀 Index Documents"
3. Wait for indexing to complete
4. Start searching!

## 📡 API Endpoints

### `GET /api/health`
Health check and document count

### `GET /api/search?q=query`
Semantic search across all documents

### `POST /api/index`
Index/re-index all documents in the documents folder

### `GET /api/stats`
Get statistics about indexed documents

## 🎯 How It Works

1. **Document Indexing**
   - Scans the documents folder recursively
   - Extracts text content from supported formats
   - Generates embeddings using Gemini API
   - AI categorizes by topic, project, and team

2. **Semantic Search**
   - Converts search query to embedding
   - Calculates cosine similarity with all documents
   - Returns top matches ranked by relevance

3. **Smart Categorization**
   - Gemini AI analyzes document content
   - Extracts metadata (category, project, team)
   - Generates relevant tags automatically

## 📁 Project Structure

```
marketing-search/
├── packages/
│   └── backend/
│       ├── src/
│       │   ├── index.ts           # API server
│       │   └── services/
│       │       ├── gemini.ts      # AI integration
│       │       └── indexer.ts     # Document indexing
│       └── .env                   # Configuration
├── frontend/
│   └── src/
│       ├── App.tsx                # Main UI
│       └── App.css                # Styles
├── documents/                     # Your documents here
└── package.json                   # Workspace config
```

## 🔮 Future Enhancements

- [x] PDF and DOCX support ✅
- [x] Vector database (Supabase + pgvector) ✅
- [ ] File upload interface
- [ ] Advanced filters (date, team, project)
- [ ] Document preview modal
- [ ] Export search results
- [ ] User authentication
- [ ] Search history
- [ ] Collaborative tagging

## 🐛 Troubleshooting

**Backend not connecting?**
- Check if Gemini API key is set in `.env`
- Verify backend is running on port 3001

**No documents indexed?**
- Ensure documents exist in `documents/` folder
- Check file formats are supported
- Look at backend console for errors

**Search not working?**
- Click "Index Documents" first
- Check browser console for errors
- Verify API key has proper permissions

## 📝 License

MIT
