import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { updateHeroSlide } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, title, subtitle, button_text, button_link, image_url, is_active } = body

    await updateHeroSlide(id, title, subtitle, button_text, button_link || null, image_url, is_active)
    revalidatePath("/")
    revalidatePath("/admin/slides")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating slide:", error)
    return NextResponse.json({ error: "Failed to update slide" }, { status: 500 })
  }
}
