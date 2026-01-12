"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Trash2, Edit, Plus, ArrowUp, ArrowDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { AboutPageStat } from "@/lib/content"

interface AboutPageStatsListProps {
  stats: AboutPageStat[]
}

export function AboutPageStatsList({ stats: initialStats }: AboutPageStatsListProps) {
  const { toast } = useToast()
  const [stats, setStats] = useState(initialStats)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    icon: "",
    value: "",
    label: "",
    is_active: true,
  })

  const handleEdit = (stat: AboutPageStat) => {
    setEditingId(stat.id)
    setFormData({
      icon: stat.icon,
      value: stat.value,
      label: stat.label,
      is_active: stat.is_active,
    })
    setIsAdding(false)
  }

  const handleSave = async () => {
    if (!formData.icon || !formData.value || !formData.label) {
      toast({
        title: "خطأ",
        description: "جميع الحقول مطلوبة",
        variant: "destructive",
      })
      return
    }

    try {
      if (editingId) {
        const response = await fetch("/api/admin/about-page-stats/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...formData }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.details || errorData.error || "Failed to update")
        }
      } else {
        const maxOrder = Math.max(...stats.map((s) => s.sort_order), 0)
        const response = await fetch("/api/admin/about-page-stats/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, sort_order: maxOrder + 1 }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.details || errorData.error || "Failed to create")
        }
      }

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث الإحصائية",
      })

      setTimeout(() => window.location.reload(), 500)
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل حفظ التغييرات",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الإحصائية؟")) {
      return
    }

    try {
      const response = await fetch("/api/admin/about-page-stats/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete")
      }

      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الإحصائية",
      })

      setTimeout(() => window.location.reload(), 500)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل حذف الإحصائية",
        variant: "destructive",
      })
    }
  }

  const handleMove = async (id: number, direction: "up" | "down") => {
    const currentIndex = stats.findIndex((s) => s.id === id)

    if ((direction === "up" && currentIndex === 0) || (direction === "down" && currentIndex === stats.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    const newStats = [...stats]
    ;[newStats[currentIndex], newStats[newIndex]] = [newStats[newIndex], newStats[currentIndex]]

    try {
      const response = await fetch("/api/admin/about-page-stats/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updates: newStats.map((stat, index) => ({
            id: stat.id,
            sort_order: index,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to reorder")
      }

      setStats(newStats)
      toast({
        title: "تم التحديث",
        description: "تم تغيير ترتيب الإحصائيات",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تغيير الترتيب",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({ icon: "", value: "", label: "", is_active: true })
  }

  return (
    <div className="space-y-4">
      {!isAdding && !editingId && (
        <Button
          onClick={() => {
            setIsAdding(true)
            setFormData({ icon: "", value: "", label: "", is_active: true })
          }}
        >
          <Plus className="ml-2 h-4 w-4" />
          إضافة إحصائية جديدة
        </Button>
      )}

      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg p-6 border space-y-4">
          <h3 className="text-lg font-semibold">{isAdding ? "إضافة إحصائية جديدة" : "تعديل الإحصائية"}</h3>

          <div>
            <Label htmlFor="icon">الأيقونة</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="users, globe, award, clock"
              required
            />
          </div>

          <div>
            <Label htmlFor="value">القيمة</Label>
            <Input
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="+10000"
              required
            />
          </div>

          <div>
            <Label htmlFor="label">النص</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="عميل راضٍ"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label htmlFor="is_active">نشط</Label>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              حفظ
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1 bg-transparent">
              إلغاء
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">قائمة الإحصائيات</h3>
        {stats.map((stat, index) => (
          <div key={stat.id} className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-4">
              <div className="flex-1 text-right">
                <span className="font-semibold text-2xl p-2">{stat.value}</span>
                <span className="text-sm text-gray-500">({stat.icon})</span>
                <p className="text-gray-600">{stat.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMove(stat.id, "down")}
                  disabled={index === stats.length - 1}
                  className="shrink-0"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMove(stat.id, "up")}
                  disabled={index === 0}
                  className="shrink-0"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleEdit(stat)} className="shrink-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(stat.id)} className="shrink-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
