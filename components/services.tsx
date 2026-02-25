import Image from "next/image"

const services = [
  {
    name: "Banho de Gel",
    description:
      "Revestimento em gel aplicado sobre a unha natural para proporcionar reforço estrutural, alta durabilidade e acabamento com brilho intenso e sofisticado.",
    price: "kr 850",
    image: {
      src: "/Imagens Serviço/Img Unha .jpeg",
      alt: "Unhas com banho de gel",
    },
  },
  {
    name: "Esmaltação em Gel (Unha Natural)",
    description:
      "Aplicação de esmaltação em gel com efeito espelhado e longa duração, ideal para quem busca elegância e praticidade no dia a dia.",
    price: "kr 700",
    image: {
      src: "/Imagens Serviço/Img cores.jpeg",
      alt: "Cores de esmaltação em gel",
    },
  },
  {
    name: "Alongamento em Gel S/M-L/G",
    description:
      "Extensão em gel para comprimentos curtos a médios, com construção técnica precisa, curvatura perfeita e acabamento refinado.",
    price: "kr 920 / kr 1.100",
    image: {
      src: "/Imagens Serviço/Img Unha flor.jpeg",
      alt: "Alongamento em gel com flor",
    },
  },
  {
    name: "Manutenção Premium S/M-L/G",
    description:
      "Procedimento completo de manutenção com nivelamento, correção de crescimento, reforço estrutural e renovação do design (após 4 semanas).",
    price: "kr 1.150 / kr 1.280",
    image: {
      src: "/Imagens Serviço/Img Serviço.jpeg",
      alt: "Procedimento de manutenção em gel",
    },
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
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4 items-stretch">
          {services.map((service) => (
            <div
              key={service.name}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {service.image && (
                <div className="mb-4 overflow-hidden rounded-xl">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={600}
                    height={400}
                    className="h-56 w-full object-cover object-center"
                  />
                </div>
              )}
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

        {/* Extra Info */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8" style={{ fontFamily: "var(--font-lato)" }}>
            <p className="text-xs tracking-[0.3em] uppercase text-raspberry">
              Serviços Exclusivos
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground">
              Detalhes e Adicionais
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">
                  Remoção Técnica de Gel – <span className="text-raspberry">kr 350</span>
                </p>
                <p>
                  Remoção profissional realizada com segurança e cuidado para preservar a saúde da unha natural.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Aplicação de Cristal/Diamante – <span className="text-raspberry">kr 100</span>
                </p>
                <p>
                  Aplicação de pedraria premium para um toque de luxo e sofisticação.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Nail Art Elaborada (Adicional) – <span className="text-raspberry">kr 300</span>
                </p>
                <p>
                  Design artístico exclusivo com técnicas avançadas e alto nível de detalhamento.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Nail Art Minimalista (Adicional) – <span className="text-raspberry">kr 200</span>
                </p>
                <p>
                  Decoração elegante com traços delicados e acabamento refinado.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8" style={{ fontFamily: "var(--font-lato)" }}>
            <p className="text-xs tracking-[0.3em] uppercase text-raspberry">
              Higiene &amp; Segurança
            </p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground">
              Cuidado em Cada Detalhe
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Trabalhamos com rigorosos protocolos de limpeza e biossegurança para garantir um atendimento seguro e
                de excelência.
              </p>
              <p>
                Todos os instrumentos metálicos são devidamente esterilizados após cada uso, e os materiais descartáveis
                são utilizados sempre que necessário. As estações de trabalho são higienizadas entre cada atendimento,
                assegurando um ambiente impecável e seguro para todas as clientes.
              </p>
              <p className="font-semibold text-foreground">
                Seu bem-estar e segurança são prioridade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
