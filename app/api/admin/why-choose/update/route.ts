import { NextResponse } from "next/server"
import { updateWhyChooseFeature } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { id, icon, title, description, is_active } = await request.json()

    await updateWhyChooseFeature(id, icon, title, description, is_active)
    revalidatePath("/packages")
    revalidatePath("/admin/why-choose")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating why choose feature:", error)
    return NextResponse.json({ error: "Failed to update feature" }, { status: 500 })
  }
}
