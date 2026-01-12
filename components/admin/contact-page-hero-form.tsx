"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Upload } from "lucide-react"
import { put } from "@vercel/blob"

interface ContactPageHero {
  id: number
  badge_text: string
  title: string
  subtitle: string
  description: string
  background_image: string | null
}

interface ContactPageHeroFormProps {
  heroData: ContactPageHero
}

export function ContactPageHeroForm({ heroData }: ContactPageHeroFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    badge_text: heroData.badge_text,
    title: heroData.title,
    subtitle: heroData.subtitle,
    description: heroData.description,
    background_image: heroData.background_image || "",
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const blob = await put(file.name, file, { access: "public" })
      setFormData((prev) => ({ ...prev, background_image: blob.url }))
      toast({
        title: "تم رفع الصورة",
        description: "تم رفع صورة الخلفية بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل رفع الصورة",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/contact-page-hero/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: heroData.id,
          ...formData,
        }),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم الحفظ",
        description: "تم تحديث قسم البانر بنجاح",
      })

      window.location.reload()
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحديث البانر",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
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
          placeholder="نحن هنا لك"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">العنوان</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="تواصل معنا"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">العنوان الفرعي</Label>
        <Input
          id="subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          placeholder="نحن هنا لمساعدتك في أي وقت"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">الوصف</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="فريقنا متاح على مدار الساعة"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="background_image">صورة الخلفية</Label>
        <div className="flex gap-2">
          <Input
            id="background_image"
            value={formData.background_image}
            onChange={(e) => setFormData({ ...formData, background_image: e.target.value })}
            placeholder="رابط الصورة"
          />
          <Button type="button" variant="outline" disabled={uploading} asChild>
            <label htmlFor="image-upload" className="cursor-pointer">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            </label>
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </div>
        {formData.background_image && (
          <img
            src={formData.background_image || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg mt-2"
          />
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        حفظ التغييرات
      </Button>
    </form>
  )
}
