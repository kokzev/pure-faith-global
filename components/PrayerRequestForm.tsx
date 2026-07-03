"use client";

import { useState } from "react";

export default function PrayerRequestForm() {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, request, honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setRequest("");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[#D4AF37]/30 bg-white p-8 text-center">
        <p className="font-serif text-xl text-[#0F2540]">
          Thank you. Your prayer request has been received.
        </p>
        <p className="mt-2 text-[#1B3A5C]/70">
          Our team will be praying with you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="honeypot">Leave this field empty</label>
        <input
          id="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block font-serif text-[#0F2540]">
          Name <span className="text-sm text-[#1B3A5C]/50">(optional)</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-[#1B3A5C]/20 px-4 py-3 focus:border-[#D4AF37] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="request" className="mb-1 block font-serif text-[#0F2540]">
          Your Prayer Request
        </label>
        <textarea
          id="request"
          required
          rows={6}
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          className="w-full rounded-md border border-[#1B3A5C]/20 px-4 py-3 focus:border-[#D4AF37] focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-[#D4AF37] px-6 py-3 font-serif text-[#0F2540] transition hover:bg-[#c19d2e] disabled:opacity-50"
      >
        {status === "loading" ? "Submitting..." : "Submit Prayer Request"}
      </button>
    </form>
  );
}
