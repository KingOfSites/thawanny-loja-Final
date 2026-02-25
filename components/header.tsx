"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"

const navKeys = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#sobre" },
  { key: "nav.services", href: "#servicos" },
  { key: "nav.location", href: "#localizacao" },
  { key: "nav.contact", href: "#contato" },
  { key: "nav.schedule", href: "#agenda" },
] as const

export function Header() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-aster/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Thawanny
          </span>
          <span className="hidden text-xs font-light tracking-widest uppercase text-muted-foreground sm:inline-block" style={{ fontFamily: "var(--font-lato)" }}>
            Manicure
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex" style={{ fontFamily: "var(--font-lato)" }}>
          {navKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-light tracking-wide text-foreground/80 transition-colors duration-200 hover:text-raspberry"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        {/* CTA + Language + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <a
            href="#agenda"
            className="hidden rounded-full bg-raspberry px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-raspberry-dark hover:shadow-lg sm:inline-block"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("nav.scheduleNow")}
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground lg:hidden"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          className="border-t border-border bg-aster/98 backdrop-blur-md lg:hidden"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {navKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-light tracking-wide text-foreground/80 transition-colors hover:bg-ladies hover:text-raspberry"
              >
                {t(link.key)}
              </a>
            ))}
            <a
              href="#agenda"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-raspberry px-6 py-3 text-center text-sm font-medium text-white shadow-md transition-all hover:bg-raspberry-dark"
            >
              {t("nav.scheduleNow")}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
