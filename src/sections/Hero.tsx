import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { useI18n } from '@/lib/i18n'

export function Hero() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-400">
                    {t.hero.weAre}{' '}
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                    {t.hero.company}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-base md:text-xl text-neutral-400 max-w-lg leading-relaxed"
                >
                  {t.hero.description}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              >
                <a
                  href="https://wa.me/491773052955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-all duration-300"
                >
                  {t.hero.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white font-medium hover:bg-white/[0.05] transition-all duration-300"
                >
                  {t.hero.services}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="flex items-center gap-4 sm:gap-8 pt-4 text-xs sm:text-sm text-neutral-500 flex-wrap"
              >
                <div>
                  <span className="text-white font-semibold">50+</span> {t.stats.projects}
                </div>
                <div className="w-px h-4 bg-neutral-700" />
                <div>
                  <span className="text-white font-semibold">30+</span> {t.stats.clients}
                </div>
                <div className="w-px h-4 bg-neutral-700" />
                <div>
                  <span className="text-white font-semibold">4+</span> {t.stats.years}
                </div>
              </motion.div>
            </div>

            <motion.div
              style={{ y }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
              className="relative h-[300px] sm:h-[400px] lg:h-[700px] -mx-4 sm:-mx-8 lg:mx-0"
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs text-neutral-500 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-neutral-500 animate-bounce" />
      </motion.div>
    </section>
  )
}
