"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FooterCopyrightFormProps {
  copyrightId: number
  initialText: string
}

export function FooterCopyrightForm({ copyrightId, initialText }: FooterCopyrightFormProps) {
  const [text, setText] = useState(initialText)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ id: copyrightId, value: text }]),
      })

      if (!response.ok) throw new Error("فشل في الحفظ")

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث نص حقوق النشر بنجاح",
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
        <CardTitle>حقوق النشر</CardTitle>
        <CardDescription>عدل نص حقوق النشر في الفوتر</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="copyright">النص</Label>
          <Input
            id="copyright"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="© 2025 راشد واي فاي. جميع الحقوق محفوظة."
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
