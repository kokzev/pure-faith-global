export default function Academy() {
    return (
        <section className="py-24 bg-black text-white border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 space-y-10">

                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Faith Academy
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Structured biblical learning designed to ground believers in doctrine, discipline, and spiritual maturity.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">
                            Foundations
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Core teachings covering doctrine, scripture interpretation, and spiritual fundamentals.
                        </p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">
                            Growth Track
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Intermediate training for developing spiritual maturity and leadership capacity.
                        </p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">
                            Leadership
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Advanced discipleship focused on teaching, ministry leadership, and global impact.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}