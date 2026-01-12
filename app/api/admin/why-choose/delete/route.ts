import { NextResponse } from "next/server"
import { deleteWhyChooseFeature } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    await deleteWhyChooseFeature(id)
    revalidatePath("/packages")
    revalidatePath("/admin/why-choose")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting why choose feature:", error)
    return NextResponse.json({ error: "Failed to delete feature" }, { status: 500 })
  }
}
