# 🎨 Frontend - AI Knowledge Search UI

Modern, responsive frontend for the AI-powered document search system.

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Icons**: Material-UI Icons
- **Styling**: CSS (Custom)
- **Markdown**: marked

## 📋 Prerequisites

- Node.js 18+ or Bun
- Backend API running (see `packages/backend/README.md`)

## ⚙️ Setup

1. **Install dependencies**
```bash
npm install
# or
bun install
```

2. **Configure environment variables**

For development, the API URL defaults to `http://localhost:3001`.

For production, create `.env.production`:
```env
VITE_API_URL=https://your-backend-url.com
```

3. **Run development server**
```bash
npm run dev
# or
bun run dev
```

App will start at `http://localhost:5173`

## 🎯 Features

### 🔍 Search
- **Live Suggestions** - See results as you type
- **Full Search Results** - Press Enter for grid view
- **Semantic Search** - AI-powered meaning-based search
- **Keyword Highlighting** - Colorful highlights in results

### 📄 Document Management
- **Drag & Drop Upload** - Easy file uploads to cloud
- **Multi-format Support** - PDF, DOCX, TXT, MD, HTML, JSON
- **Document Preview** - View files directly in browser
- **File Details** - See metadata, categories, teams

### 🗂️ Organization
- **Categories** - Auto-categorized by AI
- **Teams** - Organized by team
- **Projects** - Grouped by project
- **Tags** - Smart tagging system

### 🎨 UI/UX
- **Dark Theme** - Professional black & white design
- **Responsive** - Works on all screen sizes
- **Loading States** - Progress bars and spinners
- **Snackbar Notifications** - User-friendly feedback

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.tsx           # Main application component
│   ├── App.css           # Styles
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # TypeScript definitions
├── public/               # Static assets
├── index.html            # HTML template
├── .env.production       # Production environment
└── package.json
```

## 🎨 Key Components

### Search Bar
- Live search with debouncing (300ms)
- Dropdown suggestions (top 5 results)
- Full results grid on Enter
- Clear button

### Document Preview
- Format-specific rendering
- PDF: Text preview + download link
- Markdown: GitHub-style rendering
- HTML: Sandboxed iframe
- DOCX: Text preview + download
- Text: Monospace display

### Sidebar
- Document list with icons
- Expandable categories
- Expandable teams
- Refresh and index buttons
- Clear all documents button

### Upload Area
- Drag & drop interface
- Click to browse
- Progress bar with percentage
- File type validation

## 🔧 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

## 🌐 Deployment

See `DEPLOYMENT-GUIDE.md` in the root directory for deployment instructions.

### Build Configuration

**Vite Config** (`vite.config.ts`):
- React plugin enabled
- TypeScript support
- Hot Module Replacement (HMR)

**Environment Variables**:
- `VITE_API_URL` - Backend API URL (production only)

## 🎨 Styling

### Theme
- **Background**: `#0a0a0a` (Dark)
- **Text**: `#ffffff` (White)
- **Borders**: `#1a1a1a`, `#2a2a2a` (Dark grays)
- **Accent**: `#8b5cf6` (Purple)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)

### Components
- Cards with hover effects
- Gradient tags for categories
- Smooth transitions
- Loading animations
- Responsive grid layouts

## 📱 Responsive Design

- **Desktop**: Full sidebar + main content
- **Tablet**: Collapsible sidebar
- **Mobile**: Stack layout

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Production only |

## 🐛 Troubleshooting

**Can't connect to backend**
- Check backend is running on port 3001
- Verify CORS is configured correctly
- Check `VITE_API_URL` in production

**Files won't upload**
- Check file size limits
- Verify supported file types
- Check Cloudinary configuration in backend

**Search not working**
- Ensure documents are indexed
- Check backend API is responding
- Verify Gemini API is configured

**Blank screen after build**
- Check console for errors
- Verify all environment variables
- Test with `npm run preview`

## 📄 License

MIT
