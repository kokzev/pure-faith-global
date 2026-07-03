export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/10 py-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">

                <p className="text-gray-400">
                    © {new Date().getFullYear()} Pure Faith Global. All rights reserved.
                </p>

                <div className="flex gap-6 text-sm text-gray-400">
                    <a href="#" className="hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>

            </div>
        </footer>
    );
}