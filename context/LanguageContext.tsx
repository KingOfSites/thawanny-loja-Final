"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { translations, type Locale } from "@/lib/translations"

const STORAGE_KEY = "thawanny-locale"

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (path: string) => string
  translations: typeof translations.pt
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && (stored === "pt" || stored === "en" || stored === "no")) {
      setLocaleState(stored)
    }
    setMounted(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLocale)
      document.documentElement.lang =
        newLocale === "pt" ? "pt-BR" : newLocale === "no" ? "nb" : "en"
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.lang =
      locale === "pt" ? "pt-BR" : locale === "no" ? "nb" : "en"
  }, [locale, mounted])

  const t = useCallback(
    (path: string) => {
      const keys = path.split(".")
      let value: unknown = translations[locale]
      for (const key of keys) {
        if (value == null || typeof value !== "object") return path
        value = (value as Record<string, unknown>)[key]
      }
      return typeof value === "string" ? value : path
    },
    [locale]
  )

  const value: LanguageContextValue = {
    locale,
    setLocale,
    t,
    translations: translations[locale],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
