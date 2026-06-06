import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 99, suffix: '%', label: 'Client Retention' },
]

function Counter({
  value,
  suffix,
  isActive,
}: {
  value: number
  suffix: string
  isActive: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isActive, value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 bg-black border-y border-white/[0.04]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0.03),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center space-y-2"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                <Counter value={stat.value} suffix={stat.suffix} isActive={isInView} />
              </div>
              <p className="text-sm text-neutral-500 tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
