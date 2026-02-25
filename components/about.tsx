import Image from "next/image"

export function About() {
  return (
    <section id="sobre" className="bg-ladies py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/about-thawanny.jpg"
              alt="Thawanny, manicure profissional"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5" />
          </div>

          {/* Text */}
          <div>
            <p
              className="mb-3 text-xs tracking-[0.3em] uppercase text-raspberry"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Conheça
            </p>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Sobre Thawanny
            </h2>
            <div className="mt-3 h-px w-16 bg-raspberry/40" />
            <p
              className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Thawanny é manicure profissional especializada em cuidados com unhas,
              oferecendo atendimento personalizado, qualidade e delicadeza em cada detalhe.
            </p>
            <p
              className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Com anos de experiência e paixão pelo que faz, cada atendimento é uma experiência
              única de beleza e bem-estar. Utilizando produtos de alta qualidade e técnicas
              atualizadas para garantir unhas perfeitas e duradouras.
            </p>
            <div className="mt-8 flex gap-8" style={{ fontFamily: "var(--font-lato)" }}>
              <div>
                <p className="text-3xl font-bold text-raspberry">500+</p>
                <p className="mt-1 text-xs tracking-wider uppercase text-muted-foreground">
                  Clientes Atendidas
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-raspberry">5+</p>
                <p className="mt-1 text-xs tracking-wider uppercase text-muted-foreground">
                  Anos de Experiência
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-raspberry">100%</p>
                <p className="mt-1 text-xs tracking-wider uppercase text-muted-foreground">
                  Satisfação
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
