# ✅ Setup Checklist

Use this checklist to ensure everything is configured correctly.

## 📋 Pre-Setup

- [ ] Bun installed (v1.2+)
  ```bash
  bun --version
  ```

- [ ] Git installed (optional)
  ```bash
  git --version
  ```

- [ ] Text editor ready (VS Code, Cursor, etc.)

## 🔑 API Setup

- [ ] Created Google AI Studio account
- [ ] Generated Gemini API key
- [ ] Copied API key to clipboard
- [ ] Created `packages/backend/.env` file
- [ ] Added `GEMINI_API_KEY=your_key` to .env
- [ ] Added `DOCUMENTS_PATH=../../documents` to .env

## 📦 Installation

- [ ] Cloned/downloaded project
- [ ] Opened terminal in project root
- [ ] Ran `bun install`
- [ ] No error messages during install
- [ ] All dependencies installed successfully

## 📁 Documents

- [ ] `documents/` folder exists
- [ ] Sample documents present:
  - [ ] sales-deck.md
  - [ ] sample-campaign.md
  - [ ] brand-guidelines.md
  - [ ] product-roadmap.txt
  - [ ] email-templates.html
  - [ ] social-media-strategy.json

- [ ] (Optional) Added your own documents

## 🚀 Backend

- [ ] Opened terminal in project root
- [ ] Ran `bun run dev:backend`
- [ ] Saw message: "🚀 Backend running at http://localhost:3001"
- [ ] No error messages
- [ ] Tested health endpoint:
  ```bash
  curl http://localhost:3001/api/health
  ```
- [ ] Got response with `"status":"running"`

## 🎨 Frontend

- [ ] Opened second terminal
- [ ] Ran `bun run dev:frontend`
- [ ] Saw message: "Local: http://localhost:5173"
- [ ] No error messages
- [ ] Browser opened automatically (or manually open)
- [ ] Page loads without errors

## 🔍 First Search

- [ ] Frontend shows "✅ Connected"
- [ ] Clicked "🚀 Index Documents" button
- [ ] Saw indexing progress in backend terminal
- [ ] Got success message
- [ ] Stats show "6 documents" (or your count)
- [ ] Tried search: "sales presentation"
- [ ] Got search results
- [ ] Results show:
  - [ ] Document filename
  - [ ] Preview text
  - [ ] Category tag
  - [ ] Team tag
  - [ ] Modified date

## 🧪 Feature Testing

- [ ] Semantic search works:
  - [ ] "sales pitch" finds sales-deck.md
  - [ ] "Q4 plans" finds sample-campaign.md
  - [ ] "brand colors" finds brand-guidelines.md

- [ ] UI features work:
  - [ ] Search input accepts text
  - [ ] Search button triggers search
  - [ ] Results display properly
  - [ ] Tags are colored correctly
  - [ ] Re-index button (🔄) works

- [ ] Stats display:
  - [ ] Document count correct
  - [ ] Categories listed
  - [ ] Teams listed

## 📄 File Format Testing

- [ ] Text files (.txt) index correctly
- [ ] Markdown files (.md) index correctly
- [ ] HTML files (.html) index correctly
- [ ] JSON files (.json) index correctly
- [ ] (Optional) PDF files (.pdf) index correctly
- [ ] (Optional) Word files (.docx) index correctly

## 🐛 Troubleshooting

If something doesn't work:

### Backend Issues
- [ ] Check .env file exists and has API key
- [ ] Verify API key is valid (no extra spaces)
- [ ] Check port 3001 is not in use
- [ ] Look at backend terminal for errors

### Frontend Issues
- [ ] Check backend is running first
- [ ] Verify port 5173 is not in use
- [ ] Check browser console for errors
- [ ] Try hard refresh (Ctrl+Shift+R)

### Search Issues
- [ ] Documents are indexed (click Index button)
- [ ] Backend shows indexed count > 0
- [ ] API key has proper permissions
- [ ] Check backend logs for Gemini API errors

### Indexing Issues
- [ ] Documents folder exists
- [ ] Files are in supported formats
- [ ] Files are not empty
- [ ] No permission issues reading files

## 🎉 Success Criteria

You're all set when:

- ✅ Backend running without errors
- ✅ Frontend loads and connects
- ✅ Documents indexed successfully
- ✅ Search returns relevant results
- ✅ All file formats work
- ✅ UI is responsive and functional

## 📚 Next Steps

Once everything works:

1. **Add Your Documents**
   - Copy your files to `documents/`
   - Click 🔄 to re-index
   - Start searching!

2. **Customize**
   - Read [EXTENDING.md](EXTENDING.md)
   - Add new file formats
   - Enhance AI features
   - Add authentication

3. **Deploy** (Optional)
   - Backend → Railway/Render
   - Frontend → Vercel/Netlify
   - See [EXTENDING.md](EXTENDING.md) for details

## 💡 Pro Tips

- Keep backend terminal open to see indexing progress
- Re-index after adding new documents
- Use natural language for better search results
- Check backend logs if something seems wrong
- Read [FEATURES.md](FEATURES.md) for all capabilities

## 🆘 Need Help?

- 📖 Read [SETUP.md](SETUP.md) for detailed guide
- 🚀 Check [QUICKSTART.md](QUICKSTART.md) for quick start
- 🧪 See [TESTING.md](TESTING.md) for testing guide
- 💬 Open an issue on GitHub

---

**Happy Searching! 🔍**
