# ⚡ Quick Start Guide

Get your AI-powered search running in 10 minutes!

## Step 1: Get Your Gemini API Key (2 min)

1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

## Step 2: Set Up Supabase (3 min)

1. Go to https://supabase.com and create account
2. Create new project (wait 2-3 min)
3. Go to Settings → API, copy:
   - Project URL
   - anon public key
4. In SQL Editor, run the setup script from [SUPABASE-SETUP.md](SUPABASE-SETUP.md)

## Step 3: Configure (30 sec)

Open `packages/backend/.env` and add:

```
GEMINI_API_KEY=paste_your_gemini_key
DOCUMENTS_PATH=../../documents
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=paste_your_anon_key
```

## Step 4: Run (30 sec)

```bash
bun run dev
```

This starts both backend (port 3001) and frontend (port 5173).

## Step 5: Index & Search (1 min)

1. Open http://localhost:5173
2. Click "🚀 Index Documents" button
3. Wait ~30 seconds for AI to process sample docs
4. Try searching:
   - "sales presentation"
   - "marketing campaign"
   - "brand colors"
   - "Q4 strategy"

## 🎉 That's It!

Your AI search is now running. The system will:
- ✅ Find documents by meaning (not just keywords)
- ✅ Auto-categorize by topic, team, and project
- ✅ Show relevant previews and metadata

## 📂 Add Your Own Documents

1. Drop files into the `documents/` folder
2. Click the 🔄 button to re-index
3. Start searching your content!

## 💡 Pro Tips

- Search works best with natural language queries
- The AI understands context and synonyms
- More documents = better categorization
- Re-index after adding new files

## Need Help?

Check `SETUP.md` for detailed documentation.
