"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function MediaUpload() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("article");
  const [content, setContent] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
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
      let url: string | undefined;
      let thumbnailUrl: string | undefined;

      if (file) url = await uploadFile(file);
      if (thumbnailFile) thumbnailUrl = await uploadFile(thumbnailFile);

      const saveRes = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          type,
          url: url || null,
          content: type === "article" ? content : null,
          thumbnailUrl: thumbnailUrl || null,
          embedUrl: embedUrl || null,
        }),
      });

      if (!saveRes.ok) {
        setStatus("Failed to save record.");
        return;
      }

      setStatus("Upload successful!");
      setTitle("");
      setContent("");
      setEmbedUrl("");
      setFile(null);
      setThumbnailFile(null);
    } catch (err: any) {
      setStatus(err.message || "Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-12 bg-white rounded-3xl shadow-2xl mt-12 border border-gray-100">
      <h1 className="text-4xl font-serif text-center mb-12 text-[#0F2540]">Upload media</h1>
      <form onSubmit={handleUpload} className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:border-[#D4AF37] focus:ring-[#D4AF37] text-[#0F2540] bg-white"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white"
          >
            <option value="article">Article</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
        </div>

        {type === "article" && (
          <div>
            <label className="block text-sm font-medium mb-2 text-[#0F2540]">Article content</label>
            <ReactQuill theme="snow" value={content} onChange={setContent} className="bg-white" />
          </div>
        )}

        {type !== "article" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#0F2540]">Upload file</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white"
              />
              <p className="mt-2 text-xs text-gray-400">Or paste an embed link below instead of uploading.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#0F2540]">Embed URL (YouTube, Vimeo, Spotify, SoundCloud)</label>
              <input
                type="text"
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#0F2540]">Thumbnail image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-[#D4AF37] hover:bg-amber-400 py-5 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300"
        >
          Publish
        </button>

        {status && (<p className="text-center font-medium text-lg mt-4 text-[#0F2540]">{status}</p>)}
      </form>
    </div>
  );
}
