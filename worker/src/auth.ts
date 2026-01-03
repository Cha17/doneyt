import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./db/schema";

export function createAuth(
  databaseUrl: string,
  secret: string,
  baseURL: string,
  googleClientId?: string,
  googleClientSecret?: string
) {
  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: googleClientId || "",
        clientSecret: googleClientSecret || "",
      },
    },
    secret: secret,
    baseURL: baseURL,
  });
}
