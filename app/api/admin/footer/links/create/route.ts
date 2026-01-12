import { NextResponse } from "next/server"
import { createFooterLink } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { title, url, sort_order } = await request.json()

    await createFooterLink(title, url, sort_order)

    revalidatePath("/", "layout")
    return NextResponse.json({ success: true, link: { id: Date.now(), title, url, sort_order, is_active: true } })
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}
