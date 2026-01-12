import { getAllContent } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ContentEditForm from "@/components/admin/content-edit-form"

export default async function TopMenuContent() {
  const branding = await getAllContent("top_main_menu_branding")
  const navigation = await getAllContent("top_main_menu_navigation")
  const action = await getAllContent("top_main_menu_action")

  return (
    <div className="min-h-screen bg-gray-50 py-24" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-8">إدارة محتوى القائمة الرئيسية</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>
        <div className="space-y-6">
          {/* Branding Section */}
          <Card>
            <CardHeader>
              <CardTitle>العلامة التجارية</CardTitle>
              <CardDescription>نص العلامة التجارية والشعار</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentEditForm items={branding} />
            </CardContent>
          </Card>

          {/* Navigation Section */}
          <Card>
            <CardHeader>
              <CardTitle>عناصر القائمة</CardTitle>
              <CardDescription>روابط التنقل في القائمة العلوية</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentEditForm items={navigation} />
            </CardContent>
          </Card>

          {/* Action Button Section */}
          <Card>
            <CardHeader>
              <CardTitle>زر الإجراء</CardTitle>
              <CardDescription>نص زر الاشتراك</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentEditForm items={action} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  )
}
