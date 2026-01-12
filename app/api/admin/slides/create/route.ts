import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createHeroSlide } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, subtitle, button_text, button_link, image_url, sort_order } = body

    await createHeroSlide(title, subtitle, button_text, button_link || null, image_url, sort_order)
    revalidatePath("/")
    revalidatePath("/admin/slides")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating slide:", error)
    return NextResponse.json({ error: "Failed to create slide" }, { status: 500 })
  }
}
