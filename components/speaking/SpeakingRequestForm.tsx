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
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const setField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setStatus("Please fill in at least your name and email.");
      return;
    }
    setSubmitting(true);
    setStatus("Sending...");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "97412ecf-2362-489b-83cc-849ad95b7508",
          subject: `Speaking Request from ${form.name}`,
          from_name: "Pure Faith Global Website",
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          organization: form.organization,
          website: form.website,
          congregation: form.congregation,
          "Potential date": form.eventDate,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send");
      setStatus("Request sent! We will be in touch soon.");
      setForm({ name: "", email: "", phone: "", address: "", organization: "", website: "", congregation: "", eventDate: "", message: "" });
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white focus:border-[#D4AF37] focus:ring-[#D4AF37]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
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

      <button type="submit" disabled={submitting}
        className="block text-center w-full bg-[#D4AF37] hover:bg-amber-400 disabled:opacity-60 py-5 rounded-2xl text-[#0F2540] font-bold text-lg transition-all duration-300">
        {submitting ? "Sending..." : "Send request"}
      </button>

      {status && (<p className="text-center text-sm text-[#0F2540] font-medium">{status}</p>)}
    </form>
  );
}
