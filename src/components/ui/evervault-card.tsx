"use client"
import { useMotionValue, useMotionTemplate, motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function generateRandomString(length: number) {
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function CardPattern({ mouseX, mouseY, randomString, isActive }: any) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`
  const style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] opacity-15 group-hover/card:opacity-30" />
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 backdrop-blur-xl transition duration-500"
        style={{ ...style, opacity: isActive ? 0.6 : 0.15 }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl mix-blend-overlay"
        style={{ ...style, opacity: isActive ? 0.5 : 0.1 }}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  )
}

export const EvervaultCard = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [randomString, setRandomString] = useState("")
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setRandomString(generateRandomString(1500))
  }, [])

  const updatePosition = useCallback((clientX: number, clientY: number, el: Element) => {
    const { left, top } = el.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
    setRandomString(generateRandomString(1500))
  }, [mouseX, mouseY])

  function onMouseMove(e: React.MouseEvent) {
    updatePosition(e.clientX, e.clientY, e.currentTarget)
  }

  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault()
    const touch = e.touches[0]
    updatePosition(touch.clientX, touch.clientY, e.currentTarget)
  }

  return (
    <div
      className={cn(
        "p-0.5 bg-transparent flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onTouchMove={onTouchMove}
        onTouchStart={(e) => {
          const touch = e.touches[0]
          updatePosition(touch.clientX, touch.clientY, e.currentTarget)
          setIsActive(true)
        }}
        onTouchEnd={() => setIsActive(false)}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} isActive={isActive} />
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {children}
        </div>
      </div>
    </div>
  )
}
