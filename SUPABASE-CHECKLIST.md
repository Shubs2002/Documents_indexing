# ✅ Supabase Setup Checklist

Quick checklist to ensure Supabase is configured correctly.

## 📋 Account Setup

- [ ] Created Supabase account at https://supabase.com
- [ ] Verified email address
- [ ] Created new project
- [ ] Saved database password (you'll need it later)
- [ ] Project finished initializing (2-3 minutes)

## 🔑 API Keys

- [ ] Opened project dashboard
- [ ] Clicked Settings → API
- [ ] Copied Project URL
- [ ] Copied anon public key (NOT service_role)
- [ ] Added both to `packages/backend/.env`

## 🗄️ Database Setup

- [ ] Opened SQL Editor in Supabase
- [ ] Created new query
- [ ] Pasted the SQL script from SUPABASE-SETUP.md
- [ ] Ran the script (Ctrl+Enter)
- [ ] Saw "Success. No rows returned"
- [ ] Verified `documents` table exists in Table Editor

## 🔧 Local Configuration

- [ ] Updated `packages/backend/.env` with:
  ```env
  GEMINI_API_KEY=your_gemini_key
  DOCUMENTS_PATH=../../documents
  SUPABASE_URL=https://xxxxx.supabase.co
  SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- [ ] No extra spaces in keys
- [ ] No quotes around values
- [ ] File saved

## 🚀 Testing

- [ ] Ran `bun run dev:backend`
- [ ] Saw "✅ Database connected successfully"
- [ ] No error messages
- [ ] Backend running on port 3001

## 📄 Indexing

- [ ] Opened http://localhost:5173
- [ ] Frontend shows "✅ Connected"
- [ ] Clicked "🚀 Index Documents"
- [ ] Saw indexing progress in backend terminal
- [ ] Got success message
- [ ] Stats show document count

## ✅ Verification

- [ ] Opened Supabase dashboard
- [ ] Clicked Table Editor
- [ ] Selected `documents` table
- [ ] See indexed documents with:
  - [ ] id
  - [ ] filename
  - [ ] content
  - [ ] embedding (array of numbers)
  - [ ] category
  - [ ] team
  - [ ] tags

## 🔍 Search Test

- [ ] Searched for "sales"
- [ ] Got results
- [ ] Results show relevant documents
- [ ] Metadata displays correctly

## 🎉 Success Criteria

You're all set when:

- ✅ Backend connects to Supabase
- ✅ Documents indexed successfully
- ✅ Can see documents in Supabase dashboard
- ✅ Search returns relevant results
- ✅ No error messages

## 🐛 Common Issues

### "Database tables not found"
**Fix:** Run the SQL script in Supabase SQL Editor

### "Invalid API key"
**Fix:** 
- Check SUPABASE_URL is correct
- Verify you copied the "anon public" key
- Remove any extra spaces

### "Extension vector not found"
**Fix:** Make sure first line of SQL is:
```sql
create extension if not exists vector;
```

### "No documents in table"
**Fix:**
- Check backend logs for errors
- Verify Gemini API key is set
- Try re-indexing

### "Search returns empty"
**Fix:**
- Verify documents are in Supabase table
- Check embeddings are not null
- Look for errors in backend console

## 📊 Free Tier Limits

Your free tier includes:
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth/month
- ✅ Unlimited API requests

This is enough for:
- ~10,000 documents
- ~100,000 searches/month
- Small to medium teams

## 🎯 Next Steps

Once everything works:

1. **Add Your Documents**
   - Copy files to `documents/` folder
   - Click re-index (🔄)

2. **Customize**
   - Adjust search threshold
   - Add more metadata fields
   - Customize categorization

3. **Deploy** (Optional)
   - Backend → Railway/Render
   - Frontend → Vercel/Netlify
   - Already production-ready!

## 💡 Pro Tips

- Keep Supabase dashboard open to monitor
- Check Table Editor to see indexed docs
- Use SQL Editor for custom queries
- Enable RLS for production security

## 🆘 Still Having Issues?

1. Check [SUPABASE-SETUP.md](SUPABASE-SETUP.md) for detailed guide
2. Review [MIGRATION-TO-SUPABASE.md](MIGRATION-TO-SUPABASE.md)
3. Read [SETUP.md](SETUP.md) for general setup
4. Open an issue on GitHub

---

**Happy searching with Supabase! 🚀**
