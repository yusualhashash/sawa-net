import { type NextRequest, NextResponse } from "next/server"
import { updatePackagesHero } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      id,
      badge_text,
      title,
      description,
      button1_text,
      button1_link,
      button2_text,
      button2_link,
      background_image,
    } = body

    await updatePackagesHero(
      id,
      badge_text,
      title,
      description,
      button1_text,
      button1_link,
      button2_text,
      button2_link,
      background_image,
    )

    revalidatePath("/packages")
    revalidatePath("/admin/packages-hero")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating packages hero:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
