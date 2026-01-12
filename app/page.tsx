import { HeroSlider } from "@/components/hero-slider"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { PackagesSection } from "@/components/packages-section"
import { ContactSection } from "@/components/contact-section"
import { getContactInfo, getHeroSlides, getServices, getAllContent, getAboutContent, getPackages } from "@/lib/content"

export default async function Home() {
  const contactInfo = await getContactInfo()
  const whatsappContact = contactInfo.find((info) => info.type === "whatsapp" || info.icon === "whatsapp")
  const whatsappNumber = whatsappContact?.value || ""

  const heroSlides = await getHeroSlides()
  const services = await getServices()
  const servicesHeader = await getAllContent("services_section_header")
  const aboutContent = await getAboutContent()
  const aboutHeader = await getAllContent("about_section_header")
  const packages = await getPackages()
  const packagesHeader = await getAllContent("packages_section_header")
  const contactHeader = await getAllContent("contact_section_header")
  const contactCta = await getAllContent("contact_cta")

  const servicesSectionData = Object.fromEntries(servicesHeader.map((item) => [item.key, item.value]))
  const aboutSectionData = Object.fromEntries(aboutHeader.map((item) => [item.key, item.value]))
  const packagesSectionData = Object.fromEntries(packagesHeader.map((item) => [item.key, item.value]))
  const contactSectionData = Object.fromEntries(contactHeader.map((item) => [item.key, item.value]))
  const contactCtaData = Object.fromEntries(contactCta.map((item) => [item.key, item.value]))

  return (
    <div className="min-h-screen bg-background">
      <HeroSlider slides={heroSlides} whatsappNumber={whatsappNumber} />
      <AboutSection
        title={aboutSectionData.title || "من نحن"}
        subtitle={aboutSectionData.subtitle || "تعرف على شركتنا"}
        content={aboutContent}
      />
      <ServicesSection
        title={servicesSectionData.title || "خدماتنا"}
        subtitle={servicesSectionData.subtitle || "نقدم لك أفضل خدمات الإنترنت"}
        services={services}
      />
      <PackagesSection
        title={packagesSectionData.title || "باقاتنا"}
        subtitle={packagesSectionData.subtitle || "اختر الباقة المناسبة لك"}
        packages={packages}
        whatsappNumber={whatsappNumber}
      />
      <ContactSection
        title={contactSectionData.title || "تواصل معنا"}
        subtitle={contactSectionData.subtitle || "نحن هنا لخدمتك على مدار الساعة"}
        ctaTitle={contactCtaData.title || "جاهز للبدء؟"}
        ctaSubtitle={contactCtaData.subtitle || "انضم إلى آلاف العملاء الراضين"}
        ctaButtonText={contactCtaData.button_text || "اشترك الآن"}
        contactInfo={contactInfo}
        whatsappNumber={whatsappNumber}
      />
    </div>
  )
}
