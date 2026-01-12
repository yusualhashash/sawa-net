import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllHeroSlides } from "@/lib/content"
import { SlidesList } from "@/components/admin/slides-list"

export default async function SlidesManagementPage() {
  const slides = await getAllHeroSlides()

  return (
    <div className="min-h-screen bg-gray-50 py-24" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">إدارة السلايدر الرئيسي</h1>
            <p className="text-gray-600">تحرير وإدارة شرائح الصفحة الرئيسية</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>شرائح السلايدر</CardTitle>
            <CardDescription>يمكنك تعديل النصوص والصور وترتيب الشرائح</CardDescription>
          </CardHeader>
          <CardContent>
            <SlidesList slides={slides} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
