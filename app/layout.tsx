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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pure Faith Global",
  alternateName: "Pure Faith Global Ministry",
  url: "https://pure-faith-global-one.vercel.app",
  logo: "https://pure-faith-global-one.vercel.app/icon.svg",
  founder: {
    "@type": "Person",
    name: "William Zion",
  },
  foundingDate: "2020-01",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Accra",
    addressCountry: "GH",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
