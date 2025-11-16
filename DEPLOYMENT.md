# 🚀 Deployment Guide

Deploy your AI-powered search to production.

## Prerequisites

- ✅ Supabase account with project set up
- ✅ Gemini API key
- ✅ Documents indexed and tested locally
- ✅ Git repository (optional but recommended)

## Deployment Options

### Option 1: Railway (Recommended for Backend)

**Why Railway?**
- Easy Bun support
- Free tier available
- Automatic deployments
- Environment variables built-in

**Steps:**

1. **Sign up at railway.app**
2. **Create new project**
3. **Deploy from GitHub:**
   - Connect your repo
   - Select `packages/backend` as root
   - Railway auto-detects Bun

4. **Add environment variables:**
   ```
   GEMINI_API_KEY=your_key
   DOCUMENTS_PATH=/app/documents
   SUPABASE_URL=your_url
   SUPABASE_ANON_KEY=your_key
   ```

5. **Deploy!**
   - Railway builds and deploys automatically
   - Get your backend URL

### Option 2: Render (Alternative Backend)

1. Sign up at render.com
2. New Web Service
3. Connect GitHub repo
4. Settings:
   - **Build Command:** `cd packages/backend && bun install`
   - **Start Command:** `cd packages/backend && bun run src/index.ts`
5. Add environment variables
6. Deploy

### Option 3: Fly.io (Advanced)

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Deploy
cd packages/backend
flyctl launch
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Made for React/Vite
- Free tier
- Automatic HTTPS
- Global CDN

**Steps:**

1. **Sign up at vercel.com**
2. **Import project**
   - Connect GitHub
   - Select your repo
   - Root: `frontend`
3. **Configure:**
   - Framework: Vite
   - Build command: `bun run build`
   - Output: `dist`
4. **Environment variables:**
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
5. **Deploy!**

### Option 2: Netlify

1. Sign up at netlify.com
2. New site from Git
3. Settings:
   - Base: `frontend`
   - Build: `bun run build`
   - Publish: `dist`
4. Deploy

### Option 3: Cloudflare Pages

1. Sign up at cloudflare.com
2. Pages → Create project
3. Connect Git
4. Build settings:
   - Framework: Vite
   - Build: `bun run build`
   - Output: `dist`

## Environment Variables

### Backend (.env)
```env
# Required
GEMINI_API_KEY=your_gemini_key
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key

# Optional
DOCUMENTS_PATH=/app/documents
PORT=3001
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
```

## Update Frontend API URL

Edit `frontend/vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
```

## Post-Deployment

### 1. Test Backend
```bash
curl https://your-backend.com/api/health
```

Should return:
```json
{
  "status": "running",
  "timestamp": "...",
  "documentsIndexed": 6
}
```

### 2. Test Frontend
- Open your frontend URL
- Should show "✅ Connected"
- Try a search

### 3. Index Documents
- Click "Index Documents"
- Or use API:
```bash
curl -X POST https://your-backend.com/api/index
```

## Custom Domain (Optional)

### For Vercel
1. Go to project settings
2. Domains → Add domain
3. Follow DNS instructions

### For Railway
1. Project settings → Domains
2. Add custom domain
3. Update DNS records

## Security Checklist

- [ ] Environment variables set correctly
- [ ] No API keys in code
- [ ] CORS configured properly
- [ ] Supabase RLS enabled (optional)
- [ ] HTTPS enabled (automatic on most platforms)

## Monitoring

### Backend Health
```bash
# Check every 5 minutes
curl https://your-backend.com/api/health
```

### Supabase Dashboard
- Monitor database usage
- Check query performance
- View indexed documents

### Error Tracking (Optional)
- Add Sentry for error tracking
- Add LogRocket for session replay

## Scaling

### Free Tier Limits

**Railway:**
- $5 free credit/month
- ~500 hours runtime

**Vercel:**
- 100 GB bandwidth
- Unlimited requests

**Supabase:**
- 500 MB database
- 1 GB storage
- 2 GB bandwidth

### When to Upgrade

Upgrade when you hit:
- 10,000+ documents
- 100,000+ searches/month
- Multiple concurrent users
- Need 99.9% uptime

## Costs (Estimated)

### Small Team (10 users, 1000 docs)
- Backend: Free (Railway)
- Frontend: Free (Vercel)
- Database: Free (Supabase)
- **Total: $0/month**

### Medium Team (50 users, 5000 docs)
- Backend: $5-10/month
- Frontend: Free
- Database: Free or $25/month
- **Total: $5-35/month**

### Large Team (200+ users, 10000+ docs)
- Backend: $20-50/month
- Frontend: Free or $20/month
- Database: $25/month
- **Total: $45-95/month**

## Backup Strategy

### Supabase Backups
- Free tier: No automatic backups
- Pro tier: Daily backups

### Manual Backup
```bash
# Export documents
curl https://your-backend.com/api/stats > backup.json
```

### Document Files
- Keep original files in Git
- Or use Supabase Storage

## CI/CD (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test
      - name: Deploy to Railway
        run: railway up
```

## Troubleshooting

### "Backend not connecting"
- Check environment variables
- Verify backend URL in frontend
- Check CORS settings

### "Database connection failed"
- Verify Supabase credentials
- Check if project is paused
- Test connection locally first

### "Build failed"
- Check Node/Bun version
- Verify all dependencies installed
- Review build logs

## Production Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Environment variables set
- [ ] Database connected
- [ ] Documents indexed
- [ ] Search working
- [ ] Custom domain (optional)
- [ ] Monitoring set up
- [ ] Backups configured

## Support

- Railway: https://railway.app/help
- Vercel: https://vercel.com/support
- Supabase: https://supabase.com/support

---

**Ready for production! 🎉**
