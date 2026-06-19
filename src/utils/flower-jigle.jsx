// FlowerJiggle.jsx
import { motion } from 'framer-motion'

export function FlowerHanging({ children }) {
  return (
    <motion.div
      className="pointer-events-none select-none origin-top"
      animate={{ rotate: [-2, 2, -1, 1, 0] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
    >
      {children}
    </motion.div>
  )
}

export function FlowerGrounded({ children }) {
  return (
    <motion.div
      className="pointer-events-none select-none origin-bottom"
      animate={{ rotate: [-1.5, 1.5, -1, 1, 0], y: [0, -3, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
    >
      {children}
    </motion.div>
  )
}

export function FlowerSwayLeft({ children }) {
  return (
    <motion.div
      className="pointer-events-none select-none origin-left"
      animate={{ rotate: [-3, 0, -2, 0, -1, 0], x: [0, 4, 0] }}
      transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

export function FlowerSwayRight({ children }) {
  return (
    <motion.div
      className="pointer-events-none select-none origin-right"
      animate={{ rotate: [3, 0, 2, 0, 1, 0], x: [0, -4, 0] }}
      transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 0.8 }}
    >
      {children}
    </motion.div>
  )
}

export function FlowerFloat({ children }) {
  return (
    <motion.div
      className="pointer-events-none select-none origin-center"
      animate={{ rotate: [-2, 2, -1, 1, 0], y: [0, -5, 0, -3, 0] }}
      transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 1 }}
    >
      {children}
    </motion.div>
  )
}

export function FlowerSpreading({ children }) {
  return (
    <motion.div
      className="pointer-events-none select-none origin-center"
      animate={{ rotate: [-2, 2, -1, 1, 0], y: [0, -4, 0, -2, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 0.6 }}
    >
      {children}
    </motion.div>
  )
}