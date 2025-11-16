# 🔧 Backend - AI Knowledge Search API

Backend API server for the AI-powered document search system.

## 🚀 Tech Stack

- **Runtime**: Bun
- **Framework**: Elysia.js
- **Database**: Supabase (PostgreSQL + pgvector)
- **AI**: Google Gemini 2.5-flash
- **Storage**: Cloudinary
- **File Processing**: pdf-parse, mammoth

## 📋 Prerequisites

- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- Supabase account and project
- Google Gemini API key
- Cloudinary account

## ⚙️ Setup

1. **Install dependencies**
```bash
bun install
```

2. **Configure environment variables**

Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

Required variables:
- `GEMINI_API_KEY` - Your Google Gemini API key
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

3. **Set up Supabase database**

Run this SQL in your Supabase SQL Editor:
```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table
CREATE TABLE documents (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  path TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(768),
  category TEXT,
  project TEXT,
  team TEXT,
  tags TEXT[],
  size INTEGER,
  modified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);
```

4. **Run the server**
```bash
bun run dev
```

Server will start at `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Search Documents
```
GET /api/search?q=query
```

### Get All Documents
```
GET /api/documents
```

### Upload Files
```
POST /api/upload
Content-Type: multipart/form-data
```

### Index Documents Folder
```
POST /api/index
```

### Delete Document
```
DELETE /api/documents/:id
```

### Clear All Documents
```
DELETE /api/documents
```

### Get Statistics
```
GET /api/stats
```

## 📁 Project Structure

```
packages/backend/
├── src/
│   ├── index.ts              # Main server file
│   └── services/
│       ├── gemini.ts         # AI embeddings & categorization
│       ├── indexer.ts        # Document processing & search
│       ├── supabase.ts       # Database operations
│       └── cloudinary.ts     # File upload to cloud
├── .env                      # Environment variables
└── package.json
```

## 🔧 Development

```bash
# Run with auto-reload
bun run dev

# Run production
bun run src/index.ts
```

## 🌐 Deployment

See `DEPLOYMENT-GUIDE.md` in the root directory for deployment instructions.

## 📝 Supported File Types

- PDF (`.pdf`)
- Word Documents (`.docx`, `.doc`)
- Text Files (`.txt`)
- Markdown (`.md`)
- HTML (`.html`)
- JSON (`.json`)

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `DOCUMENTS_PATH` | Local documents folder path | No (default: `../../documents`) |
| `PORT` | Server port | No (default: `3001`) |

## 🐛 Troubleshooting

**Database connection fails**
- Check Supabase credentials in `.env`
- Ensure pgvector extension is enabled
- Verify database table is created

**File upload fails**
- Check Cloudinary credentials
- Verify file size limits
- Check supported file types

**AI processing fails**
- Verify Gemini API key is valid
- Check API quota limits
- Ensure internet connection

## 📄 License

MIT
