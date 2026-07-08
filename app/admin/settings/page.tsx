"use client";
import { useState, useEffect } from "react";

type Settings = Record<string, string | null>;
type PageKey = "about" | "programs" | "speaking" | "academy" | "store";

const PAGES: { key: PageKey; label: string }[] = [
  { key: "about", label: "About" },
  { key: "programs", label: "Programs" },
  { key: "speaking", label: "Speaking" },
  { key: "academy", label: "Academy" },
  { key: "store", label: "Store" },
];

function Text({ label, field, settings, setField }: { label: string; field: string; settings: Settings; setField: (k: string, v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-[#0F2540]">{label}</label>
      <textarea value={settings[field] || ""} onChange={(e) => setField(field, e.target.value)} rows={3}
        className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
    </div>
  );
}

function Input({ label, field, settings, setField }: { label: string; field: string; settings: Settings; setField: (k: string, v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-[#0F2540]">{label}</label>
      <input type="text" value={settings[field] || ""} onChange={(e) => setField(field, e.target.value)}
        className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
    </div>
  );
}

function ImageInput({ label, field, settings, setFileField }: { label: string; field: string; settings: Settings; setFileField: (k: string, f: File | null) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-[#0F2540]">{label}</label>
      {settings[field] && (<img src={settings[field]!} alt="" className="w-24 h-24 rounded-lg object-cover mb-2" />)}
      <input type="file" accept="image/*" onChange={(e) => setFileField(field, e.target.files?.[0] || null)}
        className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
    </div>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState<PageKey>("about");
  const [settings, setSettings] = useState<Settings>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data.settings || {}));
  }, []);

  const setField = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const setFileField = (key: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const uploadFile = async (f: File) => {
    const formData = new FormData();
    formData.append("file", f);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
    return data.url as string;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const updated = { ...settings };
      for (const key of Object.keys(files)) {
        const file = files[key];
        if (file) updated[key] = await uploadFile(file);
      }
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSettings(updated);
      setFiles({});
      setStatus("Saved!");
    } catch (err: any) {
      setStatus(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 mb-12 flex gap-8 px-6">
      <aside className="w-56 shrink-0">
        <h1 className="text-xl font-serif text-[#0F2540] mb-6">Site content</h1>
        <nav className="space-y-1">
          {PAGES.map((p) => (
            <button key={p.key} type="button" onClick={() => setActive(p.key)}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                active === p.key ? "bg-[#0F2540] text-white" : "text-[#0F2540] hover:bg-gray-100"
              }`}>
              {p.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
        <form onSubmit={handleSave} className="space-y-6">
          <h2 className="text-2xl font-serif text-[#0F2540] mb-2">
            {PAGES.find((p) => p.key === active)?.label}
          </h2>

          {active === "about" && (<>
            <ImageInput label="Photo" field="aboutPhotoUrl" settings={settings} setFileField={setFileField} />
            <Text label="Hero text" field="aboutHeroText" settings={settings} setField={setField} />
            <Text label="Mission text" field="aboutMissionText" settings={settings} setField={setField} />
            <Text label="Story text" field="aboutStoryText" settings={settings} setField={setField} />
            <Text label="Bio text" field="aboutBioText" settings={settings} setField={setField} />
            <Input label="Value 1 title" field="aboutValue1Title" settings={settings} setField={setField} />
            <Text label="Value 1 text" field="aboutValue1Text" settings={settings} setField={setField} />
            <Input label="Value 2 title" field="aboutValue2Title" settings={settings} setField={setField} />
            <Text label="Value 2 text" field="aboutValue2Text" settings={settings} setField={setField} />
            <Input label="Value 3 title" field="aboutValue3Title" settings={settings} setField={setField} />
            <Text label="Value 3 text" field="aboutValue3Text" settings={settings} setField={setField} />
          </>)}

          {active === "programs" && (<>
            <Text label="Hero text" field="programsHeroText" settings={settings} setField={setField} />
            <Input label="Program 1 title" field="program1Title" settings={settings} setField={setField} />
            <Text label="Program 1 description" field="program1Description" settings={settings} setField={setField} />
            <ImageInput label="Program 1 image" field="program1ImageUrl" settings={settings} setFileField={setFileField} />
            <Input label="Program 2 title" field="program2Title" settings={settings} setField={setField} />
            <Text label="Program 2 description" field="program2Description" settings={settings} setField={setField} />
            <ImageInput label="Program 2 image" field="program2ImageUrl" settings={settings} setFileField={setFileField} />
            <Input label="Program 3 title" field="program3Title" settings={settings} setField={setField} />
            <Text label="Program 3 description" field="program3Description" settings={settings} setField={setField} />
            <ImageInput label="Program 3 image" field="program3ImageUrl" settings={settings} setFileField={setFileField} />
          </>)}

          {active === "speaking" && (<>
            <Text label="Hero text" field="speakingHeroText" settings={settings} setField={setField} />
            <Text label="Bio text" field="speakingBioText" settings={settings} setField={setField} />
            <ImageInput label="Photo" field="speakingPhotoUrl" settings={settings} setFileField={setFileField} />
            <Text label="Topics" field="speakingTopicsText" settings={settings} setField={setField} />
            <Input label="Booking link" field="speakingBookingLink" settings={settings} setField={setField} />
          </>)}

          {active === "academy" && (<>
            <Text label="Hero text" field="academyHeroText" settings={settings} setField={setField} />
            <Text label="Description" field="academyDescriptionText" settings={settings} setField={setField} />
            <ImageInput label="Photo" field="academyPhotoUrl" settings={settings} setFileField={setFileField} />
            <Input label="Enroll link" field="academyEnrollLink" settings={settings} setField={setField} />
          </>)}

          {active === "store" && (<>
            <Text label="Hero text" field="storeHeroText" settings={settings} setField={setField} />
            <Text label="Description" field="storeDescriptionText" settings={settings} setField={setField} />
            <Input label="Link type (give / books / external)" field="storeLinkType" settings={settings} setField={setField} />
            <Input label="External URL (if applicable)" field="storeExternalUrl" settings={settings} setField={setField} />
          </>)}

          <button type="submit" className="w-full bg-[#D4AF37] hover:bg-amber-400 py-4 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300">
            Save changes
          </button>
          {status && (<p className="text-center font-medium text-[#0F2540]">{status}</p>)}
        </form>
      </div>
    </div>
  );
}
