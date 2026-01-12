"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { WhyChooseSection } from "@/lib/content"

interface WhyChooseSectionFormProps {
  initialData: WhyChooseSection | null
}

export function WhyChooseSectionForm({ initialData }: WhyChooseSectionFormProps) {
  const [sectionTitle, setSectionTitle] = useState(initialData?.section_title || "لماذا تختار RASHD-WIFI؟")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!sectionTitle.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال عنوان القسم",
        variant: "destructive",
      })
      return
    }

    if (!initialData?.id) {
      toast({
        title: "خطأ",
        description: "لا يمكن العثور على بيانات القسم",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/admin/why-choose-section/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: initialData.id,
          section_title: sectionTitle,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "فشل في حفظ التغييرات")
      }

      toast({
        title: "تم الحفظ",
        description: "تم تحديث عنوان القسم بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء الحفظ",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="section_title">عنوان القسم</Label>
        <Input
          id="section_title"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="لماذا تختار RASHD-WIFI؟"
          dir="rtl"
        />
      </div>

      <Button type="submit" disabled={isSaving}>
        {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
      </Button>
    </form>
  )
}
