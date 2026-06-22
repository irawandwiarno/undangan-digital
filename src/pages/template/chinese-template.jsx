/**
 * ChineseTemplate.jsx
 *
 * Template engine untuk undangan digital tema Chinese/Elegant.
 * Semua konten (teks, foto, rekening, timeline) berasal dari prop `config`.
 *
 * Usage:
 *   import { weddingConfig } from "./config-dino-helen"
 *   <ChineseTemplate config={weddingConfig} />
 */

import { Copy, Disc3, Heart }   from "lucide-react"
import { motion }               from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import Layout            from "@/layout/main-layout"
import CoverChinese      from "./cover-chinese"
import FramedPhoto       from "@/components/chinese/frame-photo"
import MapEmbed          from "@/components/mapEmbed"
import CountdownChinese  from "@/components/chinese/countdown-chinese"
import ImageButton       from "@/components/chinese/button-img"
import GradientText      from "@/components/chinese/gradient-text"
import { FlowerHanging, FlowerGrounded } from "@/utils/flower-jigle"

import toast                                        from "react-hot-toast"
import { createGuest, fetchClientBySlug, fetchGuests } from "@/utils/supabase"
import { cleanProfanity }                           from "@/utils/badWordFilter"

// ── Dekorasi global (tidak berubah antar klien) ─────────────
import frame1       from "@assets/images/chinese/main/frame.webp"
import flower5      from "@assets/images/chinese/main/flower-5.webp"
import line         from "@assets/images/chinese/main/line.webp"
import lineWhite    from "@assets/images/chinese/main/line-white.webp"
import line2        from "@assets/images/chinese/main/line-2.webp"
import mail         from "@assets/images/chinese/main/mail.webp"
import flower1      from "@assets/images/chinese/main/flower-1.webp"
import flower2      from "@assets/images/chinese/main/flower-2.webp"
import flower3      from "@assets/images/chinese/main/flower-3.webp"
import flower4      from "@assets/images/chinese/main/flower-4.webp"
import leaf         from "@assets/images/chinese/main/leaf.webp"
import loveRing     from "@assets/images/chinese/main/love-ring.webp"
import frameWayang  from "@assets/images/chinese/main/frame-wayang.webp"
import cincinPita   from "@assets/images/chinese/main/cincin-pita.webp"
import cincin       from "@assets/images/chinese/main/cincin.webp"
import stemp        from "@assets/images/chinese/main/stemp.webp"
import frameCircle  from "@assets/images/chinese/main/frame-circle.webp"
import nameClosing  from "@assets/images/chinese/main/name-closing.webp"
import bgButton     from "@assets/images/chinese/cover/bg-button.webp"
import logoKuloaturi from "@assets/images/global/kuloaturi-logo.webp"

// ── Animation variants ───────────────────────────────────────
const fadeUp  = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }
const fadeOnly = { hidden: { opacity: 0 },        show: { opacity: 1 } }
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3 } },
}
const fadeItem = (index) => ({
  initial:     { opacity: 0, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.8, ease: "easeInOut", delay: index * 0.6 },
})

// ────────────────────────────────────────────────────────────
export default function ChineseTemplate({ config }) {
  const {
    slug, music, groom, bride, photo,
    event, copy, timeline, banks,
  } = config

  const [client,     setClient]     = useState()
  const [isOpen,     setIsOpen]     = useState(false)
  const [isPlaying,  setIsPlaying]  = useState(false)
  const [tamu,       setTamu]       = useState("")
  const [name,       setName]       = useState("")
  const [message,    setMessage]    = useState("")
  const [messages,   setMessages]   = useState([])
  const [submitting, setSubmitting] = useState(false)
  const audioRef = useRef(null)

  // ── Audio ────────────────────────────────────────────────
  useEffect(() => {
    try {
      audioRef.current = new Audio(music)
      audioRef.current.loop = true
    } catch (e) {
      console.warn("Audio not available", e)
    }
    return () => { audioRef.current?.pause(); audioRef.current = null }
  }, [music])

  // ── Guest name dari URL ?g= ──────────────────────────────
  useEffect(() => {
    const params    = new URLSearchParams(window.location.search)
    const guestName = params.get("g")?.trim()
    if (guestName) { setTamu(guestName); setName(guestName) }
  }, [])

  // ── Fetch client data ────────────────────────────────────
  const getClientData = useCallback(async () => {
    const res = await fetchClientBySlug(slug)
    setClient(res)
  }, [slug])

  useEffect(() => { getClientData() }, [getClientData])

  // ── Fetch guest messages ─────────────────────────────────
  const loadMessages = useCallback(async () => {
    if (!client?.id) return
    try {
      const data = await fetchGuests(client.id)
      setMessages(data ?? [])
    } catch (err) {
      console.error("Fetch guest messages failed", err)
    }
  }, [client])

  useEffect(() => { loadMessages() }, [loadMessages])

  const cleanedMessages = useMemo(
    () => messages.map((m) => ({
      ...m,
      name:    cleanProfanity(m.name),
      message: cleanProfanity(m.message),
    })),
    [messages]
  )

  // ── Webhook tracker ──────────────────────────────────────
  const sendWebhook = useCallback(async (guestName) => {
    await fetch(import.meta.env.VITE_WEBHOOK_URL, {
      method:  "POST",
      mode:    "no-cors",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name: guestName, date: new Date().toISOString() }),
    })
  }, [])

  // ── Submit wishes ────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      toast.error("Nama dan ucapan harus diisi"); return
    }
    setSubmitting(true)
    try {
      const createdRows = await createGuest({
        name:       name.trim(),
        message:    message.trim(),
        attendance: "Hadir",
        client_id:  client.id,
      })
      const created = createdRows?.[0]
      setMessages((prev) => [{
        id:         created?.id ?? Date.now(),
        name:       created?.name ?? name.trim(),
        message:    created?.message ?? message.trim(),
        attendance: "Hadir",
      }, ...prev])
      setName(""); setMessage("")
    } catch (err) {
      console.error("Submit guest failed", err)
      toast.error("Gagal mengirim ucapan, coba lagi")
    } finally {
      setSubmitting(false)
    }
  }

  // ── Copy to clipboard ────────────────────────────────────
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement("textarea")
        ta.value = text
        ta.style.cssText = "position:fixed;left:-999999px;top:-999999px"
        document.body.appendChild(ta); ta.focus(); ta.select()
        document.execCommand("copy"); ta.remove()
      }
      toast.success("Berhasil Menyalin")
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  // ── Open invitation ──────────────────────────────────────
  function handleOpen() {
    setIsOpen(true)
    togglePlay()
    sendWebhook(tamu || "Tamu tanpa nama")
  }

  async function togglePlay() {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause(); setIsPlaying(false)
    } else {
      await audioRef.current.play().catch(() =>
        console.warn("Play was blocked by browser")
      )
      setIsPlaying(true)
    }
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <Layout>
      {isOpen && (
        <main className="overflow-x-hidden">

          {/* ══ SECTION 1 — Our Beginning ══════════════════════════ */}
          <section className="relative min-h-180 flex items-center justify-center">
            <img src={flower1} alt="" className="absolute -top-20 -left-10" />
            <img src={flower1} alt="" className="absolute -bottom-5 -right-30" />

            <div className="absolute top-0 w-[85%] h-[65%] max-h-120 bg-linear-to-b rounded-b-[4rem] from-[#F8F7F2] to-[#ECDAC4]" />
            <div className="absolute top-0 w-[80%] h-[64%] max-h-120 bg-linear-to-b rounded-b-[4rem] from-[#ECDAC4] to-[#F8F7F2]" />

            <div className="absolute top-15 flex flex-col items-center justify-center">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}>
                <FramedPhoto
                  frame={frame1} photo={photo} flower={flower5}
                  photoSize="65%" photoY="45%"
                />
              </motion.div>

              <div className="w-full flex flex-col items-center justify-center mt-2">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: true }}>
                  <h2 className="text-xl font-parisienne text-[#3F1114]">Our Beginning</h2>
                </motion.div>

                <motion.p initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 1 }} viewport={{ once: true }}
                  className="w-3/4 text-center text-sm mt-1 font-parastoo">
                  {copy.openingParagraph}
                </motion.p>

                <motion.img initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 1.5 }} viewport={{ once: true }}
                  src={line} alt="line" className="w-40 mt-1" />
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: 2 }} viewport={{ once: true }}
              className="absolute top-100 w-[80%]">
              <img src={mail} alt="" />
            </motion.div>
          </section>

          {/* ══ SECTION 2 — Timeline ═══════════════════════════════ */}
          <section className="relative min-h-180 flex items-start justify-center">
            {/* — Dekorasi bunga — */}
            <div className="absolute top-0 w-2/3 -translate-y-15">
              <FlowerHanging><img src={flower2} alt="" /></FlowerHanging>
            </div>
            <div className="absolute top-0 w-2/3 -translate-x-53 -translate-20 -scale-y-100">
              <FlowerHanging><img src={flower2} alt="" /></FlowerHanging>
            </div>
            <div className="absolute top-0 w-2/3 translate-x-53 -translate-20 -scale-y-100">
              <FlowerHanging><img src={flower2} alt="" /></FlowerHanging>
            </div>
            <div className="absolute bottom-0 w-35 -translate-x-30">
              <FlowerGrounded><img src={flower3} alt="" /></FlowerGrounded>
            </div>
            <div className="absolute bottom-0 w-35 translate-x-30 -scale-x-100">
              <FlowerGrounded><img src={flower3} alt="" /></FlowerGrounded>
            </div>
            <img src={flower1} alt="" className="absolute -left-10 opacity-70" />
            <img src={flower1} alt="" className="absolute bottom-0 -right-30 opacity-70" />

            <div className="absolute pt-25 flex flex-col items-center justify-center px-3">
              <h2 className="text-2xl font-parisienne text-[#3F1114]">Perjalanan Kami</h2>
              <img src={line2} alt="" className="w-1/2 py-3" />

              {/* — Timeline items dinamis — */}
              {timeline.map((item, i) => (
                <motion.div key={i} {...fadeItem(i)}
                  className="grid grid-cols-[5fr_1fr_5fr] w-full mt-2">

                  {/* Kolom kiri */}
                  <div className="text-end">
                    {item.side === "left" && (
                      <>
                        <h3 className="font-montserrat text-sm font-medium italic">{item.title}</h3>
                        <p className="font-parastoo text-[10px]">{item.text}</p>
                      </>
                    )}
                  </div>

                  {/* Dot & garis tengah */}
                  <div className="flex flex-col justify-start items-center">
                    <div className="w-3 h-3 border border-[#681D24] rounded-full" />
                    {i < timeline.length - 1 && (
                      <div className="w-px h-full bg-[#681D24] rounded-full" />
                    )}
                  </div>

                  {/* Kolom kanan */}
                  <div>
                    {item.side === "right" && (
                      <>
                        <h3 className="font-montserrat text-sm font-medium italic">{item.title}</h3>
                        <p className="font-parastoo text-[10px]">{item.text}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* — Heart penutup timeline — */}
              <motion.div {...fadeItem(timeline.length)}
                className="grid grid-cols-[5fr_1fr_5fr] w-full -translate-y-0.5">
                <div className="text-end" />
                <div className="flex flex-col justify-start items-center">
                  <Heart className="w-4 h-4 text-[#681D24]" />
                </div>
                <div />
              </motion.div>

              <motion.img {...fadeItem(timeline.length + 1)}
                src={loveRing} alt="love ring" className="w-15 mt-5" />
            </div>
          </section>

          {/* ══ SECTION 3 — Save The Date ══════════════════════════ */}
          <section className="relative min-h-[140vh] md:h-260 flex items-start justify-center">
            <img src={frameWayang} alt="" className="absolute top-0 w-40 translate-x-24 translate-y-3 opacity-50" />
            <img src={frameWayang} alt="" className="absolute top-0 w-40 -translate-x-24 translate-y-3 opacity-50 -scale-x-100" />
            <img src={frameWayang} alt="" className="absolute bottom-0 w-30 translate-x-26 -translate-y-3 opacity-40 -scale-y-100" />
            <img src={frameWayang} alt="" className="absolute bottom-0 w-30 -translate-x-26 -translate-y-3 opacity-40 -scale-x-100 -scale-y-100" />
            <img src={flower1}    alt="" className="absolute inset-y-30 opacity-40" />

            <div className="absolute top-0 w-40 -translate-x-30 -translate-y-5 -scale-y-100 -scale-x-100 -rotate-90">
              <FlowerHanging><img src={flower3} alt="" /></FlowerHanging>
            </div>
            <div className="absolute top-0 w-40 translate-x-30 -translate-y-5 scale-y-100 -scale-x-100 -rotate-90">
              <FlowerHanging><img src={flower3} alt="" /></FlowerHanging>
            </div>

            <div className="absolute h-[98%] md:h-255 inset-3 border border-[#E2BA7A] rounded-3xl" />

            <div className="absolute flex flex-col items-center pt-5 text-[#3F1114]">
              <motion.div className="absolute flex w-75 flex-col items-center pt-5 text-[#3F1114]"
                variants={container} initial="hidden" whileInView="show"
                viewport={{ once: true, amount: 0.3 }}>

                <motion.img src={cincinPita} alt="" className="w-1/2"
                  variants={fadeOnly} transition={{ duration: 0.8, ease: "easeOut" }} />

                <motion.h3 className="text-center font-parisienne text-4xl mt-2"
                  variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                  {groom.name}
                </motion.h3>
                <motion.p className="text-base -mt-1 font-parastoo"
                  variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                  {groom.parents}
                </motion.p>

                <motion.img src={cincin} alt="" className="w-15" variants={fadeOnly} />

                <motion.h3 className="text-center font-parisienne text-4xl"
                  variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                  {bride.name}
                </motion.h3>
                <motion.p className="text-base -mt-1 font-parastoo"
                  variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                  {bride.parents}
                </motion.p>

                <motion.img src={line2} alt="" className="w-3/4 py-1" variants={fadeOnly} />

                <motion.h1 className="text-4xl font-medium font-parastoo"
                  variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                  Save The Date
                </motion.h1>
                <motion.p className="text-center w-[90%] font-parastoo"
                  variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                  {copy.saveDateSubtitle}
                </motion.p>

                {/* — Tanggal — */}
                <motion.div className="flex justify-center items-center gap-4"
                  variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                  <h3 className="text-4xl font-parastoo">{event.displayMonth}</h3>
                  <div className="h-7 w-0.5 bg-[#3F1114]" />
                  <h3 className="text-5xl font-parastoo">{event.displayDay}</h3>
                  <div className="h-7 w-0.5 bg-[#3F1114]" />
                  <h3 className="text-4xl font-parastoo">{event.displayYear}</h3>
                </motion.div>

                <motion.p className="text-base mt-1 text-center font-parastoo"
                  variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                  {event.venue}
                </motion.p>

                <motion.button onClick={() => window.open(event.mapsUrl, "_blank")}
                  className="bg-linear-to-b from-[#BD4752] to-[#3F1114] px-4 rounded-full text-white text-lg font-parastoo mt-2"
                  variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
                  Buka Navigasi
                </motion.button>

                <motion.div className="w-full" variants={fadeOnly}
                  transition={{ duration: 0.6, ease: "easeOut" }}>
                  <MapEmbed lat={event.lat} lng={event.lng} title={event.venue} />
                </motion.div>

                <motion.div className="mt-5 md:w-70" variants={fadeUp}
                  transition={{ duration: 0.6, ease: "easeOut" }}>
                  <CountdownChinese targetDate={event.isoDate} />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ══ SECTION 4 — Gift + Wishes ══════════════════════════ */}
          <section className="relative min-h-180 flex flex-col items-center justify-start pt-10">

            {/* — Gift card — */}
            <motion.div className="relative flex justify-center items-center bg-linear-to-b from-[#CC3947] to-[#411215] w-[95%] h-70 rounded-4xl z-10">
              <div className="absolute w-[40%] top-0 right-0 -translate-y-10 translate-x-7">
                <FlowerHanging><img src={flower4} alt="" /></FlowerHanging>
              </div>
              <div className="absolute w-[40%] top-0 left-0 -scale-x-100 -translate-y-10 -translate-x-7">
                <FlowerHanging><img src={flower4} alt="" /></FlowerHanging>
              </div>
              <img src={stemp} alt="" className="absolute w-15 bottom-0 translate-y-8 z-99" />

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 1 }} transition={{ duration: 2.5, ease: "easeOut" }}
                className="flex justify-center items-center bg-linear-to-b from-[#F0C582] to-[#7C4200] w-[97%] h-[97%] rounded-4xl">
                <div className="flex flex-col justify-start items-center pt-7 bg-linear-to-b from-[#CC3947] to-[#411215] w-[99%] h-[99%] rounded-4xl">
                  <h3 className="text-2xl text-center font-parisienne font-bold text-[#ECDAC4]">
                    {copy.giftHeadline}
                  </h3>
                  <p className="text-center text-white font-parastoo text-xs w-3/4">
                    {copy.giftParagraph}<br />
                    <span className="font-bold text-white">{copy.giftHighlight}</span>
                  </p>
                  <img src={lineWhite} alt="" className="w-[60%] my-2" />
                  <p className="text-center text-white text-xs font-bold font-parastoo w-3/4">
                    {copy.giftCTA}
                  </p>
                  <div className="flex justify-center items-center mt-2">
                    <img src={leaf} alt="" className="w-[15%]" />
                    <div className="w-[40%]">
                      <ImageButton bgButton={bgButton} disable={true} onClick={() => {}}>
                        <p className="font-alike text-xs font-semibold bg-linear-to-b from-[#3F1114] to-[#A52D34] bg-clip-text text-transparent">
                          Informasi Rekening
                        </p>
                      </ImageButton>
                    </div>
                    <img src={leaf} alt="" className="w-[15%] -scale-x-100" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* — Bank accounts (dinamis dari config.banks) — */}
            <div className="absolite -translate-y-20 flex justify-center items-center w-[88%] h-70 bg-linear-to-b from-[#CC3947] to-[#411215] rounded-4xl">
              <div className="absolite w-[95%] h-[95%] flex flex-col items-center bg-linear-to-b from-[#F8F7F2] to-[#ECDAC4] rounded-4xl">
                <div className="flex justify-center items-end h-full pb-1 px-3 gap-2">
                  {banks.map((bank) => (
                    <div key={bank.name}
                      className="flex-1 bg-[#F8F7F2] rounded-2xl px-1 py-3 text-center flex flex-col items-center shadow-1xl">
                      <div className="w-20 h-11 overflow-hidden flex justify-center items-center rounded-lg">
                        <img src={bank.logo} alt={`logo ${bank.name}`} className="w-full object-cover object-center" />
                      </div>
                      <p className="font-parastoo text-lg font-bold text-[#3F1114] m-0">{bank.number}</p>
                      <p className="font-parastoo text-[#3F1114] text-xs -mt-2">{bank.holder}</p>
                      <button
                        onClick={() => copyToClipboard(bank.number)}
                        className="mt-1 flex items-center justify-center gap-1 bg-linear-to-b from-[#3F1114] to-[#BD4752] active:bg-linear-to-b active:from-[#BD4752] active:to-[#3F1114] px-4 text-white font-semibold font-parastoo rounded-full">
                        <Copy className="w-4 h-4" />
                        <span>Salin</span>
                      </button>
                    </div>
                  ))}
                </div>
                <p className="flex justify-center items-center text-[#3F1114] font-parastoo text-sm py-1">
                  We truly appreciate your kindness.
                </p>
              </div>
            </div>

            {/* — Wishes form — */}
            <div className="flex flex-col items-center w-full -translate-y-12">
              <motion.h3 initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-3xl text-center font-parisienne text-[#3F1114]">
                {copy.wishesTitle}
              </motion.h3>
              <motion.p initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-center text-base text-[#3F1114] font-parastoo w-2/3">
                {copy.wishesSubtitle}
              </motion.p>

              <form onSubmit={handleSubmit} className="w-[80%] flex flex-col items-center justify-center">
                <input value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Nama"
                  className="w-full capitalize font-parastoo text-[#3F1114] mt-2 border border-[#3F1114] rounded-xl font-medium px-3 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-[#3F1114]" />
                <textarea placeholder="Tulis ucapan.." value={message} rows={5}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-30 p-3 mt-2 font-parastoo text-xl rounded-2xl border border-[#3F1114] text-[#3F1114] placeholder:text-[#3F1114] outline-none resize-none" />
                <button disabled={submitting} type="submit"
                  className="w-full rounded-lg py-1 mt-2 font-bold text-white font-parastoo text-2xl bg-linear-to-b from-[#CC3947] to-[#411215]">
                  Kirim
                </button>
              </form>

              <div className="w-full mt-4 space-y-3 h-70 md:h-50 overflow-y-auto px-2">
                {cleanedMessages.length === 0 && (
                  <p className="text-sm text-gray-500 text-center">Belum ada ucapan. Jadilah yang pertama!</p>
                )}
                {cleanedMessages.map((m) => (
                  <div key={m.id} className="w-[80%] mx-auto bg-white border border-[#3F1114] rounded-lg p-3">
                    <p className="font-bold text-sm text-primary">{m.name}</p>
                    <p className="text-xs text-gray-700 mt-2">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ SECTION 5 — Closing ════════════════════════════════ */}
          <section className="relative min-h-screen bg-linear-to-b from-[#3F1114] to-[#BD4752] overflow-hidden py-16 px-6 flex flex-col items-center">
            <div className="absolute inset-4 rounded-sm border border-[#CEA970]/20 pointer-events-none z-10" />

            <img src={flower1} alt="" className="absolute -top-4 -left-4 w-full opacity-10 pointer-events-none select-none" />
            <img src={flower1} alt="" className="absolute -bottom-4 -scale-x-100 -left-4 w-full opacity-10 pointer-events-none select-none" />
            <img src={flower4} alt="" className="absolute -top-4 -right-4 w-40 pointer-events-none select-none" />
            <img src={flower4} alt="" className="absolute -top-4 -left-4 -scale-x-100 w-40 pointer-events-none select-none" />
            <img src={flower4} alt="" className="absolute -bottom-4 -left-10 -scale-x-100 -scale-y-100 w-40 pointer-events-none select-none" />
            <img src={flower4} alt="" className="absolute -bottom-4 -right-10 w-40 -scale-y-100 pointer-events-none select-none" />

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.5, ease: "easeOut" }}
              className="my-auto flex flex-col items-center">

              <GradientText text={copy.closingTitle1} className="font-parisienne text-3xl from-[#F8F7F2] to-[#E6CFB2]" />
              <GradientText text={copy.closingTitle2} className="font-parisienne text-3xl from-[#F8F7F2] to-[#E6CFB2]" />
              <p className="text-[#ECDDC9] font-parastoo mt-2">With Love</p>

              <div className="relative z-10 w-full max-w-xs flex items-center justify-center my-2">
                <motion.img whileTap={{ scale: 0.95 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  src={frameCircle} alt="" className="w-70 object-contain" />
                <img src={nameClosing} alt="" className="absolute w-40" />
              </div>

              <p className="relative mt-5 z-10 font-parastoo text-[#FFF3E2]/80 text-sm text-center max-w-[90%]">
                {copy.closingQuote}
              </p>

              <div className="absolute bottom-5 flex flex-col items-center gap-1">
                <h2 className="text-white font-medium font-parisienne text-sm">Special Present by</h2>
                <img src={logoKuloaturi} alt="" className="w-20" />
              </div>
            </motion.div>
          </section>
        </main>
      )}

      {/* ── Cover slide-up ─────────────────────────────────────── */}
      <motion.div className="absolute inset-0"
        initial={{ y: 0 }} animate={{ y: isOpen ? "-110%" : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}>
        <CoverChinese onOpen={handleOpen} tamu={tamu} />
      </motion.div>

      {/* ── Music toggle button ─────────────────────────────────── */}
      {isOpen && (
        <motion.button aria-label={isPlaying ? "Stop music" : "Play music"}
          onClick={togglePlay} whileTap={{ scale: 0.95 }}
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: isPlaying ? Infinity : 0, duration: 2, ease: "linear" }}
          className={`fixed right-4 bottom-4 z-50 rounded-full p-3 shadow-lg text-white ${isPlaying ? "bg-[#CC3947]" : "bg-[#CC3947]/60"}`}>
          <Disc3 size={20} />
        </motion.button>
      )}
    </Layout>
  )
}