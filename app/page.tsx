'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible] as const;
}

const EMBERS = [
  { left: '8%', delay: '0s', duration: '9s' },
  { left: '18%', delay: '1.4s', duration: '11s' },
  { left: '29%', delay: '3.1s', duration: '8s' },
  { left: '41%', delay: '0.6s', duration: '10s' },
  { left: '54%', delay: '2.2s', duration: '12s' },
  { left: '66%', delay: '4.4s', duration: '9s' },
  { left: '77%', delay: '1.8s', duration: '11s' },
  { left: '88%', delay: '3.6s', duration: '8s' },
];

const NAV_LINKS: [string, string][] = [
  ['About', '/about'],
  ['Programs', '/programs'],
  ['Speaking', '/speaking'],
  ['Academy', '/academy'],
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrolled = scrollY > 40;

  const [booksRef, booksVisible] = useReveal<HTMLDivElement>();
  const [ministryRef, ministryVisible] = useReveal<HTMLDivElement>();

  const books = [
    { title: 'Walking in Pure Faith', badge: 'Bestseller' },
    { title: 'The Prayer That Changes Nations' },
    { title: 'Foundations for the Christian Home' },
    { title: 'The Great Commission Today' },
  ];

  const programs = [
    { title: 'Global Outreach & Missions', icon: '\u{1F30D}' },
    { title: 'Speaking & Crusades', icon: '\u{1F525}' },
    { title: 'Discipleship & Mentorship', icon: '\u{1F4D6}' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0] font-sans overflow-x-hidden">
      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -40px) scale(1.15); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 50px) scale(1.1); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(0.95); }
        }
        @keyframes rise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-520px) translateX(20px); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .orb { position: absolute; border-radius: 9999px; filter: blur(60px); pointer-events: none; }
        .orb-1 { animation: drift1 14s ease-in-out infinite; }
        .orb-2 { animation: drift2 18s ease-in-out infinite; }
        .orb-3 { animation: drift3 16s ease-in-out infinite; }
        .ember { position: absolute; bottom: 0; width: 3px; height: 3px; border-radius: 9999px; background: #D4AF37; animation-name: rise; animation-timing-function: ease-in; animation-iteration-count: infinite; }
        .cta-shimmer { background-image: linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%); background-size: 200% 100%; animation: shimmer 3.5s ease-in-out infinite; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.9s ease, transform 0.9s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .orb, .ember, .cta-shimmer { animation: none !important; }
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      {/* Utility Bar */}
      <div className="bg-gradient-to-r from-[#0F2540] via-[#1B3A5C] to-[#0F2540] py-3 text-white text-xs md:text-sm border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-1 text-center">
          <div className="flex items-center gap-2 md:gap-3 font-medium">
            <span className="text-[#D4AF37] text-lg md:text-xl">&#10022;</span>
            Proclaiming the Gospel to Every Nation with Pure, Uncompromising Faith
          </div>
          <div className="text-xs text-[#D4AF37] tracking-[2px] md:tracking-[3px] font-semibold">EST. JANUARY 2020</div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-white py-4 md:py-7'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-5">
            <div
              className={`bg-gradient-to-br from-[#0F2540] to-[#1B3A5C] text-white rounded-2xl md:rounded-3xl flex items-center justify-center font-serif font-black border-2 md:border-4 border-[#D4AF37] shadow-inner transition-all duration-500 ${scrolled ? 'w-11 h-11 text-lg' : 'w-12 h-12 md:w-20 md:h-20 text-xl md:text-4xl'
                }`}
            >
              PFG
            </div>
            <div>
              <div
                className={`font-serif font-black leading-none tracking-tighter text-[#0F2540] transition-all duration-500 ${scrolled ? 'text-base' : 'text-lg md:text-4xl'
                  }`}
              >
                Pure Faith Global
              </div>
              <div className="text-[#1B3A5C]/70 text-xs md:text-sm hidden sm:block">William Zion</div>
            </div>
          </div>

          <nav className="hidden lg:flex gap-9 text-[#1B3A5C] font-semibold">
            {NAV_LINKS.map(([label, href]) => (
              <Link key={label} href={href} className="relative group py-1">
                {label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <div className="relative group py-1">
              <span className="cursor-pointer">Resources</span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              <div className="absolute left-0 top-full pt-3 hidden group-hover:block z-50">
                <div className="bg-white border border-[#1B3A5C]/10 rounded-xl shadow-lg py-2 w-40">
                  <Link href="/resources?type=article" className="block px-4 py-2 text-sm hover:bg-[#F8F5F0]">Articles</Link>
                  <Link href="/resources?type=video" className="block px-4 py-2 text-sm hover:bg-[#F8F5F0]">Videos</Link>
                  <Link href="/resources?type=audio" className="block px-4 py-2 text-sm hover:bg-[#F8F5F0]">Audios</Link>
                </div>
              </div>
            </div>

            <Link href="/store" className="relative group py-1">
              Store
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/give"
              className="bg-[#0F2540] text-white px-6 py-3 rounded-2xl font-bold border-2 border-[#D4AF37] hover:bg-[#1B3A5C] transition-colors duration-300 text-sm"
            >
              Donate
            </Link>

            <Link
              href="/speaking"
              className="relative overflow-hidden bg-[#D4AF37] text-[#0F2540] px-6 py-3 rounded-2xl font-bold shadow transition-transform duration-300 hover:scale-105 text-sm"
            >
              <span className="relative z-10">Book William Zion</span>
              <span className="cta-shimmer absolute inset-0 z-0" />
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 shrink-0"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-[#0F2540] transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[#0F2540] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[#0F2540] transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {NAV_LINKS.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setMenuOpen(false)}
                className="block py-3 px-2 text-[#0F2540] font-semibold border-b border-gray-100">
                {label}
              </Link>
            ))}

            <button onClick={() => setResourcesOpen(!resourcesOpen)}
              className="w-full flex justify-between items-center py-3 px-2 text-[#0F2540] font-semibold border-b border-gray-100">
              Resources
              <span className={`transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`}>&#9662;</span>
            </button>
            {resourcesOpen && (
              <div className="pl-4 space-y-1">
                <Link href="/resources?type=article" onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-[#1B3A5C]/80 text-sm">Articles</Link>
                <Link href="/resources?type=video" onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-[#1B3A5C]/80 text-sm">Videos</Link>
                <Link href="/resources?type=audio" onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-[#1B3A5C]/80 text-sm">Audios</Link>
              </div>
            )}

            <Link href="/store" onClick={() => setMenuOpen(false)}
              className="block py-3 px-2 text-[#0F2540] font-semibold border-b border-gray-100">
              Store
            </Link>

            <div className="flex flex-col gap-3 pt-4">
              <Link href="/give" onClick={() => setMenuOpen(false)}
                className="text-center bg-[#0F2540] text-white px-6 py-3 rounded-2xl font-bold border-2 border-[#D4AF37]">
                Donate
              </Link>
              <Link href="/speaking" onClick={() => setMenuOpen(false)}
                className="text-center bg-[#D4AF37] text-[#0F2540] px-6 py-3 rounded-2xl font-bold">
                Book William Zion
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center bg-[#0F2540] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1.5px,transparent_1px)] bg-[length:60px_60px] md:bg-[length:90px_90px] opacity-20" />

        <div aria-hidden="true">
          <div className="orb orb-1 w-[220px] h-[220px] md:w-[420px] md:h-[420px] bg-[#D4AF37]/20 top-[10%] left-[8%]" />
          <div className="orb orb-2 w-[260px] h-[260px] md:w-[500px] md:h-[500px] bg-[#1B3A5C]/60 bottom-[5%] right-[10%]" />
          <div className="orb orb-3 w-[160px] h-[160px] md:w-[300px] md:h-[300px] bg-[#D4AF37]/10 top-[40%] right-[25%]" />
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="ember"
              style={{ left: e.left, animationDelay: e.delay, animationDuration: e.duration }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center relative z-10">
          <div className="mb-6 md:mb-8 inline-flex items-center gap-2 md:gap-4 px-4 md:px-8 py-2 md:py-3 border border-[#D4AF37]/30 rounded-full text-[10px] md:text-sm tracking-[2px] md:tracking-[4px] text-[#D4AF37] font-semibold">
            &#10022; MINISTERING BY THE HOLY SPIRIT
          </div>

          <h1 className="font-serif font-black text-[64px] sm:text-[90px] md:text-[150px] leading-[0.9] tracking-[-2px] md:tracking-[-6px] mb-6 md:mb-8">
            Pure<br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#f4e2a8] to-[#D4AF37] bg-clip-text text-transparent">
              Faith
            </span>
          </h1>

          <p className="text-lg sm:text-2xl md:text-3xl max-w-4xl mx-auto text-white/90 mb-10 md:mb-16 font-medium px-2">
            Bringing the living Word of God with divine fire, beauty, and transforming power to the nations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
            <a href="/contact" className="group w-full sm:w-auto bg-white text-[#0F2540] px-8 md:px-14 py-4 md:py-6 rounded-3xl text-base md:text-xl font-bold hover:scale-105 transition-all duration-500 shadow-2xl">Contact Us</a>
            <Link
              href="/academy"
              className="w-full sm:w-auto border-2 border-white/60 hover:border-white text-white px-8 md:px-14 py-4 md:py-6 rounded-3xl text-base md:text-xl font-bold hover:bg-white/10 transition-all duration-500"
            >
              Enter the Academy
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-[#D4AF37]/60 animate-bounce motion-reduce:animate-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 md:py-28 bg-white">
        <div
          ref={booksRef}
          className={`max-w-7xl mx-auto px-4 md:px-8 reveal ${booksVisible ? 'reveal-visible' : ''}`}
        >
          <div className="text-center mb-10 md:mb-16">
            <div className="text-[#D4AF37] uppercase tracking-[3px] text-sm font-bold">Treasures of Wisdom</div>
            <h2 className="font-serif font-black text-3xl sm:text-5xl md:text-6xl text-[#0F2540] mt-4">Books by William Zion</h2>
            <p className="mt-4 text-[#1B3A5C]/70 text-base md:text-lg">Every resource, freely given.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {books.map((book, i) => (
              <div
                key={i}
                className="group border border-gray-100 rounded-3xl overflow-hidden hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-3 hover:rotate-[0.5deg] hover:shadow-2xl"
                style={{ transitionDelay: booksVisible ? `${i * 80}ms` : '0ms' }}
              >
                <div className="h-56 md:h-80 bg-gradient-to-br from-[#0F2540] to-[#1B3A5C] flex items-center justify-center text-6xl md:text-8xl relative overflow-hidden">
                  <span className="transition-transform duration-500 group-hover:scale-110">&#128214;</span>
                  {book.badge && (
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#D4AF37] text-[#0F2540] text-xs px-3 md:px-4 py-1 rounded-full font-black">
                      {book.badge}
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-bold text-xl md:text-2xl text-[#0F2540]">{book.title}</h3>
                  <div className="mt-6 md:mt-8 flex justify-between items-center">
                    <span className="font-serif font-black text-lg md:text-2xl text-[#D4AF37]">Free Resource</span>
                    <button className="bg-[#1B3A5C] text-white px-5 md:px-7 py-2.5 md:py-3 rounded-2xl text-xs md:text-sm font-bold hover:bg-black transition">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministry Programs */}
      <section className="py-16 md:py-28 bg-[#F8F5F0]">
        <div
          ref={ministryRef}
          className={`max-w-7xl mx-auto px-4 md:px-8 reveal ${ministryVisible ? 'reveal-visible' : ''}`}
        >
          <div className="text-center mb-10 md:mb-16">
            <div className="text-[#D4AF37] uppercase tracking-[3px] font-bold">Ministry Programs</div>
            <h2 className="font-serif font-black text-3xl sm:text-5xl md:text-6xl text-[#0F2540] mt-4">How We Serve the Kingdom</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {programs.map((p, i) => (
              <div
                key={i}
                className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group"
                style={{ transitionDelay: ministryVisible ? `${i * 100}ms` : '0ms' }}
              >
                <div className="text-5xl md:text-7xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
                <h3 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[#0F2540]">{p.title}</h3>
                <p className="mt-4 md:mt-6 text-[#1B3A5C]/70 leading-relaxed">
                  Bringing the Gospel with power and compassion to the ends of the earth.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Latest Media */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl md:text-5xl text-center text-[#0F2540] mb-8 md:mb-12">Latest Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fetched media will appear here */}
          </div>
        </div>
      </section>

      <footer className="bg-[#0F2540] py-12 md:py-20 text-white/70 text-center text-sm tracking-wide px-4">
        Copyright Pure Faith Global - William Zion - All Glory to God
      </footer>
    </div>
  );
}
