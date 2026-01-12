import { NextResponse } from "next/server"
import { createWhyChooseFeature } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { icon, title, description, sort_order } = await request.json()

    await createWhyChooseFeature(icon, title, description, sort_order)
    revalidatePath("/packages")
    revalidatePath("/admin/why-choose")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating why choose feature:", error)
    return NextResponse.json({ error: "Failed to create feature" }, { status: 500 })
  }
}
