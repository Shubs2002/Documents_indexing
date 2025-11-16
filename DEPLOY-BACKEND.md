# 🚀 Deploy Backend to Railway (Using Bun)

## Step-by-Step Guide

### 1. Go to Railway
Open your browser and go to: **https://railway.app**

### 2. Sign Up / Login
- Click "Login" or "Start a New Project"
- Sign in with your **GitHub account**
- Authorize Railway to access your repositories

### 3. Create New Project
- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Choose: **`Shubs2002/Documents_indexing`**
- Railway will automatically detect your configuration

### 4. Configure Build Settings (if needed)
Railway should auto-detect Bun from `nixpacks.toml`, but verify:
- **Root Directory**: Leave empty (uses project root)
- **Build Command**: `cd packages/backend && bun install --production`
- **Start Command**: `cd packages/backend && bun run src/index.ts`

### 5. Add Environment Variables
Click on your service → **Variables** tab → Add these:

```
GEMINI_API_KEY=your_gemini_api_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
DOCUMENTS_PATH=./documents
PORT=3001
```

**Where to find these:**
- **Gemini API Key**: https://makersuite.google.com/app/apikey
- **Cloudinary**: https://cloudinary.com/console (Dashboard)
- **Supabase**: https://supabase.com/dashboard (Project Settings → API)

### 6. Deploy
- Click **"Deploy"**
- Wait for build to complete (2-3 minutes)
- Railway will show you the deployment logs

### 7. Get Your Backend URL
- Once deployed, go to **Settings** tab
- Click **"Generate Domain"** under **Networking**
- Copy your URL (e.g., `https://your-app.up.railway.app`)

### 8. Test Your Backend
Open your Railway URL in browser:
```
https://your-app.up.railway.app/api/health
```

You should see:
```json
{
  "status": "running",
  "timestamp": "2024-...",
  "documentsIndexed": 0
}
```

## ✅ Success!

Your backend is now live! Copy your Railway URL - you'll need it for the frontend deployment.

**Your Backend URL**: `https://your-app.up.railway.app`

---

## 🔧 Troubleshooting

### Build Fails
- Check Railway logs for errors
- Verify all environment variables are set
- Make sure Bun is detected (check build logs)

### Database Connection Error
- Verify Supabase URL and key are correct
- Check if Supabase project is active
- Ensure pgvector extension is enabled

### Cloudinary Upload Fails
- Verify Cloudinary credentials
- Check cloud name, API key, and secret
- Test credentials in Cloudinary dashboard

### Port Issues
- Railway automatically assigns PORT
- Don't hardcode port 3001 in production
- Use `process.env.PORT || 3001`

---

## 📊 Monitor Your Deployment

- **Logs**: Railway Dashboard → Your Service → Logs
- **Metrics**: Railway Dashboard → Your Service → Metrics
- **Usage**: Railway Dashboard → Usage

---

## 🔄 Auto-Deploy

Railway is now connected to your GitHub repo. Every time you push to `main`:
1. Railway detects the change
2. Automatically rebuilds
3. Deploys new version

No manual deployment needed! 🎉

---

## 💰 Free Tier

Railway gives you **$5 credit per month** which is enough for:
- ~500 hours of runtime
- Small to medium traffic apps
- Development and testing

Monitor your usage in the Railway dashboard.

---

## Next Step: Deploy Frontend

Once backend is live, update `frontend/.env.production` with your Railway URL and deploy to Vercel!
