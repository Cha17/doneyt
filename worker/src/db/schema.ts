import { boolean, integer, pgTable, real, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

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
    userId: uuid('userId').references(() => users.id),
    driveId: integer('driveId').references(() => drives.id),
    amount: real('amount').notNull(),
    dateDonated: timestamp('dateDonated').notNull().defaultNow(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});


export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('emailVerified').notNull().default(false),
    name: text('name'),
    image: text('profilePicture'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})


export const sessions = pgTable('sessions', {
    id: text('id').primaryKey(),
    userId: uuid('userId').references(() => users.id),
    expiresAt: timestamp('expiresAt').notNull(),
    token: text('token').notNull().unique(),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})


export const accounts = pgTable('accounts', {
    id: text('id').primaryKey(),
    userId: uuid('userId').references(() => users.id),
    accountId: text('accountId').notNull(),
    providerId: text('providerId').notNull(),
    refreshToken: text('refreshToken'),
    accessToken: text('accessToken').notNull(),
    expiresAt: timestamp('expiresAt').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verificationCodes = pgTable('verifications', {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    code: text('code').notNull(),
    expiresAt: timestamp('expiresAt').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})