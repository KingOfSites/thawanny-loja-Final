import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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

    await prisma.appointment.delete({
      where: { id: idNum },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DELETE /api/appointments/[id]]", error)
    return NextResponse.json(
      { error: "Erro ao excluir agendamento" },
      { status: 500 }
    )
  }
}
