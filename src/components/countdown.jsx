import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'

export default function Countdown({
    targetDate = '2026-12-31T00:00:00',
}) {
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate) - new Date()

        if (difference <= 0) {
            return {
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00',
            }
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        )

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        )

        const minutes = Math.floor(
            (difference / 1000 / 60) % 60
        )

        const seconds = Math.floor(
            (difference / 1000) % 60
        )

        return {
            days: String(days).padStart(2, '0'),
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
        }
    }

    const [timeLeft, setTimeLeft] = useState(
        calculateTimeLeft()
    )

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex items-center justify-center gap-2 md:gap-3 mt-3"
        >
            <TimeBox value={timeLeft.days} label="Days" />

            <TimeBox value={timeLeft.hours} label="Hours" />

            <TimeBox
                value={timeLeft.minutes}
                label="Minutes"
            />

            <TimeBox
                value={timeLeft.seconds}
                label="Seconds"
            />
        </motion.div>
    )
}


function TimeBox({ value, label }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-14 md:w-18 flex flex-col items-center rounded-t-full  bg-primary px-4 pt-4 pb-2 text-center shadow-lg md:px-5 md:pt-5 md:pb-2"            >
                <h2 className="font-pacific-northwest text-2xl text-white md:text-4xl">
                    {value}
                </h2>
                <p
                    className="text-xs md:text-lg uppercase text-white md:mt-1 font-pacific-northwest"
                >
                    {label}
                </p>
            </div>


        </div>
    )
}