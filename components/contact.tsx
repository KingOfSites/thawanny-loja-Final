import { Phone, Mail, Instagram } from "lucide-react"

const contacts = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+47 999 99 999",
    href: "https://wa.me/4799999999",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+47 999 99 999",
    href: "tel:+4799999999",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@thawanny.com",
    href: "mailto:contato@thawanny.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "thawannyshisnayder_studio",
    href: "https://www.instagram.com/thawannyshisnayder_studio?igsh=MjA2d29sbmY0eXo5&utm_source=qr",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "Thawannymurno@gmail.com",
    href: "mailto:Thawannymurno@gmail.com",
  },
]

const socials: [] = []

export function Contact() {
  return (
    <section id="contato" className="bg-ladies py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs tracking-[0.3em] uppercase text-raspberry"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Fale Comigo
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Contato
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-raspberry/40" />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {contacts.map((item) => (
            <a
              key={item.label}
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
                {item.label}
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
