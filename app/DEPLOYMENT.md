# CalcFlow - Deployment Guide

## Deployment to Vercel via GitHub

This guide covers deploying CalcFlow to Vercel through GitHub.

### Prerequisites

- GitHub account
- Vercel account
- Repository pushed to GitHub

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CalcFlow Calculator by Huncho.Dev"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/calcflow-calculator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in or create an account
3. Click "Add New..." → "Project"
4. Click "Import Git Repository"
5. Paste your GitHub repository URL
6. Click "Import"
7. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm ci`
8. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Confirm build settings
# - Deploy
```

### Step 3: Configure GitHub Integration

1. Go to your Vercel project settings
2. Navigate to "Deployments" → "Git"
3. Configure:
   - **Production Branch**: `main`
   - **Preview Branches**: `develop`
   - **Ignored Build Step**: (leave empty or configure as needed)

### Automatic Deployments

After connecting GitHub:

- **Main branch** → Production deployment (https://calcflow-calculator.vercel.app)
- **Pull requests** → Preview deployments with unique URLs
- **Other branches** → Preview deployments (if enabled)

### Environment Variables

Set in Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_APP_TITLE=CalcFlow - Calculator by Huncho.Dev
```

Or leave defaults and they'll use values from `.env.example`

### CI/CD Pipeline

The project includes GitHub Actions workflow (`.github/workflows/build.yml`) that:

- Runs on push to `main` and `develop` branches
- Runs on all pull requests
- Tests with Node.js 18.x and 20.x
- Runs linter and build checks
- Uploads build artifacts

### Monitoring & Analytics

Access from Vercel Dashboard:

- **Analytics**: Real-time performance metrics
- **Logs**: Build and runtime logs
- **Deployments**: Deployment history and status

### Rollback

To rollback to a previous deployment:

1. Go to Vercel Dashboard
2. Navigate to "Deployments"
3. Find the desired deployment
4. Click the three-dot menu
5. Click "Promote to Production"

### Custom Domain Setup

1. Go to Vercel Project Settings → "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `calcflow.huncho.dev`)
4. Follow DNS configuration instructions
5. Verify domain

### Troubleshooting

#### Build Fails

Check Vercel build logs for errors. Common issues:

- Missing dependencies: Run `npm ci` locally
- TypeScript errors: Run `npm run type-check` locally
- Environment variables: Verify all required vars are set in Vercel

#### Slow Performance

- Review Vercel Analytics for bottlenecks
- Check bundle size in build logs
- Optimize large assets
- Ensure caching headers are set (configured in `vercel.json`)

### Performance Optimization

Current optimizations in place:

- Code splitting for Framer Motion and Lucide React
- CSS minification
- JavaScript minification with Terser
- Asset caching headers (1 year for immutable assets)
- Security headers configured

### Documentation

For more information:

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)

---

**Built by Huncho.Dev** - https://huncho.dev
