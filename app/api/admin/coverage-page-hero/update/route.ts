import { type NextRequest, NextResponse } from "next/server"
import { updateCoveragePageHero } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        await updateCoveragePageHero(data)

        revalidatePath("/coverage")
        revalidatePath("/admin/coverage")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error updating coverage hero:", error)
        return NextResponse.json({ error: "Failed to update" }, { status: 500 })
    }
}