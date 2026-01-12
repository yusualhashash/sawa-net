import type { Package } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PackageCardProps {
  package: Package
  whatsappNumber: string
}

export function PackageCard({ package: pkg, whatsappNumber }: PackageCardProps) {
  const features = JSON.parse(pkg.features) as string[]

  const formatWhatsAppLink = () => {
    const message = `مرحباً، أرغب في الاشتراك في ${pkg.name}`
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
  }

  return (
    <Card
      className={`relative transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden ${
        pkg.is_featured
          ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/30 scale-105 z-10 border-0"
          : "border-2 border-gray-100 hover:border-cyan-200 hover:shadow-xl bg-white"
      }`}
    >
      {/* Featured Badge */}
      {pkg.is_featured && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-yellow-400 text-yellow-900 px-4 py-1.5 text-sm font-bold shadow-lg rounded-b-xl rounded-t-none">
            <Star className="w-4 h-4 ml-1 fill-yellow-900" />
            الأكثر شعبية
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4 pt-10">
        <CardTitle className={`text-2xl mb-2 font-bold ${pkg.is_featured ? "text-white" : "text-gray-900"}`}>
          {pkg.name}
        </CardTitle>
        <CardDescription className={`text-4xl font-bold ${pkg.is_featured ? "text-cyan-100" : "text-cyan-600"}`}>
          {pkg.speed}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-6">
        {/* Price Section */}
        <div className={`text-center rounded-2xl p-6 ${pkg.is_featured ? "bg-white/10" : "bg-slate-50"}`}>
          <div className={`text-5xl font-bold ${pkg.is_featured ? "text-white" : "text-gray-900"}`}>
            {pkg.price.toLocaleString()}
            <span className={`text-lg font-normal mr-2 ${pkg.is_featured ? "text-cyan-100" : "text-gray-500"}`}>
              {pkg.currency}
            </span>
          </div>
          <p className={`text-sm mt-2 ${pkg.is_featured ? "text-cyan-100" : "text-gray-500"}`}>شهرياً</p>
        </div>

        {/* Features List */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  pkg.is_featured ? "bg-white/20" : "bg-cyan-100"
                }`}
              >
                <Check className={`w-4 h-4 ${pkg.is_featured ? "text-white" : "text-cyan-600"}`} />
              </div>
              <span className={`text-sm leading-relaxed ${pkg.is_featured ? "text-white/90" : "text-gray-600"}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <Button
          asChild
          className={`w-full py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 ${
            pkg.is_featured
              ? "bg-white text-cyan-600 hover:bg-cyan-50"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
          }`}
          size="lg"
        >
          <Link
            href={formatWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <span>اشترك الآن</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
