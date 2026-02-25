const services = [
  {
    name: "Manicure Simples",
    description:
      "Cuidado completo para suas unhas das mãos, com esmaltação perfeita e acabamento delicado.",
    price: "R$ 35,00",
  },
  {
    name: "Pedicure",
    description:
      "Tratamento especial para os pés, com hidratação, cutículas e esmaltação impecável.",
    price: "R$ 45,00",
  },
  {
    name: "Alongamento em Gel",
    description:
      "Unhas alongadas com técnica em gel, durabilidade e acabamento premium.",
    price: "R$ 120,00",
  },
  {
    name: "Manutenção de Gel",
    description:
      "Manutenção profissional do alongamento em gel, mantendo suas unhas sempre perfeitas.",
    price: "R$ 80,00",
  },
]

export function Services() {
  return (
    <section id="servicos" className="bg-ladies py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs tracking-[0.3em] uppercase text-raspberry"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Nossos Serviços
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Serviços e Valores
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-raspberry/40" />
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
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
                Agendar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
