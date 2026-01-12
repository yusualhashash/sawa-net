import { getAllWhyChooseFeatures, getWhyChooseSection } from "@/lib/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WhyChooseFeaturesList } from "@/components/admin/why-choose-features-list"
import { WhyChooseSectionForm } from "@/components/admin/why-choose-section-form"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function WhyChoosePage() {
  const features = await getAllWhyChooseFeatures()
  const sectionData = await getWhyChooseSection()

  return (
    <div className="min-h-screen bg-gray-50 p-8 py-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة قسم لماذا تختارنا</h1>
            <p className="text-gray-600 mt-2">إدارة محتوى قسم المميزات في صفحة الباقات</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>عنوان القسم</CardTitle>
          </CardHeader>
          <CardContent>
            <WhyChooseSectionForm initialData={sectionData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المميزات</CardTitle>
          </CardHeader>
          <CardContent>
            <WhyChooseFeaturesList initialFeatures={features} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
