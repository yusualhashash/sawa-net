import { NextResponse } from "next/server"
import { updateFooterLinkOrder } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { links } = await request.json()

    for (const link of links) {
      await updateFooterLinkOrder(link.id, link.sort_order)
    }
    revalidatePath("/", "layout")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Reorder error:", error)
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 })
  }
}
