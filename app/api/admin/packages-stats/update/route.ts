import { type NextRequest, NextResponse } from "next/server"
import { updatePackagesStat } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, icon, value, label, is_active } = body

    await updatePackagesStat(id, icon, value, label, is_active)
    revalidatePath("/packages")
    revalidatePath("/admin/packages-hero")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating packages stat:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
