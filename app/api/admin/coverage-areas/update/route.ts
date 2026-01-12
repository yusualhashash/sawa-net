import { type NextRequest, NextResponse } from "next/server"
import { updateCoverageArea } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
    try {
        const { id, ...data } = await request.json()
        await updateCoverageArea(id, data)
        revalidatePath("/coverage")
        revalidatePath("/admin/coverage")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error updating coverage area:", error)
        return NextResponse.json({ error: "Failed to update" }, { status: 500 })
    }
}