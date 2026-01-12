"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Wifi, Zap, Shield } from "lucide-react"
import type { HeroSlide } from "@/lib/content"

interface HeroSliderProps {
  slides: HeroSlide[]
  whatsappNumber: string
}

export function HeroSlider({ slides, whatsappNumber }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (slides.length === 0) return null

  const features = [
    { icon: Zap, label: "سرعة فائقة" },
    { icon: Shield, label: "اتصال آمن" },
    { icon: Wifi, label: "تغطية شاملة" },
  ]

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-500" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image_url || "/placeholder.svg?height=1080&width=1920&query=technology network"}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-cyan-900/70" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-8 pt-20">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-sm font-medium">خدمة إنترنت متميزة</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="block">{slide.title}</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  سوا نت
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                {slide.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
                >
                  <span>اشترك الآن</span>
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </a>
                <a
                  href="/packages"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 border border-white/20"
                >
                  <span>استكشف الباقات</span>
                </a>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <feature.icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-white/80 text-sm">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {mounted && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-2xl transition-all z-10 border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-2xl transition-all z-10 border border-white/20"
            aria-label="Next slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {mounted && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                  ? "w-10 bg-gradient-to-r from-cyan-400 to-blue-500"
                  : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 hidden md:flex flex-col items-center gap-2">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
        </div>
        <span className="text-white/50 text-xs">مرر للأسفل</span>
      </div>
    </div>
  )
}
