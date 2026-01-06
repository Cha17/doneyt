# Quick Fix: API Connection Error

## The Problem

Frontend can't connect to backend at `http://127.0.0.1:8787`

## Solution Steps

### Step 1: Make Sure Worker is Running ⚠️ CRITICAL

Open a terminal and run:

```bash
cd worker
npm run dev
```

**Look for this output:**

```
⬣ Listening on http://127.0.0.1:8787
```

**If you don't see this, the worker is NOT running!**

### Step 2: Create Environment File

Create `frontend/.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8787
NEXT_PUBLIC_BETTER_AUTH_URL=http://127.0.0.1:8787/api/auth
```

**Important:**

- File must be named `.env.local` (not `.env`)
- Must be in the `frontend/` directory
- Variable names must start with `NEXT_PUBLIC_`

### Step 3: Restart Next.js Server

After creating `.env.local`:

1. **Stop** your Next.js dev server (Ctrl+C)
2. **Start** it again:
   ```bash
   cd frontend
   npm run dev
   ```

### Step 4: Test Backend Connection

Open in browser:

```
http://127.0.0.1:8787/drives
```

**Expected:** JSON response with drives array

**If 404:** Worker route issue
**If connection refused:** Worker not running
**If works:** Backend is fine, frontend should work now

## Quick Checklist

- [ ] Worker is running (`npm run dev` in worker directory)
- [ ] Worker shows "Listening on http://127.0.0.1:8787"
- [ ] `.env.local` file exists in `frontend/` directory
- [ ] `.env.local` has `NEXT_PUBLIC_API_URL=http://127.0.0.1:8787`
- [ ] Next.js server restarted after creating `.env.local`
- [ ] Can access `http://127.0.0.1:8787/drives` in browser

## Still Not Working?

### Check 1: Is worker actually running?

```bash
# In worker directory
npm run dev
```

### Check 2: Test backend directly

Open browser: `http://127.0.0.1:8787/drives`

### Check 3: Check Next.js console

Look for environment variable warnings

### Check 4: Verify CORS

Make sure worker CORS allows `http://localhost:3000`

## Common Issues

### Issue: "Failed to fetch"

- **Cause:** Worker not running or wrong URL
- **Fix:** Start worker, check `.env.local` file

### Issue: Environment variable not working

- **Cause:** File not named `.env.local` or server not restarted
- **Fix:** Rename file, restart Next.js

### Issue: CORS error

- **Cause:** Worker CORS not configured
- **Fix:** Check worker `index.ts` CORS config
