// GuestLinkGenerator.jsx
import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom";

export default function GuestLinkGenerator() {
    const { slug } = useParams();
    const [guest, setGuest] = useState('')
    const [caption, setCaption] = useState('')
    const [copied, setCopied] = useState(false)
    const [copiedLink, setCopiedLink] = useState(false)
    const captionRef = useRef(null)

    const BASE = 'https://kuloaturi.my.id'

    const link = slug && guest
        ? `${BASE}/${slug}?g=${encodeURIComponent(guest)}`
        : ''

    const message = (() => {
        if (!link) return ''
        if (caption.includes('{{link}}')) return caption.replace(/\{\{link\}\}/g, link)
        if (caption.includes('{{name}}')) return caption.replace(/\{\{name\}\}/g, guest)
        return caption ? `${caption}\n\n${link}` : link
    })()

    function insertPlaceholder(text) {
        const ta = captionRef.current
        if (!ta) return
        const start = ta.selectionStart
        const end = ta.selectionEnd
        const next = caption.slice(0, start) + text + caption.slice(end)
        setCaption(next)
        setTimeout(() => {
            // ✅ pakai text.length bukan hardcode 9
            ta.selectionStart = ta.selectionEnd = start + text.length
            ta.focus()
        }, 0)
    }

    function highlightLink(text) {
        if (!link || !text) return text
        return text.split(link).map((part, i, arr) =>
            i < arr.length - 1
                ? <span key={i}>{part}<span className="text-blue-500 break-all">{link}</span></span>
                : <span key={i}>{part}</span>
        )
    }

    async function copyAll() {
        if (!message) return
        await navigator.clipboard.writeText(message)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    async function copyLink() {
        if (!link) return
        await navigator.clipboard.writeText(link)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
    }

    function share(platform) {
        if (!message) return
        const enc = encodeURIComponent(message)
        const urls = {
            wa: `https://wa.me/?text=${enc}`,
            tg: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(caption)}`,
            sms: `sms:?body=${enc}`,
        }
        if (urls[platform]) window.open(urls[platform], '_blank')
    }

    if (!slug) {
        return <div>Slug tidak ditemukan</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

                <h1 className="text-base font-medium text-gray-800">Generate Link Undangan</h1>

                {/* nama tamu */}
                <div className="space-y-1.5">
                    <label className="text-xs text-black">Nama tamu</label>
                    <input
                        type="text"
                        value={guest}
                        onChange={(e) => setGuest(e.target.value)}
                        placeholder="Budi Santoso"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gray-400 placeholder:text-gray-300"
                    />
                </div>

                {/* caption */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-xs text-black">Caption</label>
                        <div className='flex justify-center items-center'>
                            <button
                                onClick={() => insertPlaceholder('{{name}}')}
                                className="text-xs text-black border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                            >
                                + sisipkan {'{{name}}'}
                            </button>
                            <button
                                onClick={() => insertPlaceholder('{{link}}')}
                                className="text-xs text-black border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                            >
                                + sisipkan {'{{link}}'}
                            </button>
                        </div>

                    </div>
                    <textarea
                        ref={captionRef}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        rows={4}
                        placeholder="Halo, kami mengundang kamu untuk hadir di hari bahagia kami..."
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gray-400 resize-none placeholder:text-gray-300"
                    />
                </div>

                <hr className="border-gray-100" />

                {/* preview */}
                <div className="space-y-2">
                    <p className="text-xs text-black uppercase tracking-widest">Preview</p>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 leading-relaxed min-h-16 whitespace-pre-wrap wrap-break-words">
                        {message ? highlightLink(message) : <span className="text-gray-300">—</span>}
                    </div>
                </div>

                {/* link */}
                {/* {link && (
                    <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-blue-500 break-all">
                        {link}
                    </div>
                )} */}

                {/* salin pesan */}
                <button
                    onClick={copyAll}
                    disabled={!message}
                    className="w-full bg-rose-400 border border-gray-200 rounded-lg py-2.5 font-semibold font-alike text-lg text-white hover:bg-rose-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    {copied ? '✓ Tersalin!' : 'Salin pesan'}
                </button>

                <hr className="border-gray-100" />

                {/* share buttons */}
                <div className="space-y-2">
                    <p className="text-xs text-black uppercase tracking-widest">Bagikan via</p>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => share('wa')} disabled={!message} className="border border-gray-200 bg-green-400 rounded-lg py-2.5 text-sm text-white font-semibold hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">WhatsApp</button>
                        <button onClick={() => share('tg')} disabled={!message} className="border border-gray-200 bg-blue-600 rounded-lg py-2.5 text-sm text-white font-semibold hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">Telegram</button>
                        <button onClick={() => share('sms')} disabled={!message} className="border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">SMS</button>
                        <button onClick={copyLink} disabled={!link} className="border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                            {copiedLink ? '✓ Tersalin!' : 'Salin link'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}