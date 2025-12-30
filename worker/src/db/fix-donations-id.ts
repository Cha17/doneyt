import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({
    path: '.dev.vars',
});

const sql = neon(process.env.DATABASE_URL!);

const main = async () => {
    try {
        console.log("Checking current donations table structure...");
        
        // Check if donations table exists and current id type
        const columnInfo = await sql`
            SELECT data_type, column_default
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'donations'
            AND column_name = 'id';
        `;

        if (columnInfo.length === 0) {
            console.log("Donations table or id column not found. Nothing to fix.");
            return;
        }

        const currentType = columnInfo[0].data_type;
        console.log(`Current id column type: ${currentType}`);

        if (currentType === 'uuid') {
            console.log("Column is already UUID. Nothing to do.");
            return;
        }

        if (currentType !== 'integer') {
            console.log(`Unexpected type: ${currentType}. Aborting.`);
            return;
        }

        console.log("\nConverting donations.id from serial to uuid...");
        console.log("WARNING: This will generate new UUIDs for all existing rows!");
        console.log("Existing integer IDs will be lost.\n");

        // Step 1: Remove the default and sequence dependency
        await sql`ALTER TABLE "donations" ALTER COLUMN "id" DROP DEFAULT;`;
        console.log("✓ Removed default");

        // Step 2: Drop the sequence if it exists
        try {
            await sql`DROP SEQUENCE IF EXISTS donations_id_seq CASCADE;`;
            console.log("✓ Dropped sequence");
        } catch (e) {
            // Sequence might not exist, that's ok
        }

        // Step 3: Add a temporary uuid column
        await sql`ALTER TABLE "donations" ADD COLUMN "id_new" uuid DEFAULT gen_random_uuid() NOT NULL;`;
        console.log("✓ Added temporary uuid column");

        // Step 4: Drop the old id column (CASCADE will handle dependent objects)
        // Note: Foreign keys referencing this column will be dropped and need to be recreated
        await sql`ALTER TABLE "donations" DROP COLUMN "id" CASCADE;`;
        console.log("✓ Dropped old id column");

        // Step 5: Rename the new column
        await sql`ALTER TABLE "donations" RENAME COLUMN "id_new" TO "id";`;
        console.log("✓ Renamed new column to id");

        // Step 6: Make it primary key
        await sql`ALTER TABLE "donations" ADD PRIMARY KEY ("id");`;
        console.log("✓ Added primary key constraint");

        // Step 7: Add default
        await sql`ALTER TABLE "donations" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();`;
        console.log("✓ Set default to gen_random_uuid()");

        console.log("\n✅ Successfully converted donations.id to uuid!");
        console.log("You can now run 'bun run db:push' or 'bun run db:migrate'");

    } catch (error: any) {
        console.error("\n❌ Error converting column:", error.message);
        if (error.code === '42804' || error.code === '42P01') {
            console.error("\nThe column might already be in the correct state, or there might be foreign key constraints.");
        }
        process.exit(1);
    }
}

main();

