import type { Package } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, ArrowLeft, Star, Zap } from "lucide-react"
import Link from "next/link"

interface PackagesSectionProps {
  title: string
  subtitle: string
  packages: Package[]
  whatsappNumber: string
}

export function PackagesSection({ title, subtitle, packages, whatsappNumber }: PackagesSectionProps) {
  const formatWhatsAppLink = (packageName: string) => {
    const message = `مرحباً، أرغب في الاشتراك في ${packageName}`
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden" id="packages">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-100/40 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
            <Zap className="w-4 h-4 text-cyan-600" />
            <span className="text-cyan-600 text-sm font-medium">باقات مميزة</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const features = JSON.parse(pkg.features) as string[]

            return (
              <div
                key={pkg.id}
                className={`group relative rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                  pkg.is_featured
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/30 scale-105 z-10"
                    : "bg-white border-2 border-gray-100 hover:border-cyan-200 hover:shadow-xl"
                }`}
              >
                {/* Featured Badge */}
                {pkg.is_featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-yellow-400 text-yellow-900 px-4 py-1.5 text-sm font-bold shadow-lg">
                      <Star className="w-4 h-4 ml-1 fill-yellow-900" />
                      الأكثر شعبية
                    </Badge>
                  </div>
                )}

                <div className="p-8">
                  {/* Package Name & Speed */}
                  <div className="text-center mb-6">
                    <h3 className={`text-2xl font-bold mb-2 ${pkg.is_featured ? "text-white" : "text-gray-900"}`}>
                      {pkg.name}
                    </h3>
                    <div className={`text-4xl font-bold ${pkg.is_featured ? "text-cyan-100" : "text-cyan-600"}`}>
                      {pkg.speed}
                    </div>
                  </div>

                  {/* Price */}
                  <div
                    className={`text-center py-6 mb-6 rounded-2xl ${pkg.is_featured ? "bg-white/10" : "bg-gray-50"}`}
                  >
                    <div className={`text-5xl font-bold ${pkg.is_featured ? "text-white" : "text-gray-900"}`}>
                      {pkg.price.toLocaleString()}
                      <span
                        className={`text-lg font-normal mr-2 ${pkg.is_featured ? "text-cyan-100" : "text-gray-500"}`}
                      >
                        {pkg.currency}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${pkg.is_featured ? "text-cyan-100" : "text-gray-500"}`}>شهرياً</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            pkg.is_featured ? "bg-white/20" : "bg-cyan-100"
                          }`}
                        >
                          <Check className={`w-4 h-4 ${pkg.is_featured ? "text-white" : "text-cyan-600"}`} />
                        </div>
                        <span className={pkg.is_featured ? "text-white/90" : "text-gray-600"}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className={`w-full py-6 text-lg font-bold rounded-2xl transition-all duration-300 group-hover:scale-105 ${
                      pkg.is_featured
                        ? "bg-white text-cyan-600 hover:bg-cyan-50"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    }`}
                    size="lg"
                  >
                    <Link
                      href={formatWhatsAppLink(pkg.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>اشترك الآن</span>
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
