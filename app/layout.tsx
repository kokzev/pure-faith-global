import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://pure-faith-global-one.vercel.app"),
  title: {
    default: "Pure Faith Global - Sermons, Teaching & Discipleship with William Zion",
    template: "%s | Pure Faith Global",
  },
  description: "Watch and read William Zion teachings on faith, discipleship, and Christian living. Free sermons, books, and articles from Pure Faith Global ministry.",
  openGraph: {
    title: "Pure Faith Global - Sermons, Teaching & Discipleship with William Zion",
    description: "Watch and read William Zion teachings on faith, discipleship, and Christian living. Free sermons, books, and articles from Pure Faith Global ministry.",
    siteName: "Pure Faith Global",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pure Faith Global - Sermons, Teaching & Discipleship with William Zion",
    description: "Watch and read William Zion teachings on faith, discipleship, and Christian living. Free sermons, books, and articles from Pure Faith Global ministry.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
