"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Incorrect password.");
      return;
    }

    router.push("/admin/media");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8F5F0] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 bg-white p-8 rounded-2xl border border-[#1B3A5C]/10"
      >
        <h1 className="font-serif text-2xl text-[#0F2540] text-center">Admin Login</h1>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-md border border-[#1B3A5C]/20 px-4 py-3 pr-12 text-[#0F2540] bg-white focus:border-[#D4AF37] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B3A5C]/50 hover:text-[#0F2540]"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-[#D4AF37] px-6 py-3 font-serif text-[#0F2540] hover:bg-[#c19d2e] transition"
        >
          Log In
        </button>
      </form>
    </main>
  );
}


