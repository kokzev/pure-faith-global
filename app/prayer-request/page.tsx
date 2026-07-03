import PrayerRequestForm from "@/components/PrayerRequestForm";

export default function PrayerRequestPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="font-serif text-4xl text-[#0F2540]">Prayer Request</h1>
        <p className="mt-4 text-[#1B3A5C]/70">
          We believe in the power of prayer. Share what is on your heart, and our team will lift it up.
        </p>
      </div>
      <PrayerRequestForm />
    </main>
  );
}
