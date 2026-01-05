"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function TestAuthPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [testResult, setTestResult] = useState<string>("");

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setLoading(true);
      setError(null);
      const sessionData = await authClient.getSession();
      setSession(sessionData);
      setTestResult(`✅ Session check successful! Status: ${sessionData?.user ? 'Authenticated' : 'Not authenticated'}`);
    } catch (err: any) {
      setError(err.message || "Failed to check session");
      setTestResult(`❌ Session check failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });
      
      if (result.error) {
        setError(result.error.message || "Sign up failed");
        setTestResult(`❌ Sign up failed: ${result.error.message}`);
      } else {
        setTestResult(`✅ Sign up successful! User: ${result.data?.user?.email}`);
        await checkSession(); // Refresh session
      }
    } catch (err: any) {
      setError(err.message || "Sign up failed");
      setTestResult(`❌ Sign up error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const result = await authClient.signIn.email({
        email,
        password,
      });
      
      if (result.error) {
        setError(result.error.message || "Sign in failed");
        setTestResult(`❌ Sign in failed: ${result.error.message}`);
      } else {
        setTestResult(`✅ Sign in successful! User: ${result.data?.user?.email}`);
        await checkSession(); // Refresh session
      }
    } catch (err: any) {
      setError(err.message || "Sign in failed");
      setTestResult(`❌ Sign in error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setError(null);
      setLoading(true);
      await authClient.signOut();
      setTestResult("✅ Sign out successful!");
      await checkSession(); // Refresh session
    } catch (err: any) {
      setError(err.message || "Sign out failed");
      setTestResult(`❌ Sign out error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testBackendConnection = async () => {
    try {
      setError(null);
      setLoading(true);
      const backendUrl = "http://127.0.0.1:8787/api/auth/session";
      
      setTestResult(`Testing connection to: ${backendUrl}...`);
      
      const response = await fetch(backendUrl, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTestResult(`✅ Backend connection successful!\nStatus: ${response.status}\nResponse: ${JSON.stringify(data, null, 2)}`);
    } catch (err: any) {
      const errorMsg = err.message || "Unknown error";
      setError(errorMsg);
      setTestResult(`❌ Backend connection failed!\n\nError: ${errorMsg}\n\nTroubleshooting:\n1. Is the worker running? Check terminal where you ran "npm run dev"\n2. Is it on port 8787? Check the worker terminal output\n3. Try: curl http://127.0.0.1:8787/api/auth/session\n4. Check browser console (F12) for CORS errors`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#012326] to-[#013e4a] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-white">
          <h1 className="text-3xl font-bold mb-4">Better Auth Connection Test</h1>
          
          {/* Connection Status */}
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
            <div className="space-y-2">
              <p>
                <strong>Backend URL:</strong> {process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://127.0.0.1:8787/api/auth"}
              </p>
              <p>
                <strong>Loading:</strong> {loading ? "Yes" : "No"}
              </p>
              {error && (
                <p className="text-red-600">
                  <strong>Error:</strong> {error}
                </p>
              )}
            </div>
          </div>

          {/* Test Results */}
          {testResult && (
            <div className={`mb-6 p-4 rounded-lg ${testResult.includes('✅') ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className="font-mono text-sm whitespace-pre-wrap">{testResult}</p>
            </div>
          )}

          {/* Current Session */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Current Session</h2>
            {session?.user ? (
              <div className="space-y-2">
                <p><strong>Email:</strong> {session.user.email}</p>
                <p><strong>Name:</strong> {session.user.name || "N/A"}</p>
                <p><strong>User ID:</strong> {session.user.id}</p>
              </div>
            ) : (
              <p className="text-gray-600">Not authenticated</p>
            )}
          </div>

          {/* Quick Tests */}
          <div className="mb-6 space-y-2">
            <Button onClick={testBackendConnection} disabled={loading} className="w-full">
              Test Backend Connection
            </Button>
            <Button onClick={checkSession} disabled={loading} className="w-full">
              Check Session
            </Button>
          </div>

          {/* Sign Up Form */}
          <Card className="p-6 bg-gray-50 mb-6">
            <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                Sign Up
              </Button>
            </form>
          </Card>

          {/* Sign In Form */}
          <Card className="p-6 bg-gray-50 mb-6">
            <h2 className="text-xl font-semibold mb-4">Sign In</h2>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                Sign In
              </Button>
            </form>
          </Card>

          {/* Sign Out */}
          {session?.user && (
            <Button onClick={handleSignOut} disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
              Sign Out
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}

