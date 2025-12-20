CREATE TABLE "donation" (
	"id" serial PRIMARY KEY NOT NULL,
	"driveId" integer,
	"amount" integer NOT NULL,
	"dateDonated" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drive" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"organization" text NOT NULL,
	"description" text NOT NULL,
	"currentAmount" integer DEFAULT 0 NOT NULL,
	"targetAmount" integer,
	"status" text DEFAULT 'active' NOT NULL,
	"imageUrl" text NOT NULL,
	"endDate" timestamp,
	"gallery" text[],
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "donation" ADD CONSTRAINT "donation_driveId_drive_id_fk" FOREIGN KEY ("driveId") REFERENCES "public"."drive"("id") ON DELETE no action ON UPDATE no action;