"use client";
import { useState, useEffect } from "react";

import ArticleEditor from "@/components/admin/ArticleEditor";



type MediaItem = {
  id: string;
  title: string;
  type: string;
  url: string | null;
  content: string | null;
  thumbnailUrl: string | null;
  embedUrl: string | null;
};

export default function MediaUpload() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("article");
  const [content, setContent] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [existingUrl, setExistingUrl] = useState("");
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [items, setItems] = useState<MediaItem[]>([]);

  const loadItems = async () => {
    const res = await fetch("/api/media");
    const data = await res.json();
    setItems(data.media || []);
  };

  useEffect(() => { loadItems(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setType("article");
    setContent("");
    setEmbedUrl("");
    setExistingUrl("");
    setExistingThumbnail("");
    setFile(null);
    setThumbnailFile(null);
  };

  const startEdit = (item: MediaItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setType(item.type);
    setContent(item.content || "");
    setEmbedUrl(item.embedUrl || "");
    setExistingUrl(item.url || "");
    setExistingThumbnail(item.thumbnailUrl || "");
    setFile(null);
    setThumbnailFile(null);
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
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
      let url = existingUrl || undefined;
      let thumbnailUrl = existingThumbnail || undefined;

      if (file) url = await uploadFile(file);
      if (thumbnailFile) thumbnailUrl = await uploadFile(thumbnailFile);

      const payload = {
        title,
        type,
        url: url || null,
        content: type === "article" ? content : null,
        thumbnailUrl: thumbnailUrl || null,
        embedUrl: embedUrl || null,
      };

      const res = await fetch(editingId ? `/api/media/${editingId}` : "/api/media", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setStatus("Failed to save.");
        return;
      }

      setStatus(editingId ? "Updated!" : "Upload successful!");
      resetForm();
      loadItems();
    } catch (err: any) {
      setStatus(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-12 bg-white rounded-3xl shadow-2xl mt-12 border border-gray-100">
      <h1 className="text-4xl font-serif text-center mb-12 text-[#0F2540]">
        {editingId ? "Edit media" : "Upload media"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" placeholder="Enter title" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white">
            <option value="article">Article</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
        </div>

        {type === "article" && (
          <div>
            <label className="block text-sm font-medium mb-2 text-[#0F2540]">Article content</label>
            <ArticleEditor value={content} onChange={setContent} />
          </div>
        )}

        {type !== "article" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#0F2540]">Upload file</label>
              <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
              {existingUrl && !file && (<p className="mt-2 text-xs text-gray-400">Current file kept unless you choose a new one.</p>)}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#0F2540]">Embed URL (YouTube, Vimeo, Spotify, SoundCloud)</label>
              <input type="text" value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" placeholder="https://youtube.com/watch?v=..." />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#0F2540]">Thumbnail image (optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
              {existingThumbnail && !thumbnailFile && (<p className="mt-2 text-xs text-gray-400">Current thumbnail kept unless you choose a new one.</p>)}
            </div>
          </>
        )}

        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-[#D4AF37] hover:bg-amber-400 py-5 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300">
            {editingId ? "Save changes" : "Publish"}
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

      <h2 className="text-2xl font-serif text-[#0F2540] mb-6">Uploaded items</h2>
      <div className="space-y-3">
        {items.length === 0 && (<p className="text-gray-400 text-sm">Nothing uploaded yet.</p>)}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border border-gray-200 rounded-xl px-5 py-3">
            <div>
              <p className="font-medium text-[#0F2540]">{item.title}</p>
              <p className="text-xs uppercase tracking-widest text-[#D4AF37]">{item.type}</p>
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
