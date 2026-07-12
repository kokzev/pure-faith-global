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

const FILTERS = [
  { label: "All", value: undefined },
  { label: "Articles", value: "article" },
  { label: "Videos", value: "video" },
  { label: "Audios", value: "audio" },
];

export default async function ResourcesPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const media = await prisma.media.findMany({
    where: type ? { type } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const articles = media.filter((m) => m.type === "article");
  const others = media.filter((m) => m.type !== "article");

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h1 className="font-serif text-4xl text-[#0F2540]">Resources</h1>
        <p className="mt-4 text-[#1B3A5C]/70">Teachings, articles, and media from Pure Faith Global.</p>
      </div>

      <div className="flex justify-center gap-3 mb-16 flex-wrap">
        {FILTERS.map((f) => {
          const href = f.value ? `/resources?type=${f.value}` : "/resources";
          const active = (type || undefined) === f.value;
          return (
            <a key={f.label} href={href}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                active ? "bg-[#0F2540] text-white border-[#0F2540]" : "text-[#0F2540] border-[#1B3A5C]/20 hover:border-[#D4AF37]"
              }`}>
              {f.label}
            </a>
          );
        })}
      </div>

      {media.length === 0 && (<p className="text-center text-[#1B3A5C]/60">No resources found.</p>)}

      {articles.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-20 mb-20">
          {articles.map((item) => (
            <article key={item.id} className="border-b border-[#1B3A5C]/10 pb-16 last:border-b-0">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Article</span>
              <h2 className="mt-3 font-serif text-3xl text-[#0F2540] leading-snug">{item.title}</h2>
              {item.content && (
                <div
                  className="article-content mt-6 text-[17px] leading-[1.8] text-[#1B3A5C]"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )}
            </article>
          ))}
        </div>
      )}

      {others.length > 0 && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => {
            const embedSrc = item.embedUrl ? getEmbedUrl(item.embedUrl) : null;
            const cover = item.thumbnailUrl || item.url;

            return (
              <article key={item.id} className="pf-card rounded-xl border border-[#1B3A5C]/10 overflow-hidden">
                {cover && item.type !== "video" && (
                  <div className="pf-thumb relative h-40 bg-[#0F2540] overflow-hidden">
                    <img src={cover} alt={item.title} className="pf-thumb-img w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-6">
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">{item.type}</span>
                  <h2 className="mt-2 font-serif text-xl text-[#0F2540]">{item.title}</h2>

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
        .article-content p { margin-bottom: 1.25em; }
        .article-content h1, .article-content h2, .article-content h3 { font-weight: 700; color: #0F2540; margin-top: 1.5em; margin-bottom: 0.5em; }
        .article-content ul, .article-content ol { margin: 1em 0; padding-left: 1.5em; }
        .article-content li { margin-bottom: 0.5em; }
        .article-content a { color: #D4AF37; text-decoration: underline; }
        .article-content strong { font-weight: 700; color: #0F2540; }
        .article-content blockquote { border-left: 3px solid #D4AF37; padding-left: 1em; font-style: italic; color: #1B3A5C99; margin: 1.5em 0; }
      `}</style>
    </main>
  );
}
