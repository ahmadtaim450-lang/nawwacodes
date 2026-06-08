"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

function NavHeader() {
  const { t } = useI18n()
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })

  const tabs = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.founders, href: "#founders" },
    { label: t.nav.work, href: "#testimonials" },
    { label: t.nav.contact, href: "#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6">
      <nav>
        <ul
          className="relative mx-auto flex w-fit items-center gap-1 rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-xl p-1"
          onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} setPosition={setPosition} href={tab.href}>
              {tab.label}
            </Tab>
          ))}
          <div className="hidden sm:block w-px h-5 bg-white/10 mx-1" />
          <LanguageSwitcher />
          <Cursor position={position} />
        </ul>
      </nav>
    </header>
  )
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode
  setPosition: (pos: { left: number; width: number; opacity: number }) => void
  href: string
}) => {
  const ref = useRef<HTMLLIElement>(null)

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs font-medium text-white mix-blend-difference md:px-4 md:py-2"
    >
      <a href={href} className="no-underline text-inherit">
        {children}
      </a>
    </li>
  )
}

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 h-8 rounded-full bg-white md:h-9"
    />
  )
}

export default NavHeader
