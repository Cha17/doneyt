import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { drives } from './db/schema';

export type Env = {
	DATABASE_URL: string;
}

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	const sql = neon(c.env.DATABASE_URL);
	const db = drizzle(sql);

	const allDrives = await db.select().from(drives);

	return c.json(allDrives);
});

export default app;