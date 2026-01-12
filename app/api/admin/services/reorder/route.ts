import { NextResponse } from "next/server"
import { updateServiceOrder } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { id1, order1, id2, order2 } = await request.json()

    await updateServiceOrder(id1, order1)
    await updateServiceOrder(id2, order2)
    revalidatePath("/")
    revalidatePath("/admin/services")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering services:", error)
    return NextResponse.json({ error: "Failed to reorder services" }, { status: 500 })
  }
}
