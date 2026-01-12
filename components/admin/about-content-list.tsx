"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ChevronUp, ChevronDown, Edit2, Trash2, Plus, Save, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AboutContent {
  id: number
  title: string
  description: string
  icon: string
  sort_order: number
  is_active: boolean
}

/* ✅ renamed prop to content */
interface AboutContentListProps {
  content: AboutContent[]
}


export function AboutContentList({ content: initialContent }: AboutContentListProps) {
  const [content, setContent] = useState(initialContent)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    icon: "building",
    is_active: true,
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const iconOptions = [
    { value: "building", label: "مبنى (شركة)" },
    { value: "target", label: "هدف (رؤية)" },
    { value: "trophy", label: "كأس (إنجاز)" },
    { value: "users", label: "مستخدمون (فريق)" },
    { value: "lightbulb", label: "مصباح (أفكار)" },
    { value: "award", label: "جائزة (تميز)" },
  ]

  const startEdit = (item: AboutContent) => {
    setEditingId(item.id)
    setEditForm({
      title: item.title,
      description: item.description,
      icon: item.icon,
      is_active: item.is_active,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setShowAddForm(false)
    setEditForm({ title: "", description: "", icon: "building", is_active: true })
  }

  const handleSave = async (id?: number) => {
    if (!editForm.title || !editForm.description) {
      toast({
        title: "خطأ",
        description: "جميع الحقول مطلوبة",
        variant: "destructive",
      })
      return
    }

    try {
      if (id) {
        const response = await fetch("/api/admin/about/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ...editForm }),
        })
        if (!response.ok) throw new Error("Failed to update")
        toast({ title: "تم الحفظ بنجاح", description: "تم تحديث المحتوى" })
      } else {
        const maxSort = Math.max(...content.map((c) => c.sort_order), 0)
        const response = await fetch("/api/admin/about/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editForm, sort_order: maxSort + 1 }),
        })
        if (!response.ok) throw new Error("Failed to create")
        toast({ title: "تم الحفظ بنجاح", description: "تم إضافة محتوى جديد" })
      }

      setTimeout(() => {
        router.refresh()
        cancelEdit()
      }, 1000)
    } catch {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الحفظ",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المحتوى؟")) return

    try {
      const response = await fetch("/api/admin/about/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!response.ok) throw new Error("Failed to delete")

      toast({ title: "تم الحذف بنجاح", description: "تم حذف المحتوى" })
      setTimeout(() => router.refresh(), 1000)
    } catch {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الحذف",
        variant: "destructive",
      })
    }
  }

  const handleReorder = async (id: number, direction: "up" | "down") => {
    const index = content.findIndex((item) => item.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === content.length - 1)) return

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newContent = [...content]
      ;[newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]]
    setContent(newContent)

    try {
      await Promise.all([
        fetch("/api/admin/about/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: newContent[index].id, sort_order: index + 1 }),
        }),
        fetch("/api/admin/about/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: newContent[newIndex].id, sort_order: newIndex + 1 }),
        }),
      ])

      toast({ title: "تم التحديث", description: "تم تغيير الترتيب" })
    } catch {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تغيير الترتيب",
        variant: "destructive",
      })
      setContent(content)
    }
  }
  return (
    <div className="space-y-6">
      {/* Add New Button */}
      <Button onClick={() => setShowAddForm(true)} variant="outline" className="w-full">
        <Plus className="w-4 h-4 ml-2" />
        إضافة محتوى جديد
      </Button>

      {/* Add Form */}
      {showAddForm && (
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-bold mb-4">محتوى جديد</h3>
          <div className="space-y-4">
            <div>
              <Label>العنوان</Label>
              <Input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
            </div>
            <div>
              <Label>الوصف</Label>
              <Textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={4}
              />
            </div>
            <div>
              <Label>الأيقونة</Label>
              <select
                value={editForm.icon}
                onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Label>تفعيل المحتوى</Label>
              <Switch
                checked={editForm.is_active}
                onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleSave()} className="flex-1 bg-black hover:bg-gray-800">
                <Save className="w-4 h-4 ml-2" />
                حفظ
              </Button>
              <Button onClick={cancelEdit} variant="outline" className="flex-1 bg-transparent">
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content List */}
      {content.map((item, index) => (
        <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
          {editingId === item.id ? (
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <Label>العنوان</Label>
                  <Input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                </div>
                <div>
                  <Label>الوصف</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>الأيقونة</Label>
                  <select
                    value={editForm.icon}
                    onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Label>تفعيل المحتوى</Label>
                  <Switch
                    checked={editForm.is_active}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleSave(item.id)} className="flex-1 bg-black hover:bg-gray-800">
                    <Save className="w-4 h-4 ml-2" />
                    حفظ
                  </Button>
                  <Button onClick={cancelEdit} variant="outline" className="flex-1 bg-transparent">
                    <X className="w-4 h-4 ml-2" />
                    إلغاء
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex gap-4 p-6">
                {/* Reorder buttons */}
                <div className="flex flex-col gap-0.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-transparent"
                    onClick={() => handleReorder(item.id, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-transparent"
                    onClick={() => handleReorder(item.id, "down")}
                    disabled={index === content.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${item.is_active ? "text-green-600" : "text-gray-400"}`}>
                        {item.is_active ? "مفعل" : "غير مفعل"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-sm text-gray-500">
                    الأيقونة: {iconOptions.find((opt) => opt.value === item.icon)?.label || item.icon}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="border-t p-4 bg-gray-50 flex gap-2">
                <Button onClick={() => startEdit(item)} variant="outline" className="flex-1">
                  <Edit2 className="w-4 h-4 ml-2" />
                  تعديل
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="outline"
                  className="flex-1 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 ml-2" />
                  حذف
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
