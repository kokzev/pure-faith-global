import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TelevisionPage() {
  const sermons = await prisma.sermon.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="font-serif text-4xl text-[#0F2540]">Television</h1>
        <p className="mt-4 text-[#1B3A5C]/70">
          Watch and revisit messages from Pure Faith Global.
        </p>
      </div>

      {sermons.length === 0 ? (
        <p className="text-center text-[#1B3A5C]/60">
          No messages have been posted yet. Check back soon.
        </p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <article
              key={sermon.id}
              className="overflow-hidden rounded-lg border border-[#1B3A5C]/10 bg-white shadow-sm transition hover:shadow-md"
            >
              {sermon.imageUrl ? (
                <img
                  src={sermon.imageUrl}
                  alt={sermon.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-[#0F2540]">
                  <span className="font-serif text-[#D4AF37]">Pure Faith Global</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="font-serif text-xl text-[#0F2540]">{sermon.title}</h2>
                {sermon.speaker && (
                  <p className="mt-1 text-sm text-[#1B3A5C]/60">{sermon.speaker}</p>
                )}
                <p className="mt-3 line-clamp-3 text-[#1B3A5C]/80">{sermon.content}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
