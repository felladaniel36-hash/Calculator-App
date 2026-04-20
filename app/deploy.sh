#!/bin/bash
# CalcFlow - Quick Deployment Script
# This script helps you prepare CalcFlow for GitHub and Vercel deployment

echo "🚀 CalcFlow - Vercel Deployment Setup"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "⚠️  Git remote 'origin' not set"
    echo "📝 Please set it manually with:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/calcflow-calculator.git"
    echo ""
else
    echo "✅ Git remote already configured"
fi

# Add all files
echo ""
echo "📝 Adding files to git..."
git add .

# Check if there are changes
if git diff --cached --quiet; then
    echo "✅ All files already committed"
else
    echo "✅ Files ready for commit"
    echo ""
    echo "💡 Next step: Commit and push"
    echo "   git commit -m 'Initial commit: CalcFlow Calculator by Huncho.Dev'"
    echo "   git push -u origin main"
fi

echo ""
echo "======================================"
echo "📋 Deployment Checklist:"
echo "======================================"
echo ""
echo "✅ 1. Verify build works locally:"
echo "      npm run build"
echo ""
echo "✅ 2. Commit and push to GitHub:"
echo "      git add ."
echo "      git commit -m 'Initial commit: CalcFlow Calculator'"
echo "      git push -u origin main"
echo ""
echo "✅ 3. Go to vercel.com and import GitHub project"
echo ""
echo "✅ 4. Vercel will auto-detect settings and deploy"
echo ""
echo "✅ 5. Monitor deployment in Vercel Dashboard"
echo ""
echo "📚 For detailed instructions, see: DEPLOYMENT.md"
echo ""
echo "🎉 Ready for launch!"
