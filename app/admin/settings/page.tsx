"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [aboutPhotoUrl, setAboutPhotoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setAboutPhotoUrl(data.settings?.aboutPhotoUrl || ""));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      let url = aboutPhotoUrl;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.url) throw new Error(uploadData.error || "Upload failed");
        url = uploadData.url;
      }

      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aboutPhotoUrl: url }),
      });

      if (!res.ok) throw new Error("Failed to save");
      setAboutPhotoUrl(url);
      setFile(null);
      setStatus("Saved!");
    } catch (err: any) {
      setStatus(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-12 bg-white rounded-3xl shadow-2xl mt-12 border border-gray-100">
      <h1 className="text-4xl font-serif text-center mb-12 text-[#0F2540]">Site settings</h1>
      <form onSubmit={handleSave} className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">About page photo</label>
          {aboutPhotoUrl && (<img src={aboutPhotoUrl} alt="Current" className="w-32 h-32 rounded-full object-cover mb-4" />)}
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
        </div>
        <button type="submit" className="w-full bg-[#D4AF37] hover:bg-amber-400 py-5 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300">
          Save
        </button>
        {status && (<p className="text-center font-medium text-lg mt-4 text-[#0F2540]">{status}</p>)}
      </form>
    </div>
  );
}
