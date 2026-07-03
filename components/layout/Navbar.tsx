import Link from "next/link";
import { navigation } from "@/lib/navigation";

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="text-lg font-bold tracking-wide text-white"
                >
                    Pure Faith Global
                </Link>

                <nav className="flex gap-8 text-sm text-gray-300">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="transition-colors hover:text-white"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}