import { prisma } from "@/lib/prisma";
import { z } from "zod";

const prayerRequestSchema = z.object({
  name: z.string().trim().max(100).optional(),
  request: z.string().trim().min(5, "Please share a bit more detail.").max(2000),
  honeypot: z.string().optional(),
});

// CREATE prayer request (public)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = prayerRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
        { status: 400 }
      );
    }

    const { name, request, honeypot } = parsed.data;

    // Bot trap: real users never fill this hidden field.
    if (honeypot && honeypot.length > 0) {
      return Response.json({ success: true }); // fake success, nothing saved
    }

    await prisma.prayerRequest.create({
      data: {
        name: name && name.length > 0 ? name : null,
        request,
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("PRAYER REQUEST POST ERROR:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// LIST prayer requests (admin use — lock this down with auth before production)
export async function GET() {
  try {
    const requests = await prisma.prayerRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json(requests);
  } catch (error) {
    console.error("PRAYER REQUEST GET ERROR:", error);
    return Response.json(
      { error: "Failed to fetch prayer requests" },
      { status: 500 }
    );
  }
}
