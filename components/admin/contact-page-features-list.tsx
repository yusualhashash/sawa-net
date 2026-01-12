"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { ChevronUp, ChevronDown, Pencil, Trash2, Plus, Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface ContactPageFeature {
  id: number
  icon: string
  title: string
  description: string
  sort_order: number
  is_active: boolean
}

interface ContactPageFeaturesListProps {
  features: ContactPageFeature[]
}

export function ContactPageFeaturesList({ features: initialFeatures }: ContactPageFeaturesListProps) {
  const { toast } = useToast()
  const [features, setFeatures] = useState(initialFeatures)
  const [editingFeature, setEditingFeature] = useState<ContactPageFeature | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    description: "",
    is_active: true,
  })

  const handleMove = async (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === features.length - 1)) {
      return
    }

    const newFeatures = [...features]
    const targetIndex = direction === "up" ? index - 1 : index + 1
      ;[newFeatures[index], newFeatures[targetIndex]] = [newFeatures[targetIndex], newFeatures[index]]

    setFeatures(newFeatures)

    try {
      await fetch("/api/admin/contact-page-features/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: newFeatures.map((f, i) => ({ id: f.id, sort_order: i + 1 })),
        }),
      })

      toast({
        title: "تم التحديث",
        description: "تم تحديث ترتيب المميزات بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحديث الترتيب",
        variant: "destructive",
      })
      setFeatures(initialFeatures)
    }
  }

  const handleEdit = (feature: ContactPageFeature) => {
    setEditingFeature(feature)
    setFormData({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      is_active: feature.is_active,
    })
    setIsEditOpen(true)
  }

  const handleUpdate = async () => {
    if (!editingFeature) return
    setLoading(true)

    try {
      const response = await fetch("/api/admin/contact-page-features/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingFeature.id,
          ...formData,
        }),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم التحديث",
        description: "تم تحديث الميزة بنجاح",
      })

      setIsEditOpen(false)
      window.location.reload()
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحديث الميزة",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/admin/contact-page-features/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sort_order: features.length + 1,
        }),
      })

      if (!response.ok) throw new Error("Failed to create")

      toast({
        title: "تم الإضافة",
        description: "تم إضافة الميزة بنجاح",
      })

      setIsCreateOpen(false)
      setFormData({ icon: "", title: "", description: "", is_active: true })
      window.location.reload()
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل إضافة الميزة",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الميزة؟")) return

    try {
      const response = await fetch("/api/admin/contact-page-features/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "تم الحذف",
        description: "تم حذف الميزة بنجاح",
      })

      window.location.reload()
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل حذف الميزة",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">قائمة المميزات</h3>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              إضافة ميزة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة ميزة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>الأيقونة</Label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="headphones"
                />
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="دعم 24/7"
                />
              </div>
              <div className="space-y-2">
                <Label>الوصف</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="فريق الدعم متاح على مدار الساعة"
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>نشط</Label>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsCreateOpen(false)} variant="outline">
                إلغاء
              </Button>
              <Button onClick={handleCreate} disabled={loading}>
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                حفظ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">

        {features.map((feature, index) => (

          <Card key={feature.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <Button size="sm" variant="outline" onClick={() => handleMove(index, "up")} disabled={index === 0}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMove(index, "down")}
                  disabled={index === features.length - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-base">
                    {feature.title} ({feature.icon})
                  </h4>
                  {!feature.is_active && (
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">غير نشط</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(feature)}>
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button size="sm" variant="destructive" onClick={() => handleDelete(feature.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>تعديل الميزة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>الأيقونة</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="headphones"
              />
            </div>
            <div className="space-y-2">
              <Label>العنوان</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="دعم 24/7"
              />
            </div>
            <div className="space-y-2">
              <Label>الوصف</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="فريق الدعم متاح على مدار الساعة"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>نشط</Label>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsEditOpen(false)} variant="outline">
              إلغاء
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
