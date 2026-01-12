import { type NextRequest, NextResponse } from "next/server"
import { deleteCoverageArea } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json()
        await deleteCoverageArea(id)

        revalidatePath("/coverage")
        revalidatePath("/admin/coverage")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting coverage area:", error)
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
    }
}