"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contato", href: "#contato" },
  { label: "Agendar Horário", href: "#agenda" },
]

export function Header() {
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-light tracking-wide text-foreground/80 transition-colors duration-200 hover:text-raspberry"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#agenda"
            className="hidden rounded-full bg-raspberry px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-raspberry-dark hover:shadow-lg sm:inline-block"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Agendar Agora
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground lg:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-light tracking-wide text-foreground/80 transition-colors hover:bg-ladies hover:text-raspberry"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#agenda"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-raspberry px-6 py-3 text-center text-sm font-medium text-white shadow-md transition-all hover:bg-raspberry-dark"
            >
              Agendar Agora
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
