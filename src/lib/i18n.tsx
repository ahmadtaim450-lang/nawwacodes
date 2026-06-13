import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Lang } from "@/lib/translations"

type I18nContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations.en
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved === "ar" || saved === "en") return saved
    if (window.location.pathname.startsWith("/ar")) return "ar"
    return "en"
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem("lang", l)
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = l
  }

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
