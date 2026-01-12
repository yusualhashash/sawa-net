import { NextResponse } from "next/server"
import { updateService } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { id, title, description, icon, is_active } = await request.json()

    await updateService(id, title, description, icon, is_active)
    revalidatePath("/")
    revalidatePath("/admin/services")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating service:", error)
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
  }
}
