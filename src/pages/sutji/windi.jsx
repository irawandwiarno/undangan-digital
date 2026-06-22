import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Disc3 } from 'lucide-react'
import ImageContainer from '@/components/imageContainer';
import MapEmbed from '@/components/mapEmbed';
import Cover from './cover'
import Countdown from '@/components/countdown';
import CalendarRow from '@/components/calendarRow';
import toast from 'react-hot-toast';
import { createGuest, fetchGuests } from '@/utils/supabase';
import { cleanProfanity } from '@/utils/badWordFilter';


import std from '@assets/images/sutji/undangan/save-date.webp';
import heroImg from '@assets/images/sutji/undangan/hero-img.webp';
import blueFlower from '@assets/images/sutji/undangan/blue-flower.webp';
import frameDoa from '@assets/images/sutji/undangan/frameDoa.webp';
import bismila from '@assets/images/sutji/undangan/bismila.webp';
import qs from '@assets/images/sutji/undangan/qs.webp';
import frame from '@assets/images/sutji/undangan/frame.webp';
import bridePhoto from '@assets/images/sutji/undangan/bridePhoto.webp';
import gromPhoto from '@assets/images/sutji/undangan/gromPhoto.webp';
import ig from '@assets/images/sutji/undangan/ig.webp';
import janji from '@assets/images/sutji/undangan/janji.webp';
import pitaLove from '@assets/images/sutji/undangan/pita-love.webp';
import balon from '@assets/images/sutji/undangan/balon.webp';
import ring from '@assets/images/sutji/undangan/ring.webp';
import pitaRed from '@assets/images/sutji/undangan/pita-red.webp';
import pitaRedSingle from '@assets/images/sutji/undangan/pita-red-sigle.webp';
import calendarLove from '@assets/images/sutji/undangan/calendar-love.webp';
import mapPin from '@assets/images/sutji/undangan/map-pin.webp';
import um from '@assets/images/sutji/undangan/um.webp';
import pantai from '@assets/images/sutji/undangan/pantai.webp';
import lamar from '@assets/images/sutji/undangan/lamar.webp';
import nikah from '@assets/images/sutji/undangan/nikah.webp';
import potrait from '@assets/images/sutji/undangan/potrait.webp';
import bri from '@assets/images/sutji/undangan/bri.webp';
import bca from '@assets/images/bank/bca.webp';
import spay from '@assets/images/sutji/undangan/spay.webp';
import gpay from '@assets/images/sutji/undangan/gpay.webp';
import dana from '@assets/images/sutji/undangan/dana.webp';
import kado from '@assets/images/sutji/undangan/kado.webp';
import kue from '@assets/images/sutji/undangan/kue.webp';
import kupu from '@assets/images/sutji/undangan/kupu.webp';
import wave from '@assets/images/sutji/undangan/wave.webp';
import four from '@assets/images/sutji/undangan/4.webp';


export default function Windi() {
    const isWindi = true;

    const [isOpen, setIsOpen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [attendance, setAttendance] = useState('')
    const [tamu, setTamu] = useState('')
    const [messages, setMessages] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const audioRef = useRef(null)


    useEffect(() => {
        // Prepare audio player — place your music file at public/music.mp3
        try {
            audioRef.current = new Audio('beautiful-in-white.mp3')
            audioRef.current.loop = true
        } catch (e) {
            console.warn('Audio not available', e)
        }
        return () => {
            audioRef.current?.pause()
            audioRef.current = null
        }
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const guestName = params.get('g')?.trim()
        if (guestName) {
            setTamu(guestName)
            setName(guestName)
        }
    }, [])

    const sendWebhook = useCallback(async function trackVisitor(guestName) {
        const res = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: guestName,
                date: new Date().toISOString(),
            }),
        });

        console.log(res);

    }, [tamu]);

    const cleanedMessages = useMemo(() =>
        messages.map(m => ({
            ...m,
            name: cleanProfanity(m.name),
            message: cleanProfanity(m.message),
        })),
        [messages] // hanya recompute kalau messages berubah
    )

    const loadMessages = useCallback(async () => {
        try {
            const data = await fetchGuests()
            setMessages(data ?? [])
        } catch (error) {
            console.error('Fetch guest messages failed', error)
            // toast.error('Gagal memuat ucapan dari Supabase')
        }
    }, []);

    useEffect(() => {
        loadMessages()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim() || !message.trim()) {
            toast.error('Nama dan ucapan harus diisi')
            return
        }

        if (attendance !== 'Hadir' && attendance !== 'Tidak hadir') {
            toast.error('Silakan pilih Hadir atau Tidak hadir')
            return
        }

        setSubmitting(true)
        try {
            const createdRows = await createGuest({
                name: name.trim(),
                message: message.trim(),
                attendance
            })

            const created = createdRows?.[0] ?? {
                name: name.trim(),
                message: message.trim(),
                attendance
            }

            setMessages((prev) => [
                {
                    id: created?.id ?? Date.now(),
                    name: created?.name ?? name,
                    message: created?.message ?? message,
                    attendance: created?.attendance ?? attendance
                },
                ...prev
            ])

            setName('')
            setMessage('')
            setAttendance('')
            toast.success('Ucapan berhasil dikirim')
        } catch (error) {
            console.error('Submit guest failed', error)
            toast.error('Gagal mengirim ucapan, coba lagi')
        } finally {
            setSubmitting(false)
        }
    }

    async function copyToClipboard(text) {
        try {
            // Modern API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text)
                return true
            }

            // Fallback for older mobile browsers
            const textArea = document.createElement('textarea')

            textArea.value = text

            // Prevent keyboard popup on mobile
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            textArea.style.top = '-999999px'

            document.body.appendChild(textArea)

            textArea.focus()
            textArea.select()

            const success = document.execCommand('copy')

            textArea.remove()

            return success
        } catch (err) {
            console.error('Copy failed:', err)
            return false
        }
    }

    function handleOpen() {
        setIsOpen(true);
        togglePlay();
        sendWebhook(tamu || 'Tamu tanpa nama');
    }

    async function togglePlay() {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            await audioRef.current.play().catch(() => {
                // autoplay may be blocked; still set state so UI reflects intent
                console.warn('Play was blocked by browser')
            })
            setIsPlaying(true)
        }
    }

    return (
        <div className="relative min-h-dvh md:min-h-screen bg-white flex justify-center">
            {isOpen && (<main className='relative w-full md:max-w-sm overflow-y-auto overflow-x-hidden'>
                <section className='relative min-h-screen overflow-hidden pt-20'>
                    {/* Bunga Kiri Atas */}
                    <div className="absolute top-0 left-0 -translate-x-4/8 -translate-y-1/8 -scale-y-100">
                        <motion.img
                            src={blueFlower}
                            alt="Flower"
                            className='w-40 h-auto'
                            style={{ originX: 0.5, originY: 1 }}
                            animate={{ rotate: [0, -5, 3, -1.5, 0] }}
                            transition={{
                                duration: 4.2,
                                repeat: Infinity,
                                ease: [0.45, 0.05, 0.55, 0.95],
                                times: [0, 0.3, 0.6, 0.8, 1]
                            }}
                        />
                    </div>

                    {/* Bunga Kanan Atas */}
                    <div className="absolute top-0 right-0 translate-x-20 md:translate-x-3/8 -translate-y-1/8 -scale-y-100 -scale-x-100">
                        <motion.img
                            src={blueFlower}
                            alt="Flower"
                            className='w-40 h-auto'
                            style={{ originX: 0.5, originY: 1 }}
                            animate={{ rotate: [0, 4, -3, 1.5, 0] }}
                            transition={{
                                duration: 4.8,
                                repeat: Infinity,
                                ease: [0.45, 0.05, 0.55, 0.95],
                                times: [0, 0.25, 0.55, 0.75, 1],
                                delay: 0.8
                            }}
                        />
                    </div>
                    <div className="relative flex flex-col items-center -mt-5 px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 60, }}
                            animate={{ opacity: 1, y: 0, }}
                            transition={{ duration: 1.2, ease: 'easeOut', }}
                            className="flex flex-col items-center"
                        >
                            <img
                                src={std}
                                alt="Yai"
                                className="w-56 h-auto"
                            />

                            <p
                                className="mt-1 text-center font-authenia text-4xl text-secondary"
                            >
                                The wedding of
                            </p>
                        </motion.div>
                        <motion.img
                            initial={{ opacity: 0, y: 0, }}
                            animate={{ opacity: 1, y: 0, }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
                            src={heroImg}
                            className='w-[90%]'

                        />
                        <motion.div
                            initial={{ opacity: 0, y: 60, }}
                            animate={{ opacity: 1, y: 0, }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
                            className="flex flex-col items-center"
                        >
                            <p className='text-4xl text-primary mt-2 font-pacific-northwest text-center'>
                                Windy & Sutji
                            </p>
                            <p className='text-base font-bold text-primary font-glacial-indifference text-center'>
                                Sabtu, 04 Juli 2026
                            </p>
                        </motion.div>

                    </div>
                </section>

                <section className='relative md:mt-40 min-h-205 overflow-visible'>
                    {/* Bunga Kiri */}
                    <div className="absolute top-0 left-0 -translate-x-2/4 -translate-y-5/6">
                        <motion.img
                            src={blueFlower}
                            alt="Flower"
                            className='w-55 h-auto'
                            style={{ originX: 0.5, originY: 1 }}
                            animate={{ rotate: [0, -6, 4, -2, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: [0.45, 0.05, 0.55, 0.95],
                                times: [0, 0.3, 0.6, 0.8, 1]
                            }}
                        />
                    </div>

                    {/* Bunga Kanan */}
                    <div className="absolute top-0 right-0 translate-x-2/4 -translate-y-5/6">
                        <motion.img
                            src={blueFlower}
                            alt="Flower"
                            className='w-55 h-auto transform -scale-x-100'
                            style={{ originX: 0.5, originY: 1 }}
                            animate={{ rotate: [0, 5, -3, 2, 0] }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: [0.45, 0.05, 0.55, 0.95],
                                times: [0, 0.25, 0.55, 0.75, 1],
                                delay: 0.6
                            }}
                        />
                    </div>
                    <div className="relative w-7/8 mx-auto">
                        <div className="absolute bottom-0 -translate-y-50 ">
                            <motion.img
                                initial={{ opacity: 0, y: 60, }}
                                whileInView={{ opacity: 1, y: 0, }}
                                viewport={{ once: true, amount: 0.3, }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                src={kupu} alt="" className='w-15' />
                        </div>
                        <ImageContainer image={frameDoa} className='-mt-10'>
                            <div className="text-center w-7/9 space-y-4 flex flex-col items-center">
                                <img src={bismila} alt="Bismillah" className='w-3/5' />
                                <p className="text-[10px] text-primary font-glacial-indifference">
                                    Dan diantara tanda-tanda kekuasaan-Nya ialah diciptakan-Nya untuk pasangan hidup dari jenismu sendiri, supaya kamu mendapat ketenangan dan dijadikan-Nya diantara kamu kasih sayang. Sesungguhnya yang demikian itu merupakan tanda-tanda kebesaran-Nya bagi orang-orang yang berfikir.
                                </p>

                                <img src={qs} alt="qur'an surah" className='w-4/5' />

                            </div>
                        </ImageContainer>

                        <motion.p
                            initial={{ opacity: 0, y: 60, }}
                            whileInView={{ opacity: 1, y: 0, }}
                            viewport={{ once: true, amount: 0.3, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-4xl md:text-5xl text-primary my-10 font-authenia text-center'>
                            Counting Days
                        </motion.p>

                        <Countdown targetDate="2026-07-04T08:00:00" />
                        <motion.p
                            initial={{ opacity: 0, y: 60, }}
                            whileInView={{ opacity: 1, y: 0, }}
                            viewport={{ once: true, amount: 0.3, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-2xl md:text-3xl text-primary mt-6 font-more-sugar text-center'>
                            Sabtu
                        </motion.p>
                        <CalendarRow value={[1, 2, 3, 4, 5, 6, 7]} isWindi={true}/>
                        <motion.p
                            initial={{ opacity: 0, y: 60, }}
                            whileInView={{ opacity: 1, y: 0, }}
                            viewport={{ once: true, amount: 0.1, }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 * 4 }}
                            className='text-2xl md:text-3xl text-primary mt-1 font-more-sugar text-center'>
                            Juli 2026
                        </motion.p>

                    </div>
                </section>

                <section className='relative min-h-screen overflow-visible'>
                    <h1 className='absolute w-full flex justify-center text-5xl text-white bg-secondary pt-3 font-authenia'>
                        <motion.span
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 1 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                        >
                            Bride & Groom
                        </motion.span>
                    </h1>
                    <div className="">
                        <img src={wave} alt="" className='pt-5' />
                    </div>
                    <div className='flex flex-col items-center mt-4 font-glacial-indifference'>
                        <motion.p
                            initial={{ opacity: 0, y: 60, }}
                            whileInView={{ opacity: 1, y: 0, }}
                            viewport={{ once: true, amount: 0.3, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-center text-xs leading-4 mb-3'>Assalamualaikum Wr.Wb.</motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 60, }}
                            whileInView={{ opacity: 1, y: 0, }}
                            viewport={{ once: true, amount: 0.3, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-center text-xs leading-4'
                        >
                            Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i pada acara pernikahan kami.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, }}
                        whileInView={{ opacity: 1, }}
                        viewport={{ once: true, amount: 0.8, }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        className='mt-2 flex flex-col items-center'
                    >
                        <div className="relative w-full h-60 flex items-center justify-center">
                            {/* Gambar background / frame — di belakang */}
                            <img src={gromPhoto} alt="Bride" className="relative w-31.5 translate-y-0.5" />
                            <img src={frame} alt="Frame" className="absolute w-full h-full object-contain" />
                            {/* Foto — di depan, tengah */}
                        </div>
                        <p className='text-center text-lg text-primary font-pacific-northwest mt-2'>Windy Setyadi, S.E.</p>
                        <p className='text-center text-[10px] font-bold text-primary font-glacial-indifference mt-1'>Anak kedua dari Bapak Suwantah dan Ibu Parmi Juliati</p>
                        <div className="flex justify-center mt-2 bg-secondary px-5 py-2 rounded-full">
                            <img src={ig} alt="Instagram" className='w-5 h-auto' />
                            <a
                                href="https://www.instagram.com/windy_setyadi"
                                target="_blank" rel="noopener noreferrer"
                                className='text-center text-xs text-white font-glacial-indifference ml-1'>
                                @windy_setyadi
                            </a>
                        </div>
                    </motion.div>

                    <motion.img
                        initial={{ opacity: 0, }}
                        whileInView={{ opacity: 1, }}
                        viewport={{ once: true, amount: 0.8, }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        src={janji} alt="Janji" className='w-2/6 h-auto mx-auto mt-15 mb-10'
                    />

                    <motion.div
                        initial={{ opacity: 0, }}
                        whileInView={{ opacity: 1, }}
                        viewport={{ once: true, amount: 0.8, }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        className='mt-6 flex flex-col items-center'
                    >
                        <div className="relative w-full h-60 flex items-center justify-center">
                            {/* Gambar background / frame — di belakang */}
                            <img src={bridePhoto} alt="Bride" className="relative w-31.5 translate-y-0.5" />
                            <img src={frame} alt="Bride" className="absolute w-full h-full object-contain" />
                            {/* Foto — di depan, tengah */}
                        </div>
                        <p className='text-center text-lg text-primary font-pacific-northwest mt-2'>Sutji Rahayu Rahma Maulidah, S.Pd., Gr.</p>
                        <p className='text-center text-[10px] font-bold text-primary font-glacial-indifference mt-1'>Anak pertama dari Bapak Sutaji, S.Pd. dan Ibu Budi Rahayu</p>
                        <div className="flex justify-center mt-2 bg-secondary px-5 py-2 rounded-full gap-1">
                            <img src={ig} alt="Instagram" className='w-5 h-auto' />
                            <a
                                href="https://www.instagram.com/stjrhy_"
                                target="_blank" rel="noopener noreferrer"
                                className='text-center text-xs text-white font-glacial-indifference'>
                                @stjrhy_
                            </a>
                        </div>
                    </motion.div>
                </section>

                <section className='relative min-h-screen overflow-visible mt-10'>
                    <div className="absolute top-40 -left-3">
                        <img src={balon} alt="balon" className='w-20 h-auto' />
                    </div>
                    <div className="absolute top-8/18 -right-2">
                        <img src={ring} alt="Ring" className='w-15 h-auto' />
                    </div>
                    <img src={pitaLove} alt="pita love" className='mx-auto' />
                    <div className="flex flex-col items-center mt-5">
                        <motion.p
                            initial={{ opacity: 0, y: 60, }}
                            whileInView={{ opacity: 1, y: 0, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-5xl md:text-5xl text-primary mt-5 font-authenia text-center'>
                            Wedding Event
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 1, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-3xl md:text-3xl text-primary mt-10 md:mt-6 font-pacific-northwest text-center'>
                            Sabtu
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 1, }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.7 }}
                            className="flex justify-center items-center gap-3 mt-2">
                            <p className='text-3xl md:text-3xl text-primary font-pacific-northwest text-center'>
                                Juli
                            </p>

                            <img src={four} alt="" className='w-13 mb-3' />

                            <p className='text-3xl md:text-3xl text-primary font-pacific-northwest text-center'>
                                2026
                            </p>
                        </motion.div>
                        <img src={pitaRed} alt="pita Red" className='mx-auto w-2/3' />

                        <div className="mt-1 w-full px-4">
                            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 gap-y-1">

                                {/* Header */}
                                <motion.p
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true, amount: 1, }}
                                    transition={{ duration: 2.5, ease: 'easeOut' }}
                                    className="text-end uppercase font-glacial-indifference text-lg font-bold text-secondary">
                                    Akad
                                </motion.p>

                                <div />

                                <motion.p
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true, amount: 1, }}
                                    transition={{ duration: 2.5, ease: 'easeOut' }}
                                    className="text-start uppercase font-glacial-indifference text-lg font-bold text-secondary">
                                    Resepsi
                                </motion.p>

                                {/* Time Row */}
                                <motion.div
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true, amount: 1, }}
                                    transition={{ duration: 2.5, ease: 'easeOut', delay: 0.5 }}
                                >
                                    <p className="text-end font-glacial-indifference text-xs text-primary">
                                        Jum'at, 03 Juli 2026
                                    </p>

                                    <p className="text-end font-glacial-indifference text-xs font-bold text-primary">
                                        09.00 - 10.00 WIB
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true, amount: 1, }}
                                    transition={{ duration: 2.5, ease: 'easeOut', delay: 0.5 }}
                                >
                                    <img
                                        src={calendarLove}
                                        alt="Calendar"
                                        className="w-8 shrink-0"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true, amount: 1, }}
                                    transition={{ duration: 2.5, ease: 'easeOut', delay: 0.5 }}
                                >
                                    <p className="text-start font-glacial-indifference text-xs text-primary">
                                        Sabtu, 04 Juli 2026
                                    </p>

                                    <p className="text-start font-glacial-indifference text-xs font-bold text-primary">
                                        14.00 - Selesai
                                    </p>
                                </motion.div>

                                {/* Location Row */}
                                <motion.div
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true, amount: 1, }}
                                    transition={{ duration: 2.5, ease: 'easeOut', delay: 1 }}
                                >
                                    <p className="text-end font-glacial-indifference text-[10px] text-primary">
                                        Kediaman Mempelai Putri
                                    </p>

                                    <p className="text-end font-glacial-indifference text-[10px] leading-relaxed text-primary">
                                        Dsn. Tanjung Ds. Ngusikan Kec. Ngusikan Kab. Jombang
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true, amount: 1, }}
                                    transition={{ duration: 1.2, ease: 'easeOut', delay: 1 }}
                                    className="flex items-center justify-center">
                                    <img
                                        src={mapPin}
                                        alt="Location"
                                        className="w-8 shrink-0"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true, amount: 1, }}
                                    transition={{ duration: 1.2, ease: 'easeOut', delay: 1 }}
                                >
                                    <p className="text-start font-glacial-indifference text-[10px] text-primary">
                                        Kediaman Mempelai Putri
                                    </p>

                                    <p className="text-start font-glacial-indifference text-[10px] leading-relaxed text-primary">
                                        Dsn. Tanjung Ds. Ngusikan Kec. Ngusikan Kab. Jombang
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="px-8 py-2 rounded-full mt-10 text-primary font-pacific-northwest text-4xl cursor-pointer hover:bg-secondary/90 transition-colors">
                            Maps
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="w-10/12">
                            <MapEmbed lat={-7.418664} lng={112.339558} title="Kediaman Mempelai Putri" />
                        </motion.div>
                        <motion.button
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            onClick={() => window.open(
                                'https://maps.app.goo.gl/FW4Jzszchp4vxWSi9',
                                '_blank'
                            )}
                            className="flex justify-center bg-secondary w-2/3 py-2 rounded-full my-10 text-white font-glacial-indifference text-lg font-bold cursor-pointer hover:bg-secondary/90 transition-colors">
                            Buka di google map
                        </motion.button>

                        <motion.p
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="text-center text-xs w-7/8 leading-4 font-glacial-indifference text-primary/80">
                            Kedatangan Anda fleksibel di sepanjang resepsi. Kami sangat menantikan kehadiran Anda di jam berapa pun untuk berbagi kebahagiaan.
                        </motion.p>
                        <img src={pitaLove} alt="pita love" className='mx-auto my-10' />
                    </div>
                </section>

                <section className='relative min-h-screen overflow-visible'>
                    <div className='flex flex-col items-center'>
                        <motion.p
                            initial={{ opacity: 0, y: 60, }}
                            whileInView={{ opacity: 1, y: 0, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-5xl md:text-6xl text-primary mt-5 font-authenia text-center'>
                            Our Story
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 1, }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                            className="grid grid-cols-8 gap-2 mt-6 items-center">
                            {/* Image */}
                            <div className="col-span-3">
                                <img
                                    src={um}
                                    alt="Rapat UM"
                                    className="w-full"
                                />
                            </div>

                            {/* Text */}
                            <div className="col-span-5">
                                <h2 className="text-xl font-better-saturday">
                                    Dimana kami bertemu? di rapat Imj Um
                                </h2>

                                <p className="mt-2 text-xs text-gray-800 font-glacial-indifference">
                                    Berawal dari kejailan masa kecil di sekolah dan TPQ yang sama, semesta sempat memisahkan langkah kami. Namun takdir punya cara sendiri; lewat sebuah perantara, kami dipertemukan kembali di Rapat IMJ UM.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 1, }}
                            transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
                            className="grid grid-cols-8 gap-2 mt-6 items-center">
                            {/* Text */}
                            <div className="col-span-5">
                                <h2 className="text-xl text-end font-better-saturday">
                                    Saling berkenalan dan menjalin hubungan
                                </h2>

                                <p className="mt-2 text-xs text-end text-gray-800 font-glacial-indifference">
                                    Dari pertemuan tak sengaja, hadir kenyamanan yang tak diduga. Lewat tawa yang akrab dan obrolan yang hangat, hati kami akhirnya saling terpaut. Januari 2020 menjadi saksi awal mula kami memutuskan untuk berjalan bersama mengukir cerita.
                                </p>
                            </div>
                            {/* Image */}
                            <div className="col-span-3">
                                <img
                                    src={pantai}
                                    alt="Pantai"
                                    className="w-full"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 1, }}
                            transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
                            className="grid grid-cols-8 gap-2 mt-6 items-center">
                            {/* Image */}
                            <div className="col-span-3">
                                <img
                                    src={lamar}
                                    alt="Lamar"
                                    className="w-full"
                                />
                            </div>

                            {/* Text */}
                            <div className="col-span-5">
                                <h2 className="text-xl font-better-saturday">
                                    Tumbuh bersama dan berkomitmen
                                </h2>

                                <p className="mt-2 text-xs text-gray-800 font-glacial-indifference">
                                    Lima tahun perjalanan penuh warna telah mendewasakan kami. Di tahun 2025, kami memantapkan hati untuk melangkah ke babak baru melalui ikatan pertunangan. Sebuah awal untuk menyatukan tujuan dan saling menggenggam demi membangun masa depan bersama.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 1, }}
                            transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
                            className="grid grid-cols-8 gap-2 mt-6 items-center">
                            {/* Text */}
                            <div className="col-span-5">
                                <h2 className="text-xl text-end font-better-saturday">
                                    Akhirnya Menikah
                                </h2>

                                <p className="mt-2 text-xs text-end text-gray-800 font-glacial-indifference">
                                    Berbekal keyakinan dan cinta yang kian kuat, tahun 2026 menjadi babak paling sakral dalam kisah kami. Kami memantapkan hati untuk menikah; menyatukan dua jiwa yang telah lama saling menguatkan ke dalam ikatan suci yang penuh restu dan harapan.
                                </p>
                            </div>
                            {/* Image */}
                            <div className="col-span-3">
                                <img
                                    src={nikah}
                                    alt="Nikah"
                                    className="w-full"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className='relative min-h-screen overflow-visible mt-10'>
                    <div className="absolute top-0 left-0 -translate-x-4/8 -translate-y-1/8 -scale-y-100">
                        <motion.img
                            src={blueFlower}
                            alt="Flower"
                            className='w-40 h-auto'
                            style={{ originX: 0.5, originY: 1 }}
                            animate={{ rotate: [0, -5, 3, -1.5, 0] }}
                            transition={{
                                duration: 4.2,
                                repeat: Infinity,
                                ease: [0.45, 0.05, 0.55, 0.95],
                                times: [0, 0.3, 0.6, 0.8, 1]
                            }}
                        />
                    </div>

                    {/* Bunga Kanan Atas */}
                    <div className="absolute top-0 right-0 translate-x-20 md:translate-x-3/8 -translate-y-1/8 -scale-y-100 -scale-x-100">
                        <motion.img
                            src={blueFlower}
                            alt="Flower"
                            className='w-40 h-auto'
                            style={{ originX: 0.5, originY: 1 }}
                            animate={{ rotate: [0, 4, -3, 1.5, 0] }}
                            transition={{
                                duration: 4.8,
                                repeat: Infinity,
                                ease: [0.45, 0.05, 0.55, 0.95],
                                times: [0, 0.25, 0.55, 0.75, 1],
                                delay: 0.8
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <motion.p
                            initial={{ opacity: 0, y: 60, }}
                            whileInView={{ opacity: 1, y: 0, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-5xl md:text-6xl text-primary mb-10 mt-5 font-authenia text-center'>
                            Potrait of Us
                        </motion.p>
                        <motion.img
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            src={potrait} alt="Potrait of Us" />
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-sm text-gray-600 font-glacial-indifference text-center mt-10'>
                            "To have and to hold, from this day forward."
                        </motion.p>
                    </div>
                </section>

                <section className='relative min-h-screen overflow-visible'>
                    <img src={pitaLove} alt="pita love" className='mx-auto my-5' />
                    <div className="absolute bottom-45 -left-5">
                        <img src={kue} alt="Kue" className='w-20' />
                    </div>
                    <div className="flex flex-col items-center">
                        <motion.p
                            initial={{ opacity: 0, y: 60, }}
                            whileInView={{ opacity: 1, y: 0, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                            className='text-5xl md:text-6xl text-primary mt-5 font-authenia text-center'>
                            Wedding Gift
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                            className='text-center font-glacial-indifference text-xs my-5 w-6/7'>
                            Doa restu anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah tanda kasih anda, anda dapat memberikan tanda kasih kepada kami melalui:
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                            className='flex flex-col items-center mb-5'
                        >
                            <img src={bri} alt="BRI" className='w-1/5 h-auto my-5' />
                            <p className='text-center text-sm text-primary font-glacial-indifference'>
                                6245 0101 1543 534 <br />
                                a/n Windy Setyadi
                            </p>
                            <button
                                onClick={async () => {
                                    await copyToClipboard('624501011543534');
                                    toast.success('Tercopy ke clipboard!');
                                }}
                                className="my-3 px-4 py-1 bg-secondary text-white rounded-full text-sm font-bold font-glacial-indifference hover:bg-secondary/90 transition-colors"
                            >
                                Copy Rekening
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                            className='flex flex-col items-center mb-5'
                        >
                            <img src={bca} alt="BCA" className='w-2/5 h-auto my-5' />
                            <p className='text-center text-sm text-primary font-glacial-indifference'>
                                773-089-6071 <br />
                                a/n Windy Setyadi
                            </p>
                            <button
                                onClick={async () => {
                                    await copyToClipboard('7730896071');
                                    toast.success('Tercopy ke clipboard!');
                                }}
                                className="my-3 px-4 py-1 bg-secondary text-white rounded-full text-sm font-bold font-glacial-indifference hover:bg-secondary/90 transition-colors"
                            >
                                Copy Rekening
                            </button>
                        </motion.div>


                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                            className='flex flex-col items-center mb-5'
                        >
                            <div className="flex justify-center items-center gap-3">
                                <img src={dana} alt="Dana" className='w-1/5 h-auto my-5' />
                                <img src={spay} alt="SPay" className='w-1/5 h-auto my-5' />
                                <img src={gpay} alt="GPay" className='w-1/5 h-auto my-5' />
                            </div>
                            <p className='text-center text-sm text-primary font-glacial-indifference'>
                                0857 4000 2003 <br />
                                a/n Windy Setyadi
                            </p>
                            <button
                                onClick={async () => {
                                    await copyToClipboard('085740002003');
                                    toast.success('Tercopy ke clipboard!');
                                }}
                                className="my-3 px-4 py-1 bg-secondary text-white rounded-full text-sm font-bold font-glacial-indifference hover:bg-secondary/90 transition-colors z-50"
                            >
                                Copy Nomor
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true, amount: 0.5, }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                            className='flex flex-col mt-5 items-center'>
                            <p className='text-center text-3xl text-primary font-authenia'>
                                Kirim Kado
                            </p>
                            <img src={kado} alt="Kado" className='w-1/5 h-auto my-3' />
                            <p className='text-center w-4/5 text-sm text-primary font-glacial-indifference'>
                                Dsn. Tanjung RT/RW 011/004 Ds. Ngusikan Kec. Ngusikan Kab. Jombang Jawa Timur. <br /> Kode pos 61486
                            </p>
                            <button
                                onClick={async () => {
                                    await copyToClipboard('Dsn. Tanjung RT/RW 023/004 Ds. Ngusikan Kec. Ngusikan Kab. Jombang Jawa Timur. Kode pos 61486');
                                    toast.success('Tercopy ke clipboard!');
                                }}
                                className="my-3 px-4 py-1 bg-secondary text-white rounded-full text-sm font-bold font-glacial-indifference hover:bg-secondary/90 transition-colors"
                            >
                                Copy Alamat
                            </button>
                        </motion.div>

                        <img src={pitaLove} alt="pita love" className='mx-auto my-5' />

                        <p className='text-center font-glacial-indifference text-xs mt-5 w-6/7'>
                            Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami. Atas kehadiran dan doa restunya kami ucapkan terimakasih. <br /><br />Wassalamualaikum Wr. Wb.
                        </p>
                    </div>
                </section>

                <section className='relative min-h-screen overflow-visible mt-5'>
                    <div className="flex justify-center items-center flex-col px-6">
                        <motion.p
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className='text-5xl md:text-5xl text-primary mt-3 font-pacific-northwest text-center'>
                            Windy & Sutji
                        </motion.p>
                        <img src={pitaRedSingle} alt="pita Red" className='mx-auto w-1/2' />

                        <div className='w-full max-w-md mt-10'>
                            <form
                                onSubmit={async (e) => handleSubmit(e)}
                                className='bg-white border-2 border-primary/90 rounded-3xl p-6 space-y-4'
                            >
                                <p className='text-4xl md:text-5xl text-primary font-authenia text-center'> Ucapan dan Doa</p>

                                <div>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Nama'
                                        className='w-full font-glacial-indifference text-secondary mt-2 border border-primary/70 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/90'
                                    />
                                </div>

                                <div>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder='Ucapan dan doa'
                                        rows={5}
                                        className='w-full font-glacial-indifference text-secondary mt-2 border border-primary/70 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/90'
                                    />
                                </div>

                                <div>
                                    <select
                                        value={attendance}
                                        onChange={(e) => setAttendance(e.target.value)}
                                        className='w-full font-glacial-indifference text-secondary mt-2 border border-primary/70 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/90'
                                    >
                                        <option value=''>Konfirmasi kehadiran</option>
                                        <option value='Hadir'>Hadir</option>
                                        <option value='Tidak hadir'>Tidak hadir</option>
                                    </select>
                                </div>

                                <div className='text-center'>
                                    <button
                                        type='submit'
                                        disabled={submitting}
                                        className='bg-primary text-white py-2 px-6 rounded-md font-glacial-indifference hover:bg-primary/90 transition-colors disabled:cursor-not-allowed disabled:opacity-60'
                                    >
                                        {submitting ? 'Mengirim...' : 'Kirim'}
                                    </button>
                                </div>
                            </form>

                            <div className='mt-4 space-y-3 h-70 md:h-50 overflow-y-auto px-2'>
                                {messages.length === 0 && (
                                    <p className='text-sm text-gray-500 text-center'>Belum ada ucapan. Jadilah yang pertama!</p>
                                )}
                                {cleanedMessages.map((m) => (
                                    <div key={m.id} className='bg-white border border-primary/20 rounded-lg p-3'>
                                        <div className='flex items-center gap-2'>
                                            <p className='font-bold text-sm text-primary'>{m.name}</p>
                                            <span className='text-xs text-gray-500'>· {m.attendance}</span>
                                        </div>
                                        <p className='text-xs text-gray-700 mt-2'>{m.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>)}

            <motion.div
                className="absolute inset-0"
                initial={{ y: 0 }}
                animate={{ y: isOpen ? '-110%' : 0 }}
                transition={{ duration: 2, ease: 'easeInOut' }}>

                <Cover onOpen={handleOpen} tamu={tamu} isWindi={isWindi} />
            </motion.div>

            {isOpen && (
                <motion.button
                    aria-label={isPlaying ? 'Stop music' : 'Play music'}
                    onClick={togglePlay}
                    whileTap={{ scale: 0.95 }}
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ repeat: isPlaying ? Infinity : 0, duration: 2, ease: 'linear' }}
                    className={`fixed right-4 bottom-4 z-50 rounded-full p-3 shadow-lg text-white ${isPlaying ? 'bg-primary' : 'bg-primary/60'}`}>
                    <Disc3 size={20} />
                </motion.button>
            )}
        </div>
    )
}
