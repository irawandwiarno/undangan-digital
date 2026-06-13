import { Check, Image, Mail, MapPin, Music, Sparkle, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const WA = '+6285921785707';

const TEMPLATES = [
  {
    id: 1,
    name: "Ethereal Rose",
    category: "Romantic",
    color: "#f9e4e8",
    accent: "#c0626b",
    preview: "floral",
    badge: "Terlaris",
  },
  {
    id: 2,
    name: "Javanese Gold",
    category: "Tradisional",
    color: "#fdf3dc",
    accent: "#b8860b",
    preview: "batik",
    badge: "Populer",
  },
  {
    id: 3,
    name: "Midnight Garden",
    category: "Elegan",
    color: "#1a1a2e",
    accent: "#e0c97f",
    preview: "dark",
    badge: null,
  },
  {
    id: 4,
    name: "Sage & Linen",
    category: "Minimalis",
    color: "#f0ede8",
    accent: "#7a8c6e",
    preview: "minimal",
    badge: "Baru",
  },
  {
    id: 5,
    name: "Royal Indigo",
    category: "Mewah",
    color: "#e8eaf6",
    accent: "#3949ab",
    preview: "royal",
    badge: null,
  },
  {
    id: 6,
    name: "Blossom Pastel",
    category: "Ceria",
    color: "#fce4ec",
    accent: "#e91e8c",
    preview: "pastel",
    badge: "Baru",
  },
];



const PLANS = [
  {
    name: "Basic",
    price: "59.000",
    color: "#7a8c6e",
    highlight: false,
    features: [
      "Hingga 200 tamu",
      "Aktif 1 bulan",
      "Music latar",
      "Amplop digital / gift registry",
    ],
    notIncluded: [
      "Foto & Video",
      "Countdown hari acara",
    ],
    cta: "Pilih Basic",
  },
  {
    name: "Pro",
    price: "99.000",
    color: "#c0626b",
    highlight: true,
    features: [
      "Tamu tak terbatas",
      "Aktif 6 bulan",
      "Peta lokasi",
      "Musik latar",
      "Amplop digital / gift registry",
      "Galeri foto & video",
      "Countdown hari acara",
    ],
    cta: "Pilih Pro",
  },
  {
    name: "Custom",
    priceDesc: "Mulai dari",
    price: "499.000",
    color: "#b8860b",
    highlight: false,
    features: [
      "Semua fitur Pro",
      "Invitation Views Sistem",
      "QR checkin untuk tamu",
      "Desain custom oleh tim kami",
      "Support prioritas",
      "Tambahan fitur sesuai kebutuhan",
    ],
    cta: "Pilih Custom",
  },
];

const TESTIMONIALS = [
  {
    name: "Bintang & Rara",
    date: "Desember 2024",
    location: "Surabaya",
    avatar: "BR",
    color: "#c0626b",
    rating: 5,
    text: "Undangan kami dapat ratusan pujian dari tamu! Template Ethereal Rose benar-benar membuat hari pernikahan kami terasa seperti dongeng. Proses pembuatannya mudah sekali.",
  },
  {
    name: "Fariz & Ninda",
    date: "Januari 2025",
    location: "Yogyakarta",
    avatar: "FN",
    color: "#b8860b",
    rating: 5,
    text: "Kami pilih template Javanese Gold karena pengen nuansa tradisional tapi tetap modern. Hasilnya luar biasa! Orang tua kami juga suka banget.",
  },
  {
    name: "Dito & Amel",
    date: "Maret 2025",
    location: "Jakarta",
    avatar: "DA",
    color: "#3949ab",
    rating: 5,
    text: "Fitur RSVP digitalnya sangat membantu. Kita bisa tau siapa yang hadir tanpa repot telepon satu-satu. Worth every rupiah!",
  },
  {
    name: "Kevin & Sari",
    date: "April 2025",
    location: "Bandung",
    avatar: "KS",
    color: "#7a8c6e",
    rating: 5,
    text: "Tim support-nya super responsif! Ada beberapa request custom dan semuanya dipenuhi dengan cepat. Tampilannya elegant banget.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FloralSvg({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx={100 + 28 * Math.cos((angle * Math.PI) / 180)}
          cy={100 + 28 * Math.sin((angle * Math.PI) / 180)}
          rx="14"
          ry="7"
          transform={`rotate(${angle} ${100 + 28 * Math.cos((angle * Math.PI) / 180)} ${100 + 28 * Math.sin((angle * Math.PI) / 180)
            })`}
          fill="currentColor"
          opacity="0.3"
        />
      ))}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx={100 + 60 * Math.cos((angle * Math.PI) / 180)}
          cy={100 + 60 * Math.sin((angle * Math.PI) / 180)}
          rx="18"
          ry="8"
          transform={`rotate(${angle} ${100 + 60 * Math.cos((angle * Math.PI) / 180)} ${100 + 60 * Math.sin((angle * Math.PI) / 180)
            })`}
          fill="currentColor"
          opacity="0.15"
        />
      ))}
    </svg>
  );
}

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TemplateCard({ tpl, index }) {
  const patterns = {
    floral: (
      <svg viewBox="0 0 120 160" className="w-full h-full">
        <rect width="120" height="160" fill={tpl.color} />
        <text x="60" y="40" textAnchor="middle" fontSize="28" fill={tpl.accent} opacity="0.4">✿</text>
        <text x="30" y="60" textAnchor="middle" fontSize="14" fill={tpl.accent} opacity="0.25">✾</text>
        <text x="90" y="55" textAnchor="middle" fontSize="18" fill={tpl.accent} opacity="0.3">✿</text>
        <line x1="40" y1="70" x2="80" y2="70" stroke={tpl.accent} strokeWidth="0.5" opacity="0.4" />
        <text x="60" y="85" textAnchor="middle" fontSize="7" fill={tpl.accent} fontFamily="serif" opacity="0.7">Bintang</text>
        <text x="60" y="94" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.5">&</text>
        <text x="60" y="104" textAnchor="middle" fontSize="7" fill={tpl.accent} fontFamily="serif" opacity="0.7">Rara</text>
        <line x1="40" y1="112" x2="80" y2="112" stroke={tpl.accent} strokeWidth="0.5" opacity="0.4" />
        <text x="60" y="125" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.5">12 . 12 . 2025</text>
        <text x="60" y="148" textAnchor="middle" fontSize="20" fill={tpl.accent} opacity="0.2">✿</text>
      </svg>
    ),
    batik: (
      <svg viewBox="0 0 120 160" className="w-full h-full">
        <rect width="120" height="160" fill={tpl.color} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <rect key={i} x={i * 16} y="0" width="16" height="8" fill={tpl.accent} opacity="0.1" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <rect key={i} x={i * 16} y="152" width="16" height="8" fill={tpl.accent} opacity="0.1" />
        ))}
        <text x="60" y="55" textAnchor="middle" fontSize="7" fill={tpl.accent} fontFamily="serif" opacity="0.8" letterSpacing="2">PERNIKAHAN</text>
        <text x="60" y="75" textAnchor="middle" fontSize="9" fill={tpl.accent} fontFamily="serif" opacity="0.9">Ahmad & Siti</text>
        <line x1="30" y1="82" x2="90" y2="82" stroke={tpl.accent} strokeWidth="0.5" opacity="0.5" />
        <text x="60" y="95" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.6">Sabtu, 15 Maret 2025</text>
        <text x="60" y="108" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.5">Gedung Serbaguna Surabaya</text>
        <polygon points="60,118 65,128 75,128 67,135 70,145 60,139 50,145 53,135 45,128 55,128" fill={tpl.accent} opacity="0.2" />
      </svg>
    ),
    dark: (
      <svg viewBox="0 0 120 160" className="w-full h-full">
        <rect width="120" height="160" fill={tpl.color} />
        {[10, 20, 30].map((r, i) => (
          <circle key={i} cx="60" cy="70" r={r} stroke={tpl.accent} strokeWidth="0.3" fill="none" opacity="0.3" />
        ))}
        <text x="60" y="55" textAnchor="middle" fontSize="18" fill={tpl.accent} opacity="0.6">✦</text>
        <text x="60" y="78" textAnchor="middle" fontSize="8" fill={tpl.accent} fontFamily="serif" letterSpacing="1">Dito & Amel</text>
        <line x1="35" y1="85" x2="85" y2="85" stroke={tpl.accent} strokeWidth="0.4" opacity="0.5" />
        <text x="60" y="97" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.6">20 . 06 . 2025</text>
        <text x="60" y="140" textAnchor="middle" fontSize="16" fill={tpl.accent} opacity="0.2">✦</text>
      </svg>
    ),
    minimal: (
      <svg viewBox="0 0 120 160" className="w-full h-full">
        <rect width="120" height="160" fill={tpl.color} />
        <rect x="15" y="15" width="90" height="130" stroke={tpl.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
        <text x="60" y="55" textAnchor="middle" fontSize="6" fill={tpl.accent} letterSpacing="4" opacity="0.6">WEDDING</text>
        <text x="60" y="75" textAnchor="middle" fontSize="10" fill={tpl.accent} fontFamily="serif">Kevin & Sari</text>
        <line x1="45" y1="83" x2="75" y2="83" stroke={tpl.accent} strokeWidth="0.5" opacity="0.4" />
        <text x="60" y="96" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.5">08 . 08 . 2025</text>
        <text x="60" y="110" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.4">Bandung, Jawa Barat</text>
      </svg>
    ),
    royal: (
      <svg viewBox="0 0 120 160" className="w-full h-full">
        <rect width="120" height="160" fill={tpl.color} />
        <text x="60" y="30" textAnchor="middle" fontSize="16" fill={tpl.accent} opacity="0.5">♔</text>
        <rect x="20" y="40" width="80" height="80" stroke={tpl.accent} strokeWidth="0.8" fill="none" opacity="0.2" />
        <text x="60" y="72" textAnchor="middle" fontSize="8" fill={tpl.accent} fontFamily="serif" letterSpacing="1" opacity="0.8">Fariz & Ninda</text>
        <line x1="35" y1="79" x2="85" y2="79" stroke={tpl.accent} strokeWidth="0.5" opacity="0.5" />
        <text x="60" y="92" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.6">01 . 09 . 2025</text>
        <text x="60" y="103" textAnchor="middle" fontSize="4.5" fill={tpl.accent} opacity="0.5">Grand Ballroom Jakarta</text>
        <text x="60" y="150" textAnchor="middle" fontSize="14" fill={tpl.accent} opacity="0.3">♔</text>
      </svg>
    ),
    pastel: (
      <svg viewBox="0 0 120 160" className="w-full h-full">
        <rect width="120" height="160" fill={tpl.color} />
        <circle cx="25" cy="25" r="15" fill={tpl.accent} opacity="0.1" />
        <circle cx="95" cy="135" r="18" fill={tpl.accent} opacity="0.1" />
        <text x="60" y="42" textAnchor="middle" fontSize="20" fill={tpl.accent} opacity="0.4">♡</text>
        <text x="60" y="68" textAnchor="middle" fontSize="8" fill={tpl.accent} fontFamily="serif" opacity="0.9">Rian & Maya</text>
        <text x="60" y="80" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.55">~ menikah dengan bahagia ~</text>
        <line x1="40" y1="88" x2="80" y2="88" stroke={tpl.accent} strokeWidth="0.5" opacity="0.4" />
        <text x="60" y="100" textAnchor="middle" fontSize="5" fill={tpl.accent} opacity="0.6">14 . 02 . 2026</text>
        <text x="60" y="148" textAnchor="middle" fontSize="18" fill={tpl.accent} opacity="0.2">♡</text>
      </svg>
    ),
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-md">
        {patterns[tpl.preview]}
      </div>
      {tpl.badge && (
        <span
          className="absolute top-3 right-3 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
          style={{ background: tpl.accent }}
        >
          {tpl.badge}
        </span>
      )}
      <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
        <button className="w-full py-2 rounded-xl text-white text-sm font-semibold backdrop-blur-sm bg-white/20 border border-white/30">
          Lihat Preview →
        </button>
      </div>
      <div className="mt-3 px-1">
        <p className="font-semibold text-stone-800 text-sm">{tpl.name}</p>
        <p className="text-stone-400 text-xs">{tpl.category}</p>
      </div>
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Hero({ sendWaMessage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#fdf8f4]">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloralSvg className="absolute -top-20 -right-20 w-96 h-96 text-rose-300 opacity-30 rotate-12" />
        <FloralSvg className="absolute -bottom-24 -left-24 w-80 h-80 text-amber-300 opacity-20 -rotate-12" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-rose-300 opacity-50" />
        <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-400 opacity-40" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-rose-200 opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <h1 className="font-serif text-5xl lg:text-7xl leading-tight text-stone-800 mb-6">
            Ceritakan
            <br />
            <em className="not-italic text-rose-500">Cinta</em> Kalian
            <br />
            dengan Indah
          </h1>

          <p className="text-stone-500 text-lg leading-relaxed mb-10 max-w-md">
            Buat undangan pernikahan digital yang elegan, personal, dan tak terlupakan. Banyak template cantik menanti kalian.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => sendWaMessage("Halo, saya tertarik dengan layanan undangan digital. Bisa bantu saya?")}
              className="bg-stone-800 w-3/4 hover:bg-stone-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              Hubungi Kami
            </button>
            {/* <button className="border border-stone-300 hover:border-stone-400 text-stone-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-md">
              Lihat Template →
            </button> */}
          </div>

          {/* <div className="flex items-center gap-6 mt-12 pt-8 border-t border-stone-200">
            {[["5.000+", "Undangan Dibuat"], ["98%", "Kepuasan Pelanggan"], ["50+", "Template Premium"]].map(
              ([val, label]) => (
                <div key={label}>
                  <p className="text-2xl font-serif font-bold text-stone-800">{val}</p>
                  <p className="text-stone-400 text-xs">{label}</p>
                </div>
              )
            )}
          </div> */}
        </div>

        {/* Right — floating invitation cards */}
        <div className="relative h-130 hidden lg:block">
          {/* Main card */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-80 rounded-3xl shadow-2xl overflow-hidden z-20 rotate-2 animate-[float_6s_ease-in-out_infinite]">
            <svg viewBox="0 0 120 160" className="w-full h-full">
              <rect width="120" height="160" fill="#fdf3dc" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <rect key={i} x={i * 16} y="0" width="16" height="8" fill="#b8860b" opacity="0.12" />
              ))}
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <rect key={i} x={i * 16} y="152" width="16" height="8" fill="#b8860b" opacity="0.12" />
              ))}
              <text x="60" y="52" textAnchor="middle" fontSize="7" fill="#b8860b" fontFamily="serif" opacity="0.8" letterSpacing="2">PERNIKAHAN</text>
              <text x="60" y="72" textAnchor="middle" fontSize="10" fill="#b8860b" fontFamily="serif" opacity="0.95">Ahmad & Siti</text>
              <line x1="30" y1="80" x2="90" y2="80" stroke="#b8860b" strokeWidth="0.5" opacity="0.5" />
              <text x="60" y="93" textAnchor="middle" fontSize="5.5" fill="#b8860b" opacity="0.6">Sabtu, 15 Maret 2025</text>
              <text x="60" y="106" textAnchor="middle" fontSize="5" fill="#b8860b" opacity="0.5">Gedung Serbaguna Surabaya</text>
              <polygon points="60,118 65,128 75,128 67,135 70,145 60,139 50,145 53,135 45,128 55,128" fill="#b8860b" opacity="0.2" />
            </svg>
          </div>
          {/* Side card left */}
          <div className="absolute left-4 top-16 w-44 h-64 rounded-2xl shadow-xl overflow-hidden z-10 -rotate-6 opacity-80">
            <svg viewBox="0 0 120 160" className="w-full h-full">
              <rect width="120" height="160" fill="#f9e4e8" />
              <text x="60" y="38" textAnchor="middle" fontSize="28" fill="#c0626b" opacity="0.3">✿</text>
              <line x1="35" y1="65" x2="85" y2="65" stroke="#c0626b" strokeWidth="0.5" opacity="0.4" />
              <text x="60" y="80" textAnchor="middle" fontSize="8" fill="#c0626b" fontFamily="serif" opacity="0.8">Bintang & Rara</text>
              <text x="60" y="93" textAnchor="middle" fontSize="5" fill="#c0626b" opacity="0.5">12 . 12 . 2025</text>
            </svg>
          </div>
          {/* Side card right */}
          <div className="absolute right-4 top-24 w-44 h-64 rounded-2xl shadow-xl overflow-hidden z-10 rotate-6 opacity-80">
            <svg viewBox="0 0 120 160" className="w-full h-full">
              <rect width="120" height="160" fill="#1a1a2e" />
              <circle cx="60" cy="60" r="30" stroke="#e0c97f" strokeWidth="0.3" fill="none" opacity="0.3" />
              <text x="60" y="50" textAnchor="middle" fontSize="16" fill="#e0c97f" opacity="0.5">✦</text>
              <text x="60" y="72" textAnchor="middle" fontSize="8" fill="#e0c97f" fontFamily="serif" opacity="0.8">Dito & Amel</text>
              <line x1="35" y1="80" x2="85" y2="80" stroke="#e0c97f" strokeWidth="0.4" opacity="0.5" />
              <text x="60" y="93" textAnchor="middle" fontSize="5" fill="#e0c97f" opacity="0.6">20 . 06 . 2025</text>
            </svg>
          </div>
          {/* Bottom floating badge */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 z-30 whitespace-nowrap">
            <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-sm"><Check /></div>
            <div>
              <p className="text-stone-800 text-xs font-semibold">Baru saja terkirim!</p>
              <p className="text-stone-400 text-[10px]">250 tamu diundang oleh Fariz & Ninda</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) rotate(2deg); }
          50% { transform: translate(-50%, calc(-50% - 12px)) rotate(2deg); }
        }
      `}</style>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: <Sparkle />, title: "Desain Elegan", desc: "50+ template dirancang oleh desainer profesional dengan estetika yang memukau." },
    { icon: <Mail />, title: "Kirim via WhatsApp", desc: "Bagikan link undangan langsung ke kontak WhatsApp dengan sekali klik." },
    { icon: <Check />, title: "RSVP Digital", desc: "Lacak kehadiran tamu secara real-time tanpa perlu telepon satu per satu." },
    { icon: <Music />, title: "Musik Latar", desc: "Tambahkan lagu favorit kalian sebagai pengiring saat tamu membuka undangan." },
    { icon: <Image />, title: "Galeri Foto & Video", desc: "Tampilkan momen terbaik perjalanan cinta kalian dalam galeri yang indah." },
    { icon: <MapPin />, title: "Peta & Navigasi", desc: "Integrasi Google Maps agar tamu mudah menemukan lokasi pernikahan." },
  ];

  return (
    <section id="benefits" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-rose-400 font-medium tracking-widest text-sm uppercase mb-3">Mengapa Kami?</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-800">
            Semua yang Kalian Butuhkan,
            <br />
            <span className="text-rose-500">Dalam Satu Tempat</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl border border-stone-100 hover:border-rose-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 cursor-default"
            >
              <div className="w-12 h-12 bg-rose-50 group-hover:bg-rose-100 rounded-2xl flex items-center justify-center text-rose-400 text-xl mb-5 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-semibold text-stone-800 text-lg mb-2">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Templates() {
  const [active, setActive] = useState("Semua");
  const categories = ["Semua", "Romantic", "Tradisional", "Elegan", "Minimalis", "Mewah", "Ceria"];
  const filtered =
    active === "Semua" ? TEMPLATES : TEMPLATES.filter((t) => t.category === active);

  return (
    <section className="py-28 bg-[#fdf8f4]" id="templates">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-rose-400 font-medium tracking-widest text-sm uppercase mb-3">Koleksi Template</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-4">
            Template untuk Setiap
            <br />
            <span className="text-rose-500">Kisah Cinta</span>
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Dari tradisional hingga modern, temukan template yang paling mencerminkan kepribadian kalian.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active === cat
                ? "bg-stone-800 text-white shadow-md"
                : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {filtered.map((tpl, i) => (
            <TemplateCard key={tpl.id} tpl={tpl} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300">
            Lihat Semua Template (50+) →
          </button>
        </div>
      </div>
    </section>
  );
}

function Pricing({ sendWaMessage }) {
  return (
    <section className="py-28 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-rose-400 font-medium tracking-widest text-sm uppercase mb-3">Harga & Paket</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-4">
            Harga Terjangkau,
            <br />
            <span className="text-rose-500">Kualitas Terbaik</span>
          </h2>
          <p className="text-stone-500">Pilih paket yang sesuai kebutuhan pernikahan kalian.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 ${plan.highlight
                ? "shadow-2xl ring-2 ring-rose-300 bg-stone-800 text-white"
                : "border border-stone-200 hover:shadow-xl bg-white"
                }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs font-bold px-5 py-1.5 rounded-full tracking-wider uppercase shadow">
                  Paling Populer
                </div>
              )}

              <div className="mb-6">
                <p
                  className={`font-serif text-2xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-stone-800"}`}
                >
                  {plan.name}
                </p>
                <p className={`text-4xl font-bold flex flex-col ${plan.highlight ? "text-rose-300" : "text-stone-800"}`}>
                  {plan.priceDesc && (<span className={`text-base font-bold align-top ${plan.highlight ? "text-rose-300" : "text-stone-800"}`}>
                    {plan.priceDesc}
                  </span>)}
                  <span>
                    Rp {plan.price}
                  </span>
                </p>
                <p className={`text-sm ${plan.highlight ? "text-stone-300" : "text-stone-400"}`}>sekali bayar</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features?.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className={`shrink-0 ${plan.highlight ? "text-rose-300" : "text-rose-400"}`}><Check className="w-5 h-5" /></span>
                    <span className={`text-sm ${plan.highlight ? "text-stone-200" : "text-stone-600"}`}>{f}</span>
                  </li>
                ))}

                {plan.notIncluded?.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className={`shrink-0 ${plan.highlight ? "text-rose-300" : "text-rose-400"}`}><X className="w-5 h-5" /></span>
                    <span className={`text-sm ${plan.highlight ? "text-stone-200" : "text-stone-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => sendWaMessage(`Halo, saya tertarik dengan paket ${plan.name}. Bisa bantu saya?`)}
                className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${plan.highlight
                  ? "bg-rose-500 hover:bg-rose-400 text-white shadow-lg"
                  : "border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white"
                  }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-stone-400 text-sm mt-8">
          Semua paket termasuk SSL gratis, hosting, dan dukungan teknis. Tidak ada biaya tersembunyi.
        </p>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-[#fdf8f4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-rose-400 font-medium tracking-widest text-sm uppercase mb-3">Testimoni</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-800">
            Kata Mereka yang
            <br />
            <span className="text-rose-500">Telah Merasakannya</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 flex flex-col ${i === 1 ? "lg:mt-8" : i === 3 ? "lg:mt-4" : ""
                }`}
            >
              <StarRating count={t.rating} />
              <p className="text-stone-600 text-sm leading-relaxed my-4 flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">{t.name}</p>
                  <p className="text-stone-400 text-[11px]">
                    {t.date} · {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ sendWaMessage }) {
  return (
    <section className="py-28 bg-stone-800 relative overflow-hidden">
      <FloralSvg className="absolute -top-10 -right-10 w-64 h-64 text-rose-400 opacity-10" />
      <FloralSvg className="absolute -bottom-10 -left-10 w-64 h-64 text-amber-300 opacity-10" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-rose-300 tracking-widest text-sm uppercase mb-4">Mulai Sekarang</p>
        <h2 className="font-serif text-4xl lg:text-6xl text-white mb-6 leading-tight">
          Wujudkan Undangan Impian
          <br />
          <em className="not-italic text-rose-300">Kalian Berdua</em>
        </h2>
        <p className="text-stone-300 text-lg mb-10 leading-relaxed">
          Bergabung lah dengan pasangan yang telah mempercayai kami untuk hari paling berkesan dalam hidup mereka.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="bg-rose-500 hover:bg-rose-400 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-rose-500/30 hover:-translate-y-0.5"
            onClick={() => sendWaMessage("Halo, saya tertarik dengan layanan undangan digital. Bisa bantu saya?")}
          >
            Hubungi Kami Sekarang
          </button>
          <button
            className="border border-white/30 hover:bg-white/10 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300"
            onClick={() => sendWaMessage("Halo, saya ingin melihat contoh undangan. Bisa bantu saya?")}
          >
            Lihat Contoh Undangan
          </button>
        </div>
      </div>
    </section>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl text-stone-800">
          Kulo<span className="text-rose-400">aturi</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-stone-600 text-sm font-medium">
          {/* <a href="#templates" className="hover:text-rose-500 transition-colors">Template</a> */}
          <a href="#benefits" className="hover:text-rose-500 transition-colors">Benefit</a>
          <a href="#pricing" className="hover:text-rose-500 transition-colors">Prices</a>
          <a href="#testimonials" className="hover:text-rose-500 transition-colors">Testimonials</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <a href="#" className="font-serif text-2xl text-white">
            Kulo<span className="text-rose-400">aturi</span>
          </a>
          <p className="text-sm leading-relaxed">
            Platform undangan digital terpercaya untuk pernikahan impian kalian.
          </p>
        </div>
        {[
          ["Produk", ["Template", "Fitur", "Harga", "Contoh Undangan"]],
          ["Bantuan", ["Cara Membuat", "FAQ", "Kontak Kami", "WhatsApp"]],
          // ["Perusahaan", ["Tentang Kami", "Blog", "Karir", "Kebijakan Privasi"]],
        ].map(([title, links]) => (
          <div key={title}>
            <p className="text-white font-semibold mb-4">{title}</p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm hover:text-rose-400 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center text-sm">
        © 2025 KuloAturi · Dibuat dengan ♡ di Indonesia
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {

  const sendWaMessage = useCallback((message) => {
    const url = `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }, [WA]);

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero sendWaMessage={sendWaMessage} />
      <Benefits />
      {/* <Templates /> */}
      <Pricing sendWaMessage={sendWaMessage} />
      <Testimonials />
      <CTA sendWaMessage={sendWaMessage} />
      <Footer />
    </div>
  );
}