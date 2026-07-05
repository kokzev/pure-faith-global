import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="font-serif text-4xl text-[#0F2540]">Books</h1>
        <p className="mt-4 text-[#1B3A5C]/70">Free resources from Pure Faith Global.</p>
      </div>

      {books.length === 0 ? (
        <p className="text-center text-[#1B3A5C]/60">No books have been published yet.</p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book.id} className="pf-book-card text-center">
              {book.coverImageUrl && (
                <div className="pf-book-cover mx-auto mb-4 w-40 h-56 overflow-hidden rounded shadow-lg">
                  <img src={book.coverImageUrl} alt={book.title} className="pf-book-img w-full h-full object-cover" />
                </div>
              )}
              <h2 className="font-serif text-lg text-[#0F2540]">{book.title}</h2>
              {book.author && (<p className="text-sm text-[#1B3A5C]/60">{book.author}</p>)}
              {book.description && (<p className="mt-2 text-sm text-[#1B3A5C]/70">{book.description}</p>)}
              {book.fileUrl && (
                <a href={book.fileUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-block font-serif text-[#D4AF37] hover:underline">
                  Read Free ?
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .pf-book-cover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .pf-book-card:hover .pf-book-cover { transform: translateY(-6px) scale(1.03); box-shadow: 0 12px 24px rgba(212,175,55,0.35); }
        .pf-book-img { transition: transform 0.5s ease; }
        .pf-book-card:hover .pf-book-img { transform: scale(1.08); }
      `}</style>
    </main>
  );
}
