"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, ArrowUp, ArrowDown } from "lucide-react"

interface ContentItem {
  id: number
  key: string
  value: string
  section: string
  sort_order: number
}

export default function ContentEditForm({ items }: { items: ContentItem[] }) {
  const [content, setContent] = useState(items)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const updateValue = (id: number, newValue: string) => {
    setContent(content.map((item) => (item.id === id ? { ...item, value: newValue } : item)))
  }

  const moveItem = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === content.length - 1)) {
      return
    }

    const newContent = [...content]
    const swapIndex = direction === "up" ? index - 1 : index + 1

    // Swap sort orders
    const tempSort = newContent[index].sort_order
    newContent[index].sort_order = newContent[swapIndex].sort_order
    newContent[swapIndex].sort_order = tempSort

    // Swap positions in array
    ;[newContent[index], newContent[swapIndex]] = [newContent[swapIndex], newContent[index]]

    setContent(newContent)
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      const response = await fetch("/api/admin/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        setMessage("تم حفظ التغييرات بنجاح!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("حدث خطأ أثناء الحفظ")
      }
    } catch (error) {
      setMessage("حدث خطأ أثناء الحفظ")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      {content.map((item, index) => (
        <div key={item.id} className="flex gap-4 items-end border-b pb-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor={`item-${item.id}`} className="text-right block">
              {item.key}
            </Label>
            <Input
              id={`item-${item.id}`}
              value={item.value}
              onChange={(e) => updateValue(item.id, e.target.value)}
              className="text-right"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => moveItem(index, "up")}
              disabled={index === 0}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => moveItem(index, "down")}
              disabled={index === content.length - 1}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 pt-4">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="ml-2 h-4 w-4" />
          {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
        {message && <p className="text-sm text-green-600">{message}</p>}
      </div>
    </div>
  )
}
