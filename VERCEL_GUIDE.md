# Vercel Configuration Guide

> [!CAUTION]
> **DO NOT UPLOAD YOUR`.env` FILE TO VERCEL.**
> Your local `.env` contains `NEXTAUTH_URL="http://localhost:3000"`. If you uploaded this file to Vercel, **YOU MUST DELETE IT**.
> Vercel Environment Variables override everything else. If `NEXTAUTH_URL` is set to `localhost` in Vercel settings, your app will break.

It appears your Vercel deployment is missing required Environment Variables, which is why features are not working and the build/deployment might be inconsistent.

## Required Environment Variables

Go to your **Vercel Project Settings** > **Environment Variables** and add the following:

### Database (Required)
The application is configured for **PostgreSQL** (`prisma/schema.prisma`). You generally cannot use SQLite (`file:.`) on### Database (Postgres / Supabase)
- **Problem**: You are using port `5432` (Direct Connection). In Vercel serverless, this fails quickly.
- **Fix**: Use the **Transaction Pooler** (Port 6543).

**Change your `DATABASE_URL` in Vercel to:**
`postgres://postgres.rulxulwsflygxateupqu:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

*Note: Go to Supabase Dashboard > Connect > Transaction Pooler > Prisma to get the exact string.*

**Critical**: Connection failure will cause NextAuth to crash with "Configuration" error.ing to your PostgreSQL database (e.g., from Vercel Postgres, Supabase, Neon, or Railway).
  - Example: `postgres://user:password@host.com/database?sslmode=require`

### Authentication (NextAuth v5 Requirement)
Since you are using NextAuth v5 (Beta), you should use these variables instead of `NEXTAUTH_URL`.

1.  **`AUTH_SECRET`** (REQUIRED):
    *   This is **MISSING** or invalid.
    *   Value: Generate one on the command line: `openssl rand -base64 32` OR just type a long random string (e.g. `super-secret-random-phrase-123`).
2.  **`AUTH_URL`** (Recommended):
    *   Value: `https://resume-nugget-by-nikhil.vercel.app` (NO trailing slash).
3.  **`NEXTAUTH_URL`**:
    *   **DELETE IT**. v5 prefers `AUTH_URL`.

### Troubleshooting "Server Error: Configuration"
If you see `?error=Configuration`, it means **one of these is missing or wrong**:

1.  **`AUTH_SECRET` (Most Likely)**:
    *   You MUST have an Environment Variable named `AUTH_SECRET`.
    *   Value: Any random string (e.g., `secret-key-123`).
2.  **`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`**:
    *   If these are missing, Google Login fails immediately with this error.
3.  **Trailing Slash in URL**:
    *   Your `NEXTAUTH_URL` or `AUTH_URL` **must NOT** have a slash at the end.
    *   BAD: `https://myapp.com/`
    *   GOOD: `https://myapp.com`

**Check your Debug Page:** `https://resume-nugget-by-nikhil.vercel.app/debug`
*   Look at `HAS_AUTH_SECRET`: It MUST be `true`.
*   Look at `HAS_GOOGLE_ID`: It MUST be `true`.
*   Look at `HAS_GOOGLE_SECRET`: It MUST be `true`.


### Google OAuth Configuration (Fixing Error 400)
1.  Go to **[Google Cloud Console](https://console.cloud.google.com/apis/credentials)**.
2.  Select your project and go to **APIs & Services > Credentials**.
3.  Click the pencil icon to edit your **OAuth 2.0 Client ID**.
4.  Scroll down to **Authorized redirect URIs**.
5.  **ADD this exact URL**:
    > `https://resume-nugget-by-nikhil.vercel.app/api/auth/callback/google`
6.  Click **Save**.
7.  Wait 1-2 minutes for Google to propagate the change.

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
