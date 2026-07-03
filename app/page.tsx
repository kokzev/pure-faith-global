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

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

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
    { title: 'Global Outreach & Missions', icon: '🌍' },
    { title: 'Speaking & Crusades', icon: '🔥' },
    { title: 'Discipleship & Mentorship', icon: '📖' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0] font-sans">
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
      <div className="bg-gradient-to-r from-[#0F2540] via-[#1B3A5C] to-[#0F2540] py-3 text-white text-sm border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 font-medium">
            <span className="text-[#D4AF37] text-xl">✝️</span>
            Proclaiming the Gospel to Every Nation with Pure, Uncompromising Faith
          </div>
          <div className="text-xs text-[#D4AF37] tracking-[3px] font-semibold">ESTABLISHED JANUARY 2020</div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-4' : 'bg-white py-7'
          }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div
              className={`bg-gradient-to-br from-[#0F2540] to-[#1B3A5C] text-white rounded-3xl flex items-center justify-center font-serif font-black border-4 border-[#D4AF37] shadow-inner transition-all duration-500 ${scrolled ? 'w-14 h-14 text-2xl' : 'w-20 h-20 text-4xl'
                }`}
            >
              PFG
            </div>
            <div>
              <div
                className={`font-serif font-black leading-none tracking-tighter text-[#0F2540] transition-all duration-500 ${scrolled ? 'text-2xl' : 'text-4xl'
                  }`}
              >
                Pure Faith Global
              </div>
              <div className="text-[#1B3A5C]/70 text-sm">William Zion Ministry</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-9 text-[#1B3A5C] font-semibold">
            {['About', 'Programs', 'Speaking', 'Academy', 'Resources', 'Store'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative group py-1"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link
            href="/speaking"
            className="relative overflow-hidden bg-[#D4AF37] text-[#0F2540] px-8 py-3.5 rounded-2xl font-bold shadow transition-transform duration-300 hover:scale-105"
          >
            <span className="relative z-10">Book William Zion</span>
            <span className="cta-shimmer absolute inset-0 z-0" />
          </Link>
        </div>
      </header>

      {/* Hero — living light */}
      <section className="relative min-h-[100vh] flex items-center bg-[#0F2540] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1.5px,transparent_1px)] bg-[length:90px_90px] opacity-20" />

        <div aria-hidden="true">
          <div className="orb orb-1 w-[420px] h-[420px] bg-[#D4AF37]/20 top-[10%] left-[8%]" />
          <div className="orb orb-2 w-[500px] h-[500px] bg-[#1B3A5C]/60 bottom-[5%] right-[10%]" />
          <div className="orb orb-3 w-[300px] h-[300px] bg-[#D4AF37]/10 top-[40%] right-[25%]" />
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="ember"
              style={{ left: e.left, animationDelay: e.delay, animationDuration: e.duration }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <div className="mb-8 inline-flex items-center gap-4 px-8 py-3 border border-[#D4AF37]/30 rounded-full text-sm tracking-[4px] text-[#D4AF37] font-semibold">
            ✝️ A MINISTRY ANOINTED BY THE HOLY SPIRIT
          </div>

          <h1 className="font-serif font-black text-[110px] md:text-[150px] leading-[0.9] tracking-[-6px] mb-8">
            Pure<br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#f4e2a8] to-[#D4AF37] bg-clip-text text-transparent">
              Faith
            </span>
          </h1>

          <p className="text-2xl md:text-3xl max-w-4xl mx-auto text-white/90 mb-16 font-medium">
            William Zion brings the living Word of God with divine fire, beauty, and transforming power to the nations.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/speaking"
              className="group bg-white text-[#0F2540] px-14 py-6 rounded-3xl text-xl font-bold hover:scale-105 transition-all duration-500 shadow-2xl"
            >
              Invite Him to Speak
            </Link>
            <Link
              href="/academy"
              className="border-2 border-white/60 hover:border-white text-white px-14 py-6 rounded-3xl text-xl font-bold hover:bg-white/10 transition-all duration-500"
            >
              Enter the Academy
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#D4AF37]/60 animate-bounce motion-reduce:animate-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-28 bg-white">
        <div
          ref={booksRef}
          className={`max-w-7xl mx-auto px-8 reveal ${booksVisible ? 'reveal-visible' : ''}`}
        >
          <div className="text-center mb-16">
            <div className="text-[#D4AF37] uppercase tracking-[3px] text-sm font-bold">Treasures of Wisdom</div>
            <h2 className="font-serif font-black text-5xl md:text-6xl text-[#0F2540] mt-4">Books by William Zion</h2>
            <p className="mt-4 text-[#1B3A5C]/70 text-lg">Every resource, freely given.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {books.map((book, i) => (
              <div
                key={i}
                className="group border border-gray-100 rounded-3xl overflow-hidden hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-3 hover:rotate-[0.5deg] hover:shadow-2xl"
                style={{ transitionDelay: booksVisible ? `${i * 80}ms` : '0ms' }}
              >
                <div className="h-80 bg-gradient-to-br from-[#0F2540] to-[#1B3A5C] flex items-center justify-center text-8xl relative overflow-hidden">
                  <span className="transition-transform duration-500 group-hover:scale-110">📖</span>
                  {book.badge && (
                    <div className="absolute top-6 left-6 bg-[#D4AF37] text-[#0F2540] text-xs px-4 py-1 rounded-full font-black">
                      {book.badge}
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-[#0F2540]">{book.title}</h3>
                  <div className="mt-8 flex justify-between items-center">
                    <span className="font-serif font-black text-2xl text-[#D4AF37]">Free Resource</span>
                    <button className="bg-[#1B3A5C] text-white px-7 py-3 rounded-2xl text-sm font-bold hover:bg-black transition">
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
      <section className="py-28 bg-[#F8F5F0]">
        <div
          ref={ministryRef}
          className={`max-w-7xl mx-auto px-8 reveal ${ministryVisible ? 'reveal-visible' : ''}`}
        >
          <div className="text-center mb-16">
            <div className="text-[#D4AF37] uppercase tracking-[3px] font-bold">Ministry Programs</div>
            <h2 className="font-serif font-black text-5xl md:text-6xl text-[#0F2540] mt-4">How We Serve the Kingdom</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {programs.map((p, i) => (
              <div
                key={i}
                className="bg-white p-12 rounded-3xl border border-gray-100 hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group"
                style={{ transitionDelay: ministryVisible ? `${i * 100}ms` : '0ms' }}
              >
                <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
                <h3 className="font-serif font-black text-3xl md:text-4xl text-[#0F2540]">{p.title}</h3>
                <p className="mt-6 text-[#1B3A5C]/70 leading-relaxed">
                  Bringing the Gospel with power and compassion to the ends of the earth.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0F2540] py-20 text-white/70 text-center text-sm tracking-wide">
        © Pure Faith Global • William Zion Ministry • All Glory to God
      </footer>
    </div>
  );
}