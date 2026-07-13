"use client";
import { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function PaystackDonate() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [scriptReady, setScriptReady] = useState(false);

  const handlePay = () => {
    if (!email || !amount || Number(amount) <= 0) {
      setStatus("Please enter a valid email and amount.");
      return;
    }
    if (!scriptReady || !window.PaystackPop) {
      setStatus("Payment system is still loading, please try again in a moment.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_9fd9e6cc3a902b4bd4368e545210e40206b4a776",
      email: email,
      amount: Math.round(Number(amount) * 100),
      currency: "GHS",
      ref: "PFG_" + Date.now(),
      callback: function (response: any) {
        setStatus("Thank you! Your donation was received. Reference: " + response.reference);
      },
      onClose: function () {
        setStatus("Payment window closed.");
      },
    });
    handler.openIframe();
  };

  return (
    <div className="border border-[#1B3A5C]/10 rounded-3xl p-10 text-center shadow-sm">
      <Script
        src="https://js.paystack.co/v1/inline.js"
        onLoad={() => setScriptReady(true)}
      />
      <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Debit / Credit Card</p>
      <p className="font-serif text-2xl text-[#0F2540] mb-6">Give with Visa or Mastercard</p>

      <div className="space-y-4 text-left max-w-sm mx-auto">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl text-[#0F2540] bg-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[#0F2540]">Amount (GHS)</label>
          <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl text-[#0F2540] bg-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            placeholder="Enter amount" />
        </div>
        <button onClick={handlePay}
          className="w-full bg-[#D4AF37] hover:bg-amber-400 text-[#0F2540] font-bold py-3.5 rounded-xl transition-all duration-300">
          Give Now
        </button>
        {status && (<p className="text-center text-sm text-[#0F2540] font-medium">{status}</p>)}
      </div>
    </div>
  );
}
