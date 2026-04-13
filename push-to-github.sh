#!/bin/bash
# Script to push frontend code to GitHub repository once created
# Run this after GitHub repository is created

set -e

echo "🚀 Frontend Code Push Script"
echo "This script pushes the AI Content Optimizer project to GitHub"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ ERROR: Not in project root directory"
    exit 1
fi

# Check for git
if ! command -v git &> /dev/null; then
    echo "❌ ERROR: git not found"
    exit 1
fi

echo "📋 Current git status:"
git status --short

echo ""
echo "📦 Project verification:"
echo "- Build check:"
npm run build 2>&1 | tail -5
echo ""
echo "- Test check:"
npm test 2>&1 | tail -5

echo ""
echo "🚀 READY TO PUSH"
echo ""
echo "When GitHub repository is created at: https://github.com/[username]/ai-content-optimizer.git"
echo ""
echo "Run these commands:"
echo "1. Add remote: git remote add origin https://github.com/[username]/ai-content-optimizer.git"
echo "2. Push code: git push -u origin main"
echo "3. Verify: git remote -v"
echo ""
echo "Or run this script with repository URL:"
echo "  ./push-to-github.sh https://github.com/[username]/ai-content-optimizer.git"
echo ""

# If URL provided as argument, set it up
if [ -n "$1" ]; then
    echo "🔗 Setting up remote with provided URL: $1"
    git remote add origin "$1" 2>/dev/null || git remote set-url origin "$1"
    echo "✅ Remote set to: $1"
    
    echo ""
    echo "📤 Pushing code to remote..."
    git push -u origin main
    echo "✅ Code pushed successfully!"
    
    echo ""
    echo "🔍 Verification:"
    git remote -v
    git log --oneline -3
fi