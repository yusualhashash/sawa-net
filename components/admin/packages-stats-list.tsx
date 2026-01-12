"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUp, ArrowDown, Edit, Trash2, Plus, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { PackagesStat } from "@/lib/content"

interface PackagesStatsListProps {
  stats: PackagesStat[]
}

const iconOptions = [
  { value: "users", label: "Users (مستخدمين)" },
  { value: "zap", label: "Zap (برق)" },
  { value: "trending-up", label: "Trending Up (اتجاه صاعد)" },
  { value: "headphones", label: "Headphones (سماعات)" },
  { value: "wifi", label: "WiFi" },
  { value: "shield", label: "Shield (درع)" },
]

export function PackagesStatsList({ stats: initialStats }: PackagesStatsListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [stats, setStats] = useState(initialStats)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editForm, setEditForm] = useState({
    icon: "",
    value: "",
    label: "",
    is_active: true,
  })

  const startEdit = (stat: PackagesStat) => {
    setEditingId(stat.id)
    setEditForm({
      icon: stat.icon,
      value: stat.value,
      label: stat.label,
      is_active: stat.is_active,
    })
    setIsAddingNew(false)
  }

  const startAddNew = () => {
    setIsAddingNew(true)
    setEditingId(null)
    setEditForm({
      icon: "users",
      value: "",
      label: "",
      is_active: true,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAddingNew(false)
  }

  const handleSave = async (id?: number) => {
    setIsSaving(true)
    try {
      if (!editForm.value || !editForm.label) {
        toast({
          title: "حقول مطلوبة",
          description: "يرجى ملء جميع الحقول",
          variant: "destructive",
        })
        return
      }

      if (isAddingNew) {
        const response = await fetch("/api/admin/packages-stats/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editForm,
            sort_order: stats.length + 1,
          }),
        })

        if (!response.ok) throw new Error("Failed to create")

        toast({
          title: "تمت الإضافة",
          description: "تمت إضافة الإحصائية بنجاح",
        })
      } else if (id) {
        const response = await fetch("/api/admin/packages-stats/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ...editForm }),
        })

        if (!response.ok) throw new Error("Failed to update")

        toast({
          title: "تم الحفظ",
          description: "تم حفظ التغييرات بنجاح",
        })
      }

      setEditingId(null)
      setIsAddingNew(false)
      router.refresh()
    } catch (error) {
      console.error("Error saving:", error)
      toast({
        title: "حدث خطأ",
        description: "فشل في حفظ التغييرات",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const deleteStat = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الإحصائية؟")) return

    try {
      const response = await fetch("/api/admin/packages-stats/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "تم الحذف",
        description: "تم حذف الإحصائية بنجاح",
      })

      router.refresh()
    } catch (error) {
      console.error("Error deleting:", error)
      toast({
        title: "حدث خطأ",
        description: "فشل في حذف الإحصائية",
        variant: "destructive",
      })
    }
  }

  const moveStat = async (id: number, direction: "up" | "down") => {
    const index = stats.findIndex((s) => s.id === id)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === stats.length - 1) return

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newStats = [...stats]
    ;[newStats[index], newStats[newIndex]] = [newStats[newIndex], newStats[index]]

    setStats(newStats)

    try {
      await fetch("/api/admin/packages-stats/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newStats[index].id,
          sort_order: index + 1,
        }),
      })

      await fetch("/api/admin/packages-stats/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newStats[newIndex].id,
          sort_order: newIndex + 1,
        }),
      })

      toast({
        title: "تم إعادة الترتيب",
        description: "تم تحديث ترتيب الإحصائيات بنجاح",
      })

      router.refresh()
    } catch (error) {
      console.error("Error reordering:", error)
      setStats(stats)
      toast({
        title: "حدث خطأ",
        description: "فشل في إعادة الترتيب",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={startAddNew} className="w-full bg-transparent" variant="outline">
        <Plus className="w-4 h-4 ml-2" />
        إضافة إحصائية جديدة
      </Button>

      {isAddingNew && (
        <div className="border rounded-lg p-4 space-y-4 bg-white">
          <h3 className="font-semibold text-lg">إحصائية جديدة</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="new-icon">الأيقونة</Label>
              <Select value={editForm.icon} onValueChange={(value) => setEditForm({ ...editForm, icon: value })}>
                <SelectTrigger className="text-right">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="new-value">القيمة</Label>
              <Input
                id="new-value"
                value={editForm.value}
                onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                className="text-right"
                placeholder="24/7 أو 100 Mbps"
              />
            </div>

            <div>
              <Label htmlFor="new-label">التسمية</Label>
              <Input
                id="new-label"
                value={editForm.label}
                onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                className="text-right"
                placeholder="دعم فني"
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="new-active"
                checked={editForm.is_active}
                onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
              />
              <Label htmlFor="new-active">تفعيل</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => handleSave()} className="flex-1" disabled={isSaving}>
              <Save className="w-4 h-4 ml-2" />
              {isSaving ? "جاري الحفظ..." : "حفظ"}
            </Button>
            <Button onClick={cancelEdit} variant="outline" disabled={isSaving}>
              <X className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
          </div>
        </div>
      )}

      {stats.map((stat, index) => (
        <div key={stat.id} className="border rounded-lg p-4 space-y-4 bg-white">
          {editingId === stat.id ? (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`icon-${stat.id}`}>الأيقونة</Label>
                  <Select value={editForm.icon} onValueChange={(value) => setEditForm({ ...editForm, icon: value })}>
                    <SelectTrigger className="text-right">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={`value-${stat.id}`}>القيمة</Label>
                  <Input
                    id={`value-${stat.id}`}
                    value={editForm.value}
                    onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                    className="text-right"
                  />
                </div>

                <div>
                  <Label htmlFor={`label-${stat.id}`}>التسمية</Label>
                  <Input
                    id={`label-${stat.id}`}
                    value={editForm.label}
                    onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                    className="text-right"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id={`active-${stat.id}`}
                    checked={editForm.is_active}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
                  />
                  <Label htmlFor={`active-${stat.id}`}>تفعيل</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave(stat.id)} className="flex-1" disabled={isSaving}>
                  <Save className="w-4 h-4 ml-2" />
                  {isSaving ? "جاري الحفظ..." : "حفظ"}
                </Button>
                <Button onClick={cancelEdit} variant="outline" disabled={isSaving}>
                  <X className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{stat.value}</h3>
                    {!stat.is_active && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">معطل</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-gray-400 text-xs mt-1">أيقونة: {stat.icon}</p>
                </div>

                <div className="flex flex-col gap-0.5">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => moveStat(stat.id, "up")}
                    disabled={index === 0}
                    className="h-8 w-8"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => moveStat(stat.id, "down")}
                    disabled={index === stats.length - 1}
                    className="h-8 w-8"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button onClick={() => startEdit(stat)} variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 ml-2" />
                  تعديل
                </Button>
                <Button onClick={() => deleteStat(stat.id)} variant="outline" className="flex-1 text-red-600">
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
