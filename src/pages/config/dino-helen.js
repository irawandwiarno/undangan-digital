// ============================================================
//  WEDDING CONFIG — Edit file ini untuk setiap klien baru
//  Duplikat file ini, ganti nama, lalu ubah isinya.
// ============================================================

// ── IMPORT GAMBAR PASANGAN ────────────────────────────────
// Ganti path sesuai lokasi aset klien
import photo1 from "@assets/images/chinese/main/photo-1.webp"

// ── IMPORT LOGO BANK ──────────────────────────────────────
import bluBca   from "@assets/images/bank/blue-bca.webp"
import mandiri  from "@assets/images/bank/mandiri.webp"

export const weddingConfig = {

  // ── META ─────────────────────────────────────────────────
  slug:  "dino-helen",
  music: "/thousan-year.mp3",   // letakkan file di /public/

  // ── PASANGAN ─────────────────────────────────────────────
  groom: {
    name:    "Dino Fahrenzky",
    parents: "Putra dari Ismansyah & Yusnadeni",
  },
  bride: {
    name:    "Helen Octaviani",
    parents: "Putri dari Tan Chin Kie & Susi Yanti",
  },

  // ── FOTO ─────────────────────────────────────────────────
  // photo  → foto utama pasangan (di dalam frame)
  photo,

  // ── ACARA ────────────────────────────────────────────────
  event: {
    // Untuk countdown & label tampilan
    isoDate:      "2026-07-03T08:00:00",
    displayDay:   "03",
    displayMonth: "Juli",
    displayYear:  "2026",

    // Lokasi
    venue:    "KUA BALEENDAH, Bandung.",
    mapsUrl:  "https://share.google/si1aPeQjjsx6Yep47",
    lat:      -7.005377,
    lng:       107.623177,
  },

  // ── TEKS UTAMA ───────────────────────────────────────────
  copy: {
    // Section 1 — Our Beginning
    openingParagraph:
      "Berawal dari pertemuan yang sederhana, tumbuh menjadi cerita yang penuh makna. " +
      "Hingga akhirnya kami memutuskan untuk melangkah bersama, seumur hidup.",

    // Section 3 — Save The Date
    saveDateSubtitle:
      "Terima kasih telah menjadi bagian dari cerita yang membawa kami sampai di titik ini.",

    // Section 4 — Hadiah / Gift
    giftHeadline: "Doamu Sangat Berarti",
    giftParagraph:
      "Hari ini kami memilih untuk merayakan momen ini secara sederhana, hanya dihadiri keluarga inti.",
    giftHighlight:
      "Bagi kami, kehadiran, doa, dan restu adalah hadiah yang paling berharga.",
    giftCTA:
      "Apabila berkenan berbagi tanda kasih, dengan penuh syukur kami menerimanya sebagai wujud doa dan dukungan untuk langkah baru kami.",

    // Section 4 — Wishes form
    wishesTitle:    "Leave Your Blessing",
    wishesSubtitle: "Every kind word, every prayer, and every blessing will become part of our story.",

    // Section 5 — Closing
    closingTitle1:  "Doa & Restu",
    closingTitle2:  "Mengiringi Kami",
    closingQuote:
      "\"Setiap perjalanan memiliki awal, dan hari ini adalah awal dari perjalanan baru kami " +
      "sebagai sebuah keluarga. Kami bersyukur karena di momen yang sederhana namun penuh " +
      "makna ini, kami dapat berbagi kebahagiaan bersama orang-orang yang kami cintai.\"",
  },

  // ── TIMELINE ─────────────────────────────────────────────
  // side: "left" | "right"
  timeline: [
    {
      side:  "left",
      title: "How We Met",
      text:  "Tidak ada yang benar-benar tahu bagaimana sebuah pertemuan bisa mengubah banyak hal. " +
             "Dari sebuah momen sederhana, cerita kami pun dimulai.",
    },
    {
      side:  "right",
      title: "When Friendship Became Love",
      text:  "Tawa, cerita, dan waktu yang kami habiskan bersama perlahan menguatkan keyakinan " +
             "bahwa kami telah menemukan rumah dalam diri satu sama lain.",
    },
    {
      side:  "left",
      title: "Growing Together",
      text:  "Kami belajar bahwa cinta bukan tentang siapa yang paling sempurna, melainkan " +
             "tentang dua orang yang terus memilih untuk saling menemani dalam setiap keadaan.",
    },
    {
      side:  "right",
      title: "The Proposal",
      text:  "Dengan penuh rasa syukur, kami memutuskan untuk melangkah ke tahap kehidupan " +
             "yang baru. Sebuah keputusan yang lahir dari keyakinan, doa, dan harapan untuk " +
             "membangun masa depan bersama.",
    },
    {
      side:  "left",
      title: "Forever Begins",
      text:  "Hari ini menjadi awal dari bab baru dalam kehidupan kami. Kebahagiaan ini akan " +
             "terasa semakin lengkap jika dapat dirayakan bersama keluarga dan orang-orang " +
             "yang paling kami sayangi.",
    },
  ],

  // ── REKENING ─────────────────────────────────────────────
  banks: [
    {
      name:   "BCA",
      logo:   bluBca,
      number: "005726959223",
      holder: "HELEN OCTAVIANI",
    },
    {
      name:   "Mandiri",
      logo:   mandiri,
      number: "1190011023288",
      holder: "HELEN OCTAVIANI",
    },
  ],
}