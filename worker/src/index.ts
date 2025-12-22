import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { donations, drives } from './db/schema';
import { and, eq, ilike, or, desc, min, inArray } from 'drizzle-orm';

export type Env = {
	DATABASE_URL: string;
}

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all routes
app.use('/*', cors({
	origin: '*',
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowHeaders: ['Content-Type', 'Authorization'],
}));

function getDb(databaseUrl: string) {
	const sql = neon(databaseUrl);
	return drizzle(sql);
}

function parseIntParam(value: string | undefined, fallback: number) {
	if(!value) return fallback;
	const n = Number.parseInt(value, 10);
	return Number.isFinite(n) ? n : fallback;
}

function nonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

function isValidNumber(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value) && value >= 1;
}




// ENDPOINTS

// app.get('/', async (c) => {
// 	const db = getDb(c.env.DATABASE_URL)

// 	const Drivess = await db.select().from(drives);
// 	return c.json(Drivess)
// })


// List all drives | with pagination, filtering, and searching
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


// Get a single drive by ID
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


// Create a new drive
app.post('/drives', async (c) => {
	try {
		const db = getDb(c.env.DATABASE_URL);

		const body = await c.req.json();

		const title = body?.title;
		if (!nonEmptyString(title)) {
			return c.json({error: 'Title is required'}, 400);
		}

		const organization = body?.organization;
		if (!nonEmptyString(organization)) {
			return c.json({error: 'Organization is required'}, 400);
		}

		const description = body?.description;
		if (!nonEmptyString(description)) {
			return c.json({error: 'Description is required'}, 400);
		}

		const imageUrl = body?.imageUrl;
		if (!nonEmptyString(imageUrl)) {
			return c.json({error: 'Image URL is required'}, 400);
		}

		let targetAmountValue: number | undefined = undefined;
		if (body?.targetAmount !== undefined) {
			if (typeof body.targetAmount !== 'number' || !isValidNumber(body.targetAmount)) {
				return c.json({error: 'Target amount must be a positive number'}, 400);
			}
			targetAmountValue = body.targetAmount;
		}

		let statusValue: string ='active';
		if (body?.status && typeof body.status === 'string' && body.status.trim()) {
			statusValue = body.status.trim();
		}

		let endDateValue: Date | undefined = undefined;
		if (body?.endDate !== undefined) {
			const parsedDate = new Date(body.endDate);
			if (Number.isNaN(parsedDate.getTime())) {
				return c.json({error: 'Invalid end date'}, 400);
			}
			endDateValue = parsedDate;
		}

		let galleryValue: string[] | undefined = undefined;
		if (body?.gallery !== undefined) {
			if (!Array.isArray(body.gallery)) {
				return c.json({error: 'Gallery must be an array of strings'}, 400);
			}
			galleryValue = body.gallery.filter((item: unknown) => nonEmptyString(item)).map((item: string) => item.trim());
		}


		const [drive] = await db.insert(drives).values({
			title: title.trim(),
			organization: organization.trim(),
			description: description.trim(),
			imageUrl: imageUrl.trim(),
			targetAmount: targetAmountValue,
			status: statusValue,
			endDate: endDateValue,
			gallery: galleryValue
		}).returning();

		return c.json(drive, 201)
	} catch (error) {
		console.error('Error creating drive:', error);
		return c.json({error: 'Internal server error'}, 500);
	}
})

// Submit a donation to a drive
app.post('/donations', async (c) => {
	try {
		const db = getDb(c.env.DATABASE_URL);
		const body = await c.req.json();

		const driveIdParam = body?.driveId;
		if (driveIdParam === undefined) {
			return c.json({error: 'Drive ID is required'}, 400);
		}

		const driveId = typeof driveIdParam === 'string' ? Number.parseInt(driveIdParam, 10) : typeof driveIdParam === 'number' ? driveIdParam : null;
		if (!Number.isFinite(driveId) || driveId === null) {
			return c.json({error: 'Invalid drive ID'}, 400);
		}

		// TypeScript now knows driveId is a number after the null check
		const validDriveId: number = driveId;

		const amount = body?.amount;
		if (!isValidNumber(amount)) {
			return c.json({error: 'Amount must be a positive number'}, 400);
		}

		const [drive] = await db.select().from(drives).where(eq(drives.id, validDriveId)).limit(1);

		if (!drive) {
			return c.json({error: 'Drive not found'}, 404);
		}

    // Use a transaction for donation + updating currentAmount
    const donation = await db.transaction(async (tx) => {
		const [newDonation] = await tx
		  .insert(donations)
		  .values({
			driveId: validDriveId,
			amount,
		  })
		  .returning();
  
		// Ensure currentAmount not null
		const currentAmount =
		  typeof drive.currentAmount === "number" && !isNaN(drive.currentAmount)
			? drive.currentAmount
			: 0;
		await tx
		  .update(drives)
		  .set({ currentAmount: currentAmount + amount })
		  .where(eq(drives.id, validDriveId));
		return newDonation;
	  });
  
	  // Reply with new donation
	  return c.json(donation, 201);
	} catch (error) {
		console.error('Error submitting donation:', error);
		return c.json({error: 'Internal server error'}, 500);
	}
})

// Get donations | with pagination, filtering, and searching
app.get('/doantions', async (c) => {
	try {
		const db = getDb(c.env.DATABASE_URL);

		const driveIdParam = c.req.query('driveId');
		const skip = Math.max(0, parseIntParam(c.req.query("skip"), 0));
		const take = Math.min(100, Math.max(1, parseIntParam(c.req.query("take"), 10)));
		const includeDrive = c.req.query('includeDrive') === 'true';

		let whereCondition = undefined;

		if (driveIdParam) {
		const driveId = Number.parseInt(driveIdParam, 10);
		if (!Number.isFinite(driveId)) {
			return c.json({ error: "Invalid driveId" }, 400);
		}
		whereCondition = eq(donations.driveId, driveId);
		}

		const queryBuilder = whereCondition 
		? db.select().from(donations).where(whereCondition)
		: db.select().from(donations);
		  
		const donationsList = await queryBuilder
			.orderBy(desc(donations.dateDonated))
			.limit(take)
			.offset(skip);

		if (includeDrive && donationsList.length > 0) {
			const driveIds = [
			  ...new Set(donationsList.map((d) => d.driveId).filter((id) => id !== null)),
			];
			  
			if (driveIds.length > 0) {
			  const drivesList = await db
				.select()
				.from(drives)
				.where(inArray(drives.id, driveIds));
			  
			  const drivesMap = new Map(drivesList.map((d) => [d.id, d]));
			  
			  const donationsWithDrives = donationsList.map((donation) => ({
				...donation,
				drive: donation.driveId ? drivesMap.get(donation.driveId) || null : null,
			  }));
			  
			  return c.json(donationsWithDrives, 200);
			}
		  }
	} catch (error) {
		console.error("Error fetching donations:", error);
		return c.json({ error: "Internal server error" }, 500);
	}
})

export default app;	