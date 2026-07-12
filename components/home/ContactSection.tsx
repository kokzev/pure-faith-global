"use client";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const setField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setStatus("Please fill in your name and email.");
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
          subject: form.subject || `Contact form message from ${form.name}`,
          from_name: "Pure Faith Global Website",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send");
      setStatus("Message sent! We will get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="relative bg-[#0F2540] text-white overflow-hidden py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1.5px,transparent_1px)] bg-[length:90px_90px] opacity-20" />
        <div className="relative z-10">
          <h2 className="font-serif font-black text-6xl md:text-7xl tracking-tight">Contact</h2>
          <p className="mt-2 text-xl tracking-[6px] text-[#D4AF37] font-semibold">PURE FAITH GLOBAL</p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <polygon points="0,0 1440,0 720,80" fill="#F8F5F0" />
        </svg>
      </div>

      <div className="bg-[#F8F5F0] py-16 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-3xl font-black text-[#0F2540]">Pure Faith Global</h3>
          <p className="mt-2 text-[#1B3A5C]/70">Accra, Ghana</p>
          <p className="mt-3">
            <a href="mailto:wllmzion@gmail.com" className="text-[#D4AF37] font-semibold hover:underline">wllmzion@gmail.com</a>
          </p>
          <p className="mt-2 text-[#1B3A5C]/70">ðŸ“ž 0303 959 705</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-12 space-y-5">
          <input type="text" placeholder="Name (required)" required value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-[#0F2540] placeholder-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]" />
          <input type="email" placeholder="Email Address (required)" required value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-[#0F2540] placeholder-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]" />
          <input type="text" placeholder="Subject" value={form.subject}
            onChange={(e) => setField("subject", e.target.value)}
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-[#0F2540] placeholder-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]" />
          <textarea placeholder="Your Message" rows={6} value={form.message}
            onChange={(e) => setField("message", e.target.value)}
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-[#0F2540] placeholder-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]" />

          <div className="text-center pt-2">
            <button type="submit" disabled={submitting}
              className="bg-[#D4AF37] hover:bg-amber-400 disabled:opacity-60 text-[#0F2540] font-bold tracking-wide px-12 py-4 rounded-xl transition-all duration-300">
              {submitting ? "SENDING..." : "SUBMIT"}
            </button>
          </div>

          {status && (<p className="text-center text-sm text-[#0F2540] font-medium">{status}</p>)}
        </form>
      </div>
    </section>
  );
}
