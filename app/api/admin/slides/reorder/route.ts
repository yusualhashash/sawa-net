import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { updateHeroSlideOrder } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, sort_order } = body

    await updateHeroSlideOrder(id, sort_order)
    revalidatePath("/")
    revalidatePath("/admin/slides")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering slide:", error)
    return NextResponse.json({ error: "Failed to reorder slide" }, { status: 500 })
  }
}
