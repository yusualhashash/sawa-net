import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { deleteAboutContent } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json()
    await deleteAboutContent(id)

    revalidatePath("/")
    revalidatePath("/about")
    revalidatePath("/admin/about")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting about content:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
