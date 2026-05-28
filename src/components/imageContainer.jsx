import React from 'react'
import { motion } from 'framer-motion'

export default function ImageContainer({
    image,
    children,
    className = '',
    overlayClassName = '',
    imageClassName = '',
}) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 60, }}
            whileInView={{ opacity: 1, y: 0, }}
            viewport={{once: true, amount: 0.3,}}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
            className={`relative w-full overflow-hidden ${className}`}
        >
            {/* Background Image */}
            <img
                src={image}
                alt="background"
                className={`w-full h-auto object-cover ${imageClassName}`}
            />

            {/* Overlay */}
            <div
                className={`absolute inset-0 ${overlayClassName}`}
            />

            {/* Center Content */}
            <div
                className="absolute inset-0 z-10 flex items-center justify-center px-6">
                {children}
            </div>
        </motion.section>
    )
}