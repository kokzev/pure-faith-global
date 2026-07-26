"use client";
import { useState, useEffect } from "react";

type PrayerRequest = {
  id: string;
  name: string | null;
  request: string;
  isAnswered: boolean;
  createdAt: string;
};

export default function PrayerRequestsAdmin() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/prayer-requests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-12">
      <h1 className="text-4xl font-serif text-center mb-12 text-[#0F2540]">Prayer Requests</h1>

      {loading && (<p className="text-center text-gray-400">Loading...</p>)}
      {!loading && requests.length === 0 && (<p className="text-center text-gray-400">No prayer requests yet.</p>)}

      <div className="space-y-4">
        {requests.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-[#0F2540]">{r.name || "Anonymous"}</p>
              <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="text-[#1B3A5C] whitespace-pre-line">{r.request}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
