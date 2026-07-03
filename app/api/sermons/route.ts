import { prisma } from "@/lib/prisma";

// GET all sermons
export async function GET() {
    try {
        const sermons = await prisma.sermon.findMany({
            orderBy: { createdAt: "desc" },
        });
        return Response.json(sermons);
    } catch (error) {
        console.error("SERMONS GET ERROR:", error);
        return Response.json(
            { error: "Failed to fetch sermons" },
            { status: 500 }
        );
    }
}

// CREATE sermon
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const sermon = await prisma.sermon.create({
            data: {
                title: body.title,
                slug: body.slug,
                content: body.content,
                speaker: body.speaker,
                imageUrl: body.imageUrl,
                published: body.published ?? true,
            },
        });
        return Response.json(sermon);
    } catch (error) {
        console.error("SERMONS POST ERROR:", error);
        return Response.json(
            { error: "Failed to create sermon" },
            { status: 500 }
        );
    }
}
