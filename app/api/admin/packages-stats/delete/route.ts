import { type NextRequest, NextResponse } from "next/server"
import { deletePackagesStat } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    await deletePackagesStat(id)
    revalidatePath("/packages")
    revalidatePath("/admin/packages-hero")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting packages stat:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
