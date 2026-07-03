export default function Media() {
    return (
        <section className="py-24 bg-black text-white border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 space-y-10">

                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Media & Teachings
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Access sermons, teachings, and resources designed to strengthen faith and understanding.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">
                            Video Teachings
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Structured video content covering core biblical teachings and doctrine.
                        </p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">
                            Audio Sermons
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Audio messages for discipleship, reflection, and spiritual growth.
                        </p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">
                            Articles
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Written teachings and structured theological resources.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}