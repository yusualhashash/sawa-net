import { type NextRequest, NextResponse } from "next/server"
import { reorderCoverageAreas } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
    try {
        const { id, direction } = await request.json()
        await reorderCoverageAreas(id, direction)

        revalidatePath("/coverage")
        revalidatePath("/admin/coverage")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error reordering coverage areas:", error)
        return NextResponse.json({ error: "Failed to reorder" }, { status: 500 })
    }
}