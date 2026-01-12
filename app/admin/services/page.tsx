import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllServices, getAllContent } from "@/lib/content"
import { ServicesList } from "@/components/admin/services-list"
import { ServicesHeaderForm } from "@/components/admin/services-header-form"

export default async function ServicesAdminPage() {
  const services = await getAllServices()
  const headerContent = await getAllContent("services_section_header")

  const titleItem = headerContent.find((item) => item.key === "title")
  const subtitleItem = headerContent.find((item) => item.key === "subtitle")

  return (
    <div className="min-h-screen bg-gray-50 py-24" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة الخدمات</h1>
            <p className="text-gray-600 mt-1">يمكنك تعديل عنوان القسم والخدمات وترتيبها</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        {/* Section Header Card */}
        <Card className="mb-6">
          <CardHeader className="border-b">
            <CardTitle>عنوان القسم</CardTitle>
            <CardDescription>عدّل العنوان الرئيسي والفرعي لقسم الخدمات</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ServicesHeaderForm
              title={titleItem?.value || ""}
              subtitle={subtitleItem?.value || ""}
              titleId={titleItem?.id}
              subtitleId={subtitleItem?.id}
            />
          </CardContent>
        </Card>

        {/* Services List Card */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle>قائمة الخدمات</CardTitle>
            <CardDescription>أضف أو عدّل أو احذف الخدمات وأعد ترتيبها</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ServicesList initialServices={services} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
