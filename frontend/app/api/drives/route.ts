import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const runtime = "bun";

// This function tries to turn the input value into an integer.
// If it can't, it returns the fallback number you give.
function parseIntParam(value: string | null, fallback: number) {
    if (!value) return fallback;
    const n = Number.parseInt(value, 10);
    return Number.isFinite(n) ? n : fallback;
}

// Checks if a value is a string and not just empty or whitespace.
// function nonEmptyString(value: unknown): value is string {
//   return typeof value === "string" && value.trim().length > 0;
// }


export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const status = url.searchParams.get("status") ?? undefined;
        const q = url.searchParams.get("q") ?? undefined;
        // "skip" min=0, "take" between 1 and 100 (sane defaults)
        const skip = Math.max(0, parseIntParam(url.searchParams.get("skip"), 0));
        const take = Math.min(100, Math.max(1, parseIntParam(url.searchParams.get("take"), 20)));

        // avoid 'any', type: Record<string, unknown>
        const where: Record<string, unknown> = {};

        if (status && status.trim()) {
            where.status = status.trim();
        }

        if (q && q.trim()) {
            where.OR = [
                { title: { contains: q.trim(), mode: "insensitive" } },
                { organization: { contains: q.trim(), mode: "insensitive" } },
            ];
        }

        const drives = await prisma.drive.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take,
        });

        return NextResponse.json({ drives }, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, organization, description, targetAmount, imageUrl, endDate, gallery } = body;

        if (!title || !organization || !description || !imageUrl) {
            return new Response("Missing required fields", { status: 400 });
        }

        const drive = await prisma.drive.create({
            data: { title, organization, description, targetAmount, imageUrl, endDate, gallery },
        });

        return NextResponse.json({drive}, {status: 201});
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}