import { prisma } from "@/lib/prisma";
import { z } from "zod";

const mediaSchema = z.object({
  title: z.string().trim().min(1).max(200),
  url: z.string().url(),
  type: z.enum(["image", "video", "audio", "article"]),
});

// LIST media (public)
export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json(media);
  } catch (error) {
    console.error("MEDIA GET ERROR:", error);
    return Response.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

// CREATE media record (lock behind admin auth before production)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = mediaSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
        { status: 400 }
      );
    }

    const media = await prisma.media.create({ data: parsed.data });
    return Response.json(media);
  } catch (error) {
    console.error("MEDIA POST ERROR:", error);
    return Response.json({ error: "Failed to create media record" }, { status: 500 });
  }
}
