import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  if (url.includes("open.spotify.com")) {
    return url.replace("open.spotify.com/", "open.spotify.com/embed/");
  }

  if (url.includes("soundcloud.com")) {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;
  }

  return null;
}

export default async function ResourcesPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="font-serif text-4xl text-[#0F2540]">Resources</h1>
        <p className="mt-4 text-[#1B3A5C]/70">Teachings, articles, and media from Pure Faith Global.</p>
      </div>

      {media.length === 0 ? (
        <p className="text-center text-[#1B3A5C]/60">No resources have been uploaded yet.</p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => {
            const embedSrc = item.embedUrl ? getEmbedUrl(item.embedUrl) : null;
            const cover = item.thumbnailUrl || item.url;

            return (
              <article key={item.id} className="pf-card rounded-xl border border-[#1B3A5C]/10 overflow-hidden">
                {item.type !== "article" && cover && item.type !== "video" && (
                  <div className="pf-thumb relative h-40 bg-[#0F2540] overflow-hidden">
                    <img src={cover} alt={item.title} className="pf-thumb-img w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-6">
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">{item.type}</span>
                  <h2 className="mt-2 font-serif text-xl text-[#0F2540]">{item.title}</h2>

                  {item.type === "article" && item.content && (
                    <div
                      className="mt-4 prose prose-sm max-w-none text-[#1B3A5C]"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  )}

                  {item.type === "video" && embedSrc && (
                    <div className="mt-4 aspect-video">
                      <iframe src={embedSrc} className="w-full h-full rounded" allowFullScreen />
                    </div>
                  )}
                  {item.type === "video" && !embedSrc && item.url && (
                    <video controls poster={item.thumbnailUrl || undefined} className="mt-4 w-full rounded" src={item.url} />
                  )}

                  {item.type === "audio" && embedSrc && (
                    <iframe src={embedSrc} className="mt-4 w-full h-20 rounded" allow="autoplay" />
                  )}
                  {item.type === "audio" && !embedSrc && item.url && (
                    <audio controls className="mt-4 w-full" src={item.url} />
                  )}

                  {item.type === "image" && item.url && !item.thumbnailUrl && (
                    <img src={item.url} alt={item.title} className="mt-4 w-full rounded" />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <style>{`
        .pf-card { transition: border-color 0.25s ease, transform 0.25s ease; }
        .pf-card:hover { border-color: #D4AF37; transform: translateY(-4px); }
        .pf-thumb-img { transition: transform 0.5s ease; }
        .pf-card:hover .pf-thumb-img { transform: scale(1.08); }
      `}</style>
    </main>
  );
}
