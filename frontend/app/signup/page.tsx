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
  const [confirmPassword, setConfirmPassword] = useState("");
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
    } catch (err: unknown) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-[#012326] to-[#013e4a]">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-24 px-4">
        <Card className="w-full max-w-md p-8 bg-linear-to-br from-[#06AAC3] to-[#00163D] border border-none">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Sign Up
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="pb-2">
                USERNAME
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={isLoading}
                className="bg-[#D9D9D9]"
              />
            </div>

            <div>
              <Label htmlFor="email" className="pb-2">
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading}
                className="bg-[#D9D9D9]"
              />
            </div>

            <div className="pb-4">
              <Label htmlFor="password" className="pb-2">
                PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                minLength={6}
                className="bg-[#D9D9D9]"
              />
            </div>
            <div className="pb-4">
              <Label htmlFor="confirm-password" className="pb-2">
                CONFIRM PASSWORD
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                minLength={6}
                className="bg-[#D9D9D9]"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[#032040] via-[#399065] to-[#7BAC6B] hover:from-[#032040]/90 hover:via-[#399065]/90 hover:to-[#7BAC6B]/90"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          {/* OR continue with Google */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              OR
            </span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <button
            type="button"
            onClick={() => {
              const base =
                process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
                "http://127.0.0.1:8787/api/auth";
              window.location.href = `${base}/oauth/google`;
            }}
            className="mt-4 w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 bg-white py-2 hover:bg-gray-50 transition-colors"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
              <span className="text-lg font-bold text-[#4285F4]">G</span>
            </span>
            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-gray-200 hover:underline">
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
