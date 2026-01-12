import { NextResponse } from "next/server";
import { updateContactPageHero } from "@/lib/content";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id, badge_text, title, subtitle, description, background_image } = data;

    if (!badge_text || !title || !subtitle || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await updateContactPageHero(
      id,
      badge_text,
      title,
      subtitle,
      description,
      background_image || null
    );

    revalidatePath("/contact");           // public
    revalidatePath("/admin/contact-page"); // correct admin page

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating contact page hero:", error);
    return NextResponse.json(
      { error: "Failed to update contact page hero" },
      { status: 500 }
    );
  }
}
