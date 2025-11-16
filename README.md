# 🔍 AI-Powered Knowledge Search

A modern, intelligent document search system powered by AI. Upload documents, search by meaning (not just keywords), and find what you need instantly.

## ✨ Features

- 🤖 **AI-Powered Search** - Semantic search using Google Gemini
- ☁️ **Cloud Storage** - Files stored securely on Cloudinary
- 📄 **Multi-Format Support** - PDF, DOCX, TXT, MD, HTML, JSON
- 🎨 **Beautiful UI** - Modern dark theme with smooth animations
- 🏷️ **Auto-Categorization** - AI automatically organizes documents
- ⚡ **Real-Time Search** - See results as you type
- 📊 **Smart Organization** - Categories, teams, and projects
- 🔒 **Secure** - Database with vector embeddings

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

1. **Upload** - Drag & drop files or select from computer
2. **Process** - AI extracts text and generates embeddings
3. **Store** - Files saved to Cloudinary, metadata to Supabase
4. **Search** - Semantic search finds documents by meaning
5. **Preview** - View documents directly in browser

## 🛠️ Tech Stack

### Backend
- **Runtime**: Bun
- **Framework**: Elysia.js
- **Database**: Supabase (PostgreSQL + pgvector)
- **AI**: Google Gemini 2.5-flash
- **Storage**: Cloudinary

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Icons**: Material-UI
- **Styling**: Custom CSS

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

### Search Capabilities
- **Semantic Search** - Understands meaning, not just keywords
- **Live Suggestions** - Top 5 results as you type
- **Full Results** - Grid view with all matches
- **Keyword Highlighting** - Colorful highlights in results
- **Relevance Filtering** - Only shows relevant results (>40% match)

### Document Management
- **Drag & Drop Upload** - Easy file uploads
- **Progress Tracking** - Real-time upload progress
- **Format Support** - PDF, DOCX, TXT, MD, HTML, JSON
- **Preview** - View documents in browser
- **Delete** - Remove individual or all documents

### Organization
- **Auto-Categorization** - AI categorizes by topic
- **Team Assignment** - Organized by team
- **Project Grouping** - Grouped by project
- **Smart Tags** - Relevant keywords extracted

### UI/UX
- **Dark Theme** - Professional black & white design
- **Responsive** - Works on all devices
- **Loading States** - Progress bars and spinners
- **Notifications** - User-friendly feedback
- **Animations** - Smooth transitions

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
- [Bun](https://bun.sh) - Fast JavaScript runtime
- [Elysia](https://elysiajs.com) - Fast web framework
- [React](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool
- [Supabase](https://supabase.com) - Database
- [Cloudinary](https://cloudinary.com) - File storage
- [Google Gemini](https://ai.google.dev) - AI embeddings

---

Made with ❤️ for better document search
