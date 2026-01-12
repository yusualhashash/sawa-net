import { NextResponse } from "next/server"
import { deleteContactPageFeature } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { id } = data

    if (!id) {
      return NextResponse.json({ error: "Missing feature ID" }, { status: 400 })
    }

    await deleteContactPageFeature(id)

    revalidatePath("/contact")
    revalidatePath("/admin/contact-page")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting contact page feature:", error)
    return NextResponse.json({ error: "Failed to delete contact page feature" }, { status: 500 })
  }
}
