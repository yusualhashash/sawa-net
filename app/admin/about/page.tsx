import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAboutPageHero, getAllAboutPageStats, getAllAboutContent } from "@/lib/content"
import { AboutPageHeroForm } from "@/components/admin/about-page-hero-form"
import { AboutPageStatsList } from "@/components/admin/about-page-stats-list"
import { AboutContentList } from "@/components/admin/about-content-list"

export default async function AboutPageAdmin() {
  const hero = await getAboutPageHero()
  const stats = await getAllAboutPageStats()
  const features = await getAllAboutContent()

  if (!hero) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 py-24" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة صفحة من نحن</h1>
            <p className="text-gray-600">تحرير البانر والإحصائيات والمميزات في صفحة من نحن</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        {/* Hero Section Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">قسم البانر الرئيسي</h2>
          <AboutPageHeroForm hero={hero} />
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">الإحصائيات</h2>
          <AboutPageStatsList stats={stats} />
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المميزات والقيم</h2>

          {/* ✅ pass prop name that matches component interface */}
          <AboutContentList content={features} />
        </div>
      </div>
    </div>
  )
}
