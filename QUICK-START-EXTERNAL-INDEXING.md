# Quick Start: Index Files from Anywhere

## 🎯 What's New?
You can now **index files from their original locations** without copying them into the project!

## 🚀 Quick Start

### Step 1: Start the Backend
```bash
cd packages/backend
bun run dev
```

### Step 2: Start the Frontend
```bash
cd frontend
npm run dev
```

### Step 3: Index External Files

#### Option A: Using the UI (Easiest)
1. Open http://localhost:5173
2. Look at the sidebar header
3. Click the **📁 folder icon** (between refresh and upload buttons)
4. Enter the full path to your files:
   - Windows: `C:\Users\YourName\Documents\Marketing`
   - Mac/Linux: `/home/username/documents/marketing`
5. Click "Index Path"
6. Wait for indexing to complete (check snackbar notification)

#### Option B: Using the Test Script
```bash
# Windows example
node test-external-index.js "C:\Users\YourName\Documents"

# Mac/Linux example
node test-external-index.js "/home/username/documents"
```

#### Option C: Using curl
```bash
# Windows (PowerShell)
curl -X POST http://localhost:3001/api/index-path `
  -H "Content-Type: application/json" `
  -d '{\"path\": \"C:\\Users\\Documents\"}'

# Mac/Linux
curl -X POST http://localhost:3001/api/index-path \
  -H "Content-Type: application/json" \
  -d '{"path": "/home/user/documents"}'
```

## 📁 What Gets Indexed?

### Supported File Types
- ✅ PDF (.pdf)
- ✅ Word Documents (.docx)
- ✅ Text Files (.txt)
- ✅ Markdown (.md)
- ✅ HTML (.html)
- ✅ JSON (.json)

### What Happens During Indexing
1. **Scans** the path (recursively for folders)
2. **Extracts** text content from each file
3. **Generates** AI embeddings for semantic search
4. **Categorizes** documents automatically (category, team, project)
5. **Stores** metadata with original file path (no copying!)

## 🔍 Search Your Files

### Live Search (As You Type)
- Type in the search bar
- See instant suggestions (top 5 results)
- Click any result to preview

### Full Search (Press Enter)
- Press Enter after typing
- See all matching results
- Results show colorful keyword highlighting

### Browse by Organization
- **Documents**: All indexed files
- **Categories**: AI-generated topics
- **Teams**: AI-detected team names

## 💡 Example Use Cases

### 1. Index Your Work Documents
```
C:\Users\YourName\Documents\Work
C:\Users\YourName\Documents\Projects
```

### 2. Index Team Shared Drives
```
\\server\marketing\campaigns
\\server\sales\proposals
```

### 3. Index Multiple Locations
You can index as many paths as you want:
- Personal documents
- Work files
- Archived projects
- Downloads folder
- Network drives

## 🎨 UI Features

### Sidebar
- **Refresh button** (🔄): Reload document list
- **Folder button** (📁): Index external path (NEW!)
- **Upload button** (☁️): Index default documents folder

### Search Bar
- Type to see live suggestions
- Press Enter for full results
- Click X to clear search

### Document Preview
- Click any document to view
- See AI-generated categories and tags
- Click info icon (ℹ️) to see original file path

### Info Modal
Shows:
- Filename
- **Original Location** (full path)
- Category, Team, Project
- File size
- Last modified date

## 🔧 Technical Details

### File Storage
- Files **stay in their original location**
- Only metadata is stored in database
- System reads files on-demand during indexing

### Database Schema
```
documents:
  - id: unique identifier
  - filename: display name
  - path: absolute original path ← NEW!
  - content: preview text
  - embedding: AI vector
  - category, team, project: AI-generated
  - tags: AI-generated keywords
  - size, modified_at: file metadata
```

### API Endpoints

#### New: Index External Path
```
POST /api/index-path
Body: { "path": "/absolute/path" }
```

#### Existing: Index Default Folder
```
POST /api/index
```

#### Search
```
GET /api/search?q=query
```

## ⚠️ Important Notes

### Path Requirements
- Must be **absolute paths** (not relative)
- Backend must have **read access** to the path
- Network drives must be mounted/accessible

### Path Format
- **Windows**: `C:\Users\...` or `C:/Users/...`
- **Mac/Linux**: `/home/user/...`
- Paths are case-sensitive on Mac/Linux

### File Access
- Files are read during indexing only
- If files are moved, re-index from new location
- Deleted files remain in search until database is cleared

## 🐛 Troubleshooting

### "Path not found or not accessible"
- ✅ Check if path exists
- ✅ Verify you have read permissions
- ✅ Use absolute paths (not relative)
- ✅ Check path format for your OS

### Files Not Showing Up
- ✅ Wait for indexing to complete (check console)
- ✅ Verify file format is supported
- ✅ Check backend logs for errors
- ✅ Click refresh button in sidebar

### Search Not Working
- ✅ Ensure files are indexed (check sidebar count)
- ✅ Try different search terms
- ✅ Check similarity threshold (40% by default)

## 📚 More Information

See [INDEX-EXTERNAL-FILES.md](./INDEX-EXTERNAL-FILES.md) for detailed documentation.

## 🎉 Benefits

### No File Duplication
- Files stay where they are
- No wasted disk space
- Single source of truth

### Flexible Organization
- Index from multiple locations
- Keep your existing folder structure
- No need to reorganize

### Privacy & Security
- Files never leave their location
- You control permissions
- No copies to manage

### Powerful Search
- Semantic AI search (finds by meaning)
- Auto-categorization
- Instant results
- Beautiful UI

---

**Ready to try it?** Start the servers and click the folder icon! 📁
