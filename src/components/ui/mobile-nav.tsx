"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export default function MobileNav() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const links = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.work, href: "#testimonials" },
    { label: t.nav.contact, href: "#contact" },
  ]

  return (
    <>
      {/* Logo + Hamburger */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between lg:hidden">
        <a href="#hero" className="flex items-center gap-2">
          <img src="/favicon.png" alt="Nawwacodes" className="w-8 h-8 rounded-lg brightness-0 invert" />
        </a>
        <button
          onClick={() => setOpen(true)}
          className="w-11 h-11 rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/10 transition-all"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-black border-l border-white/[0.06] flex flex-col lg:hidden"
            >
              {/* Close + lang */}
              <div className="flex items-center justify-between p-5 border-b border-white/[0.04]">
                <LanguageSwitcher />
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 py-8">
                <ul className="space-y-1 px-4">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block px-5 py-4 rounded-xl text-lg font-medium text-neutral-300 hover:text-white hover:bg-white/[0.04] transition-all"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-5 border-t border-white/[0.04] space-y-5">
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/nawwacodes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:border-transparent transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a
                    href="https://www.facebook.com/share/17rcxPeRXf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-blue-600 hover:border-transparent transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a
                    href="https://wa.me/491773052955"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-emerald-500 hover:border-transparent transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </a>
                </div>
                <p className="text-xs text-neutral-600">
                  &copy; {new Date().getFullYear()} Nawwacodes
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
