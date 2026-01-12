import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateAboutPageHero } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await updateAboutPageHero(data)

    revalidatePath("/about")
    revalidatePath("/admin/about")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating about page hero:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
