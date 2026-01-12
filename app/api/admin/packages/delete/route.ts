import { deletePackage } from "@/lib/content"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    await deletePackage(id)
    revalidatePath("/")
    revalidatePath("/packages")
    revalidatePath("/admin/packages")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting package:", error)
    return NextResponse.json({ success: false, error: "Failed to delete package" }, { status: 500 })
  }
}
