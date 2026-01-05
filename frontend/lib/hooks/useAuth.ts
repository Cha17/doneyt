"use client";

import { authClient } from "@/lib/auth-client";

/**
 * Custom hook for authentication
 * Provides easy access to auth state and methods
 */
export function useAuth() {
  const { data: session, isPending, error } = authClient.useSession();

  return {
    user: session?.user || null,
    session: session?.session || null,
    isAuthenticated: !!session?.user,
    isLoading: isPending,
    error,
    // Auth methods
    signIn: authClient.signIn,
    signUp: authClient.signUp,
    signOut: authClient.signOut,
  };
}

