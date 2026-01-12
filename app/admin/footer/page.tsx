import { getAllContent, getAllFooterLinks, getAllFooterSocial } from "@/lib/content"
import { FooterAboutForm } from "@/components/admin/footer-about-form"
import { FooterLinksForm } from "@/components/admin/footer-links-form"
import { FooterSocialForm } from "@/components/admin/footer-social-form"
import { FooterCopyrightForm } from "@/components/admin/footer-copyright-form"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function FooterAdminPage() {
  const aboutContent = await getAllContent("footer_about")
  const copyrightContent = await getAllContent("footer_copyright")
  const footerLinks = await getAllFooterLinks()
  const footerSocial = await getAllFooterSocial()

  const aboutData = Object.fromEntries(aboutContent.map((item) => [item.key, item.value]))
  const aboutIds = Object.fromEntries(aboutContent.map((item) => [item.key, item.id]))

  const copyrightData = Object.fromEntries(copyrightContent.map((item) => [item.key, item.value]))
  const copyrightIds = Object.fromEntries(copyrightContent.map((item) => [item.key, item.id]))

  return (
    <div className="min-h-screen bg-gray-50 py-24" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">إدارة الفوتر</h1>
            <p className="text-muted-foreground mt-1">تحرير محتوى الفوتر والروابط</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <FooterAboutForm
            titleId={aboutIds.title}
            descriptionId={aboutIds.description}
            initialTitle={aboutData.title || ""}
            initialDescription={aboutData.description || ""}
          />

          <FooterLinksForm links={footerLinks} />

          <FooterSocialForm socialLinks={footerSocial} />

          <FooterCopyrightForm copyrightId={copyrightIds.text} initialText={copyrightData.text || ""} />
        </div>
      </div>
    </div >
  )
}
