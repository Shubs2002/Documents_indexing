# ⚡ Quick Reference Card

## 🚀 Setup Commands

```bash
# Install dependencies
bun install

# Run development
bun run dev

# Run backend only
bun run dev:backend

# Run frontend only
bun run dev:frontend

# Build for production
bun run build
```

## 🔑 Environment Variables

```env
# packages/backend/.env
GEMINI_API_KEY=your_gemini_api_key
DOCUMENTS_PATH=../../documents
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📡 API Endpoints

```bash
# Health check
GET http://localhost:3001/api/health

# Search documents
GET http://localhost:3001/api/search?q=your+query

# Index documents
POST http://localhost:3001/api/index

# Re-index (clear and index)
POST http://localhost:3001/api/index?reindex=true

# Get statistics
GET http://localhost:3001/api/stats
```

## 🗄️ Supabase SQL Setup

```sql
-- Run this in Supabase SQL Editor
-- Or use the supabase-setup.sql file

create extension if not exists vector;

create table documents (
  id text primary key,
  filename text not null,
  path text not null,
  content text,
  embedding vector(768),
  category text,
  project text,
  team text,
  tags text[],
  size bigint,
  modified_at timestamptz,
  created_at timestamptz default now()
);

create index on documents using hnsw (embedding vector_cosine_ops);
```

## 📁 File Formats Supported

- ✅ `.txt` - Plain text
- ✅ `.md` - Markdown
- ✅ `.html` - HTML
- ✅ `.json` - JSON
- ✅ `.pdf` - PDF documents
- ✅ `.docx` - Word documents

## 🔍 Example Searches

```
"sales presentation"  → Finds sales decks, pitches
"Q4 marketing"        → Finds campaigns, plans
"brand guidelines"    → Finds brand docs
"product roadmap"     → Finds roadmaps, plans
"email templates"     → Finds email content
```

## 🐛 Common Issues

### Backend won't start
```bash
# Check environment variables
cat packages/backend/.env

# Verify Supabase connection
# Should see: ✅ Database connected successfully
```

### No documents indexed
```bash
# Check documents folder
ls documents/

# Try manual index
curl -X POST http://localhost:3001/api/index
```

### Search returns nothing
```bash
# Verify documents in Supabase
# Go to: Supabase Dashboard → Table Editor → documents

# Check document count
curl http://localhost:3001/api/stats
```

## 📊 Ports

- **Backend:** http://localhost:3001
- **Frontend:** http://localhost:5173
- **Supabase:** https://xxxxx.supabase.co

## 🔗 Important Links

- **Supabase Dashboard:** https://app.supabase.com
- **Google AI Studio:** https://makersuite.google.com/app/apikey
- **Documentation:** See DOCS-INDEX.md

## 💡 Quick Tips

```bash
# Check if backend is running
curl http://localhost:3001/api/health

# Count documents
curl http://localhost:3001/api/stats | grep totalDocuments

# Test search
curl "http://localhost:3001/api/search?q=test"

# View logs
# Backend terminal shows indexing progress
```

## 🎯 Workflow

1. **Add documents** → `documents/` folder
2. **Index** → Click button or `POST /api/index`
3. **Search** → Type query in UI
4. **Results** → See relevant documents

## 📝 File Structure

```
marketing-search/
├── packages/backend/     # API server
│   ├── src/
│   │   ├── index.ts     # Main server
│   │   └── services/    # AI & DB services
│   └── .env             # Config (don't commit!)
├── frontend/            # React UI
│   └── src/App.tsx      # Main component
├── documents/           # Your documents
└── *.md                 # Documentation
```

## 🚀 Deployment

```bash
# Backend → Railway
railway up

# Frontend → Vercel
vercel deploy

# See DEPLOYMENT.md for details
```

## 🆘 Get Help

1. Check [DOCS-INDEX.md](DOCS-INDEX.md)
2. Review [SUPABASE-SETUP.md](SUPABASE-SETUP.md)
3. Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
4. Open GitHub issue

## 📦 Dependencies

```json
{
  "backend": [
    "elysia",
    "@elysiajs/cors",
    "@google/generative-ai",
    "@supabase/supabase-js",
    "pdf-parse",
    "mammoth"
  ],
  "frontend": [
    "react",
    "react-dom",
    "vite"
  ]
}
```

---

**Keep this handy! 📌**
