"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, Users, Zap, Target } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function About() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    const load = async () => {
      if (window.innerWidth < 1024) return
      const { renderCanvas } = await import("@/components/ui/canvas")
      renderCanvas()
    }
    load()
  }, [])

  const stats = [
    { icon: Code2, value: "100+", label: t.about.stat1 },
    { icon: Users, value: "70+", label: t.about.stat2 },
    { icon: Zap, value: "4+", label: t.about.stat3 },
    { icon: Target, value: "100%", label: t.about.stat4 },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Canvas background */}
      <canvas
        id="canvas"
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_80%,rgba(249,115,22,0.06),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-6 md:space-y-8"
          >
            <div>
              <p className="text-sm font-mono tracking-[0.3em] text-orange-500/70 uppercase mb-4">
                {t.about.title}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                  {t.about.heading1}
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                  {t.about.heading2}
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-neutral-400 leading-relaxed text-base md:text-lg max-w-2xl">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4 content-start"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 sm:p-6 rounded-2xl border border-orange-500/10 bg-orange-500/[0.02] flex flex-col justify-center hover:border-orange-500/30 transition-colors"
              >
                <stat.icon className="w-6 h-6 text-orange-400 mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
