import { NextResponse } from "next/server"
import { deleteService } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    await deleteService(id)
    revalidatePath("/")
    revalidatePath("/admin/services")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
