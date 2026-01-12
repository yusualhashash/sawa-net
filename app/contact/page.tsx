import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getContactInfo, getContactPageFeatures, getContactPageHero } from "@/lib/content"
import { Facebook, Headphones, Instagram, Mail, MapPin, MessageCircle, Phone, Sparkles, Twitter } from "lucide-react"

const iconMap: Record<string, any> = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  headphones: Headphones,
  sparkles: Sparkles,
}

const getContactAction = (type: string, value: string) => {
  switch (type) {
    case "phone":
      return `tel:${value.replace(/\s/g, "")}`
    case "whatsapp":
      return `https://wa.me/${value.replace(/\D/g, "")}`
    case "email":
      return `mailto:${value}`
    case "facebook":
      return value.startsWith("http") ? value : `https://facebook.com/${value}`
    case "instagram":
      return value.startsWith("http") ? value : `https://instagram.com/${value}`
    case "twitter":
      return value.startsWith("http") ? value : `https://twitter.com/${value}`
    case "location":
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`
    default:
      return "#"
  }
}

export default async function ContactPage() {
  const heroData = await getContactPageHero()
  const contactInfo = await getContactInfo()
  const features = await getContactPageFeatures()

  const whatsappContact = contactInfo.find((info) => info.type === "whatsapp")
  const whatsappNumber = whatsappContact?.value || ""

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 pt-24"
        style={
          heroData?.background_image
            ? {
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(30, 58, 138, 0.9)), url(${heroData.background_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">{heroData?.badge_text || "نحن هنا لك"}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{heroData?.title || "تواصل معنا"}</h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-4 text-white/80">
              {heroData?.subtitle || "نحن هنا لمساعدتك في أي وقت"}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-2xl mx-auto">
              {heroData?.description || "فريقنا متاح على مدار الساعة للإجابة على استفساراتك وتقديم أفضل الحلول"}
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-cyan-50 text-lg px-8 py-6 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                تواصل عبر واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon] || Headphones
              return (
                <Card
                  key={feature.id}
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-cyan-200 rounded-3xl group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-cyan-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
              <span className="text-cyan-600 text-sm font-medium">طرق التواصل</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">اختر الطريقة الأنسب للتواصل معنا</h2>
            <p className="text-lg text-gray-600">نحن متواجدون دائماً لخدمتك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info) => {
              const Icon = iconMap[info.icon] || Phone
              const href = getContactAction(info.type, info.value)
              const isExternal = info.type !== "location"

              return (
                <Card
                  key={info.id}
                  className="group p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-cyan-200 bg-white rounded-3xl"
                >
                  <a
                    href={href}
                    target={isExternal && info.type !== "phone" && info.type !== "email" ? "_blank" : undefined}
                    rel={
                      isExternal && info.type !== "phone" && info.type !== "email" ? "noopener noreferrer" : undefined
                    }
                    className="flex flex-col items-center text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-cyan-700 transition-colors">
                        {info.label}
                      </h3>
                      <p className="text-sm text-gray-600 wrap-break-word">{info.value}</p>
                    </div>
                  </a>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
