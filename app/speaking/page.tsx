import { prisma } from "@/lib/prisma";
import SpeakingRequestForm from "@/components/speaking/SpeakingRequestForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book William Zion to Speak",
  description: "Invite William Zion to speak at your church, conference, or event. Learn about his speaking topics and submit a booking request today.",
};

export default async function SpeakingPage() {
  const s = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#0F2540] text-white px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Invite William Zion</p>
        <h1 className="font-serif text-5xl mb-6">Book William Zion to Speak</h1>
        <p className="max-w-2xl mx-auto text-white/80 text-lg">
          {s?.speakingHeroText || "[Placeholder: intro line inviting churches and organizations to book William Zion.]"}
        </p>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 flex justify-center">
            {s?.speakingPhotoUrl ? (
              <img src={s.speakingPhotoUrl} alt="William Zion" className="w-40 h-40 rounded-full object-cover" />
            ) : (
              <div className="w-40 h-40 rounded-full bg-[#0F2540]/10 flex items-center justify-center text-[#0F2540]/40 text-sm">
                [Photo]
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <p className="text-[#1B3A5C]/80 leading-relaxed whitespace-pre-line">
              {s?.speakingBioText || "[Placeholder: short bio establishing credibility as a speaker.]"}
            </p>
          </div>
        </div>
      </section>
      {s?.speakingTopicsText && (
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-[#1B3A5C]/10">
          <h2 className="font-serif text-2xl text-[#0F2540] mb-4 text-center">Speaking Topics</h2>
          <p className="text-[#1B3A5C]/80 leading-relaxed whitespace-pre-line text-center">
            {s.speakingTopicsText}
          </p>
        </section>
      )}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-[#1B3A5C]/10">
        <h2 className="font-serif text-3xl text-[#0F2540] mb-8 text-center">Invite Him to Speak</h2>
        <SpeakingRequestForm />
      </section>
    </main>
  );
}
