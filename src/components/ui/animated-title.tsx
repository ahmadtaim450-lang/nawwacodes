import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type AnimatedTitleProps = {
  prefix?: string
  words: string[]
  className?: string
}

export function AnimatedTitle({ prefix, words, className }: AnimatedTitleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev === words.length - 1 ? 0 : prev + 1))
    }, 2000)
    return () => clearInterval(id)
  }, [words.length])

  const longest = words.reduce((a, b) => (a.length > b.length ? a : b))

  return (
    <span className={className}>
      {prefix && <span>{prefix}&nbsp;</span>}
      <span
        className="relative inline-flex items-center overflow-hidden align-bottom"
        style={{ height: "1.2em", minWidth: `${longest.length}ch` }}
      >
        {words.map((word, index) => (
          <motion.span
            key={word}
            animate={{
              y: index === currentIndex ? 0 : index < currentIndex ? -40 : 40,
              opacity: index === currentIndex ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 font-semibold whitespace-nowrap"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </span>
  )
}
