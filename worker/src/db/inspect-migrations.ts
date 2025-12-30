import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({
    path: '.dev.vars',
});

const sql = neon(process.env.DATABASE_URL!);

const main = async () => {
    try {
        console.log("Current state of __drizzle_migrations table:\n");
        
        const migrations = await sql`
            SELECT * FROM __drizzle_migrations ORDER BY created_at;
        `;

        if (migrations.length === 0) {
            console.log("No migrations found in the table.");
        } else {
            console.log(`Found ${migrations.length} migrations:\n`);
            migrations.forEach((migration: any) => {
                console.log(`Hash: ${migration.hash}`);
                console.log(`Created at: ${migration.created_at}`);
                console.log(`ID: ${migration.id}\n`);
            });
        }

    } catch (error: any) {
        console.error("Error:", error.message);
        process.exit(1);
    }
}

main();

