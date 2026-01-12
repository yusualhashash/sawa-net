"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { CoveragePageHero } from "@/lib/content"
import ImageUploadField from "./image-upload-field"

export default function CoveragePageHeroForm({ hero }: { hero: CoveragePageHero }) {
  const [formData, setFormData] = useState(hero)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/coverage-page-hero/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to update")
      }

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث معلومات البانر",
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
      <div className="space-y-2">
        <Label htmlFor="badge_text">نص الشارة</Label>
        <Input
          id="badge_text"
          value={formData.badge_text}
          onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
          placeholder="تعرف علينا"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">العنوان الرئيسي</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="نحن شركة SAWA-NET"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">العنوان الفرعي</Label>
        <Input
          id="subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          placeholder="نقدم لك أفضل خدمات الإنترنت في سوريا"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">الوصف</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          placeholder="نحن شركة رائدة في تقديم خدمات الإنترنت..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="button_text">نص الزر</Label>
        <Input
          id="button_text"
          value={formData.button_text}
          onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
          placeholder="تواصل معنا"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="button_link">رابط الزر</Label>
        <Input
          id="button_link"
          value={formData.button_link}
          onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
          placeholder="/contact"
        />
      </div>

      <ImageUploadField
        label="صورة الخلفية"
        currentImage={formData.background_image}
        onImageChange={(image) => setFormData({ ...formData, background_image: image })}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
      </Button>
    </form>
  )
}
