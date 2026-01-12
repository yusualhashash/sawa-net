import { getAllPackages, getAllContent } from "@/lib/content"
import { PackagesHeaderForm } from "@/components/admin/packages-header-form"
import { PackagesList } from "@/components/admin/packages-list"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default async function PackagesAdminPage() {
  const packages = await getAllPackages()
  const headerContent = await getAllContent("packages_section_header")

  const titleItem = headerContent.find((item) => item.key === "title")
  const subtitleItem = headerContent.find((item) => item.key === "subtitle")

  return (
    <div className="min-h-screen bg-gray-50 p-8 py-24" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">إدارة الباقات</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <PackagesHeaderForm
            titleId={titleItem?.id}
            titleValue={titleItem?.value || ""}
            subtitleId={subtitleItem?.id}
            subtitleValue={subtitleItem?.value || ""}
          />
          <PackagesList packages={packages} />
        </div>
      </div>
    </div>
  )
}
