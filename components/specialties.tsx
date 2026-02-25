"use client"

import { Sparkles, Heart, Shield, Star } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

const icons = [Sparkles, Heart, Shield, Star]

export function Specialties() {
  const { t, translations } = useLanguage()
  const items = translations.specialties.items
  return (
    <section className="bg-aster py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs tracking-[0.3em] uppercase text-raspberry"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("specialties.badge")}
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("specialties.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-raspberry/40" />
          <p
            className="mt-6 text-base leading-relaxed text-muted-foreground"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("specialties.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-border bg-ladies p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ladies-deep transition-colors duration-300 group-hover:bg-raspberry/10">
                  <Icon className="h-6 w-6 text-raspberry" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
