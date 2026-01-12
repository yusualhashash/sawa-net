import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createAboutContent } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { title, description, icon, sort_order } = await request.json()
    await createAboutContent(title, description, icon, sort_order)

    revalidatePath("/")
    revalidatePath("/about")
    revalidatePath("/admin/about")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating about content:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}
