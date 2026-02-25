"use client"

import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"

const imageSrcs = [
  "/Imagens Serviço/Img Unha .jpeg",
  "/Imagens Serviço/Img cores.jpeg",
  "/Imagens Serviço/Img Unha flor.jpeg",
  "/Imagens Serviço/Img Serviço.jpeg",
]

export function Services() {
  const { t, translations } = useLanguage()
  const items = translations.services.items
  return (
    <section id="servicos" className="bg-ladies py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs tracking-[0.3em] uppercase text-raspberry"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("services.badge")}
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("services.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-raspberry/40" />
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4 items-stretch">
          {items.map((service, i) => (
            <div
              key={service.name}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 overflow-hidden rounded-xl">
                <Image
                  src={imageSrcs[i]}
                  alt={service.alt}
                  width={600}
                  height={400}
                  className="h-56 w-full object-cover object-center"
                />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {service.name}
              </h3>
              <p
                className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {service.description}
              </p>
              <p
                className="mt-4 text-2xl font-bold text-raspberry"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {service.price}
              </p>
              <a
                href="#agenda"
                className="mt-4 inline-block rounded-full bg-raspberry px-6 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-raspberry-dark hover:shadow-md"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {t("services.book")}
              </a>
            </div>
          ))}
        </div>

        {/* Extra Info */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8" style={{ fontFamily: "var(--font-lato)" }}>
            <p className="text-xs tracking-[0.3em] uppercase text-raspberry">
              {t("services.exclusive")}
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground">
              {t("services.detailsTitle")}
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">
                  {t("services.removal")} – <span className="text-raspberry">kr 350</span>
                </p>
                <p>{t("services.removalDesc")}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {t("services.crystal")} – <span className="text-raspberry">kr 100</span>
                </p>
                <p>{t("services.crystalDesc")}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {t("services.nailArtElaborate")} – <span className="text-raspberry">kr 300</span>
                </p>
                <p>{t("services.nailArtElaborateDesc")}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {t("services.nailArtMinimal")} – <span className="text-raspberry">kr 200</span>
                </p>
                <p>{t("services.nailArtMinimalDesc")}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8" style={{ fontFamily: "var(--font-lato)" }}>
            <p className="text-xs tracking-[0.3em] uppercase text-raspberry">
              {t("services.hygiene")}
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground">
              {t("services.hygieneTitle")}
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>{t("services.hygieneP1")}</p>
              <p>{t("services.hygieneP2")}</p>
              <p className="font-semibold text-foreground">{t("services.hygieneP3")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
