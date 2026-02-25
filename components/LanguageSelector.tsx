"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import type { Locale } from "@/lib/translations"

const options: { value: Locale; label: string }[] = [
  { value: "pt", label: "Português" },
  { value: "en", label: "English" },
  { value: "no", label: "Norsk" },
]

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const current = options.find((o) => o.value === locale) ?? options[0]

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-card/80 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-ladies hover:text-raspberry"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Selecionar idioma"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden uppercase">{current.value}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[140px] rounded-xl border border-border bg-card py-1 shadow-lg"
        >
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={locale === opt.value}>
              <button
                type="button"
                onClick={() => {
                  setLocale(opt.value)
                  setOpen(false)
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  locale === opt.value
                    ? "bg-raspberry/10 font-medium text-raspberry"
                    : "text-foreground hover:bg-ladies"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
