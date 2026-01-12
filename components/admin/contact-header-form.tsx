"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContentItem {
  id: number
  key: string
  value: string
}

interface ContactHeaderFormProps {
  header: ContentItem[]
}

export function ContactHeaderForm({ header }: ContactHeaderFormProps) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const titleItem = header.find((item) => item.key === "title")
  const subtitleItem = header.find((item) => item.key === "subtitle")

  const [title, setTitle] = useState(titleItem?.value || "")
  const [subtitle, setSubtitle] = useState(subtitleItem?.value || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const updates = [
        { id: titleItem?.id, value: title, sort_order: 1 },
        { id: subtitleItem?.id, value: subtitle, sort_order: 2 },
      ]

      const response = await fetch("/api/admin/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم الحفظ",
        description: "تم تحديث عنوان القسم بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل حفظ التغييرات",
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
        <CardDescription>عدّل العنوان الرئيسي والفرعي لقسم التواصل</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="p-2">العنوان الرئيسي</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="تواصل معنا" />
          </div>
          <div>
            <Label htmlFor="subtitle" className="p-2">العنوان الفرعي</Label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="نحن هنا لخدمتك"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isSaving}>
              <Save className="ml-2 h-4 w-4" />
              {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </Button>
            <Button type="button" variant="outline" className="flex-1 bg-transparent">
              <X className="ml-2 h-4 w-4" />
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
