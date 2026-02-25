import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month") // YYYY-MM
    const dateStr = searchParams.get("date") // YYYY-MM-DD

    if (dateStr) {
      const list = await prisma.appointment.findMany({
        where: { dateStr },
        orderBy: [{ time: "asc" }, { createdAt: "desc" }],
      })
      return NextResponse.json(list)
    }

    if (month) {
      const [y, m] = month.split("-")
      const nextMonth =
        m === "12"
          ? `${Number(y) + 1}-01-01`
          : `${y}-${String(Number(m) + 1).padStart(2, "0")}-01`
      const list = await prisma.appointment.findMany({
        where: {
          dateStr: {
            gte: `${month}-01`,
            lt: nextMonth,
          },
        },
        orderBy: [{ dateStr: "asc" }, { time: "asc" }],
      })
      return NextResponse.json(list)
    }

    const list = await prisma.appointment.findMany({
      orderBy: [{ dateStr: "asc" }, { time: "asc" }],
    })
    return NextResponse.json(list)
  } catch (error) {
    console.error("[GET /api/appointments]", error)
    return NextResponse.json(
      { error: "Erro ao listar agendamentos" },
      { status: 500 }
    )
  }
}
