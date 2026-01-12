"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { CoverageMapSection } from "@/lib/content"
import ImageUploadField from "./image-upload-field"

export default function CoverageMapForm({ mapSection }: { mapSection: CoverageMapSection }) {
  const [mapImage, setMapImage] = useState(mapSection.map_image)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/coverage-map/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mapImage }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to update")
      }

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث خريطة التغطية",
      })

      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ التغييرات",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageUploadField
        label="صورة الخريطة"
        description="اختر صورة خريطة التغطية الشبكية (يُفضل 1200x600 بكسل)"
        currentImage={mapImage}
        onImageChange={setMapImage}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
      </Button>
    </form>
  )
}
