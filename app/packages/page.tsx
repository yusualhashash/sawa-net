import {
  getPackages,
  getContactInfo,
  getPackagesHero,
  getPackagesStats,
  getWhyChooseFeatures,
  getWhyChooseSection,
} from "@/lib/content"
import { PackageCard } from "@/components/package-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Zap, Shield, Headphones, TrendingUp, Users, Check } from "lucide-react"

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    users: Users,
    zap: Zap,
    "trending-up": TrendingUp,
    headphones: Headphones,
    wifi: Wifi,
    shield: Shield,
    check: Check,
  }
  return icons[iconName] || Users
}

export default async function PackagesPage() {
  const packages = await getPackages()
  const contactInfo = await getContactInfo()
  const heroData = await getPackagesHero()
  const statsData = await getPackagesStats()
  const whyChooseFeatures = await getWhyChooseFeatures()
  const whyChooseSection = await getWhyChooseSection()

  const whatsappContact = contactInfo.find((item) => item.type === "whatsapp" || item.icon === "whatsapp")
  const whatsappNumber = whatsappContact?.value || ""

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-cyan-900 text-white pt-32 pb-24 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {heroData?.background_image && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${heroData.background_image})` }}
          />
        )}

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-4">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">
                {heroData?.badge_text || "باقات مصممة خصيصاً لك"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="block text-white">{heroData?.title || "اختر الباقة المثالية لاحتياجاتك"}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {heroData?.description || "باقات إنترنت عالية السرعة مع دعم فني متميز على مدار الساعة"}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Button
                asChild
                size="lg"
                className="bg-white text-slate-900 hover:bg-cyan-50 text-lg px-8 py-6 rounded-2xl font-bold"
              >
                <a href={heroData?.button1_link || "#packages"}>{heroData?.button1_text || "استكشف الباقات"}</a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
            {statsData.map((stat) => {
              const IconComponent = getIconComponent(stat.icon)
              return (
                <Card key={stat.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center space-y-2">
                    <IconComponent className="w-8 h-8 mx-auto text-cyan-400" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 px-4 bg-linear-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100">
              <span className="text-cyan-600 text-sm font-medium">باقاتنا المميزة</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">اختر ما يناسبك</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">اختر الباقة التي تناسب احتياجاتك من السرعة والسعر</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} whatsappNumber={whatsappNumber} />
            ))}
          </div>

          {/* Features Grid */}
          <div className="mt-24">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
              {whyChooseSection?.section_title || "لماذا تختار SAWA-NET؟"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseFeatures.map((feature) => {
                const IconComponent = getIconComponent(feature.icon)
                return (
                  <Card
                    key={feature.id}
                    className="border-2 border-gray-100 hover:border-cyan-300 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group"
                  >
                    <CardContent className="p-8 space-y-4">
                      <div className="w-14 h-14 bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
