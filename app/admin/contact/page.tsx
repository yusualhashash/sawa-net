import { getAllContent, getAllContactInfo } from "@/lib/content"
import { ContactHeaderForm } from "@/components/admin/contact-header-form"
import { ContactCtaForm } from "@/components/admin/contact-cta-form"
import { ContactInfoList } from "@/components/admin/contact-info-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default async function ContactAdminPage() {
  const contactHeader = await getAllContent("contact_section_header")
  const contactCta = await getAllContent("contact_cta")
  const contactInfo = await getAllContactInfo()

  return (
    <div className="min-h-screen bg-gray-50 p-8 py-24" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">إدارة التواصل</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <ContactHeaderForm header={contactHeader} />
          <ContactCtaForm cta={contactCta} />
          <ContactInfoList contactInfo={contactInfo} />
        </div>
      </div>
    </div>
  )
}
