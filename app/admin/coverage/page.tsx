import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCoveragePageHero, getCoverageAreas, getCoverageMapSection } from "@/lib/content"
import CoveragePageHeroForm from "@/components/admin/coverage-page-hero-form"
import CoverageAreasForm from "@/components/admin/coverage-areas-form"
import CoverageMapForm from "@/components/admin/coverage-map-form"
import { Button } from "@/components/ui/button"

export default async function CoveragePageAdmin() {
    const hero = await getCoveragePageHero()
    const areas = await getCoverageAreas()
    const mapSection = await getCoverageMapSection()

    return (
        <div className="min-h-screen bg-gray-50 py-24" dir="rtl">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">إدارة صفحة التغطية</h1>
                        <p className="text-gray-600 mt-1">تحرير محتوى صفحة التغطية والمناطق المشمولة</p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/admin/dashboard">
                            <ArrowRight className="ml-2 h-4 w-4" />
                            العودة للوحة التحكم
                        </Link>
                    </Button>
                </div>

                <div className="space-y-6">
                    {/* Hero Banner Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>بانر الصفحة</CardTitle>
                        </CardHeader>
                        <CardContent>{hero && <CoveragePageHeroForm hero={hero} />}</CardContent>
                    </Card>

                    {/* Coverage Map Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>خريطة التغطية</CardTitle>
                        </CardHeader>
                        <CardContent>{mapSection && <CoverageMapForm mapSection={mapSection} />}</CardContent>
                    </Card>

                    {/* Coverage Areas Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>المناطق المشمولة</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CoverageAreasForm areas={areas} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
