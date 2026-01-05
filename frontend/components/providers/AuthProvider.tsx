"use client";

import { ReactNode } from "react";

/**
 * AuthProvider wrapper
 * Better Auth React hooks work directly with the authClient,
 * so this is just a pass-through component for consistency.
 * You can add global auth state management here if needed.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

