"use client";
import { useState, useEffect } from "react";

type Settings = Record<string, string | null>;

export default function SettingsPage() {
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

  const Text = ({ label, field }: { label: string; field: string }) => (
    <div>
      <label className="block text-sm font-medium mb-2 text-[#0F2540]">{label}</label>
      <textarea value={settings[field] || ""} onChange={(e) => setField(field, e.target.value)} rows={3}
        className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
    </div>
  );

  const Input = ({ label, field }: { label: string; field: string }) => (
    <div>
      <label className="block text-sm font-medium mb-2 text-[#0F2540]">{label}</label>
      <input type="text" value={settings[field] || ""} onChange={(e) => setField(field, e.target.value)}
        className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
    </div>
  );

  const ImageInput = ({ label, field }: { label: string; field: string }) => (
    <div>
      <label className="block text-sm font-medium mb-2 text-[#0F2540]">{label}</label>
      {settings[field] && (<img src={settings[field]!} alt="" className="w-24 h-24 rounded-lg object-cover mb-2" />)}
      <input type="file" accept="image/*" onChange={(e) => setFileField(field, e.target.files?.[0] || null)}
        className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white" />
    </div>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-6 pb-12 mb-12 border-b border-gray-200">
      <h2 className="text-2xl font-serif text-[#0F2540]">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-12 bg-white rounded-3xl shadow-2xl mt-12 mb-12 border border-gray-100">
      <h1 className="text-4xl font-serif text-center mb-12 text-[#0F2540]">Site content</h1>
      <form onSubmit={handleSave}>

        <Section title="About">
          <ImageInput label="Photo" field="aboutPhotoUrl" />
          <Text label="Hero text" field="aboutHeroText" />
          <Text label="Mission text" field="aboutMissionText" />
          <Text label="Story text" field="aboutStoryText" />
          <Text label="Bio text" field="aboutBioText" />
          <Input label="Value 1 title" field="aboutValue1Title" />
          <Text label="Value 1 text" field="aboutValue1Text" />
          <Input label="Value 2 title" field="aboutValue2Title" />
          <Text label="Value 2 text" field="aboutValue2Text" />
          <Input label="Value 3 title" field="aboutValue3Title" />
          <Text label="Value 3 text" field="aboutValue3Text" />
        </Section>

        <Section title="Programs">
          <Text label="Hero text" field="programsHeroText" />
          <Input label="Program 1 title" field="program1Title" />
          <Text label="Program 1 description" field="program1Description" />
          <ImageInput label="Program 1 image" field="program1ImageUrl" />
          <Input label="Program 2 title" field="program2Title" />
          <Text label="Program 2 description" field="program2Description" />
          <ImageInput label="Program 2 image" field="program2ImageUrl" />
          <Input label="Program 3 title" field="program3Title" />
          <Text label="Program 3 description" field="program3Description" />
          <ImageInput label="Program 3 image" field="program3ImageUrl" />
        </Section>

        <Section title="Speaking">
          <Text label="Hero text" field="speakingHeroText" />
          <Text label="Bio text" field="speakingBioText" />
          <ImageInput label="Photo" field="speakingPhotoUrl" />
          <Text label="Topics" field="speakingTopicsText" />
          <Input label="Booking link" field="speakingBookingLink" />
        </Section>

        <Section title="Academy">
          <Text label="Hero text" field="academyHeroText" />
          <Text label="Description" field="academyDescriptionText" />
          <ImageInput label="Photo" field="academyPhotoUrl" />
          <Input label="Enroll link" field="academyEnrollLink" />
        </Section>

        <Section title="Store">
          <Text label="Hero text" field="storeHeroText" />
          <Text label="Description" field="storeDescriptionText" />
          <Input label="Link type (give / books / external)" field="storeLinkType" />
          <Input label="External URL (if applicable)" field="storeExternalUrl" />
        </Section>

        <button type="submit" className="w-full bg-[#D4AF37] hover:bg-amber-400 py-5 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300">
          Save all changes
        </button>
        {status && (<p className="text-center font-medium text-lg mt-4 text-[#0F2540]">{status}</p>)}
      </form>
    </div>
  );
}
