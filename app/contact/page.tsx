import ContactSection from "@/components/home/ContactSection";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Pure Faith Global in Accra, Ghana. Reach out with questions, prayer needs, or ministry inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#0F2540] text-white px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Get In Touch</p>
        <h1 className="font-serif text-5xl mb-6">Contact Pure Faith Global</h1>
        <p className="max-w-2xl mx-auto text-white/80 text-lg">
          We would love to hear from you. Reach out with questions, prayer needs, or ministry inquiries.
        </p>
      </section>
      <ContactSection />
    </main>
  );
}

