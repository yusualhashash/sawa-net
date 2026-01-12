import { NextResponse } from "next/server"
import { createService } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { title, description, icon, sort_order } = await request.json()

    await createService(title, description, icon, sort_order)
    revalidatePath("/")
    revalidatePath("/admin/services")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
