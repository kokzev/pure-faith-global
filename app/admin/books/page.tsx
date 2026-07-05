"use client";
import { useState } from "react";

export default function BookUpload() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const uploadFile = async (f: File) => {
    const formData = new FormData();
    formData.append("file", f);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.error || "File upload failed");
    return data.url as string;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setStatus("Please enter a title");
      return;
    }
    setStatus("Uploading...");
    try {
      let coverImageUrl: string | undefined;
      let fileUrl: string | undefined;

      if (coverFile) coverImageUrl = await uploadFile(coverFile);
      if (bookFile) fileUrl = await uploadFile(bookFile);

      const saveRes = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, description, coverImageUrl, fileUrl }),
      });

      if (!saveRes.ok) {
        setStatus("Failed to save book.");
        return;
      }

      setStatus("Book published!");
      setTitle("");
      setAuthor("");
      setDescription("");
      setCoverFile(null);
      setBookFile(null);
    } catch (err: any) {
      setStatus(err.message || "Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-12 bg-white rounded-3xl shadow-2xl mt-12 border border-gray-100">
      <h1 className="text-4xl font-serif text-center mb-12 text-[#0F2540]">Publish a book</h1>
      <form onSubmit={handleUpload} className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" placeholder="Book title" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" placeholder="Author name" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" placeholder="Short summary" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Cover image</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Book file (PDF, free download)</label>
          <input type="file" accept=".pdf,.epub" onChange={(e) => setBookFile(e.target.files?.[0] || null)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
        </div>

        <button type="submit" className="w-full bg-[#D4AF37] hover:bg-amber-400 py-5 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300">
          Publish book
        </button>

        {status && (<p className="text-center font-medium text-lg mt-4 text-[#0F2540]">{status}</p>)}
      </form>
    </div>
  );
}
