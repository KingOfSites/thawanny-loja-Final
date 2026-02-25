import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createNotification } from "@/lib/notifications"

export async function GET() {
  try {
    const items = await prisma.stockItem.findMany({
      orderBy: { name: "asc" },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error("[GET /api/stock]", error)
    return NextResponse.json(
      { error: "Erro ao listar estoque" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, quantity = 0, minimumAlert = 5 } = body

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      )
    }

    const qty = Number(quantity) || 0
    const minAlert = Number(minimumAlert) ?? 5
    const item = await prisma.stockItem.create({
      data: {
        name: name.trim(),
        quantity: qty,
        minimumAlert: minAlert,
      },
    })
    if (qty <= minAlert) {
      await createNotification(
        "Estoque baixo",
        `O item ${item.name} está com estoque baixo`
      ).catch(() => {})
    }
    return NextResponse.json(item)
  } catch (error) {
    console.error("[POST /api/stock]", error)
    return NextResponse.json(
      { error: "Erro ao criar item" },
      { status: 500 }
    )
  }
}
