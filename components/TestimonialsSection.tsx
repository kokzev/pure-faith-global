import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-[#0F2540] px-6 py-20">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="font-serif text-4xl text-white">Testimonials</h2>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <blockquote
            key={t.id}
            className="rounded-lg border border-[#D4AF37]/20 bg-[#1B3A5C] p-6"
          >
            <p className="text-white/90">&ldquo;{t.message}&rdquo;</p>
            <footer className="mt-4 font-serif text-[#D4AF37]">
              {t.name}
              {t.role && <span className="text-white/50"> — {t.role}</span>}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
