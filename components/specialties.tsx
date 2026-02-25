import { Sparkles, Heart, Shield, Star } from "lucide-react"

const specialties = [
  {
    icon: Sparkles,
    title: "Relaxamento Absoluto",
    description:
      "Durante o procedimento, você desfruta de uma sofisticada máquina de massagem para os pés, proporcionando relaxamento profundo enquanto suas unhas são cuidadosamente transformadas. Um momento pensado para desacelerar e aproveitar.",
  },
  {
    icon: Heart,
    title: "Ritual Pós-Alongamento",
    description:
      "Após o serviço de alongamento, proporcionamos um cuidado especial com esfoliação suave das mãos seguida de hidratação nutritiva, deixando a pele macia, renovada e delicadamente perfumada.",
  },
  {
    icon: Shield,
    title: "Tecnologia de Impressão Digital de Alta Precisão",
    description:
      "Nosso espaço conta com tecnologia avançada de impressão digital para unhas, capaz de reproduzir praticamente qualquer arte com definição impecável e riqueza de detalhes. Do minimalismo elegante às criações mais elaboradas, as possibilidades são ilimitadas.",
  },
  {
    icon: Star,
    title: "Exclusividade que Vai Além do Atendimento",
    description:
      "Cada cliente recebe um mini kit de pós-cuidados, cuidadosamente selecionado para manter a beleza e durabilidade das unhas em casa. Porque o luxo continua mesmo após sair do nosso espaço.",
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
            Uma Experiência de luxo Conforto e Tecnologia
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-raspberry/40" />
          <p
            className="mt-6 text-base leading-relaxed text-muted-foreground"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Mais do que um atendimento, oferecemos um ritual exclusivo de beleza e bem-estar.
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
