import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { updateSetting } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { key, value } = body

    if (!key || !value) {
      return NextResponse.json({ error: "Key and value are required" }, { status: 400 })
    }

    await updateSetting(key, value)

    return NextResponse.json({ success: true, message: "Settings updated successfully" })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
