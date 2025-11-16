# 🔍 AI-Powered Knowledge Search

A modern, intelligent document search system powered by **Google Gemini AI**. Upload documents, search by meaning (not just keywords), and find what you need instantly using advanced semantic search.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript)
![Bun](https://img.shields.io/badge/Bun-1.0-000000?style=flat&logo=bun)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=flat&logo=cloudinary)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=flat&logo=google)

## ✨ Features

- 🤖 **Google Gemini AI-Powered Search** - Semantic search using Gemini 2.5-flash with 768-dimensional embeddings
- 🧠 **Intelligent Categorization** - Gemini AI automatically organizes documents by topic, team, and project
- 🎯 **Smart Tagging** - AI-generated tags and keywords for better organization
- ☁️ **Cloud Storage** - Files stored securely on Cloudinary CDN
- 📄 **Multi-Format Support** - PDF, DOCX, TXT, MD, HTML, JSON
- 🎨 **Beautiful UI** - Modern dark theme with smooth animations
- ⚡ **Real-Time Search** - Live suggestions as you type
- � **Smaurt Organization** - Categories, teams, and projects
- 🔒 **Secure** - Vector embeddings with pgvector
- 🎯 **Keyword Highlighting** - Colorful highlights in search results
- � **Responesive Design** - Works on all devices
- �️ **rDocument Management** - Upload, preview, delete documents
- 📈 **Progress Tracking** - Real-time upload progress

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 19.0 |
| **TypeScript** | Type Safety | 5.5 |
| **Vite** | Build Tool | 7.2 |
| **Material-UI Icons** | Icon Library | Latest |
| **marked** | Markdown Rendering | Latest |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Bun** | JavaScript Runtime | 1.2+ |
| **Elysia.js** | Web Framework | Latest |
| **TypeScript** | Type Safety | 5.5 |
| **pdf-parse** | PDF Text Extraction | Latest |
| **mammoth** | DOCX Text Extraction | Latest |

### AI & Services
| Service | Purpose | Plan |
|---------|---------|------|
| **Google Gemini 2.5-flash** | AI Text Embeddings (768-dim) & Auto-Categorization | Free (60 req/min) |
| **Supabase** | PostgreSQL + pgvector | Free (500MB) |
| **Cloudinary** | File Storage & CDN | Free (25GB) |

### Database
| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Primary Database |
| **pgvector** | Vector Similarity Search |
| **Supabase** | Managed PostgreSQL |

### Deployment
| Platform | Service | Cost |
|----------|---------|------|
| **Railway** | Backend Hosting | $5 credit/month |
| **Vercel** | Frontend Hosting | Free (Unlimited) |

## 🚀 Quick Start

### Prerequisites

- **Bun** - [Install Bun](https://bun.sh)
- **Node.js 18+** - For frontend
- **Supabase Account** - [Sign up](https://supabase.com)
- **Cloudinary Account** - [Sign up](https://cloudinary.com)
- **Google Gemini API Key** - [Get key](https://makersuite.google.com/app/apikey)

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd marketing-search
```

### 2. Setup Backend

```bash
cd packages/backend
bun install
cp .env.example .env
# Edit .env with your credentials
bun run dev
```

Backend runs at `http://localhost:3001`

See [Backend README](packages/backend/README.md) for detailed setup.

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

See [Frontend README](frontend/README.md) for detailed setup.

## 📁 Project Structure

```
marketing-search/
├── packages/
│   └── backend/          # API server (Bun + Elysia)
│       ├── src/
│       │   ├── index.ts
│       │   └── services/
│       └── README.md
├── frontend/             # React app (Vite + TypeScript)
│   ├── src/
│   │   ├── App.tsx
│   │   └── App.css
│   └── README.md
├── documents/            # Local documents folder (optional)
├── DEPLOYMENT-GUIDE.md   # Deployment instructions
└── README.md
```

## 🎯 How It Works

```
┌─────────────┐
│   User      │
│  Uploads    │
│   Files     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)         │
│  • Drag & Drop Interface                │
│  • Real-time Search                     │
│  • Document Preview                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│       Backend (Bun + Elysia.js)         │
│  • File Upload Handler                  │
│  • Text Extraction (PDF, DOCX, etc.)    │
│  • AI Processing                        │
└──────┬──────────────┬───────────────────┘
       │              │
       ▼              ▼
┌─────────────┐  ┌──────────────────────────────┐
│ Cloudinary  │  │  Google Gemini 2.5-flash AI  │
│  Storage    │  │  • 768-dim Text Embeddings   │
│  • Files    │  │  • Auto-Categorization       │
│  • CDN      │  │  • Smart Tagging             │
└─────────────┘  └──────────┬───────────────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │  Supabase Database   │
                 │  • PostgreSQL        │
                 │  • pgvector          │
                 │  • Metadata Storage  │
                 └──────────────────────┘
```

### Process Flow:

1. **Upload** → Files sent to backend via FormData
2. **Store** → Backend uploads to Cloudinary, gets URL
3. **Extract** → Text extracted from file (PDF, DOCX, etc.)
4. **AI Process** → Google Gemini 2.5-flash generates embeddings (768-dim vectors)
5. **Categorize** → Gemini AI determines category, team, project, and tags
6. **Save** → Metadata + embeddings stored in Supabase
7. **Search** → User searches → Vector similarity search
8. **Results** → Relevant documents returned and displayed

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── App.tsx              # Main component (850+ lines)
│   ├── Search Bar       # Live suggestions + full results
│   ├── Sidebar          # Document list, categories, teams
│   ├── Upload Area      # Drag & drop with progress
│   ├── Preview          # Format-specific rendering
│   └── Modals           # Info, delete confirmations
└── App.css              # Custom dark theme (1200+ lines)
```

### Backend Architecture
```
src/
├── index.ts             # API server (Elysia routes)
└── services/
    ├── gemini.ts        # AI embeddings & categorization
    ├── indexer.ts       # Document processing & search
    ├── supabase.ts      # Database operations
    └── cloudinary.ts    # File upload to cloud
```

### Database Schema
```sql
documents (
  id TEXT PRIMARY KEY,
  filename TEXT,
  path TEXT,              -- Cloudinary URL
  content TEXT,           -- Extracted text preview
  embedding VECTOR(768),  -- AI-generated embeddings
  category TEXT,          -- AI-categorized
  team TEXT,              -- AI-assigned team
  project TEXT,           -- AI-assigned project
  tags TEXT[],            -- AI-generated tags
  size INTEGER,
  modified_at TIMESTAMP,
  created_at TIMESTAMP
)
```

## 🌐 Deployment

Deploy for **FREE** using:
- **Frontend**: Vercel (unlimited bandwidth)
- **Backend**: Railway ($5 credit/month)
- **Database**: Supabase (500MB free)
- **Storage**: Cloudinary (25GB free)

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for step-by-step instructions.

## 📖 Documentation

- [Backend README](packages/backend/README.md) - API documentation
- [Frontend README](frontend/README.md) - UI documentation
- [Deployment Guide](DEPLOYMENT-GUIDE.md) - Hosting instructions

## 🔧 Configuration

### Backend Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend Environment Variables

```env
# Production only
VITE_API_URL=https://your-backend-url.com
```

## 🎨 Features in Detail

### 🔍 Search Capabilities
- **Semantic Search** - AI understands meaning, not just keywords
- **Vector Similarity** - 768-dimensional embeddings for accuracy
- **Live Suggestions** - Top 5 results as you type (300ms debounce)
- **Full Results Grid** - Press Enter for all matches
- **Keyword Highlighting** - Colorful highlights in results
- **Relevance Filtering** - Only shows >40% similarity matches
- **Real-time Updates** - Instant search as you type

### 📄 Document Management
- **Drag & Drop Upload** - Intuitive file uploads
- **Click to Browse** - Traditional file picker
- **Progress Tracking** - Real-time upload progress bar
- **Multi-file Upload** - Upload multiple files at once
- **Format Support** - PDF, DOCX, TXT, MD, HTML, JSON
- **Preview System** - View documents in browser
- **Delete Options** - Remove individual or all documents
- **File Details** - View metadata, URL, size, date

### 🤖 Google Gemini AI Features
- **Text Embeddings** - Gemini 2.5-flash generates 768-dimensional vectors
- **Auto-Categorization** - AI intelligently determines document category
- **Team Assignment** - AI assigns documents to relevant teams
- **Project Detection** - AI identifies and links related projects
- **Smart Tagging** - AI extracts relevant keywords and topics
- **Content Analysis** - Processes up to 5000 characters for AI understanding
- **Semantic Search** - Vector similarity search for meaning-based results
- **Free Tier** - 60 requests/minute, 1500 requests/day at no cost

### 🗂️ Organization
- **Categories** - Expandable category tree
- **Teams** - Organized by team
- **Projects** - Grouped by project
- **Tags** - Keyword-based filtering
- **File Icons** - Color-coded by type
- **Collapsible Sections** - Clean sidebar navigation

### 🎨 UI/UX
- **Dark Theme** - Professional black (#0a0a0a) & white design
- **Responsive Layout** - Sidebar + main content
- **Loading States** - Progress bars, spinners, skeletons
- **Snackbar Notifications** - Non-intrusive feedback
- **Smooth Animations** - Float, spin, slide, fade effects
- **Gradient Tags** - Colorful category/team/project badges
- **Hover Effects** - Interactive elements with transitions
- **Modal Dialogs** - Info, confirmations, actions

### 📊 Performance
- **Fast Search** - <1 second response time
- **Efficient Indexing** - 2-5 seconds per document
- **Debounced Input** - Reduces API calls
- **Vector Search** - Optimized with pgvector
- **CDN Delivery** - Fast file access via Cloudinary
- **Background Processing** - Non-blocking operations

## 🐛 Troubleshooting

### Backend Issues
- Check environment variables in `.env`
- Verify Supabase database is set up
- Ensure Cloudinary credentials are correct
- Check Gemini API key is valid

### Frontend Issues
- Verify backend is running on port 3001
- Check CORS configuration in backend
- Clear browser cache
- Check console for errors

### Database Issues
- Enable pgvector extension in Supabase
- Run SQL setup script
- Check connection credentials
- Verify table exists

## 📊 Free Tier Limits

- **Railway**: $5 credit/month (~500 hours)
- **Vercel**: Unlimited bandwidth
- **Supabase**: 500MB database, 1GB storage
- **Cloudinary**: 25GB storage, 25GB bandwidth
- **Gemini**: 60 requests/minute free

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🎉 Credits

Built with:
- [Google Gemini 2.5-flash](https://ai.google.dev) - AI embeddings & categorization (⭐ Core AI Engine)
- [Bun](https://bun.sh) - Fast JavaScript runtime
- [Elysia](https://elysiajs.com) - Fast web framework
- [React](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool
- [Supabase](https://supabase.com) - PostgreSQL + pgvector database
- [Cloudinary](https://cloudinary.com) - File storage & CDN

---

Made with ❤️ for better document search
