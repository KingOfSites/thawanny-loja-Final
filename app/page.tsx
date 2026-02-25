import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Specialties } from "@/components/specialties"
import { Services } from "@/components/services"
import { Location } from "@/components/location"
import { Contact } from "@/components/contact"
import { Booking } from "@/components/booking"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Specialties />
        <Services />
        <Location />
        <Contact />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
