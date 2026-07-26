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

    // Notify by email, best-effort - does not block or fail the request if it errors
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "97412ecf-2362-489b-83cc-849ad95b7508",
          subject: `New Prayer Request from ${name || "Anonymous"}`,
          from_name: "Pure Faith Global Website",
          name: name || "Anonymous",
          email: "noreply@purefaithglobal.org",
          message: request,
        }),
      });
    } catch (notifyError) {
      console.error("Prayer Request Notification Error:", notifyError);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("PRAYER REQUEST POST ERROR:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// LIST prayer requests (admin use - lock this down with auth before production)
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
