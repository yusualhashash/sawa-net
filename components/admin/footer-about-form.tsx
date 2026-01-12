"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FooterAboutFormProps {
  titleId: number
  descriptionId: number
  initialTitle: string
  initialDescription: string
}

export function FooterAboutForm({ titleId, descriptionId, initialTitle, initialDescription }: FooterAboutFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updates = [
        { id: titleId, value: title },
        { id: descriptionId, value: description },
      ]

      const response = await fetch("/api/admin/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error("فشل في الحفظ")

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث معلومات الفوتر بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ التغييرات",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>معلومات الشركة</CardTitle>
        <CardDescription>عدل اسم الشركة والوصف في الفوتر</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">العنوان</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="راشد واي فاي" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">الوصف</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="نوفر لك أفضل خدمات الإنترنت..."
            rows={3}
          />
        </div>

        <Button onClick={handleSave} className="w-full" disabled={isSaving}>
          <Save className="ml-2 h-4 w-4" />
          {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </CardContent>
    </Card>
  )
}
