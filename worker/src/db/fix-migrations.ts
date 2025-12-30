import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

config({
    path: '.dev.vars',
});

const sql = neon(process.env.DATABASE_URL!);

const main = async () => {
    try {
        console.log("Checking database state...\n");

        // Step 1: Check if donations table exists and its structure
        const donationsExists = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'donations'
            );
        `;

        const donationExists = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'donation'
            );
        `;

        console.log(`"donation" table exists: ${donationExists[0].exists}`);
        console.log(`"donations" table exists: ${donationsExists[0].exists}\n`);

        if (!donationsExists[0].exists && !donationExists[0].exists) {
            console.log("Neither table exists. Please run migrations from the beginning.");
            return;
        }

        const tableName = donationsExists[0].exists ? 'donations' : 'donation';
        console.log(`Working with table: "${tableName}"\n`);

        // Step 2: Check id column type
        const idColumn = await sql`
            SELECT data_type, column_default
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = ${tableName}
            AND column_name = 'id';
        `;

        if (idColumn.length === 0) {
            console.log("id column not found!");
            return;
        }

        const idType = idColumn[0].data_type;
        console.log(`id column type: ${idType}`);

        // Step 3: Check amount column type
        const amountColumn = await sql`
            SELECT data_type
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = ${tableName}
            AND column_name = 'amount';
        `;

        if (amountColumn.length === 0) {
            console.log("amount column not found!");
            return;
        }

        const amountType = amountColumn[0].data_type;
        console.log(`amount column type: ${amountType}\n`);

        // Step 4: Check migrations table
        const migrationsTableExists = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = '__drizzle_migrations'
            );
        `;

        if (!migrationsTableExists[0].exists) {
            await sql`CREATE TABLE IF NOT EXISTS __drizzle_migrations (
                id SERIAL PRIMARY KEY,
                hash text NOT NULL,
                created_at bigint
            );`;
            console.log("Created __drizzle_migrations table\n");
        }

        // Step 5: Apply fixes if needed
        const fixes: string[] = [];

        // Fix 1: Apply migration 0001 changes if needed (convert amount to real)
        if (amountType === 'integer' || amountType === 'numeric') {
            console.log("Applying migration 0001 fix: Converting amount to real...");
            await sql.unsafe(`ALTER TABLE "${tableName}" ALTER COLUMN "amount" SET DATA TYPE real;`);
            
            // Also fix drives/drive table if needed
            const drivesTableExists = await sql`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'drives'
                );
            `;
            
            const driveTableExists = await sql`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'drive'
                );
            `;
            
            const drivesTableName = drivesTableExists[0].exists ? 'drives' : (driveTableExists[0].exists ? 'drive' : null);
            
            if (drivesTableName) {
                const drivesAmountColumns = await sql.unsafe(`
                    SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                    AND table_name = '${drivesTableName}'
                    AND column_name IN ('currentAmount', 'targetAmount');
                `);
                
                for (const col of drivesAmountColumns as any[]) {
                    if (col.data_type === 'integer' || col.data_type === 'numeric') {
                        await sql.unsafe(`ALTER TABLE "${drivesTableName}" ALTER COLUMN "${col.column_name}" SET DATA TYPE real;`);
                    }
                }
            }
            
            fixes.push("Applied migration 0001 changes (amount -> real)");
        }

        // Fix 2: Convert id from serial to uuid if needed
        if (idType === 'integer') {
            console.log("\nConverting id from serial to uuid...");
            console.log("WARNING: This will generate new UUIDs for all existing rows!\n");

            // Remove default
            await sql.unsafe(`ALTER TABLE "${tableName}" ALTER COLUMN "id" DROP DEFAULT;`);
            
            // Drop sequence
            try {
                await sql.unsafe(`DROP SEQUENCE IF EXISTS ${tableName}_id_seq CASCADE;`);
            } catch (e) {
                // Ignore if sequence doesn't exist
            }

            // Add temporary uuid column
            await sql.unsafe(`ALTER TABLE "${tableName}" ADD COLUMN "id_new" uuid DEFAULT gen_random_uuid() NOT NULL;`);

            // Drop old id column (CASCADE will handle dependencies)
            await sql.unsafe(`ALTER TABLE "${tableName}" DROP COLUMN "id" CASCADE;`);

            // Rename new column
            await sql.unsafe(`ALTER TABLE "${tableName}" RENAME COLUMN "id_new" TO "id";`);

            // Add primary key
            await sql.unsafe(`ALTER TABLE "${tableName}" ADD PRIMARY KEY ("id");`);

            // Add default
            await sql.unsafe(`ALTER TABLE "${tableName}" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();`);

            fixes.push("Converted id from serial to uuid");
        }

        // Step 6: Mark migrations as applied if fixes were applied
        if (fixes.length > 0) {
            console.log("\nMarking migrations as applied...");
            
            const migrationsFolder = path.join(process.cwd(), "drizzle");
            const migrationFiles = [
                "0001_faithful_mathemanic.sql",
                "0003_mixed_the_anarchist.sql"
            ];

            for (const migrationFile of migrationFiles) {
                const migrationPath = path.join(migrationsFolder, migrationFile);
                if (fs.existsSync(migrationPath)) {
                    const content = fs.readFileSync(migrationPath, "utf-8");
                    const hash = crypto.createHash("sha256").update(content).digest("hex");
                    
                    // Check if already exists
                    const existing = await sql`
                        SELECT * FROM __drizzle_migrations WHERE hash = ${hash};
                    `;

                    if (existing.length === 0) {
                        await sql`
                            INSERT INTO __drizzle_migrations (hash, created_at)
                            VALUES (${hash}, ${Date.now()});
                        `;
                        console.log(`✓ Marked ${migrationFile} as applied`);
                    }
                }
            }
        }

        console.log("\n✅ Fixes applied:");
        fixes.forEach(fix => console.log(`  - ${fix}`));
        console.log("\nYou can now run 'bun run db:push' or 'bun run db:migrate'");

    } catch (error: any) {
        console.error("\n❌ Error:", error.message);
        process.exit(1);
    }
}

main();

