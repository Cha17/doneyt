// import { Hono } from 'hono';
// import { betterAuth } from "better-auth";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import * as schema from "../db/schema";
// import { openAPI } from 'better-auth/plugins';

// export function createAuth(env: { DATABASE_URL: string; AUTH_SECRET: string; BASE_URL: string; GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string }) {
//   const sql = neon(env.DATABASE_URL!);
//   const db = drizzle(sql, { schema });

//   return betterAuth({
//     database: drizzleAdapter(db, { provider: "pg" }),
//     emailAndPassword: { enabled: true },
//     socialProviders: {
//       google: {
//         clientId: env.GOOGLE_CLIENT_ID || "",
//         clientSecret: env.GOOGLE_CLIENT_SECRET || "",
//       },
//     },
//     secret: env.AUTH_SECRET!,
//     baseURL: env.BASE_URL!,
//     plugins: [
//       openAPI(),
//     ]
//   });
// }
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from '../db/schema';
import { openAPI } from 'better-auth/plugins';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

type Env = {
  DATABASE_URL: string;
  AUTH_SECRET: string;
  BASE_URL: string;
  CLIENT_URL?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
};

// Create auth instance factory function
export function createAuth(env: Env) {
  const sql = neon(env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET ? {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    } : undefined,
    secret: env.AUTH_SECRET,
    baseURL: `${env.BASE_URL}/api/auth`,
    trustedOrigins: env.CLIENT_URL ? [env.CLIENT_URL] : undefined,
    plugins: [openAPI()],
  });
}

// // Cache auth instances per environment to avoid recreating on every request
// const authCache = new Map<string, ReturnType<typeof createAuth>>();

// export function getAuth(env: Env) {
//   const cacheKey = `${env.DATABASE_URL}:${env.AUTH_SECRET}:${env.BASE_URL}`;
  
//   if (!authCache.has(cacheKey)) {
//     authCache.set(cacheKey, createAuth(env));
//   }
  
//   return authCache.get(cacheKey)!;
// }