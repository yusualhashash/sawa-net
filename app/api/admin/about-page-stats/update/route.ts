import { NextResponse } from "next/server"
import { createAboutPageStat } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { icon, value, label, sort_order } = await request.json()
    await createAboutPageStat(icon, value, label, sort_order)

    revalidatePath("/about")
    revalidatePath("/admin/about")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating about page stat:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}
