export default function CTA() {
    return (
        <section className="py-24 bg-black text-white border-t border-white/10">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-8">

                <h2 className="text-3xl md:text-4xl font-bold">
                    Join the Mission
                </h2>

                <p className="text-gray-400">
                    Become part of a global community committed to teaching, discipleship, and transformation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200 transition">
                        Get Started
                    </button>

                    <button className="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition">
                        Contact Us
                    </button>
                </div>

            </div>
        </section>
    );
}