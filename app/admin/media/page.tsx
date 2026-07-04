"use client";
import { useState } from "react";

function detectType(file: File) {
  const mime = file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  const articleExts = ["docx", "doc", "pdf", "txt", "md", "pptx", "xlsx"];
  if (articleExts.includes(ext)) return "article";
  return "article";
}

export default function MediaUpload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a file");
      return;
    }
    const detectedType = detectType(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title || file.name);
    formData.append("type", detectedType);
    setStatus("Uploading...");
    try {
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.url) {
        setStatus(uploadData.error || "Upload failed");
        return;
      }
      const saveRes = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title || file.name, type: detectedType, url: uploadData.url }),
      });
      if (!saveRes.ok) {
        setStatus("Uploaded but failed to save record.");
        return;
      }
      setPreview(uploadData.url);
      setStatus("Upload successful! Detected type: " + detectedType);
    } catch (err) {
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-12 bg-white rounded-3xl shadow-2xl mt-12 border border-gray-100">
      <h1 className="text-4xl font-serif text-center mb-12 text-[#0F2540]">Upload Media</h1>
      <form onSubmit={handleUpload} className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:border-[#D4AF37] focus:ring-[#D4AF37] text-[#0F2540] bg-white placeholder-gray-400"
            placeholder="Enter title" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">File</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-[#D4AF37] file:text-[#0F2540] file:font-medium" />
          <p className="mt-2 text-xs text-gray-400">Type is detected automatically from the file.</p>
        </div>
        <button type="submit" className="w-full bg-[#D4AF37] hover:bg-amber-400 py-5 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300">
          Upload to Public
        </button>
        {status && (
          <p className={"text-center font-medium text-lg mt-4 " + (status.includes("successful") ? "text-green-600" : "text-red-600")}>
            {status}
          </p>
        )}
        {preview && (
          <div className="mt-8 text-center">
            <p className="text-green-600 font-medium">Preview:</p>
            <img src={preview} alt="Preview" className="mt-4 rounded-2xl mx-auto max-h-80 border shadow" />
          </div>
        )}
      </form>
    </div>
  );
}
