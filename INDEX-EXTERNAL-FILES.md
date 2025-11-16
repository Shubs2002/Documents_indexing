# Index External Files - No Copy Required

## Overview
The system now supports indexing files from their **original locations** without copying them into the project. This means you can index documents from anywhere on your computer while keeping them in their current folders.

## How It Works

### 1. Files Stay in Place
- Documents are **not copied** to the project
- Only the **file path** is stored in the database
- The system reads and indexes content from the original location
- All metadata (category, team, tags) is generated and stored

### 2. Index External Files

#### Via UI (Recommended)
1. Click the **folder icon** (📁) in the sidebar header
2. Enter the full path to a file or folder:
   - **Windows**: `C:\Users\YourName\Documents\Marketing`
   - **Mac/Linux**: `/home/username/documents/marketing`
3. Click "Index Path"
4. The system will:
   - Scan the path (recursively if it's a folder)
   - Extract text from supported formats
   - Generate AI embeddings and categories
   - Store metadata with original file paths

#### Via API
```bash
# Index a single file
curl -X POST http://localhost:3001/api/index-path \
  -H "Content-Type: application/json" \
  -d '{"path": "C:\\Users\\Documents\\report.pdf"}'

# Index an entire folder
curl -X POST http://localhost:3001/api/index-path \
  -H "Content-Type: application/json" \
  -d '{"path": "/home/user/marketing-docs"}'
```

### 3. Supported File Types
- **PDF** (.pdf)
- **Word Documents** (.docx)
- **Text Files** (.txt)
- **Markdown** (.md)
- **HTML** (.html)
- **JSON** (.json)

## Benefits

### ✅ No Duplication
- Files remain in their original location
- No wasted disk space
- Single source of truth

### ✅ Flexible Organization
- Index files from multiple locations
- Keep your existing folder structure
- No need to reorganize files

### ✅ Real-Time Access
- System reads from original files
- Always accesses the latest version
- No sync issues

### ✅ Privacy & Security
- Files never leave their location
- You control file permissions
- No copies to manage

## Use Cases

### 1. Team Shared Drives
Index documents from network drives without copying:
```
\\server\marketing\campaigns
\\server\sales\proposals
```

### 2. Multiple Project Folders
Index files across different projects:
```
C:\Projects\ProjectA\docs
C:\Projects\ProjectB\docs
D:\Archive\OldProjects
```

### 3. Personal Documents
Index your personal files without moving them:
```
C:\Users\YourName\Documents
C:\Users\YourName\Downloads
```

## Important Notes

### File Access
- The backend must have **read access** to the file paths
- Network drives must be mounted/accessible
- Relative paths are not supported (use absolute paths)

### Path Format
- **Windows**: Use backslashes `C:\Users\...` or forward slashes `C:/Users/...`
- **Mac/Linux**: Use forward slashes `/home/user/...`
- Paths are case-sensitive on Mac/Linux

### Re-indexing
- If files are moved, you'll need to re-index from the new location
- Deleted files will still appear in search until database is cleared
- Use the refresh button to update the document list

## API Endpoints

### Index External Path
```
POST /api/index-path
Content-Type: application/json

{
  "path": "/absolute/path/to/file/or/folder"
}

Response:
{
  "success": true,
  "message": "Indexed 15 documents from directory",
  "count": 15
}
```

### Original Index Endpoint (Still Works)
```
POST /api/index
```
Indexes files from the default `documents/` folder in the project.

## Troubleshooting

### "Path not found or not accessible"
- Verify the path exists
- Check file/folder permissions
- Ensure the backend has read access
- Try using absolute paths

### Files Not Appearing
- Check if file format is supported
- Verify files contain readable text
- Look at backend console for indexing logs

### Search Not Finding Files
- Wait for indexing to complete (check console)
- Ensure similarity threshold is appropriate
- Try different search terms

## Example Workflow

1. **Index your marketing folder**:
   - Click folder icon in sidebar
   - Enter: `C:\Users\Marketing\Campaigns`
   - Click "Index Path"

2. **Index additional locations**:
   - Repeat for other folders
   - Each path is indexed separately

3. **Search across all indexed files**:
   - Use the search bar
   - Results show files from all indexed locations
   - Click info icon (ℹ️) to see original file path

4. **View file details**:
   - Click any document to preview
   - See original location in info modal
   - Files are read from their original path

## Technical Details

### Database Storage
```sql
documents (
  id: string (base64 encoded path)
  filename: string (display name)
  path: string (absolute original path)
  content: string (preview text)
  embedding: vector (AI semantic embedding)
  category: string (AI-generated)
  team: string (AI-generated)
  project: string (AI-generated)
  tags: string[] (AI-generated)
  size: number (bytes)
  modified_at: timestamp
)
```

### File Reading
- Files are read on-demand during indexing
- Content is extracted based on file type
- Only a preview (first 1000 chars) is stored
- Full content is used for AI embedding generation

### Security
- No file uploads to server (for external indexing)
- Files remain under your control
- Only metadata is stored in database
- Original files are never modified
