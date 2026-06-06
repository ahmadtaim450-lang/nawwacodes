"use client"

import { useI18n } from "@/lib/i18n"

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className="relative z-10 flex items-center justify-center px-2 h-8 rounded-full text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
      aria-label="Switch language"
    >
      {lang === "en" ? "العربية" : "English"}
    </button>
  )
}
