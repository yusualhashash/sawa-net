import { NextResponse } from "next/server"
import { createFooterSocial } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { platform, url, icon, sort_order } = await request.json()

    await createFooterSocial(platform, url, icon, sort_order)
    revalidatePath("/", "layout")
    return NextResponse.json({
      success: true,
      social: { id: Date.now(), platform, url, icon, sort_order, is_active: true },
    })
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}
