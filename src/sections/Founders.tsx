import { useState } from 'react'
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion'

function FounderSpotlight() {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 })

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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="group w-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
        {/* Human image - always visible */}
        <img
          src="/founders_photo/human.png"
          alt="Founder"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Robot image - revealed by spotlight mask */}
        <motion.img
          src="/founders_photo/robot.png"
          alt="Founder - Cyber"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ maskImage, WebkitMaskImage: maskImage }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          draggable={false}
        />

        {/* Name & Role overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Ihab Abdoulal
          </h3>
          <p className="text-sm sm:text-base text-orange-400/80 font-medium mt-1">
            CEO & Co-Founder
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Founders() {
  return (
    <section id="founders" className="relative bg-black overflow-hidden">
      <FounderSpotlight />
    </section>
  )
}
