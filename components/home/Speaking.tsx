export default function Speaking() {
    return (
        <section className="py-24 bg-black text-white border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 space-y-10">

                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Speaking & Crusades
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Teaching, conferences, and global ministry engagements focused on biblical truth and transformation.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">
                            Conferences
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Large-scale teaching events focused on doctrine, discipleship, and spiritual clarity.
                        </p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">
                            Crusades
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Outreach-focused gatherings centered on transformation and evangelistic teaching.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}