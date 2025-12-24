import { integer, pgTable, real, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const drives = pgTable('drives', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    organization: text('organization').notNull(),
    description: text('description').notNull(),
    currentAmount: real('currentAmount').notNull().default(0),
    targetAmount: real('targetAmount'),
    status: text('status').notNull().default('active'),
    imageUrl: text('imageUrl').notNull(),
    endDate: timestamp('endDate'),
    gallery: text('gallery').array(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});


export const donations = pgTable('donations', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    driveId: integer('driveId').references(() => drives.id),
    amount: real('amount').notNull(),
    dateDonated: timestamp('dateDonated').notNull().defaultNow(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});