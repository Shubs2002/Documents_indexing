# 📁 How to Add Your Documents

## Quick Method (Drag & Drop)

1. **Open the `documents/` folder** in your project
   ```
   marketing-search/
   └── documents/  ← Open this folder
   ```

2. **Drag your files into it**
   - PDFs
   - Word documents (.docx)
   - Text files (.txt)
   - Markdown files (.md)
   - HTML files (.html)
   - JSON files (.json)

3. **Re-index in the UI**
   - Open http://localhost:5173
   - Click the 🔄 button (top right)
   - Wait for indexing to complete

## Supported File Types

✅ **Currently Supported:**
- `.txt` - Plain text files
- `.md` - Markdown documents
- `.html` - HTML files
- `.json` - JSON data
- `.pdf` - PDF documents
- `.docx` - Microsoft Word documents

🔜 **Coming Soon:**
- `.xlsx` - Excel spreadsheets
- `.pptx` - PowerPoint presentations
- `.csv` - CSV files

## Organize Your Documents

You can create subfolders:

```
documents/
├── marketing/
│   ├── campaigns/
│   │   ├── q4-campaign.pdf
│   │   └── email-blast.docx
│   └── brand/
│       └── guidelines.pdf
├── sales/
│   ├── decks/
│   └── proposals/
└── product/
    └── roadmaps/
```

The indexer will scan all subfolders automatically!

## Best Practices

### 1. Use Descriptive Filenames
✅ Good: `Q4-2025-Marketing-Campaign-Plan.pdf`
❌ Bad: `document1.pdf`

### 2. Keep Files Organized
- Group by team, project, or topic
- Use consistent naming conventions

### 3. Remove Duplicates
- The AI will index everything
- Duplicates waste storage and confuse search

### 4. File Size Limits
- Recommended: Under 10MB per file
- Large files take longer to process
- Consider splitting very large documents

## After Adding Documents

### Re-index
```bash
# Option 1: Use the UI
Click the 🔄 button

# Option 2: Use the API
curl -X POST http://localhost:3001/api/index
```

### Verify
```bash
# Check document count
curl http://localhost:3001/api/stats

# Or check in Supabase dashboard:
# Table Editor → documents table
```

## Example: Adding a New Campaign

```bash
# 1. Add your file
cp ~/Downloads/new-campaign.pdf documents/marketing/

# 2. Re-index (in UI or via API)
curl -X POST http://localhost:3001/api/index

# 3. Search for it
# Open UI and search: "new campaign"
```

## Troubleshooting

### "File not indexed"
- Check file format is supported
- Verify file is not corrupted
- Look at backend logs for errors

### "Can't find my document"
- Make sure you re-indexed after adding
- Check the file is in `documents/` folder
- Try searching with different keywords

### "Indexing takes too long"
- Normal: 2-5 seconds per document
- Large PDFs take longer
- Check backend terminal for progress

## Advanced: Bulk Import

```bash
# Copy entire folder
cp -r ~/my-documents/* documents/

# Or on Windows
xcopy /E /I C:\my-documents documents\

# Then re-index
curl -X POST http://localhost:3001/api/index
```

## File Upload Feature (Coming Soon)

We're working on a drag-and-drop upload feature in the UI!

For now, just add files to the `documents/` folder manually.

## Need Help?

- Check [SETUP.md](SETUP.md) for general setup
- See [TESTING.md](TESTING.md) for testing
- Open an issue on GitHub

---

**Happy documenting! 📄**
