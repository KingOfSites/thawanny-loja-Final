import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body
    const expected = process.env.ADMIN_PASSWORD

    if (!expected) {
      return NextResponse.json(
        { error: "Admin não configurado (ADMIN_PASSWORD)" },
        { status: 500 }
      )
    }

    if (password === expected) {
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: false }, { status: 401 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
}
