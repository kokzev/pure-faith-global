export default function Testimonials() {
    return (
        <section className="py-24 bg-black text-white border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 space-y-10">

                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        What People Are Saying
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Lives transformed through teaching, discipleship, and ministry engagement.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="p-6 border border-white/10 rounded-lg">
                        <p className="text-gray-300 text-sm mb-4">
                            “This ministry gave me clarity in scripture like never before.”
                        </p>
                        <p className="text-white font-semibold">— Participant</p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-lg">
                        <p className="text-gray-300 text-sm mb-4">
                            “The teachings are structured, deep, and transformative.”
                        </p>
                        <p className="text-white font-semibold">— Student</p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-lg">
                        <p className="text-gray-300 text-sm mb-4">
                            “A clear and grounded approach to biblical truth.”
                        </p>
                        <p className="text-white font-semibold">— Leader</p>
                    </div>

                </div>

            </div>
        </section>
    );
}