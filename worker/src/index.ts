import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { drives } from './db/schema';
import { and, eq, ilike, or, desc } from 'drizzle-orm';

export type Env = {
	DATABASE_URL: string;
}

const app = new Hono<{ Bindings: Env }>();

function getDb(databaseUrl: string) {
	const sql = neon(databaseUrl);
	return drizzle(sql);
}

function parseIntParam(value: string | null, fallback: number) {
	if(!value) return fallback;
	const n = Number.parseInt(value, 10);
	return Number.isFinite(n) ? n : fallback;
}

app.get('/', async (c) => {
	const db = getDb(c.env.DATABASE_URL)

	const Drivess = await db.select().from(drives);
	return c.json(Drivess)
})

app.get('/drives', async (c) => {
	try {
		const db = getDb(c.env.DATABASE_URL);

    const query = c.req.query();
    const status = query.status;
    const q = query.q;
    const skipRaw = query.skip;
    const takeRaw = query.take;

	let skip = parseIntParam(skipRaw, 0);
	skip = Math.max(0, skip);
	let take = parseIntParam(takeRaw, 10);
	take = Math.max(1, Math.min(100, take));

	const whereConditions = [];

	// filter by drive status
	if (status && status.trim()) {
		whereConditions.push(eq(drives.status, status.trim()));
	}

	// filter by searching
	if (q && q.trim()) {
		const keyword = `%${q.trim()}%`;
		whereConditions.push(or(ilike(drives.title, keyword), ilike(drives.organization, keyword)));
	}

    let whereClause = undefined;
    if (whereConditions.length === 1) {
      whereClause = whereConditions[0];
    } else if (whereConditions.length > 1) {
      whereClause = and(...whereConditions);
    }

    const queryBuilder = whereClause 
      ? db.select().from(drives).where(whereClause)
      : db.select().from(drives);

	const allDrives = await queryBuilder.orderBy(desc(drives.createdAt)).limit(take).offset(skip);
	return c.json({ drives: allDrives }, 200);

  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});

app.get('/drives/:id', async (c) => {
	try {
		const db = getDb(c.env.DATABASE_URL);

		const id = c.req.param('id');
		const parsedId = parseIntParam(id, 10);
		if (!Number.isFinite(parsedId)) {
			return c.json({error: 'Invalid drive ID'}, 400);
		}

		const drive = await db.select().from(drives).where(eq(drives.id, parsedId)).limit(1);

		if (!drive || drive.length === 0) {
			return c.json({error: 'Drive not found'}, 404);
		}

		return c.json({drive: drive[0]}, 200);
	} catch (error) {
		return c.json({error: 'Internal server error'}, 500);
	}
})

export default app;	