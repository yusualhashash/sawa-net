import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")

    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const section = searchParams.get("section")

    if (!section) {
      return NextResponse.json({ error: "Section parameter required" }, { status: 400 })
    }

    const result = await sql`
      SELECT * FROM site_content 
      WHERE section = ${section}
      ORDER BY sort_order ASC
    `

    return NextResponse.json(result)
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
