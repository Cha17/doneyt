# 🎯 Next Steps Action Plan

## Current Status

- ✅ Backend Better Auth configured
- ✅ Frontend Better Auth client configured
- ✅ CORS fixed
- ⚠️ Backend endpoint returning 404 (needs verification)

## Step 1: Verify Backend is Working (5 minutes)

### A. Make sure worker is running

```bash
cd worker
npm run dev
```

**Look for:** `⬣ Listening on http://127.0.0.1:8787`

### B. Test backend directly in browser

Open these URLs in your browser:

1. **Test session endpoint:**

   ```
   http://127.0.0.1:8787/api/auth/session
   ```

   **Expected:** `{"user":null,"session":null}` or some JSON response

2. **Test OpenAPI endpoint:**
   ```
   http://127.0.0.1:8787/api/auth/openapi.json
   ```
   **Expected:** OpenAPI JSON schema

**If both return 404:**

- The route isn't matching correctly
- Check worker terminal for errors
- Restart the worker

**If they work:**

- ✅ Backend is fine, move to Step 2

---

## Step 2: Create Login Page (15 minutes)

Create `frontend/app/login/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed. Please try again.");
      } else {
        // Success! Redirect to profile
        router.push("/profile");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012326] to-[#013e4a]">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-24 px-4">
        <Card className="w-full max-w-md p-8 bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#032040] hover:bg-[#032040]/90"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#1C7D91] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
```

---

## Step 3: Create Signup Page (15 minutes)

Create `frontend/app/signup/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message || "Sign up failed. Please try again.");
      } else {
        // Success! Redirect to profile
        router.push("/profile");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012326] to-[#013e4a]">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-24 px-4">
        <Card className="w-full max-w-md p-8 bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#032040] hover:bg-[#032040]/90"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1C7D91] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
```

---

## Step 4: Update Header Component (10 minutes)

Update `frontend/app/components/Header.tsx` to show auth state:

```tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut, isLoading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-[#012326]  via-[#1C7D91]/30 to-[#012326] shadow-sm shadow-gray-500/10 px-6 py-4 w-full">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link
          href="/"
          className="text-xl font-bold text-white hover:opacity-80 transition-opacity"
          onClick={closeMenu}
        >
          DONEYT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link
            href="/drives"
            className="text-white hover:opacity-80 transition-opacity"
          >
            drives
          </Link>
          <Link
            href="/about"
            className="text-white hover:opacity-80 transition-opacity"
          >
            about
          </Link>

          {isLoading ? (
            <span className="text-white">Loading...</span>
          ) : isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="text-white hover:opacity-80 transition-opacity"
              >
                profile
              </Link>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-white hover:opacity-80 transition-opacity"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Burger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden ml-auto text-white hover:opacity-80 transition-opacity"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[73px] left-0 right-0 bg-linear-to-r from-[#012326] via-[#1C7D91]/90 to-[#012326] shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-4">
          <Link
            href="/drives"
            className="text-white hover:opacity-80 transition-opacity py-2 text-center"
            onClick={closeMenu}
          >
            drives
          </Link>
          <Link
            href="/about"
            className="text-white hover:opacity-80 transition-opacity py-2 text-center"
            onClick={closeMenu}
          >
            about
          </Link>

          {isLoading ? (
            <span className="text-white text-center py-2">Loading...</span>
          ) : isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="text-white hover:opacity-80 transition-opacity py-2 text-center"
                onClick={closeMenu}
              >
                profile
              </Link>
              <button
                onClick={handleSignOut}
                className="text-white hover:opacity-80 transition-opacity py-2 text-center"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-white hover:opacity-80 transition-opacity py-2 text-center"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
```

---

## Step 5: Test the Flow (5 minutes)

1. **Go to:** `http://localhost:3000/signup`
2. **Create an account**
3. **Should redirect to:** `/profile`
4. **Check Header:** Should show "Sign Out" button
5. **Click Sign Out:** Should redirect to home
6. **Go to:** `/login`
7. **Sign in:** Should work and redirect to `/profile`

---

## Step 6: Protect Routes (Optional - 10 minutes)

Create `frontend/components/ProtectedRoute.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

Then wrap protected pages:

```tsx
// frontend/app/profile/page.tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  return <ProtectedRoute>{/* Your profile content */}</ProtectedRoute>;
}
```

---

## ✅ Checklist

- [ ] Step 1: Verify backend endpoints work
- [ ] Step 2: Create login page
- [ ] Step 3: Create signup page
- [ ] Step 4: Update Header with auth state
- [ ] Step 5: Test signup/login flow
- [ ] Step 6: Add route protection (optional)

---

## 🎯 Priority Order

1. **First:** Verify backend (Step 1) - 5 min
2. **Then:** Create login/signup pages (Steps 2-3) - 30 min
3. **Then:** Update Header (Step 4) - 10 min
4. **Finally:** Test everything (Step 5) - 5 min

**Total time:** ~50 minutes

---

## 🐛 If Backend Still Returns 404

Check:

1. Worker is running (`npm run dev` in worker directory)
2. No errors in worker terminal
3. Route pattern matches: `/api/auth/*`
4. Better Auth handler is being called correctly

If still not working, share:

- Worker terminal output
- What you see when visiting `http://127.0.0.1:8787/api/auth/session` directly
