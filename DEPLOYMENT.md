# Deployment Guide

This guide covers deploying the Resume AI Creator app to production. The app supports deployment to **Vercel** (recommended) or **Cloudflare Workers**.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Deployment](#vercel-deployment)
- [Cloudflare Workers Deployment](#cloudflare-workers-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Post-Deployment](#post-deployment)

## Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ All environment variables configured (see [Environment Variables](#environment-variables))
- ✅ Postgres database instance running and accessible
- ✅ Database migrations applied (see [Database Setup](#database-setup))
- ✅ Clerk authentication configured with correct domain
- ✅ API keys for AI providers (OpenRouter, etc.)
- ✅ Git repository pushed to remote

## Vercel Deployment

Vercel is the recommended deployment platform for Next.js applications.

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   bun add -g vercel
   # or
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project**:
   ```bash
   vercel link
   ```
   Follow the prompts to link to an existing project or create a new one.

4. **Set environment variables** in Vercel Dashboard:
   - Go to your project settings → Environment Variables
   - Add all required variables (see [Environment Variables](#environment-variables))

5. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Git Integration

1. **Connect your repository** to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository

2. **Configure project settings**:
   - Framework Preset: Next.js
   - Build Command: `bun run build` (or `pnpm run build`)
   - Install Command: `bun install` (or `pnpm install`)
   - Output Directory: `.next`

3. **Add environment variables** in the project settings

4. **Deploy**: Vercel will automatically deploy on every push to your main branch

### Vercel Configuration

The project includes `vercel.json` with the following settings:
- Framework: Next.js
- Build Command: `bun run build`
- Install Command: `bun install`
- Output Directory: `.next`

## Cloudflare Workers Deployment

For Cloudflare Workers deployment, the project uses `@opennextjs/cloudflare` adapter.

### Prerequisites

1. **Install Wrangler CLI**:
   ```bash
   bun add -g wrangler
   # or
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

### Deployment Steps

1. **Build for Cloudflare**:
   ```bash
   bun run workers:build
   ```

2. **Preview locally** (optional):
   ```bash
   bun run preview
   ```

3. **Set environment variables** in Cloudflare Dashboard:
   - Go to Workers & Pages → Your Worker → Settings → Variables
   - Add all required environment variables
   - Or use `wrangler secret put <KEY>` for sensitive values

4. **Deploy**:
   ```bash
   bun run deploy
   ```
   Or manually:
   ```bash
   wrangler deploy
   ```

### Cloudflare Configuration

The `wrangler.toml` file is pre-configured with:
- Worker name: `resume-ai-creator-mcp-9799328264d631fa`
- Compatibility date: `2025-03-25`
- Node.js compatibility enabled

**Note**: For Postgres database, you'll need to set up a Hyperdrive connection or use Cloudflare D1 (SQLite) with schema migration. Consider using an external Postgres service like Neon, Supabase, or Railway.

## Environment Variables

### Required Variables

#### Authentication (Clerk)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

#### Database
```
POSTGRES_URL=postgresql://user:password@host:port/database
```

#### AI Providers
```
OPENROUTER_API_KEY=sk-or-v1-...
```

#### GitHub (for GitHub models API)
```
PAT_TOKEN=ghp_...  # GitHub Personal Access Token
```

### Optional Variables

#### App Configuration
```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_DOMAIN=yourdomain.com
```

#### Additional AI Providers
```
GEMINI_API_KEY=...
OPENAI_API_KEY=...
```

#### Farcaster & Cloudflare
```
FARCASTER_FID=...
FARCASTER_CUSTODY_ADDRESS=...
FARCASTER_CUSTODY_PRIVATE_KEY=...
NEYNAR_API_KEY=...
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...
```

#### XMCP & Coinbase
```
CDP_API_KEY_NAME=...
CDP_API_KEY_PRIVATE_KEY=...
AI_GATEWAY_API_KEY=...
```

### Setting Environment Variables

#### Vercel
1. Go to Project Settings → Environment Variables
2. Add each variable for Production, Preview, and Development environments
3. Variables starting with `NEXT_PUBLIC_` are exposed to the browser

#### Cloudflare Workers
1. Use `wrangler secret put <KEY>` for sensitive values
2. Or add in Dashboard: Workers & Pages → Settings → Variables
3. For `NEXT_PUBLIC_*` variables, add them as plain text variables

## Database Setup

### 1. Create Postgres Database

Choose a provider:
- **Neon** (recommended): [neon.tech](https://neon.tech)
- **Supabase**: [supabase.com](https://supabase.com)
- **Railway**: [railway.app](https://railway.app)
- **Vercel Postgres**: Available in Vercel dashboard

### 2. Get Connection String

Copy your Postgres connection string. It should look like:
```
postgresql://user:password@host:port/database?sslmode=require
```

### 3. Run Migrations

**Option A: Using Drizzle Kit (Recommended)**
```bash
# Set POSTGRES_URL in your environment
export POSTGRES_URL="your-connection-string"

# Push schema to database
bun run db:push
```

**Option B: Using Migration Scripts**
```bash
# Generate migrations (if schema changed)
bun run db:generate

# Apply migrations
bun run db:migrate
```

### 4. Verify Database

Check that tables were created:
```bash
bun run db:studio
```

This opens Drizzle Studio where you can view and manage your database.

## Post-Deployment

### 1. Verify Deployment

- ✅ Check that the app loads at your deployment URL
- ✅ Test authentication (sign in/sign up)
- ✅ Verify API routes are accessible
- ✅ Test database connectivity

### 2. Update Clerk Domain

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to your application → Domains
3. Add your production domain
4. Update environment variables if needed

### 3. Update Farcaster Configuration

If using Farcaster mini app features:
1. Update `src/config/farcaster.json` with production URLs
2. Run: `node scripts/generate-farcaster-account-association.js generate`
3. Redeploy if needed

### 4. Monitor Logs

#### Vercel
- View logs in Vercel Dashboard → Deployments → Select deployment → Logs

#### Cloudflare
- View logs: `wrangler tail`
- Or in Dashboard: Workers & Pages → Your Worker → Logs

### 5. Set Up Custom Domain (Optional)

#### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

#### Cloudflare
1. In `wrangler.toml`, add route configuration
2. Or use Cloudflare Pages with custom domain

## Troubleshooting

### Build Failures

- **TypeScript errors**: Check `tsconfig.json` - build may continue with `ignoreBuildErrors: true`
- **Missing dependencies**: Ensure `bun install` or `pnpm install` runs successfully
- **Environment variables**: Verify all required variables are set

### Runtime Errors

- **Database connection**: Verify `POSTGRES_URL` is correct and database is accessible
- **Authentication**: Check Clerk keys and domain configuration
- **API routes**: Verify API keys for external services

### Database Issues

- **Migrations not applied**: Run `bun run db:push` or `bun run db:migrate`
- **Connection timeout**: Check database provider firewall settings
- **SSL required**: Ensure connection string includes `?sslmode=require`

## Quick Deploy Commands

### Vercel
```bash
# First time setup
vercel login
vercel link

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

### Cloudflare
```bash
# Build and deploy
bun run deploy

# Or step by step
bun run workers:build
wrangler deploy
```

## Support

For issues or questions:
- Check the [README.md](./README.md) for project details
- Review Vercel/Cloudflare documentation
- Check application logs for specific errors

