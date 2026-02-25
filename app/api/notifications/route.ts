import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(notifications)
  } catch (error) {
    console.error("[GET /api/notifications]", error)
    return NextResponse.json(
      { error: "Erro ao listar notificações" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const id = typeof body.id === "string" ? parseInt(body.id, 10) : body.id

    if (id == null || Number.isNaN(id)) {
      return NextResponse.json(
        { error: "id (número) é obrigatório" },
        { status: 400 }
      )
    }

    const notification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true },
    })
    return NextResponse.json(notification)
  } catch (error) {
    console.error("[PUT /api/notifications]", error)
    return NextResponse.json(
      { error: "Erro ao atualizar notificação" },
      { status: 500 }
    )
  }
}
