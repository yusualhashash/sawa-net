import { type NextRequest, NextResponse } from "next/server"
import { updateWhyChooseSection } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, section_title } = body

    if (!id || !section_title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await updateWhyChooseSection(id, section_title)
    revalidatePath("/")
    revalidatePath("/admin")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating why choose section:", error)
    return NextResponse.json({ error: "Failed to update section" }, { status: 500 })
  }
}
