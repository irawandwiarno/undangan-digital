import { twMerge } from "tailwind-merge"
import Typewriter from 'typewriter-effect';

export default function GradientText({ text, className, typing = false }) {
  return (
    <span
      className={twMerge("bg-linear-to-b from-[#FFF3E2] to-[#C59F74] bg-clip-text text-transparent", className)}
    >
      {typing ?
        <Typewriter
          options={{
            strings: [text],
            autoStart: true,
            loop: false,
            deleteSpeed: Infinity,
          }}
        /> : text}
    </span>
  )
}