# 📁 Project Structure

## Overview

```
marketing-search/
├── 📦 packages/
│   └── backend/              # Bun + Elysia API server
│       ├── src/
│       │   ├── index.ts      # Main API server
│       │   └── services/
│       │       ├── gemini.ts    # AI integration
│       │       └── indexer.ts   # Document processing
│       ├── .env              # API keys (DO NOT COMMIT)
│       ├── .env.example      # Example config
│       ├── package.json      # Backend dependencies
│       └── tsconfig.json     # TypeScript config
│
├── 🎨 frontend/              # React + Vite UI
│   ├── src/
│   │   ├── App.tsx          # Main component
│   │   ├── App.css          # Styles
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite configuration
│   ├── tsconfig.json        # TypeScript config
│   └── tsconfig.app.json    # App TypeScript config
│
├── 📄 documents/             # Your documents here!
│   ├── sales-deck.md
│   ├── sample-campaign.md
│   ├── brand-guidelines.md
│   ├── product-roadmap.txt
│   ├── email-templates.html
│   └── social-media-strategy.json
│
├── 📚 Documentation
│   ├── README.md            # Main readme
│   ├── QUICKSTART.md        # 5-minute setup
│   ├── SETUP.md             # Detailed guide
│   ├── FEATURES.md          # Feature list
│   ├── EXTENDING.md         # Customization guide
│   ├── TESTING.md           # Testing guide
│   ├── CHECKLIST.md         # Setup checklist
│   └── PROJECT-STRUCTURE.md # This file
│
├── ⚙️ Configuration
│   ├── package.json         # Workspace config
│   ├── .gitignore          # Git ignore rules
│   └── bun.lockb           # Dependency lock
│
└── 🚀 Scripts
    ├── bun run dev          # Run both servers
    ├── bun run dev:backend  # Backend only
    └── bun run dev:frontend # Frontend only
```

## 🔍 Key Files Explained

### Backend Files

#### `packages/backend/src/index.ts`
Main API server with endpoints:
- `GET /api/health` - Health check
- `GET /api/search?q=query` - Search documents
- `POST /api/index` - Index documents
- `GET /api/stats` - Get statistics

#### `packages/backend/src/services/gemini.ts`
AI integration:
- `generateEmbedding()` - Create vector embeddings
- `categorizeDocument()` - Auto-categorize with AI
- `enhanceSearchQuery()` - Expand search terms

#### `packages/backend/src/services/indexer.ts`
Document processing:
- `indexDocument()` - Process single document
- `indexDirectory()` - Scan folder recursively
- `searchDocuments()` - Semantic search
- `extractText()` - Parse different file formats

#### `packages/backend/.env`
Environment variables:
```env
GEMINI_API_KEY=your_api_key_here
DOCUMENTS_PATH=../../documents
```

### Frontend Files

#### `frontend/src/App.tsx`
Main React component:
- Search interface
- Results display
- Stats dashboard
- Index button

#### `frontend/src/App.css`
Styling:
- Search container
- Result cards
- Tags and metadata
- Responsive design

#### `frontend/vite.config.ts`
Vite configuration:
- Proxy to backend API
- Port configuration (5173)
- Build settings

### Document Files

#### `documents/`
Your searchable documents:
- Marketing materials
- Sales decks
- Brand guidelines
- Product roadmaps
- Email templates
- Any supported format

## 🔄 Data Flow

```
┌─────────────┐
│  Documents  │
│   Folder    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Indexer    │ ← Scans files
│  Service    │ ← Extracts text
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Gemini    │ ← Generates embeddings
│     AI      │ ← Categorizes content
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Document   │ ← Stores in memory
│   Store     │ ← Ready for search
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Search    │ ← User queries
│     API     │ ← Returns results
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Frontend   │ ← Displays results
│     UI      │ ← Shows metadata
└─────────────┘
```

## 📦 Dependencies

### Backend Dependencies
```json
{
  "elysia": "^1.4.16",           // Web framework
  "@elysiajs/cors": "^1.4.0",    // CORS support
  "@google/generative-ai": "^0.24.1", // Gemini AI
  "pdf-parse": "^2.4.5",         // PDF parsing
  "mammoth": "^1.11.0"           // DOCX parsing
}
```

### Frontend Dependencies
```json
{
  "react": "^19.2.0",            // UI framework
  "react-dom": "^19.2.0",        // React DOM
  "vite": "^7.2.2",              // Build tool
  "@vitejs/plugin-react": "^5.1.0" // React plugin
}
```

## 🗂️ File Types

### Supported Formats

| Extension | Type | Parser | Status |
|-----------|------|--------|--------|
| `.txt` | Text | Built-in | ✅ |
| `.md` | Markdown | Built-in | ✅ |
| `.html` | HTML | Built-in | ✅ |
| `.json` | JSON | Built-in | ✅ |
| `.pdf` | PDF | pdf-parse | ✅ |
| `.docx` | Word | mammoth | ✅ |
| `.xlsx` | Excel | - | 🔜 |
| `.pptx` | PowerPoint | - | 🔜 |

## 🔐 Security

### Sensitive Files (Never Commit)
- `packages/backend/.env` - Contains API keys
- `node_modules/` - Dependencies
- `.bun/` - Bun cache

### Safe to Commit
- `.env.example` - Example config
- `documents/` - Sample documents (optional)
- All source code
- Documentation

## 🚀 Deployment Structure

### Development
```
Local Machine
├── Backend: localhost:3001
└── Frontend: localhost:5173
```

### Production (Example)
```
Cloud
├── Backend: api.yourapp.com
│   └── Railway/Render/Fly.io
└── Frontend: yourapp.com
    └── Vercel/Netlify/Cloudflare
```

## 📊 Memory Usage

### In-Memory Storage
```
Document Store (Map)
├── Key: Document ID (base64)
└── Value: Document Object
    ├── id: string
    ├── filename: string
    ├── path: string
    ├── content: string (preview)
    ├── embedding: number[] (768 dims)
    ├── category: string
    ├── project: string
    ├── team: string
    ├── tags: string[]
    ├── size: number
    └── modifiedAt: Date
```

### Estimated Memory
- 10 documents: ~5-10 MB
- 100 documents: ~50-100 MB
- 1000 documents: ~500 MB - 1 GB

For larger datasets, use a vector database (see [EXTENDING.md](EXTENDING.md))

## 🔧 Configuration Files

### TypeScript Configs
- `tsconfig.json` - Root config
- `packages/backend/tsconfig.json` - Backend config
- `frontend/tsconfig.json` - Frontend root
- `frontend/tsconfig.app.json` - App config
- `frontend/tsconfig.node.json` - Node config

### Build Configs
- `vite.config.ts` - Vite build settings
- `package.json` - Workspace settings

## 📝 Adding New Files

### New Backend Service
```typescript
// packages/backend/src/services/myservice.ts
export function myFunction() {
  // Your code
}
```

### New Frontend Component
```typescript
// frontend/src/components/MyComponent.tsx
export function MyComponent() {
  return <div>Hello</div>
}
```

### New Document Type
1. Add parser to `indexer.ts`
2. Add extension to `SUPPORTED_EXTENSIONS`
3. Update `extractText()` function

## 🎯 Best Practices

### File Organization
- Keep services in `services/` folder
- Keep components in `components/` folder
- Keep types in separate files
- Use meaningful file names

### Code Structure
- One component per file
- Export functions explicitly
- Use TypeScript types
- Add comments for complex logic

### Documentation
- Update README when adding features
- Document new APIs
- Add examples for new functionality
- Keep CHANGELOG updated

## 🔍 Finding Things

### Need to modify...

**Search functionality?**
→ `packages/backend/src/services/indexer.ts`

**AI features?**
→ `packages/backend/src/services/gemini.ts`

**API endpoints?**
→ `packages/backend/src/index.ts`

**UI design?**
→ `frontend/src/App.tsx` and `App.css`

**Configuration?**
→ `packages/backend/.env` or `vite.config.ts`

**Add file format?**
→ `packages/backend/src/services/indexer.ts` → `extractText()`

## 💡 Tips

- Use VS Code's file search (Ctrl+P) to find files quickly
- Use global search (Ctrl+Shift+F) to find code
- Keep related files close together
- Follow existing naming conventions
- Document complex logic

---

**Need help navigating? Check [SETUP.md](SETUP.md) or [EXTENDING.md](EXTENDING.md)**
