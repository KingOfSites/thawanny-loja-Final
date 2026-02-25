import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createNotification } from "@/lib/notifications"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const idNum = parseInt(id, 10)
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const body = await request.json()
    const { name, quantity, minimumAlert } = body

    const data: { name?: string; quantity?: number; minimumAlert?: number } = {}
    if (name !== undefined) data.name = String(name).trim()
    if (quantity !== undefined) data.quantity = Number(quantity)
    if (minimumAlert !== undefined) data.minimumAlert = Number(minimumAlert)

    const item = await prisma.stockItem.update({
      where: { id: idNum },
      data,
    })
    const qty = item.quantity
    const minAlert = item.minimumAlert
    if (qty <= minAlert) {
      await createNotification(
        "Estoque baixo",
        `O item ${item.name} está com estoque baixo`
      ).catch(() => {})
    }
    return NextResponse.json(item)
  } catch (error) {
    console.error("[PUT /api/stock/[id]]", error)
    return NextResponse.json(
      { error: "Erro ao atualizar item" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const idNum = parseInt(id, 10)
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    await prisma.stockItem.delete({
      where: { id: idNum },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DELETE /api/stock/[id]]", error)
    return NextResponse.json(
      { error: "Erro ao remover item" },
      { status: 500 }
    )
  }
}
