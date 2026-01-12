import { type NextRequest, NextResponse } from "next/server"
import { createCoverageArea } from "@/lib/content"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        await createCoverageArea(data)
        revalidatePath("/coverage")
        revalidatePath("/admin/coverage")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error creating coverage area:", error)
        return NextResponse.json({ error: "Failed to create" }, { status: 500 })
    }
}