"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { CoverageArea } from "@/lib/content"
import { Trash2, Edit, ArrowUp, ArrowDown, Plus } from "lucide-react"

export default function CoverageAreasForm({ areas }: { areas: CoverageArea[] }) {
  const [items, setItems] = useState(areas)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<CoverageArea>>({
    name: "",
    status: "available",
    tower_count: 1,
    icon: "map-pin",
  })
  const { toast } = useToast()

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/admin/coverage-areas/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to create")

      toast({ title: "تم الإضافة بنجاح" })
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في إضافة المنطقة", variant: "destructive" })
    }
  }

  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch("/api/admin/coverage-areas/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...formData }),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({ title: "تم التحديث بنجاح" })
      setEditingId(null)
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في تحديث المنطقة", variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه المنطقة؟")) return

    try {
      const response = await fetch("/api/admin/coverage-areas/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({ title: "تم الحذف بنجاح" })
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في حذف المنطقة", variant: "destructive" })
    }
  }

  const handleReorder = async (id: number, direction: "up" | "down") => {
    try {
      const response = await fetch("/api/admin/coverage-areas/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, direction }),
      })

      if (!response.ok) throw new Error("Failed to reorder")

      setTimeout(() => window.location.reload(), 300)
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في إعادة الترتيب", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      {/* Create New */}
      <div className="border rounded-lg p-4 bg-muted/50">
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            setIsCreating(!isCreating)
            setFormData({ name: "", status: "available", tower_count: 1, icon: "map-pin" })
          }}
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة منطقة جديدة
        </Button>

        {isCreating && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>اسم المنطقة</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="منطقة المركز"
              />
            </div>

            <div className="space-y-2">
              <Label>الحالة</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">متاح</SelectItem>
                  <SelectItem value="soon">قريباً</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>عدد الأبراج</Label>
              <Input
                type="number"
                min="0"
                value={formData.tower_count}
                onChange={(e) => setFormData({ ...formData, tower_count: Number.parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreate} className="flex-1">
                إضافة
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)} className="flex-1">
                إلغاء
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Areas List */}
      {items.map((item, index) => (
        <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
          {editingId === item.id ? (
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>اسم المنطقة</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">متاح</SelectItem>
                    <SelectItem value="soon">قريباً</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>عدد الأبراج</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.tower_count}
                  onChange={(e) => setFormData({ ...formData, tower_count: Number.parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleUpdate(item.id)} className="flex-1">
                  حفظ
                </Button>
                <Button variant="outline" onClick={() => setEditingId(null)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.status === "available" ? "متاح" : "قريباً"} - {item.tower_count} أبراج
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleReorder(item.id, "up")}
                  disabled={index === 0}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleReorder(item.id, "down")}
                  disabled={index === items.length - 1}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setEditingId(item.id)
                    setFormData(item)
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4 text-red-700" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
