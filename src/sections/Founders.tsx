import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate, useSpring, useInView } from 'framer-motion'

interface FounderData {
  name: string
  role: string
  humanSrc: string
  robotSrc: string
}

const founders: FounderData[] = [
  {
    name: 'Ihab Abdoulal',
    role: 'CEO & Co-Founder',
    humanSrc: '/founders_photo/ihab-human.jpg',
    robotSrc: '/founders_photo/ihab-robot.jpg',
  },
  {
    name: 'Abed Istampooli',
    role: 'CTO & Co-Founder',
    humanSrc: '/founders_photo/abed-human.png',
    robotSrc: '/founders_photo/abed-robot.jpg',
  },
]

function FounderCard({ founder, index }: { founder: FounderData; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 })
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })

  useEffect(() => {
    if (isInView) {
      const delay = index * 400
      const timer = setTimeout(() => setGlitchActive(true), delay)
      const clear = setTimeout(() => setGlitchActive(false), delay + 1800)
      return () => { clearTimeout(timer); clearTimeout(clear) }
    }
  }, [isInView, index])

  const maskImage = useMotionTemplate`radial-gradient(circle 200px at ${springX}px ${springY}px, black 40%, transparent 100%)`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(touch.clientX - rect.left)
    mouseY.set(touch.clientY - rect.top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.2 + 0.4 }}
      className="group w-full"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onContextMenu={(e) => e.preventDefault()}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => {
          const touch = e.touches[0]
          const rect = e.currentTarget.getBoundingClientRect()
          mouseX.set(touch.clientX - rect.left)
          mouseY.set(touch.clientY - rect.top)
          setIsHovered(true)
        }}
        onTouchEnd={() => setIsHovered(false)}
        className="relative w-full h-[70vh] sm:h-[80vh] lg:h-screen overflow-hidden cursor-crosshair bg-black select-none"
      >
        {/* Glitch layers - reveal robot */}
        {glitchActive && (
          <>
            <div
              className="absolute inset-0 w-full h-full animate-glitch-1 pointer-events-none z-20"
              style={{
                backgroundImage: `url(${founder.robotSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'hue-rotate(180deg) brightness(1.4)',
                mixBlendMode: 'screen',
              }}
            />
            <div
              className="absolute inset-0 w-full h-full animate-glitch-2 pointer-events-none z-20"
              style={{
                backgroundImage: `url(${founder.robotSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'hue-rotate(0deg) brightness(1.2) saturate(2)',
                mixBlendMode: 'screen',
              }}
            />
            <div
              className="absolute inset-0 bg-black animate-glitch-flicker pointer-events-none z-20"
            />
          </>
        )}

        {/* Human image */}
        <img
          src={founder.humanSrc}
          alt={founder.name}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Robot image - revealed by spotlight mask */}
        <motion.img
          src={founder.robotSrc}
          alt={`${founder.name} - Cyber`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ maskImage, WebkitMaskImage: maskImage }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          draggable={false}
        />

        {/* Name & Role overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6 sm:p-8 lg:p-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {founder.name}
          </h3>
          <p className="text-sm sm:text-base text-orange-400/80 font-medium mt-1">
            {founder.role}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Founders() {
  return (
    <section id="founders" className="relative bg-black overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full">
        {founders.map((founder, i) => (
          <FounderCard key={founder.name} founder={founder} index={i} />
        ))}
      </div>
    </section>
  )
}
