import { NextResponse } from "next/server"
import { deleteFooterLink } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    await deleteFooterLink(id)
    revalidatePath("/", "layout")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
