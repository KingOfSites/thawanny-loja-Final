"use client"

import { Phone, Mail, MessageCircle, Instagram } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

const contactData = [
  { icon: MessageCircle, labelKey: "contact.whatsapp", value: "+47 466 77 874", href: "https://wa.me/4746677874" },
  { icon: Phone, labelKey: "contact.phone", value: "+47 466 77 874", href: "tel:+4746677874" },
  { icon: Instagram, labelKey: "contact.instagram", value: "thawannyshisnayder_studio", href: "https://www.instagram.com/thawannyshisnayder_studio?igsh=MjA2d29sbmY0eXo5&utm_source=qr" },
  { icon: Mail, labelKey: "contact.email", value: "Thawannymurno@gmail.com", href: "mailto:Thawannymurno@gmail.com" },
]

export function Contact() {
  const { t } = useLanguage()
  return (
    <section id="contato" className="bg-ladies py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs tracking-[0.3em] uppercase text-raspberry"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("contact.badge")}
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("contact.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-raspberry/40" />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {contactData.map((item) => (
            <a
              key={`${item.labelKey}-${item.value}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ladies-deep transition-colors duration-300 group-hover:bg-raspberry/10">
                <item.icon className="h-6 w-6 text-raspberry" />
              </div>
              <h3
                className="mt-4 font-serif text-lg font-semibold text-foreground"
              >
                {t(item.labelKey)}
              </h3>
              <p
                className="mt-1 text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {item.value}
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
