"use client";
import { useState } from "react";

export default function SpeakingRequestForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    organization: "",
    website: "",
    congregation: "",
    eventDate: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const setField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const buildBody = () => [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Address: ${form.address}`,
    `Organization: ${form.organization}`,
    `Website: ${form.website}`,
    `Congregation: ${form.congregation}`,
    `Potential date: ${form.eventDate}`,
    "",
    "Message:",
    form.message,
  ].join("\n");

  const subject = `Speaking Request from ${form.name || "Website Visitor"}`;
  const body = buildBody();
  const mailtoLink = `mailto:wllmzion@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleValidate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!form.name || !form.email) {
      e.preventDefault();
      alert("Please fill in at least your name and email before sending.");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`To: wllmzion@gmail.com\nSubject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const inputClass = "w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white focus:border-[#D4AF37] focus:ring-[#D4AF37]";

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Name</label>
          <input type="text" required value={form.name} onChange={(e) => setField("name", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Email</label>
          <input type="email" required value={form.email} onChange={(e) => setField("email", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Phone number</label>
          <input type="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Address</label>
          <input type="text" value={form.address} onChange={(e) => setField("address", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Name of organization</label>
          <input type="text" value={form.organization} onChange={(e) => setField("organization", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Website</label>
          <input type="text" value={form.website} onChange={(e) => setField("website", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Congregation</label>
          <input type="text" value={form.congregation} onChange={(e) => setField("congregation", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Potential date</label>
          <input type="text" placeholder="e.g. October 2026" value={form.eventDate} onChange={(e) => setField("eventDate", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-[#0F2540]">Tell us about your event</label>
        <textarea rows={5} value={form.message} onChange={(e) => setField("message", e.target.value)} className={inputClass} />
      </div>

      <a href={mailtoLink} onClick={handleValidate}
        className="block text-center w-full bg-[#D4AF37] hover:bg-amber-400 py-5 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300">
        Send request
      </a>

      <p className="text-center text-sm text-gray-500">
        Nothing happen? Your device may not have an email app set up.{" "}
        <button type="button" onClick={handleCopy} className="underline text-[#0F2540] font-medium">
          {copied ? "Copied!" : "Copy details instead"}
        </button>
      </p>
    </div>
  );
}
