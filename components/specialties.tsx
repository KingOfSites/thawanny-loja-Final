import { Sparkles, Heart, Shield, Star } from "lucide-react"

const specialties = [
  {
    icon: Sparkles,
    title: "Alongamento em Gel",
    description: "Unhas perfeitas com acabamento impecável e longa duração.",
  },
  {
    icon: Heart,
    title: "Cuidado Personalizado",
    description: "Cada cliente recebe atenção especial e tratamento único.",
  },
  {
    icon: Shield,
    title: "Higiene e Segurança",
    description: "Materiais esterilizados e produtos de alta qualidade.",
  },
  {
    icon: Star,
    title: "Nail Art",
    description: "Designs exclusivos e tendências para expressar sua personalidade.",
  },
]

export function Specialties() {
  return (
    <section className="bg-aster py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs tracking-[0.3em] uppercase text-raspberry"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Especialidades
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Especialista em
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-raspberry/40" />
          <p
            className="mt-6 text-base leading-relaxed text-muted-foreground"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Atendimento completo para unhas, sempre prezando pela beleza,
            higiene e satisfação de cada cliente.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-ladies p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ladies-deep transition-colors duration-300 group-hover:bg-raspberry/10">
                <item.icon className="h-6 w-6 text-raspberry" />
              </div>
              <h3
                className="mt-5 font-serif text-lg font-semibold text-foreground"
              >
                {item.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
