import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const words = ['powerful', 'innovative', 'beautiful', 'smart', 'creative']

function CyclingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev === words.length - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-flex overflow-hidden align-bottom h-[1.1em] text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
      {words.map((word, i) => (
        <span
          key={word}
          className="font-bold whitespace-nowrap text-white transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            position: i === index ? 'relative' : 'absolute',
            left: i === index ? 'auto' : 0,
            transform: `translateY(${i === index ? 0 : i < index ? '-120%' : '120%'})`,
            opacity: i === index ? 1 : 0,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    opacity: 0.06 + i * 0.01,
    width: 0.5 + i * 0.02,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function CTA() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(120,119,198,0.12),transparent)]" />
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
            <MessageCircle className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-400">{t.cta.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              {t.cta.ready}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              {t.cta.something}&nbsp;
              <CyclingWord />
              &nbsp;?
            </span>
          </h2>

          <p className="text-lg text-neutral-400 max-w-xl mx-auto">
            {t.cta.description}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <a
              href="https://wa.me/491773052955"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all duration-300 text-base sm:text-lg"
            >
              {t.cta.whatsapp}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full border border-white/15 text-white font-semibold hover:bg-white/[0.05] transition-all duration-300 text-base sm:text-lg"
            >
              {t.cta.explore}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
