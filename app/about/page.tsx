import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  const aboutPhotoUrl = settings?.aboutPhotoUrl;

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#0F2540] text-white px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Our Story</p>
        <h1 className="font-serif text-5xl mb-6">About Pure Faith Global</h1>
        <p className="max-w-2xl mx-auto text-white/80 text-lg">
          [Placeholder: One or two sentences summarizing the heart and mission of the ministry.]
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-[#0F2540] mb-4">Our Mission</h2>
        <p className="text-[#1B3A5C]/80 leading-relaxed">
          [Placeholder: Describe the mission of Pure Faith Global - who it serves, what it teaches,
          and the transformation it aims to bring. Replace this with your own wording.]
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-[#1B3A5C]/10">
        <h2 className="font-serif text-3xl text-[#0F2540] mb-4">Our Story</h2>
        <p className="text-[#1B3A5C]/80 leading-relaxed">
          [Placeholder: Share how the ministry began - founding year (2020), the calling behind it,
          key milestones, and where it stands today.]
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-[#1B3A5C]/10">
        <div className="grid md:grid-cols-3 gap-4 items-start">
          <div className="md:col-span-1 flex justify-center">
            {aboutPhotoUrl ? (
              <img src={aboutPhotoUrl} alt="William Zion" className="w-40 h-40 rounded-full object-cover" />
            ) : (
              <div className="w-40 h-40 rounded-full bg-[#0F2540]/10 flex items-center justify-center text-[#0F2540]/40 text-sm">
                [Photo]
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl text-[#0F2540] mb-2">Meet William Zion</h2>
            <p className="text-[#1B3A5C]/80 leading-relaxed">
              [Placeholder: Bio of William Zion - background, calling, ministry focus, and
              accomplishments. Replace with the actual bio.]
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-[#1B3A5C]/10">
        <h2 className="font-serif text-3xl text-[#0F2540] mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-[#D4AF37] font-bold uppercase text-xs tracking-widest mb-2">Faith</p>
            <p className="text-[#1B3A5C]/70 text-sm">[Placeholder: short value description]</p>
          </div>
          <div className="text-center">
            <p className="text-[#D4AF37] font-bold uppercase text-xs tracking-widest mb-2">Truth</p>
            <p className="text-[#1B3A5C]/70 text-sm">[Placeholder: short value description]</p>
          </div>
          <div className="text-center">
            <p className="text-[#D4AF37] font-bold uppercase text-xs tracking-widest mb-2">Purity</p>
            <p className="text-[#1B3A5C]/70 text-sm">[Placeholder: short value description]</p>
          </div>
        </div>
      </section>
    </main>
  );
}
