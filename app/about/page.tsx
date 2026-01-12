import { Users, Globe, Award, Clock, Building2, Target, Trophy, Lightbulb, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAboutPageHero, getAboutPageStats, getAboutContent } from "@/lib/content"

const iconMap: Record<string, any> = {
  users: Users,
  globe: Globe,
  award: Award,
  clock: Clock,
  building: Building2,
  target: Target,
  trophy: Trophy,
  lightbulb: Lightbulb,
}

export default async function AboutPage() {
  const hero = await getAboutPageHero()
  const stats = await getAboutPageStats()
  const features = await getAboutContent()

  if (!hero) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-cyan-900 text-white py-32 px-4"
        style={
          hero.background_image_url
            ? {
              backgroundImage: `linear-gradient(to bottom right, rgba(15, 23, 42, 0.95), rgba(30, 58, 138, 0.9), rgba(8, 145, 178, 0.85)), url(${hero.background_image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
            : undefined
        }
      >
        {/* Decorative elements */}
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

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <span className="text-sm font-medium text-cyan-300">{hero.badge_text}</span>
              <span className="text-cyan-400">✨</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-balance">{hero.title}</h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 text-center mb-6 max-w-3xl mx-auto text-balance">
            {hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-base text-white/70 text-center mb-10 max-w-3xl mx-auto leading-relaxed">
            {hero.description}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-slate-900 hover:bg-cyan-50 rounded-2xl px-8 py-6 text-lg font-bold"
            >
              <Link href={hero.button1_link} className="flex items-center gap-2">
                {hero.button1_text}
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-16 px-4 bg-white border-b">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => {
                const Icon = iconMap[stat.icon] || Users
                return (
                  <div key={stat.id} className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features/Values Section */}
      {features.length > 0 && (
        <section className="py-24 px-4 bg-linear-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
                <span className="text-cyan-600 text-sm font-medium">مميزاتنا</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">لماذا تختارنا؟</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">نقدم لك أفضل تجربة إنترنت في سوريا</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = iconMap[feature.icon] || Building2
                return (
                  <div
                    key={feature.id}
                    className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-cyan-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
