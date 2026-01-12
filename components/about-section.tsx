import type { AboutContent } from "@/lib/content"
import { Building2, Target, Trophy, Users, Lightbulb, Award, ArrowLeft } from "lucide-react"

interface AboutSectionProps {
  title: string
  subtitle: string
  content: AboutContent[]
}

const iconMap: Record<string, any> = {
  building: Building2,
  target: Target,
  trophy: Trophy,
  users: Users,
  lightbulb: Lightbulb,
  award: Award,
}

export function AboutSection({ title, subtitle, content }: AboutSectionProps) {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
            <span className="text-cyan-600 text-sm font-medium">تعرف علينا</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* About Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.map((item, index) => {
            const Icon = iconMap[item.icon] || Building2
            return (
              <div key={item.id} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-cyan-200 overflow-hidden h-full">
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-cyan-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-sm font-medium">المزيد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
