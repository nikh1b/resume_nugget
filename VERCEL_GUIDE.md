# Vercel Configuration Guide

It appears your Vercel deployment is missing required Environment Variables, which is why features are not working and the build/deployment might be inconsistent.

## Required Environment Variables

Go to your **Vercel Project Settings** > **Environment Variables** and add the following:

### Database (Required)
The application is configured for **PostgreSQL** (`prisma/schema.prisma`). You generally cannot use SQLite (`file:.`) on Vercel.
- `DATABASE_URL`: Connection string to your PostgreSQL database (e.g., from Vercel Postgres, Supabase, Neon, or Railway).
  - Example: `postgres://user:password@host.com/database?sslmode=require`

### Authentication (Critical)
- **`NEXTAUTH_URL`**: 
  - **The screenshot shows your app is redirecting to `localhost:3000`.**
  - **Delete this variable** from Vercel entirely. Next.js will auto-detect the correct URL.
  - OR set it to `https://your-project.vercel.app`.

### Google OAuth Configuration
- The error "redirect_uri_mismatch" happens because Google expects `localhost` but is getting your Vercel domain, OR vice versa.
- Go to Google Cloud Console > APIs & Services > Credentials.
- Add `https://your-project.vercel.app/api/auth/callback/google` to **Authorized redirect URIs**.

### Google OAuth Configuration (Important)
If you can't sign in (Error 400: redirect_uri_mismatch):
1. Go to **Google Cloud Console** > APIs & Services > Credentials.
2. Edit your OAuth 2.0 Client ID.
3. Add your Vercel URL to **Authorized redirect URIs**:
   - `https://your-project.vercel.app/api/auth/callback/google`

### Database
- You are using **Supabase**. Ensure your database is **not paused** in the Supabase dashboard.
- If you see connection errors, ensure you are using the **Transaction Pooler** (port 6543) if you have many serverless connections, though port 5432 usually works for low traffic.

## Deployment Troubleshooting

1. **Check Build Logs**: Go to Vercel > Deployments > [Latest] > Build Logs.
2. **Redeploy**: If you changed Environment Variables, go to Deployments > [Three Dots] > **Redeploy**.
