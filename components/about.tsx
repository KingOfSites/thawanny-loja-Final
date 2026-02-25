import Image from "next/image"

export function About() {
  return (
    <section id="sobre" className="bg-ladies py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/WhatsApp Image 2026-02-25 at 10.00.03.jpeg"
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
              Atendo no Karamel Salong, um espaço reconhecido pelo seu ambiente sofisticado, acolhedor e
              profissional.
            </p>
            <p
              className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              O salão oferece uma atmosfera moderna e confortável, ideal para quem valoriza qualidade,
              tranquilidade e alto padrão de atendimento.
            </p>
            <p
              className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Ao escolher meus serviços, você também desfruta da estrutura e do ambiente cuidadosamente
              preparados para proporcionar uma experiência completa e exclusiva.
            </p>
            <div className="mt-8 flex gap-8" style={{ fontFamily: "var(--font-lato)" }}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-raspberry">
                  Sofisticação
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Beleza com identidade
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-raspberry">
                  Precisão
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Técnica de alto padrão
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-raspberry">
                  Exclusividade
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Experiência personalizada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
