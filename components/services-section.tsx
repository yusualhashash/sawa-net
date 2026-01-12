import { Zap, Signal, Headphones, Infinity, Wifi, Shield } from "lucide-react"
import type { Service } from "@/lib/content"

const iconMap: Record<string, any> = {
  zap: Zap,
  signal: Signal,
  headphones: Headphones,
  infinity: Infinity,
  wifi: Wifi,
  shield: Shield,
}

interface ServicesSectionProps {
  title: string
  subtitle: string
  services: Service[]
}

export function ServicesSection({ title, subtitle, services }: ServicesSectionProps) {
  return (
    <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">خدماتنا المتميزة</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Wifi
            return (
              <div
                key={service.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-500"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                  </div>

                  {/* Index Number */}
                  <div className="absolute top-4 left-4 text-6xl font-bold text-white/5 group-hover:text-cyan-500/10 transition-colors">
                    {String(index + 1).padStart(2, "0")}
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
