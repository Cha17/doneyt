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
        console.log("Marking all migrations as applied...\n");

        // Ensure migrations table exists
        await sql`CREATE TABLE IF NOT EXISTS __drizzle_migrations (
            id SERIAL PRIMARY KEY,
            hash text NOT NULL,
            created_at bigint
        );`;

        // Get all migration files
        const migrationsFolder = path.join(process.cwd(), "drizzle");
        const migrationFiles = fs.readdirSync(migrationsFolder)
            .filter(f => f.endsWith('.sql'))
            .sort();

        console.log(`Found ${migrationFiles.length} migration files:\n`);

        for (const migrationFile of migrationFiles) {
            const migrationPath = path.join(migrationsFolder, migrationFile);
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
            } else {
                console.log(`- ${migrationFile} already marked as applied`);
            }
        }

        console.log("\n✅ All migrations have been marked as applied!");
        console.log("You can now use 'db:push' for future schema changes.");
        console.log("Note: 'db:migrate' will skip these migrations as they're already marked.");

    } catch (error: any) {
        console.error("\n❌ Error:", error.message);
        process.exit(1);
    }
}

main();

