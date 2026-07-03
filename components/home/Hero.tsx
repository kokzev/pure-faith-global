export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-900" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl px-6 space-y-8">

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                    Equipping Believers.<br />
                    Teaching Truth.<br />
                    Transforming Lives.
                </h1>

                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                    Pure Faith Global is a teaching ministry focused on discipleship, biblical truth, and global spiritual impact.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200 transition">
                        Explore Ministry
                    </button>

                    <button className="px-6 py-3 border border-white text-white font-medium rounded hover:bg-white hover:text-black transition">
                        Watch Teachings
                    </button>
                </div>

            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm animate-pulse">
                Scroll
            </div>

        </section>
    );
}