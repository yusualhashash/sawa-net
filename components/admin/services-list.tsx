"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ChevronUp, ChevronDown, Plus, Trash2, Edit, Save, X } from "lucide-react"
import type { Service } from "@/lib/content"
import { useToast } from "@/hooks/use-toast"

interface ServicesListProps {
  initialServices: Service[]
}

export function ServicesList({ initialServices }: ServicesListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [services, setServices] = useState(initialServices)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    icon: "",
    is_active: true,
  })
  const [newForm, setNewForm] = useState({
    title: "",
    description: "",
    icon: "wifi",
    is_active: true,
  })

  const iconOptions = [
    { value: "zap", label: "صاعقة (سرعة)" },
    { value: "signal", label: "إشارة (تغطية)" },
    { value: "headphones", label: "سماعات (دعم)" },
    { value: "infinity", label: "لانهاية (غير محدود)" },
    { value: "wifi", label: "واي فاي" },
    { value: "shield", label: "درع (حماية)" },
  ]

  const handleReorder = async (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === services.length - 1)) {
      return
    }

    const newServices = [...services]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newServices[index], newServices[swapIndex]] = [newServices[swapIndex], newServices[index]]
    setServices(newServices)

    try {
      const res = await fetch("/api/admin/services/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id1: newServices[index].id,
          order1: index,
          id2: newServices[swapIndex].id,
          order2: swapIndex,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to reorder")
      }
      toast({
        title: "تم إعادة الترتيب",
        description: "تم تحديث ترتيب الخدمات بنجاح",
      })
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء إعادة الترتيب",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (service: Service) => {
    setEditingId(service.id)
    setEditForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      is_active: service.is_active,
    })
  }

  const handleSave = async (id: number) => {
    if (!editForm.title.trim() || !editForm.description.trim()) {
      toast({
        title: "حقول مطلوبة",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    try {
      const res = await fetch("/api/admin/services/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editForm }),
      })

      if (res.ok) {
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم حفظ التغييرات على الخدمة",
        })
        setEditingId(null)
        setTimeout(() => {
          router.refresh()
        }, 1500)
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء حفظ التغييرات",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return

    try {
      const res = await fetch("/api/admin/services/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (res.ok) {
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف الخدمة بنجاح",
        })
        setTimeout(() => {
          router.refresh()
        }, 1500)
      } else {
        throw new Error("Failed to delete")
      }
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء حذف الخدمة",
        variant: "destructive",
      })
    }
  }

  const handleAddNew = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newForm.title.trim() || !newForm.description.trim()) {
      toast({
        title: "حقول مطلوبة",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    try {
      const res = await fetch("/api/admin/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newForm, sort_order: services.length }),
      })

      if (res.ok) {
        toast({
          title: "تمت الإضافة بنجاح",
          description: "تمت إضافة الخدمة الجديدة",
        })
        setIsAdding(false)
        setNewForm({ title: "", description: "", icon: "wifi", is_active: true })
        setTimeout(() => {
          router.refresh()
        }, 1500)
      } else {
        throw new Error("Failed to create")
      }
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء إضافة الخدمة",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Add New Button */}
      <Button onClick={() => setIsAdding(!isAdding)} variant="outline" className="w-full">
        <Plus className="ml-2 h-4 w-4" />
        إضافة خدمة جديدة
      </Button>

      {/* Add New Form */}
      {isAdding && (
        <form onSubmit={handleAddNew} className="p-6 border rounded-lg bg-gray-50 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-title">عنوان الخدمة</Label>
            <Input
              id="new-title"
              value={newForm.title}
              onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
              placeholder="سرعة فائقة"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-description">الوصف</Label>
            <Textarea
              id="new-description"
              value={newForm.description}
              onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
              placeholder="استمتع بسرعات إنترنت تصل إلى 1000 ميجابت في الثانية"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-icon">الأيقونة</Label>
            <select
              id="new-icon"
              value={newForm.icon}
              onChange={(e) => setNewForm({ ...newForm, icon: e.target.value })}
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
            <Switch
              id="new-active"
              checked={newForm.is_active}
              onCheckedChange={(checked) => setNewForm({ ...newForm, is_active: checked })}
            />
            <Label htmlFor="new-active">تفعيل الخدمة</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <Save className="ml-2 h-4 w-4" />
              حفظ
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => {
                setIsAdding(false)
                setNewForm({ title: "", description: "", icon: "wifi", is_active: true })
              }}
            >
              <X className="ml-2 h-4 w-4" />
              إلغاء
            </Button>
          </div>
        </form>
      )}

      {/* Services List */}
      {services.map((service, index) => (
        <div key={service.id} className="border rounded-lg overflow-hidden">
          {/* Service Header */}
          <div className="bg-gray-50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReorder(index, "up")}
                  disabled={index === 0}
                  className="h-8 w-8 hover:bg-gray-200"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReorder(index, "down")}
                  disabled={index === services.length - 1}
                  className="h-8 w-8 hover:bg-gray-200"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          </div>

          {/* Edit Form or Action Buttons */}
          {editingId === service.id ? (
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>عنوان الخدمة</Label>
                <Input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>الوصف</Label>
                <Textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
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
                <Switch
                  checked={editForm.is_active}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
                />
                <Label>تفعيل الخدمة</Label>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={() => handleSave(service.id)} className="flex-1">
                  <Save className="ml-2 h-4 w-4" />
                  حفظ التغييرات
                </Button>
                <Button variant="outline" onClick={() => setEditingId(null)} className="flex-1">
                  <X className="ml-2 h-4 w-4" />
                  إلغاء
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 flex gap-2">
              <Button variant="outline" onClick={() => handleEdit(service)} className="flex-1">
                <Edit className="ml-2 h-4 w-4" />
                تعديل
              </Button>
              <Button variant="outline" onClick={() => handleDelete(service.id)} className="flex-1">
                <Trash2 className="ml-2 h-4 w-4" />
                حذف
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
