# Troubleshooting "Failed to fetch" Error

## Quick Diagnosis Steps

### Step 1: Verify Worker is Running

Open a terminal and check if the worker is running:

```bash
cd worker
npm run dev
```

**Look for:**
```
⬣ Listening on http://127.0.0.1:8787
```

If you don't see this, the worker is NOT running. Start it first!

### Step 2: Test Worker Directly

In a **new terminal**, test if the worker responds:

**Windows (PowerShell):**
```powershell
curl http://127.0.0.1:8787/api/auth/session
```

**Windows (Command Prompt):**
```cmd
curl http://127.0.0.1:8787/api/auth/session
```

**Expected Response:**
```json
{"user":null,"session":null}
```

**If this fails:**
- Worker is not running → Start it with `npm run dev` in the worker directory
- Port conflict → Check if something else is using port 8787
- Wrong port → Check what port the worker is actually using

### Step 3: Check Browser Console

1. Open your browser DevTools (F12)
2. Go to the **Console** tab
3. Click "Test Backend Connection" again
4. Look for detailed error messages

**Common errors you might see:**

#### CORS Error
```
Access to fetch at 'http://127.0.0.1:8787/api/auth/session' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:** The CORS config should allow this. Check worker `index.ts` has:
```typescript
app.use('/*', cors({
  origin: '*',
  credentials: true,
  // ...
}));
```

#### Network Error / Failed to fetch
```
Failed to fetch
```

**Possible causes:**
1. Worker not running
2. Wrong URL/port
3. Firewall blocking connection
4. Browser security settings

### Step 4: Check Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Click "Test Backend Connection"
4. Look for the request to `http://127.0.0.1:8787/api/auth/session`

**What to check:**
- **Status:** Should be 200 (green) or show error code
- **Type:** Should be `fetch` or `xhr`
- **Request URL:** Should be `http://127.0.0.1:8787/api/auth/session`
- **Error:** Click on the failed request to see details

### Step 5: Verify Environment Variables

Check if `frontend/.env.local` exists and has:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://127.0.0.1:8787/api/auth
```

**Important:** Restart Next.js dev server after creating/editing `.env.local`!

### Step 6: Test with Different Methods

#### Method A: Direct Browser Test
Open browser and go directly to:
```
http://127.0.0.1:8787/api/auth/session
```

**Expected:** JSON response `{"user":null,"session":null}`

**If this works:** The worker is running, issue is with frontend connection
**If this fails:** Worker is not running or not accessible

#### Method B: Browser Console Test
Open browser console (F12) on `http://localhost:3000` and run:

```javascript
fetch('http://127.0.0.1:8787/api/auth/session', {
  credentials: 'include'
})
.then(r => {
  console.log('Status:', r.status);
  return r.json();
})
.then(data => console.log('✅ Success:', data))
.catch(err => console.error('❌ Error:', err));
```

## Common Solutions

### Solution 1: Worker Not Running
```bash
# Terminal 1: Start Worker
cd worker
npm run dev

# Wait for: ⬣ Listening on http://127.0.0.1:8787
```

### Solution 2: Port Mismatch
Check what port your worker is actually using. Look at the terminal output when you start it.

If it's different from 8787, update:
- `frontend/.env.local`: `NEXT_PUBLIC_BETTER_AUTH_URL=http://127.0.0.1:YOUR_PORT/api/auth`
- `worker/.dev.vars`: `BASE_URL=http://127.0.0.1:YOUR_PORT`

### Solution 3: CORS Issue
Make sure your worker `src/index.ts` has CORS enabled:

```typescript
app.use('/*', cors({
  origin: '*',  // Allows all origins
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  credentials: true,
}));
```

### Solution 4: Browser Security
Some browsers block `localhost` to `127.0.0.1` connections. Try:
- Use `http://localhost:8787` instead of `http://127.0.0.1:8787`
- Or use the same hostname for both (both `localhost` or both `127.0.0.1`)

### Solution 5: Firewall/Antivirus
Temporarily disable firewall/antivirus to test if it's blocking the connection.

## Quick Checklist

- [ ] Worker is running (`npm run dev` in worker directory)
- [ ] Worker shows "Listening on http://127.0.0.1:8787"
- [ ] Can access `http://127.0.0.1:8787/api/auth/session` directly in browser
- [ ] `frontend/.env.local` exists with correct URL
- [ ] Next.js dev server restarted after creating `.env.local`
- [ ] No firewall blocking port 8787
- [ ] Browser console shows detailed error (check Network tab)

## Still Not Working?

Share:
1. Output from worker terminal (is it running?)
2. Browser console error (F12 → Console)
3. Network tab details (F12 → Network → click failed request)
4. Result of `curl http://127.0.0.1:8787/api/auth/session`

