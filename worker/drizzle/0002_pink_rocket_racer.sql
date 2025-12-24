ALTER TABLE "donation" RENAME TO "donations";--> statement-breakpoint
ALTER TABLE "drive" RENAME TO "drives";--> statement-breakpoint
ALTER TABLE "donations" DROP CONSTRAINT "donation_driveId_drive_id_fk";
--> statement-breakpoint
ALTER TABLE "donations" ADD CONSTRAINT "donations_driveId_drives_id_fk" FOREIGN KEY ("driveId") REFERENCES "public"."drives"("id") ON DELETE no action ON UPDATE no action;