import { NextResponse } from "next/server"
import { createNotification } from "@/lib/notifications"
import { prisma } from "@/lib/prisma"

function toISODate(dateStr: string): string {
  // dateStr pode ser "28/2/2026" ou "28/02/2026"
  const parts = dateStr.split("/")
  if (parts.length !== 3) return dateStr
  const [d, m, y] = parts
  const day = d.padStart(2, "0")
  const month = m.padStart(2, "0")
  return `${y}-${month}-${day}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, service, date, time } = body

    if (!name || !date || !time) {
      return NextResponse.json(
        { error: "Nome, data e horário são obrigatórios" },
        { status: 400 }
      )
    }

    const dataFormatada = typeof date === "string" ? date : `${date.day}/${date.month}/${date.year}`
    const phoneDisplay = phone ? ` – Tel: ${phone}` : ""
    await createNotification(
      "Novo agendamento",
      `Cliente ${name}${phoneDisplay} agendou para ${dataFormatada} às ${time}${service ? ` - ${service}` : ""}`
    )

    const isoDate = toISODate(dataFormatada)
    await prisma.appointment.create({
      data: {
        clientName: name,
        clientPhone: phone ?? "",
        service: service ?? null,
        dateStr: isoDate,
        time: time,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[POST /api/booking]", error)
    return NextResponse.json(
      { error: "Erro ao registrar agendamento" },
      { status: 500 }
    )
  }
}
