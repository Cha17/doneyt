# Frontend Better Auth Setup Guide

## ✅ Step 1: Create Environment Variables

Create `frontend/.env.local` file with:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://127.0.0.1:8787/api/auth
NEXT_PUBLIC_API_URL=http://127.0.0.1:8787
```

**Important:** Restart your Next.js dev server after creating this file!

## ✅ Step 2: Files Created

I've created the following files for you:

1. **`frontend/lib/auth-client.ts`** - Better Auth client configuration
2. **`frontend/components/providers/AuthProvider.tsx`** - Auth provider component
3. **`frontend/lib/hooks/useAuth.ts`** - Custom hook for easy auth access
4. **Updated `frontend/app/layout.tsx`** - Wrapped app with AuthProvider

## ✅ Step 3: Verify Setup

### Check if files exist:
- ✅ `frontend/lib/auth-client.ts`
- ✅ `frontend/components/providers/AuthProvider.tsx`
- ✅ `frontend/lib/hooks/useAuth.ts`
- ✅ `frontend/app/layout.tsx` (updated)

### Restart your frontend dev server:
```bash
cd frontend
# Stop current server (Ctrl+C)
npm run dev
```

## ✅ Step 4: Test the Connection

1. Go to `http://localhost:3000/test-auth`
2. Click "Test Backend Connection"
3. Try signing up/signing in

## 📝 Usage Examples

### Using the `useAuth` hook in components:

```tsx
"use client";
import { useAuth } from "@/lib/hooks/useAuth";

export default function MyComponent() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.email}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### Using auth methods directly:

```tsx
"use client";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await authClient.signIn.email({
      email: "user@example.com",
      password: "password123",
    });
    
    if (result.error) {
      console.error("Sign in failed:", result.error);
    } else {
      console.log("Signed in:", result.data?.user);
    }
  };

  return <form onSubmit={handleSignIn}>...</form>;
}
```

### Using session directly:

```tsx
"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function Profile() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    authClient.getSession().then(setSession);
  }, []);

  return <div>{session?.user?.email}</div>;
}
```

## 🎯 Next Steps

1. ✅ Create `.env.local` file (if not done automatically)
2. ✅ Restart Next.js dev server
3. ✅ Test connection at `/test-auth`
4. ✅ Create login page (`/login`)
5. ✅ Create signup page (`/signup`)
6. ✅ Update Header component with auth state
7. ✅ Protect routes that need authentication

## 🔍 Troubleshooting

### Issue: "Cannot find module '@/lib/auth-client'"
**Solution:** Make sure the file exists at `frontend/lib/auth-client.ts`

### Issue: Environment variable not working
**Solution:** 
- Check `.env.local` exists in `frontend/` directory
- Restart Next.js dev server
- Make sure variable name starts with `NEXT_PUBLIC_`

### Issue: AuthProvider not working
**Solution:**
- Check `layout.tsx` imports `AuthProvider` correctly
- Make sure `AuthProvider` wraps `{children}`
- Check browser console for errors

### Issue: CORS errors
**Solution:**
- Make sure worker CORS allows `http://localhost:3000`
- Check worker is running on port 8787
- Verify `CLIENT_URL` in worker `.dev.vars` matches frontend URL

## 📚 Available Auth Methods

From `authClient`:
- `signIn.email()` - Sign in with email/password
- `signUp.email()` - Sign up with email/password
- `signOut()` - Sign out current user
- `useSession()` - React hook for session state
- `getSession()` - Get current session (non-hook)

From `useAuth` hook:
- `user` - Current user object
- `session` - Current session object
- `isAuthenticated` - Boolean if user is logged in
- `isLoading` - Boolean if auth state is loading
- `signIn`, `signUp`, `signOut` - Auth methods

