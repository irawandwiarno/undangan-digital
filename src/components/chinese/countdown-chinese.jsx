import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
  const total = new Date(targetDate) - new Date();

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function CountdownChinese({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = getTimeLeft(targetDate);

      if (updated.total <= 0) {
        clearInterval(timer);
      }

      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const format = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Title */}
      <div className="px-4 py-1 rounded-full bg-linear-to-b font-medium from-[#ECDAC4] to-[#FFF5E3] text-lg font-parastoo">
        Waktu menuju acara
      </div>

      {/* Grid Countdown */}
      <div className="grid grid-cols-4 gap-4 w-full max-w-3xl">
        <TimeBox value={format(timeLeft.days)} label="Hari" />
        <TimeBox value={format(timeLeft.hours)} label="Jam" />
        <TimeBox value={format(timeLeft.minutes)} label="Menit" />
        <TimeBox value={format(timeLeft.seconds)} label="Detik" />
      </div>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full aspect-square rounded-xl bg-linear-to-b from-[#ECDAC4] to-[#FFF5E3] flex items-center justify-center">
        <span className="text-[#3F1114] p-3 text-2xl md:text-5xl font-serif">
          {value}
        </span>
      </div>
      <p className="text-[#3F1114] text-sm md:text-base font-serif">
        {label}
      </p>
    </div>
  );
}