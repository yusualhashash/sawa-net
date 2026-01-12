import { type NextRequest, NextResponse } from "next/server"
import { updatePackagesStatOrder } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, sort_order } = body

    await updatePackagesStatOrder(id, sort_order)
    revalidatePath("/packages")
    revalidatePath("/admin/packages-hero")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering packages stat:", error)
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 })
  }
}
