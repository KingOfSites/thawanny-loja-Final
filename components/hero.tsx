"use client"

import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"

export function Hero() {
  const { t } = useLanguage()
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-aster">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-nails.jpg"
          alt={t("hero.altImage")}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aster/60 via-aster/80 to-aster" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 text-center">
        <p
          className="mb-4 text-sm tracking-[0.3em] uppercase text-raspberry"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          {t("hero.badge")}
        </p>
        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-7xl lg:text-8xl">
          {t("hero.title")}
        </h1>
        <div className="mx-auto mt-2 h-px w-24 bg-raspberry/40" />
        <p
          className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          {t("hero.tagline1")}
          <br />
          {t("hero.tagline2")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row" style={{ fontFamily: "var(--font-lato)" }}>
          <a
            href="#agenda"
            className="rounded-full bg-raspberry px-8 py-3.5 text-sm font-medium tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-raspberry-dark hover:shadow-xl"
          >
            {t("hero.scheduleNow")}
          </a>
          <a
            href="#servicos"
            className="rounded-full border border-foreground/20 bg-transparent px-8 py-3.5 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:border-raspberry hover:text-raspberry"
          >
            {t("hero.viewServices")}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-foreground/20 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-raspberry" />
        </div>
      </div>
    </section>
  )
}
