# Testing Better Auth Frontend-Backend Connection

## Quick Test Guide

### Prerequisites

1. **Backend Worker Running**
   ```bash
   cd worker
   npm run dev
   ```
   Should be running on `http://127.0.0.1:8787`

2. **Frontend Environment Variables**
   Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_BETTER_AUTH_URL=http://127.0.0.1:8787/api/auth
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8787
   ```

3. **Frontend Running**
   ```bash
   cd frontend
   npm run dev
   ```
   Should be running on `http://localhost:3000`

## Method 1: Use the Test Page (Easiest)

1. Navigate to: `http://localhost:3000/test-auth`
2. Click "Test Backend Connection" - should show success
3. Try signing up with a test account
4. Try signing in
5. Check if session shows your user data
6. Try signing out

## Method 2: Browser Console Test

Open browser DevTools (F12) → Console tab, then run:

### Test 1: Check Backend Connection
```javascript
fetch('http://127.0.0.1:8787/api/auth/session', {
  credentials: 'include'
})
.then(r => r.json())
.then(data => console.log('✅ Backend connected!', data))
.catch(err => console.error('❌ Backend connection failed:', err));
```

**Expected:** `{user: null, session: null}` (normal when not logged in)

### Test 2: Test Better Auth Client
```javascript
// Import the auth client (if using modules)
// Or test directly:
fetch('http://127.0.0.1:8787/api/auth/session', {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.log('Session:', data);
  if (data.user) {
    console.log('✅ Authenticated as:', data.user.email);
  } else {
    console.log('ℹ️ Not authenticated');
  }
});
```

### Test 3: Test Sign Up
```javascript
fetch('http://127.0.0.1:8787/api/auth/sign-up', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User'
  })
})
.then(r => r.json())
.then(data => {
  if (data.user) {
    console.log('✅ Sign up successful!', data.user);
  } else {
    console.log('❌ Sign up failed:', data);
  }
});
```

### Test 4: Test Sign In
```javascript
fetch('http://127.0.0.1:8787/api/auth/sign-in', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123'
  })
})
.then(r => r.json())
.then(data => {
  if (data.user) {
    console.log('✅ Sign in successful!', data.user);
  } else {
    console.log('❌ Sign in failed:', data);
  }
});
```

### Test 5: Check Session After Login
```javascript
fetch('http://127.0.0.1:8787/api/auth/session', {
  credentials: 'include'
})
.then(r => r.json())
.then(data => {
  if (data.user) {
    console.log('✅ Session active:', data.user.email);
  } else {
    console.log('❌ No session found');
  }
});
```

## Method 3: Using React Components

Create a simple test component:

```tsx
"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function AuthTest() {
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    authClient.getSession().then(setSession);
  }, []);
  
  return (
    <div>
      <h1>Auth Test</h1>
      {session?.user ? (
        <p>✅ Logged in as: {session.user.email}</p>
      ) : (
        <p>❌ Not logged in</p>
      )}
    </div>
  );
}
```

## What to Look For

### ✅ Success Indicators:

1. **Backend Connection**
   - No CORS errors
   - Response from `/api/auth/session` endpoint
   - Status code 200

2. **Sign Up**
   - User object returned
   - Session created
   - Cookies set in browser

3. **Sign In**
   - User object returned
   - Session created
   - Cookies persist

4. **Session Check**
   - User data returned when authenticated
   - `null` when not authenticated

### ❌ Common Issues:

1. **CORS Error**
   - **Problem:** Browser blocks request
   - **Solution:** Check worker CORS config allows `http://localhost:3000`

2. **Connection Refused**
   - **Problem:** Worker not running
   - **Solution:** Start worker with `npm run dev` in worker directory

3. **Cookies Not Set**
   - **Problem:** Cookies not being saved
   - **Solution:** 
     - Check `CLIENT_URL` in worker `.dev.vars` matches frontend URL
     - Use `credentials: 'include'` in fetch requests
     - Check browser DevTools → Application → Cookies

4. **"Unauthorized" Errors**
   - **Problem:** Session not being sent
   - **Solution:** Make sure cookies are included in requests

5. **Environment Variable Not Found**
   - **Problem:** `NEXT_PUBLIC_BETTER_AUTH_URL` not set
   - **Solution:** Create `.env.local` and restart Next.js dev server

## Step-by-Step Verification

### Step 1: Verify Backend is Running
```bash
curl http://127.0.0.1:8787/api/auth/session
```
Should return: `{"user":null,"session":null}`

### Step 2: Verify Frontend Can Reach Backend
Open browser console on `http://localhost:3000`:
```javascript
fetch('http://127.0.0.1:8787/api/auth/session', {credentials: 'include'})
  .then(r => r.json())
  .then(console.log);
```
Should return: `{user: null, session: null}`

### Step 3: Test Sign Up from Frontend
Use the test page at `/test-auth` or browser console

### Step 4: Verify Session Persists
- Sign in
- Refresh page
- Check session again - should still show user

### Step 5: Test Protected Endpoint
```javascript
// After signing in
fetch('http://127.0.0.1:8787/donations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ driveId: 1, amount: 50 })
})
.then(r => r.json())
.then(console.log);
```

## Quick Checklist

- [ ] Backend worker running on port 8787
- [ ] Frontend running on port 3000
- [ ] `.env.local` file created with `NEXT_PUBLIC_BETTER_AUTH_URL`
- [ ] Can reach `/api/auth/session` endpoint
- [ ] Sign up works
- [ ] Sign in works
- [ ] Session persists after page refresh
- [ ] Sign out works
- [ ] Protected endpoints work when authenticated

## Next Steps

Once testing is successful:
1. Complete your login page (`/login`)
2. Create signup page (`/signup`)
3. Update Header component with auth state
4. Connect Profile and Donations pages to real data
5. Add protected route wrapper

