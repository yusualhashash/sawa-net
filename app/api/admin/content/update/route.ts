import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")

    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const items = await request.json()

    // Update each item in the database
    for (const item of items) {
      await sql`
        UPDATE site_content 
        SET value = ${item.value}, 
            sort_order = ${item.sort_order}
        WHERE id = ${item.id}
      `
    }

    revalidatePath("/", "layout")

    return NextResponse.json({ success: true, message: "Content updated successfully" })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
