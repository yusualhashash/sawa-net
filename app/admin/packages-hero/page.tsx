import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPackagesHero, getAllPackagesStats } from "@/lib/content"
import { PackagesHeroForm } from "@/components/admin/packages-hero-form"
import { PackagesStatsList } from "@/components/admin/packages-stats-list"

export default async function PackagesHeroManagementPage() {
  const heroData = await getPackagesHero()
  const stats = await getAllPackagesStats()

  return (
    <div className="min-h-screen bg-gray-50 py-24" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">إدارة صفحة الباقات</h1>
            <p className="text-gray-600">تحرير محتوى صفحة الباقات والإحصائيات</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>محتوى القسم الرئيسي</CardTitle>
              <CardDescription>تحرير النصوص والأزرار والصورة الخلفية</CardDescription>
            </CardHeader>
            <CardContent>{heroData && <PackagesHeroForm heroData={heroData} />}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إحصائيات الباقات</CardTitle>
              <CardDescription>تحرير وترتيب الإحصائيات المعروضة (24/7، 100 Mbps، إلخ)</CardDescription>
            </CardHeader>
            <CardContent>
              <PackagesStatsList stats={stats} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
