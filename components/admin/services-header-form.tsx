"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ServicesHeaderFormProps {
  title: string
  subtitle: string
  titleId?: number
  subtitleId?: number
}

export function ServicesHeaderForm({ title, subtitle, titleId, subtitleId }: ServicesHeaderFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({ title, subtitle })
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted", formData)
    setIsSaving(true)

    try {
      const updates = []

      if (titleId) {
        updates.push({
          id: titleId,
          value: formData.title,
          sort_order: 0,
        })
      }

      if (subtitleId) {
        updates.push({
          id: subtitleId,
          value: formData.subtitle,
          sort_order: 1,
        })
      }

      console.log("[v0] Sending update request", updates)

      const response = await fetch("/api/admin/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      console.log("[v0] Response status", response.status)
      const data = await response.json()
      console.log("[v0] Response data", data)

      if (response.ok) {
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم حفظ التغييرات على عنوان القسم",
        })
        setTimeout(() => {
          router.refresh()
        }, 1500)
      } else {
        throw new Error(data.error || "Failed to save")
      }
    } catch (error) {
      console.error("[v0] Save error:", error)
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء حفظ التغييرات",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">العنوان الرئيسي</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="خدماتنا"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">العنوان الفرعي</Label>
        <Input
          id="subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          placeholder="نقدم لك أفضل خدمات الإنترنت في العراق"
          required
        />
      </div>

      <Button type="submit" disabled={isSaving} className="w-full">
        <Save className="ml-2 h-4 w-4" />
        {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
      </Button>
    </form>
  )
}
