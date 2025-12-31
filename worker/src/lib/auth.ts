import { neon } from "@neondatabase/serverless";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { schema } from "better-auth/client/plugins";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({
    path: '.dev.vars',
});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export const auth = betterAuth({
    database: drizzleAdapter(db, { 
        provider: "pg" 
    }),
    emailAndPassword: { 
      enabled: true, 
    }, 
    socialProviders: { 
      google: { 
        clientId: process.env.GOOGLE_CLIENT_ID as string, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
      },
    },
    secret: process.env.BETTER_AUTH_SECRET as string,
    baseURL: process.env.BETTER_AUTH_URL as string,
  });