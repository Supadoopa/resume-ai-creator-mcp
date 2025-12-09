#!/bin/bash
# Quick deployment script for Resume AI Creator
# Usage: ./scripts/deploy.sh [vercel|cloudflare]

set -e

DEPLOY_TARGET=${1:-vercel}

echo "🚀 Deploying Resume AI Creator to $DEPLOY_TARGET..."

if [ "$DEPLOY_TARGET" = "vercel" ]; then
  echo "📦 Checking Vercel CLI..."
  if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    pnpm add -g vercel || npm install -g vercel
  fi

  echo "🔐 Checking authentication..."
  if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    vercel login
  fi

  echo "🔗 Linking project..."
  vercel link

  echo "📝 Make sure to set environment variables in Vercel Dashboard:"
  echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
  echo "   - CLERK_SECRET_KEY"
  echo "   - POSTGRES_URL"
  echo "   - OPENROUTER_API_KEY"
  echo "   - PAT_TOKEN (optional)"
  echo ""
  read -p "Press Enter to continue with deployment..."

  echo "🚀 Deploying to production..."
  vercel --prod

elif [ "$DEPLOY_TARGET" = "cloudflare" ]; then
  echo "📦 Checking Wrangler CLI..."
  if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    pnpm add -g wrangler || npm install -g wrangler
  fi

  echo "🔐 Checking authentication..."
  if ! wrangler whoami &> /dev/null; then
    echo "Please login to Cloudflare:"
    wrangler login
  fi

  echo "🏗️  Building for Cloudflare..."
  pnpm run workers:build

  echo "📝 Make sure to set environment variables using:"
  echo "   wrangler secret put POSTGRES_URL"
  echo "   wrangler secret put CLERK_SECRET_KEY"
  echo "   wrangler secret put OPENROUTER_API_KEY"
  echo ""
  read -p "Press Enter to continue with deployment..."

  echo "🚀 Deploying to Cloudflare..."
  pnpm run deploy

else
  echo "❌ Unknown deployment target: $DEPLOY_TARGET"
  echo "Usage: ./scripts/deploy.sh [vercel|cloudflare]"
  exit 1
fi

echo "✅ Deployment complete!"
echo "📖 See DEPLOYMENT.md for post-deployment steps."

