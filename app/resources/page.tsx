import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="font-serif text-4xl text-[#0F2540]">Resources</h1>
        <p className="mt-4 text-[#1B3A5C]/70">
          Teachings, articles, and media from Pure Faith Global.
        </p>
      </div>

      {media.length === 0 ? (
        <p className="text-center text-[#1B3A5C]/60">
          No resources have been uploaded yet.
        </p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <article key={item.id} className="rounded-lg border border-[#1B3A5C]/10 p-6">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                {item.type}
              </span>
              <h2 className="mt-2 font-serif text-xl text-[#0F2540]">{item.title}</h2>

              {item.type === "video" && (
                <video controls className="mt-4 w-full rounded" src={item.url} />
              )}
              {item.type === "audio" && (
                <audio controls className="mt-4 w-full" src={item.url} />
              )}
              {item.type === "image" && (
                <img src={item.url} alt={item.title} className="mt-4 w-full rounded" />
              )}
              {item.type === "article" && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-serif text-[#D4AF37] hover:underline"
                >
                  Read Article →
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}