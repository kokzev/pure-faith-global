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
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl text-[#0F2540]">Pure Faith Global</h2>
        <p className="mt-2 text-[#1B3A5C]/70">Accra, Ghana</p>
        <p className="mt-3">
          <a href="mailto:wllmzion@gmail.com" className="text-[#D4AF37] font-semibold hover:underline">wllmzion@gmail.com</a>
        </p>
        <p className="mt-2 text-[#1B3A5C]/70">0303959705</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
        <input type="text" placeholder="Name (required)" required value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white focus:border-[#D4AF37] focus:ring-[#D4AF37]" />
        <input type="email" placeholder="Email Address (required)" required value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white focus:border-[#D4AF37] focus:ring-[#D4AF37]" />
        <input type="text" placeholder="Subject" value={form.subject}
          onChange={(e) => setField("subject", e.target.value)}
          className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white focus:border-[#D4AF37] focus:ring-[#D4AF37]" />
        <textarea placeholder="Your Message" rows={6} value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          className="w-full px-6 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white focus:border-[#D4AF37] focus:ring-[#D4AF37]" />

        <div className="text-center pt-2">
          <button type="submit" disabled={submitting}
            className="bg-[#D4AF37] hover:bg-amber-400 disabled:opacity-60 text-[#0F2540] font-bold py-4 px-12 rounded-2xl transition-all duration-300">
            {submitting ? "Sending..." : "Submit"}
          </button>
        </div>

        {status && (<p className="text-center text-sm text-[#0F2540] font-medium">{status}</p>)}
      </form>
    </section>
  );
}
