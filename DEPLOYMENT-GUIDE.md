# 🚀 Free Deployment Guide

This guide will help you deploy your AI-powered Knowledge Search application for free using modern hosting platforms.

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ Cloudinary account with credentials
- ✅ Supabase project with database setup
- ✅ Google Gemini API key
- ✅ Git repository (GitHub, GitLab, or Bitbucket)

## 🎯 Recommended Free Hosting Stack

### Frontend: **Vercel** (Recommended) or Netlify
### Backend: **Railway** (Recommended) or Render

---

## 🎨 Frontend Deployment (Vercel)

### Why Vercel?
- ✅ Free tier with unlimited bandwidth
- ✅ Automatic deployments from Git
- ✅ Global CDN
- ✅ Custom domains
- ✅ Perfect for React/Vite apps

### Step 1: Prepare Frontend for Deployment

1. **Update API URL in frontend**

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.railway.app
```

2. **Update API calls to use environment variable**

In `frontend/src/App.tsx`, replace all `/api/` calls with:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Example:
const res = await fetch(`${API_URL}/api/health`)
```

3. **Build test locally**
```bash
cd frontend
npm run build
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? marketing-search-frontend
# - Directory? ./
# - Override settings? No
```

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add `VITE_API_URL`
6. Click "Deploy"

### Step 3: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_URL = https://your-backend-url.railway.app
```

---

## ⚙️ Backend Deployment (Railway)

### Why Railway?
- ✅ $5 free credit per month (enough for small apps)
- ✅ Automatic deployments from Git
- ✅ Built-in PostgreSQL (if needed)
- ✅ Easy environment variables
- ✅ Supports Bun runtime

### Step 1: Prepare Backend for Deployment

1. **Create `railway.json` in project root**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd packages/backend && bun install"
  },
  "deploy": {
    "startCommand": "cd packages/backend && bun run src/index.ts",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. **Update CORS in `packages/backend/src/index.ts`**
```typescript
.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.vercel.app'
  ]
}))
```

### Step 2: Deploy to Railway

**Option A: Using Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to project
railway link

# Deploy
railway up
```

**Option B: Using Railway Dashboard**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will auto-detect and deploy

### Step 3: Add Environment Variables
In Railway Dashboard → Variables:
```
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
DOCUMENTS_PATH=./documents
PORT=3001
```

### Step 4: Get Your Backend URL
- Railway will provide a URL like: `https://your-app.railway.app`
- Copy this URL and update your frontend's `VITE_API_URL`

---

## 🔄 Alternative: Render (Backend)

### Why Render?
- ✅ 750 hours/month free (enough for 1 service)
- ✅ Automatic deployments
- ✅ Easy to use
- ⚠️ Spins down after 15 min of inactivity (cold starts)

### Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: marketing-search-backend
   - **Runtime**: Node
   - **Build Command**: `cd packages/backend && npm install`
   - **Start Command**: `cd packages/backend && bun run src/index.ts`
   - **Instance Type**: Free
6. Add Environment Variables (same as Railway)
7. Click "Create Web Service"

---

## 🌐 Alternative: Netlify (Frontend)

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your repository
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
6. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
7. Click "Deploy site"

---

## 📦 Complete Deployment Checklist

### Before Deployment
- [ ] Push code to GitHub/GitLab
- [ ] Set up Cloudinary account
- [ ] Set up Supabase database
- [ ] Get Gemini API key
- [ ] Test locally with production build

### Backend Deployment
- [ ] Deploy to Railway/Render
- [ ] Add all environment variables
- [ ] Test backend URL (visit `/api/health`)
- [ ] Copy backend URL

### Frontend Deployment
- [ ] Update `VITE_API_URL` with backend URL
- [ ] Deploy to Vercel/Netlify
- [ ] Test frontend URL
- [ ] Copy frontend URL

### Final Steps
- [ ] Update backend CORS with frontend URL
- [ ] Redeploy backend
- [ ] Test full application
- [ ] Upload test documents
- [ ] Test search functionality

---

## 🎯 Recommended Setup (Best Free Tier)

```
Frontend: Vercel
Backend: Railway
Database: Supabase (already set up)
Storage: Cloudinary (already set up)
AI: Google Gemini (already set up)
```

**Total Cost: $0/month** (within free tier limits)

---

## 🔧 Troubleshooting

### Backend not responding
- Check Railway/Render logs
- Verify environment variables are set
- Check if service is running

### CORS errors
- Update CORS origin in backend
- Redeploy backend
- Clear browser cache

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check backend is running
- Test backend URL directly

### Database connection issues
- Verify Supabase credentials
- Check Supabase project is active
- Test connection from Railway/Render logs

---

## 📊 Free Tier Limits

### Vercel
- Unlimited bandwidth
- 100 GB-hours compute
- 6,000 build minutes/month

### Railway
- $5 credit/month (~500 hours)
- Enough for small apps

### Render
- 750 hours/month (1 service)
- Spins down after 15 min inactivity

### Supabase
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth

### Cloudinary
- 25 GB storage
- 25 GB bandwidth/month

---

## 🚀 Quick Deploy Commands

```bash
# 1. Deploy Backend to Railway
cd packages/backend
railway login
railway init
railway up

# 2. Get backend URL and update frontend
echo "VITE_API_URL=https://your-backend.railway.app" > frontend/.env.production

# 3. Deploy Frontend to Vercel
cd frontend
vercel login
vercel --prod

# Done! 🎉
```

---

## 📝 Post-Deployment

### Custom Domain (Optional)
- **Vercel**: Settings → Domains → Add domain
- **Railway**: Settings → Networking → Custom domain

### Monitoring
- **Vercel**: Analytics tab
- **Railway**: Metrics tab
- **Supabase**: Dashboard → Database

### Updates
- Push to GitHub → Auto-deploys on both platforms
- Or use CLI: `vercel --prod` / `railway up`

---

## 💡 Tips for Production

1. **Enable HTTPS** (automatic on Vercel/Railway)
2. **Set up error tracking** (Sentry free tier)
3. **Monitor usage** (stay within free tiers)
4. **Backup database** (Supabase has automatic backups)
5. **Use environment variables** (never commit secrets)

---

## 🎉 You're Live!

Your app is now deployed and accessible worldwide for free!

**Frontend**: `https://your-app.vercel.app`
**Backend**: `https://your-app.railway.app`

Share your app and enjoy! 🚀
