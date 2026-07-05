"use client";
import { useState, useEffect } from "react";

type BookItem = {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  coverImageUrl: string | null;
  fileUrl: string | null;
};

export default function BookUpload() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [existingCover, setExistingCover] = useState("");
  const [existingFile, setExistingFile] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [items, setItems] = useState<BookItem[]>([]);

  const loadItems = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setItems(data.books || []);
  };

  useEffect(() => { loadItems(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setAuthor("");
    setDescription("");
    setExistingCover("");
    setExistingFile("");
    setCoverFile(null);
    setBookFile(null);
  };

  const startEdit = (item: BookItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setAuthor(item.author || "");
    setDescription(item.description || "");
    setExistingCover(item.coverImageUrl || "");
    setExistingFile(item.fileUrl || "");
    setCoverFile(null);
    setBookFile(null);
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this book? This cannot be undone.")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    if (editingId === id) resetForm();
    loadItems();
  };

  const uploadFile = async (f: File) => {
    const formData = new FormData();
    formData.append("file", f);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.error || "File upload failed");
    return data.url as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setStatus("Please enter a title");
      return;
    }
    setStatus(editingId ? "Saving..." : "Uploading...");
    try {
      let coverImageUrl = existingCover || undefined;
      let fileUrl = existingFile || undefined;

      if (coverFile) coverImageUrl = await uploadFile(coverFile);
      if (bookFile) fileUrl = await uploadFile(bookFile);

      const payload = { title, author, description, coverImageUrl, fileUrl };

      const res = await fetch(editingId ? `/api/books/${editingId}` : "/api/books", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setStatus("Failed to save.");
        return;
      }

      setStatus(editingId ? "Updated!" : "Book published!");
      resetForm();
      loadItems();
    } catch (err: any) {
      setStatus(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-12 bg-white rounded-3xl shadow-2xl mt-12 border border-gray-100">
      <h1 className="text-4xl font-serif text-center mb-12 text-[#0F2540]">
        {editingId ? "Edit book" : "Publish a book"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
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
          {existingCover && !coverFile && (<p className="mt-2 text-xs text-gray-400">Current cover kept unless you choose a new one.</p>)}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Book file (PDF, free download)</label>
          <input type="file" accept=".pdf,.epub" onChange={(e) => setBookFile(e.target.files?.[0] || null)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
          {existingFile && !bookFile && (<p className="mt-2 text-xs text-gray-400">Current file kept unless you choose a new one.</p>)}
        </div>

        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-[#D4AF37] hover:bg-amber-400 py-5 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300">
            {editingId ? "Save changes" : "Publish book"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-8 py-5 rounded-2xl border border-gray-300 text-[#0F2540] font-medium">
              Cancel
            </button>
          )}
        </div>

        {status && (<p className="text-center font-medium text-lg mt-4 text-[#0F2540]">{status}</p>)}
      </form>

      <hr className="my-12 border-gray-200" />

      <h2 className="text-2xl font-serif text-[#0F2540] mb-6">Published books</h2>
      <div className="space-y-3">
        {items.length === 0 && (<p className="text-gray-400 text-sm">Nothing published yet.</p>)}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border border-gray-200 rounded-xl px-5 py-3">
            <div>
              <p className="font-medium text-[#0F2540]">{item.title}</p>
              {item.author && (<p className="text-xs text-gray-400">{item.author}</p>)}
            </div>
            <div className="flex gap-3">
              <button onClick={() => startEdit(item)} className="text-sm font-medium text-[#0F2540] underline">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-sm font-medium text-red-600 underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
