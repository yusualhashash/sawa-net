"use client"
import Link from "next/link"
import { Wifi, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function Header({
  branding,
  navigationItems,
  action,
  whatsappNumber,
}: {
  branding: Record<string, string>
  navigationItems: Array<{ id: number; value: string }>
  action: Record<string, string>
  whatsappNumber: string
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber.replace(/\s/g, "")
    const whatsappUrl = `https://wa.me/${cleanNumber}`
    window.open(whatsappUrl, "_blank")
  }

  const getNavigationHref = (value: string) => {
    const lowerValue = value.toLowerCase()
    if (lowerValue.includes("الرئيسية") || lowerValue.includes("home")) return "/"
    if (lowerValue.includes("الباقات") || lowerValue.includes("packages")) return "/packages"
    if (lowerValue.includes("التغطية") || lowerValue.includes("coverage")) return "/coverage"
    if (lowerValue.includes("من نحن") || lowerValue.includes("about")) return "/about"
    if (lowerValue.includes("تواصل") || lowerValue.includes("contact")) return "/contact"
    return "/"
  }

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                  <Wifi className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}
                >
                  {branding.brand_name}
                </span>
                <span className={`text-xs transition-colors ${scrolled ? "text-gray-500" : "text-white/70"}`}>
                  اتصال بلا حدود
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => {
              const href = getNavigationHref(item.value)
              const active = isActive(href)

              return (
                <Link
                  key={item.id}
                  href={href}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    active
                      ? scrolled
                        ? "text-cyan-600 bg-cyan-50"
                        : "text-white bg-white/20"
                      : scrolled
                        ? "text-gray-600 hover:text-cyan-600 hover:bg-gray-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.value}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <button
            onClick={handleWhatsAppClick}
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
          >
            <span>{action.subscribe_button}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mounted && mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200/20 pt-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl mx-2 p-4">
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const href = getNavigationHref(item.value)
                const active = isActive(href)

                return (
                  <Link
                    key={item.id}
                    href={href}
                    className={`font-medium transition-all px-4 py-3 rounded-xl text-right ${
                      active ? "text-cyan-600 bg-cyan-50" : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.value}
                  </Link>
                )
              })}
              <button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 w-full mt-2"
              >
                {action.subscribe_button}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
