import { NextResponse } from "next/server"
import { updateFooterSocial } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { id, platform, url, icon, is_active } = await request.json()

    await updateFooterSocial(id, platform, url, icon, is_active)
    revalidatePath("/", "layout")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
