import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LogOut,
  ImageIcon,
  Zap,
  Package,
  Phone,
  Layout,
  Sparkles,
  Award,
  Mail,
  Menu,
  Users,
  MapIcon,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-24" dir="rtl">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">لوحة تحكم SAWA-NET</h1>
          <form action="/api/admin/logout" method="POST">
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Homepage Sections */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-emerald-600">الصفحة الرئيسية</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    إدارة قسم السلايدر
                  </CardTitle>
                  <CardDescription>تحرير الشرائح، الصور، والنصوص</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/slides">
                    <Button className="w-full">إدارة السلايدر</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    إدارة قسم الخدمات
                  </CardTitle>
                  <CardDescription>تحرير الخدمات والمزايا</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/services">
                    <Button className="w-full">إدارة الخدمات</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Packages Page Sections */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">صفحة الباقات</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    إدارة قسم البانر
                  </CardTitle>
                  <CardDescription>تحرير العنوان والوصف والإحصائيات</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/packages-hero">
                    <Button className="w-full">إدارة البانر</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    إدارة قسم الباقات
                  </CardTitle>
                  <CardDescription>تحرير باقات الإنترنت والأسعار</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/packages">
                    <Button className="w-full">إدارة الباقات</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    إدارة قسم لماذا تختارنا
                  </CardTitle>
                  <CardDescription>تحرير العنوان والمميزات</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/why-choose">
                    <Button className="w-full">إدارة المميزات</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-teal-600">صفحة التغطية</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapIcon className="h-5 w-5" />
                    إدارة محتوى صفحة التغطية
                  </CardTitle>
                  <CardDescription>تحرير البانر والخريطة والمناطق المشمولة</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/coverage">
                    <Button className="w-full">إدارة الصفحة</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* About Page Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">صفحة من نحن</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    إدارة محتوى صفحة من نحن
                  </CardTitle>
                  <CardDescription>تحرير البانر والإحصائيات والمميزات</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/about">
                    <Button className="w-full">إدارة الصفحة</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Page Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-600">صفحة تواصل معنا</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    إدارة قسم البانر
                  </CardTitle>
                  <CardDescription>تحرير العنوان والمميزات</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/contact-page">
                    <Button className="w-full">إدارة البانر</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    إدارة قسم معلومات التواصل
                  </CardTitle>
                  <CardDescription>تحرير الهاتف والبريد والعنوان</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/contact">
                    <Button className="w-full">إدارة معلومات التواصل</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Global Sections */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">أقسام عامة</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Menu className="h-5 w-5" />
                    إدارة القائمة الرئيسية
                  </CardTitle>
                  <CardDescription>تحرير اللوجو وروابط التنقل</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/content/top-menu">
                    <Button className="w-full">إدارة القائمة</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    إدارة الفوتر
                  </CardTitle>
                  <CardDescription>تحرير نصوص وروابط الفوتر</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/footer">
                    <Button className="w-full">إدارة الفوتر</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
