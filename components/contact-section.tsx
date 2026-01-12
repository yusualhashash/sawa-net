import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactInfo {
  id: number
  type: string
  label: string
  value: string
  icon: string
}

interface ContactSectionProps {
  title: string
  subtitle: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButtonText: string
  contactInfo: ContactInfo[]
  whatsappNumber: string
}

const iconMap = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
}

export function ContactSection({
  title,
  subtitle,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
  contactInfo,
  whatsappNumber,
}: ContactSectionProps) {
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

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="contact">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
            <MessageCircle className="w-4 h-4 text-cyan-600" />
            <span className="text-cyan-600 text-sm font-medium">تواصل معنا</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactInfo.map((info) => {
            const Icon = iconMap[info.icon as keyof typeof iconMap] || Phone
            const href = getContactAction(info.type, info.value)
            const isExternal = info.type !== "location"

            return (
              <a
                key={info.id}
                href={href}
                target={isExternal && info.type !== "phone" && info.type !== "email" ? "_blank" : undefined}
                rel={isExternal && info.type !== "phone" && info.type !== "email" ? "noopener noreferrer" : undefined}
                className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-cyan-200 overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-cyan-700 transition-colors">
                      {info.label}
                    </h3>
                    <p className="text-gray-600 break-words text-sm">{info.value}</p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative p-12 md:p-16 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{ctaTitle}</h3>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">{ctaSubtitle}</p>
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-cyan-50 text-lg px-10 py-6 rounded-2xl font-bold shadow-xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
              asChild
            >
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>{ctaButtonText}</span>
                <ArrowLeft className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
