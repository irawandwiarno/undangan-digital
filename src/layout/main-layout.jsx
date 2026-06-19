import frameCircle from "@assets/images/chinese/main/frame-circle.webp"
import nameClosing from "@assets/images/chinese/main/name-closing.webp"
import { motion } from 'framer-motion'


// Layout.jsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white flex justify-end overflow-hidden">
      {/* kolom kiri — shrink-0 biar tidak menyusut */}
      <div className="hidden md:flex shrink-0 w-[calc(100vw-380px)] justify-center items-center bg-linear-to-r from-[#CE3947] to-[#3F1114] sticky top-0 h-screen">
        <div className="relative z-10 w-full max-w-xs flex items-center justify-center">
          <motion.img
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            src={frameCircle}
            alt="closing illustration"
            className="absolute w-70 object-contain"
          />
          <img src={nameClosing} alt="" className="absolute w-40" />
        </div>
      </div>

      {/* kolom kanan — konten utama */}
      <div className="w-full md:w-95 shrink-0 h-screen no-scrollbar bg-white relative overflow-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}