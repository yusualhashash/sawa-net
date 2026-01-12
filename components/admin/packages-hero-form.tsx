"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { PackagesHero } from "@/lib/content"

interface PackagesHeroFormProps {
  heroData: PackagesHero
}

export function PackagesHeroForm({ heroData }: PackagesHeroFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    badge_text: heroData.badge_text,
    title: heroData.title,
    description: heroData.description,
    button1_text: heroData.button1_text,
    button1_link: heroData.button1_link,
    button2_text: heroData.button2_text,
    button2_link: heroData.button2_link,
    background_image: heroData.background_image || "",
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "خطأ في الملف",
        description: "يرجى اختيار ملف صورة",
        variant: "destructive",
      })
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "حجم كبير",
        description: "حجم الصورة يجب أن يكون أقل من 2 ميجابايت",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setFormData({ ...formData, background_image: base64String })
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/packages-hero/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: heroData.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update")
      }

      toast({
        title: "تم الحفظ",
        description: "تم حفظ التغييرات بنجاح",
      })

      router.refresh()
    } catch (error) {
      console.error("Error saving:", error)
      toast({
        title: "حدث خطأ",
        description: "فشل في حفظ التغييرات",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="badge" className="p-2">نص الشارة</Label>
        <Input
          id="badge"
          value={formData.badge_text}
          onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
          className="text-right"
          placeholder="باقات مصممة خصيصاً لك"
        />
      </div>

      <div>
        <Label htmlFor="title" className="p-2">العنوان الرئيسي</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="text-right"
          placeholder="اختر الباقة المثالية لاحتياجاتك"
        />
      </div>

      <div>
        <Label htmlFor="description" className="p-2">الوصف</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="text-right min-h-24"
          placeholder="باقات إنترنت عالية السرعة مع دعم فني متميز..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="button1_text" className="p-2">نص الزر الأول</Label>
          <Input
            id="button1_text"
            value={formData.button1_text}
            onChange={(e) => setFormData({ ...formData, button1_text: e.target.value })}
            className="text-right"
            placeholder="استكشف الباقات"
          />
        </div>
        <div>
          <Label htmlFor="button1_link" className="p-2">رابط الزر الأول</Label>
          <Input
            id="button1_link"
            value={formData.button1_link}
            onChange={(e) => setFormData({ ...formData, button1_link: e.target.value })}
            className="text-right"
            placeholder="#packages"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="background" className="p-2">الصورة الخلفية</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input id="background" type="file" accept="image/*" onChange={handleImageUpload} className="text-right" />
            <Upload className="w-5 h-5 text-gray-400" />
          </div>
          {formData.background_image && (
            <img
              src={formData.background_image || "/placeholder.svg"}
              alt="Background preview"
              className="mt-2 w-full h-48 object-cover rounded border"
            />
          )}
          <p className="text-sm text-gray-500">اختر صورة خلفية جديدة (الحد الأقصى: 2 ميجابايت)</p>
        </div>
      </div>

      <Button onClick={handleSave} disabled={isSaving} className="w-full" size="lg">
        <Save className="ml-2 h-5 w-5" />
        {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
      </Button>
    </div>
  )
}
