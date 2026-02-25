import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-ladies-deep py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <a href="#home" className="font-serif text-xl font-bold text-foreground">
            Thawanny
          </a>
          <p
            className="flex items-center gap-1 text-sm text-muted-foreground"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Feito com <Heart className="h-3.5 w-3.5 fill-raspberry text-raspberry" /> por Thawanny
          </p>
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            &copy; {new Date().getFullYear()} Thawanny Manicure. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
