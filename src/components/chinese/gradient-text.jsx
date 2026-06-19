import { twMerge } from "tailwind-merge"

export default function GradientText({ text, className }) {
  return (
    <span
      className={twMerge("bg-linear-to-b from-[#FFF3E2] to-[#C59F74] bg-clip-text text-transparent", className)}
    >
      {text}
    </span>
  )
}