export default function Ministry() {
    return (
        <section className="py-24 bg-black text-white border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 text-center space-y-6">

                <h2 className="text-3xl md:text-4xl font-bold">
                    Ministry Focus Areas
                </h2>

                <p className="text-gray-400 max-w-2xl mx-auto">
                    Pure Faith Global is structured around clear pillars of teaching, discipleship, and global impact.
                </p>

                <div className="grid md:grid-cols-3 gap-6 pt-10 text-left">

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Teaching</h3>
                        <p className="text-gray-400 text-sm">
                            Systematic biblical teaching designed to ground believers in truth and doctrine.
                        </p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Discipleship</h3>
                        <p className="text-gray-400 text-sm">
                            Structured spiritual growth pathways for believers at every stage of maturity.
                        </p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Outreach</h3>
                        <p className="text-gray-400 text-sm">
                            Global mission focus to extend teaching and transformation beyond borders.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}