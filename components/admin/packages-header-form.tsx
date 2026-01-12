"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

interface PackagesHeaderFormProps {
  titleId?: number
  titleValue: string
  subtitleId?: number
  subtitleValue: string
}

export function PackagesHeaderForm({ titleId, titleValue, subtitleId, subtitleValue }: PackagesHeaderFormProps) {
  const [title, setTitle] = useState(titleValue)
  const [subtitle, setSubtitle] = useState(subtitleValue)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    console.log("[v0] Save button clicked", { titleId, subtitleId, title, subtitle })

    if (!title.trim() || !subtitle.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      })
      return
    }

    if (!titleId || !subtitleId) {
      console.error("[v0] Missing IDs:", { titleId, subtitleId })
      toast({
        title: "خطأ",
        description: "معرفات العناصر غير موجودة",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const updates = [
        { id: titleId, value: title, sort_order: 0 },
        { id: subtitleId, value: subtitle, sort_order: 1 },
      ]

      console.log("[v0] Sending updates:", updates)

      const response = await fetch("/api/admin/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("[v0] Error response:", errorData)
        throw new Error("Failed to update")
      }

      toast({
        title: "تم الحفظ",
        description: "تم حفظ التغييرات بنجاح",
      })

      setTimeout(() => window.location.reload(), 1500)
    } catch (error) {
      console.error("[v0] Save error:", error)
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الحفظ",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>عنوان القسم</CardTitle>
        <CardDescription>عدّل العنوان الرئيسي والفرعي لقسم الباقات</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">العنوان الرئيسي</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="باقاتنا" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">العنوان الفرعي</Label>
          <Input
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="اختر الباقة المناسبة لك"
          />
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          <Save className="ml-2 h-4 w-4" />
          {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </CardContent>
    </Card>
  )
}
