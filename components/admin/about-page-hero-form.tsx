"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { AboutPageHero } from "@/lib/content"
import { ImageUploadField } from "@/components/admin/image-upload-field"

interface AboutPageHeroFormProps {
  hero: AboutPageHero
}

export function AboutPageHeroForm({ hero }: AboutPageHeroFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    badge_text: hero.badge_text,
    title: hero.title,
    subtitle: hero.subtitle,
    description: hero.description,
    button1_text: hero.button1_text,
    button1_link: hero.button1_link,
    background_image_url: hero.background_image_url || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("[v0] Submitting about hero form data:", formData)

    try {
      const response = await fetch("/api/admin/about-page-hero/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      console.log("[v0] Response status:", response.status)
      const result = await response.json()
      console.log("[v0] Response data:", result)

      if (!response.ok) {
        throw new Error(result.error || "Failed to update")
      }

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث بيانات البانر الرئيسي",
      })

      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("[v0] Error updating about hero:", error)
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل حفظ التغييرات",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border space-y-4">
      <div>
        <Label htmlFor="badge_text">نص الشارة</Label>
        <Input
          id="badge_text"
          value={formData.badge_text}
          onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="title">العنوان الرئيسي</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="subtitle">العنوان الفرعي</Label>
        <Input
          id="subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">الوصف</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="button1_text">نص الزر</Label>
        <Input
          id="button1_text"
          value={formData.button1_text}
          onChange={(e) => setFormData({ ...formData, button1_text: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="button1_link">رابط الزر</Label>
        <Input
          id="button1_link"
          value={formData.button1_link}
          onChange={(e) => setFormData({ ...formData, button1_link: e.target.value })}
          required
        />
      </div>

      <ImageUploadField
        label="صورة الخلفية"
        currentImageUrl={formData.background_image_url}
        onImageChange={(url) => setFormData({ ...formData, background_image_url: url })}
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
      </Button>
    </form>
  )
}
