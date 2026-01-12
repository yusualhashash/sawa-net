import { createPackage } from "@/lib/content"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, speed, price, currency, features, is_featured, sort_order } = await request.json()
    await createPackage(name, speed, price, currency, features, is_featured, sort_order)
    revalidatePath("/")
    revalidatePath("/packages")
    revalidatePath("/admin/packages")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating package:", error)
    return NextResponse.json({ success: false, error: "Failed to create package" }, { status: 500 })
  }
}
