import { prisma } from "@/lib/prisma";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().trim().min(1).max(100),
  message: z.string().trim().min(5).max(1000),
  role: z.string().trim().max(100).optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

// LIST testimonials (public)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json(testimonials);
  } catch (error) {
    console.error("TESTIMONIALS GET ERROR:", error);
    return Response.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// CREATE testimonial (lock behind admin auth before production)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = testimonialSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
        { status: 400 }
      );
    }

    const { name, message, role, imageUrl } = parsed.data;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        message,
        role: role && role.length > 0 ? role : null,
        imageUrl: imageUrl && imageUrl.length > 0 ? imageUrl : null,
      },
    });

    return Response.json(testimonial);
  } catch (error) {
    console.error("TESTIMONIALS POST ERROR:", error);
    return Response.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
