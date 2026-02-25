"use client"

import { MapPin } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export function Location() {
  const { t } = useLanguage()
  return (
    <section id="localizacao" className="bg-aster py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs tracking-[0.3em] uppercase text-raspberry"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("location.badge")}
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("location.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-raspberry/40" />
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
          {/* Info */}
          <div className="rounded-2xl border border-border bg-ladies p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ladies-deep">
                <MapPin className="h-5 w-5 text-raspberry" />
              </div>
              <div style={{ fontFamily: "var(--font-lato)" }}>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {t("location.address")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t("location.addressValue")}
                </p>
              </div>
            </div>

            <div className="mt-6" style={{ fontFamily: "var(--font-lato)" }}>
              <h4 className="text-sm font-medium text-foreground">{t("location.hoursTitle")}</h4>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p>{t("location.hoursWeek")}</p>
                <p>{t("location.hoursSat")}</p>
                <p>{t("location.hoursSun")}</p>
              </div>
            </div>

            <a
              href="https://share.google/Q0nFXwrz8IRMDNosM"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-raspberry px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-raspberry-dark hover:shadow-md"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t("location.openMaps")}
            </a>
          </div>

          {/* Map placeholder */}
          <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-ladies shadow-sm lg:aspect-video">
            <iframe
              src="https://www.google.com/maps?q=Strandgata+35,+9600+Hammerfest&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("location.mapTitle")}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
