import { updatePackageOrder } from "@/lib/content"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { id1, sortOrder1, id2, sortOrder2 } = await request.json()
    await updatePackageOrder(id1, sortOrder1)
    await updatePackageOrder(id2, sortOrder2)
    revalidatePath("/")
    revalidatePath("/packages")
    revalidatePath("/admin/packages")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering packages:", error)
    return NextResponse.json({ success: false, error: "Failed to reorder packages" }, { status: 500 })
  }
}
