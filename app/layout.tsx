import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  getTopMainMenuBranding,
  getTopMainMenuNavigation,
  getTopMainMenuAction,
  getContactInfo,
  getFooterLinks,
  getFooterSocial,
  getAllContent,
} from "@/lib/content"

const cairo = Cairo({ subsets: ["arabic", "latin"] })

export const metadata: Metadata = {
  title: {
    default: "Sawa-Net",
    template: "%s | Sawa-Net",
  },
  description:
    "شركة سوا نت - نقدم خدمات إنترنت سريعة وموثوقة في درعا الريف الغربي. دعم فني 24/7، باقات متنوعة، وتغطية واسعة. اشترك الآن واستمتع بأفضل خدمة إنترنت.",
  keywords: ["إنترنت سوريا", "واي فاي", "سوا نت", "Sawa-Net", "إنترنت سريع", "خدمات إنترنت", "باقات إنترنت", "درعا"],
  authors: [{ name: "Sawa-Net" }],
  creator: "Sawa-Net",
  publisher: "Sawa-Net",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sawa-wifi.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SAWA-NET - إنترنت سريع وموثوق في سوريا",
    description: "نقدم خدمات إنترنت سريعة وموثوقة مع دعم فني 24/7 وباقات متنوعة",
    url: "https://sawa-wifi.com",
    siteName: "SAWA-NET",
    locale: "ar_SY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAWA-NET - إنترنت سريع وموثوق",
    description: "نقدم خدمات إنترنت سريعة وموثوقة مع دعم فني 24/7",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  generator: 'v0.app'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const brandingContent = await getTopMainMenuBranding()
  const navigationItems = await getTopMainMenuNavigation()
  const actionContent = await getTopMainMenuAction()
  const contactInfo = await getContactInfo()
  const whatsappContact = contactInfo.find((info) => info.type === "whatsapp" || info.icon === "whatsapp")
  const whatsappNumber = whatsappContact?.value || ""

  const branding = Object.fromEntries(brandingContent.map((item) => [item.key, item.value]))
  const action = Object.fromEntries(actionContent.map((item) => [item.key, item.value]))

  const footerAbout = await getAllContent("footer_about")
  const footerCopyright = await getAllContent("footer_copyright")
  const footerLinks = await getFooterLinks()
  const footerSocial = await getFooterSocial()

  const footerAboutData = Object.fromEntries(footerAbout.map((item) => [item.key, item.value]))
  const footerCopyrightData = Object.fromEntries(footerCopyright.map((item) => [item.key, item.value]))

  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} font-sans antialiased`}>
        <Header branding={branding} navigationItems={navigationItems} action={action} whatsappNumber={whatsappNumber} />
        {children}
        <Footer
          aboutTitle={footerAboutData.title || "سوا نت"}
          aboutDescription={footerAboutData.description || "نوفر لك أفضل خدمات الإنترنت"}
          copyrightText={footerCopyrightData.text || "© 2025 سوا نت. جميع الحقوق محفوظة."}
          links={footerLinks}
          socialLinks={footerSocial}
          contactInfo={contactInfo}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
