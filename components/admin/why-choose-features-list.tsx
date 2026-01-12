"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Save, X, ArrowUp, ArrowDown } from "lucide-react"
import type { WhyChooseFeature } from "@/lib/content"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface WhyChooseFeaturesListProps {
  initialFeatures: WhyChooseFeature[]
}

export function WhyChooseFeaturesList({ initialFeatures }: WhyChooseFeaturesListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [features, setFeatures] = useState(initialFeatures)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({ icon: "", title: "", description: "", is_active: true })

  const handleEdit = (feature: WhyChooseFeature) => {
    setEditingId(feature.id)
    setFormData({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      is_active: feature.is_active,
    })
    setIsCreating(false)
  }

  const handleSave = async (id: number) => {
    try {
      if (!formData.title || !formData.description || !formData.icon) {
        toast({
          title: "حقول مطلوبة",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/admin/why-choose/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...formData }),
      })

      if (!response.ok) {
        toast({
          title: "فشل التحديث",
          description: "فشل في تحديث الميزة. حاول مرة أخرى",
          variant: "destructive",
        })
        return
      }

      setFeatures(features.map((f) => (f.id === id ? { ...f, ...formData, updated_at: new Date() } : f)))
      setEditingId(null)

      toast({
        title: "تم الحفظ",
        description: "تم حفظ التغييرات بنجاح",
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating feature:", error)
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء الحفظ. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      })
    }
  }

  const handleCreate = async () => {
    try {
      if (!formData.title || !formData.description || !formData.icon) {
        toast({
          title: "حقول مطلوبة",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/admin/why-choose/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, sort_order: features.length }),
      })

      if (!response.ok) {
        toast({
          title: "فشل الإنشاء",
          description: "فشل في إنشاء الميزة. حاول مرة أخرى",
          variant: "destructive",
        })
        return
      }

      const newFeature = await response.json()
      setFeatures([...features, newFeature])
      setIsCreating(false)
      setFormData({ icon: "", title: "", description: "", is_active: true })

      toast({
        title: "تمت الإضافة",
        description: "تمت إضافة الميزة الجديدة بنجاح",
      })

      router.refresh()
    } catch (error) {
      console.error("Error creating feature:", error)
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء الإضافة. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الميزة؟")) return

    try {
      const response = await fetch("/api/admin/why-choose/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        toast({
          title: "فشل الحذف",
          description: "فشل في حذف الميزة. حاول مرة أخرى",
          variant: "destructive",
        })
        return
      }

      setFeatures(features.filter((f) => f.id !== id))

      toast({
        title: "تم الحذف",
        description: "تم حذف الميزة بنجاح",
      })

      router.refresh()
    } catch (error) {
      console.error("Error deleting feature:", error)
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      })
    }
  }

  const moveFeature = async (id: number, direction: "up" | "down") => {
    const index = features.findIndex((f) => f.id === id)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === features.length - 1) return

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newFeatures = [...features]
    ;[newFeatures[index], newFeatures[newIndex]] = [newFeatures[newIndex], newFeatures[index]]

    setFeatures(newFeatures)

    try {
      const reorderedFeatures = newFeatures.map((f, idx) => ({
        id: f.id,
        sort_order: idx,
      }))

      const response = await fetch("/api/admin/why-choose/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: reorderedFeatures }),
      })

      if (!response.ok) {
        setFeatures(features)
        toast({
          title: "فشل إعادة الترتيب",
          description: "حدث خطأ أثناء إعادة الترتيب",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "تم إعادة الترتيب",
        description: "تم تحديث ترتيب المميزات بنجاح",
      })

      router.refresh()
    } catch (error) {
      console.error("Error reordering features:", error)
      setFeatures(features)
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء إعادة الترتيب. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">قائمة المميزات</h3>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة ميزة جديدة
        </Button>
      </div>

      {isCreating && (
        <Card className="border-2 border-emerald-500">
          <CardContent className="p-6 space-y-4">
            <div className="grid gap-4">
              <div>
                <Label>الأيقونة</Label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="wifi, shield, headphones, zap, trending-up, check"
                />
                <p className="text-xs text-gray-500 mt-1">
                  الأيقونات المتاحة: wifi, shield, headphones, zap, trending-up, check, users
                </p>
              </div>
              <div>
                <Label>العنوان</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <Label>الوصف</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>نشط</Label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate} className="gap-2">
                <Save className="w-4 h-4" />
                حفظ
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false)
                  setFormData({ icon: "", title: "", description: "", is_active: true })
                }}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {features.map((feature, index) => (
          <Card key={feature.id}>
            <CardContent className="p-6">
              {editingId === feature.id ? (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label>الأيقونة</Label>
                      <Input
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>العنوان</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>الوصف</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={formData.is_active}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                      />
                      <Label>نشط</Label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(feature.id)} className="gap-2">
                      <Save className="w-4 h-4" />
                      حفظ
                    </Button>
                    <Button variant="outline" onClick={() => setEditingId(null)} className="gap-2">
                      <X className="w-4 h-4" />
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-0.5">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => moveFeature(feature.id, "up")}
                      disabled={index === 0}
                      className="h-8 w-8"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => moveFeature(feature.id, "down")}
                      disabled={index === features.length - 1}
                      className="h-8 w-8"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg">{feature.title}</h4>
                          <span className="text-xs text-gray-500">({feature.icon})</span>
                          {!feature.is_active && <span className="text-xs bg-gray-200 px-2 py-1 rounded">غير نشط</span>}
                        </div>
                        <p className="text-gray-600 mt-2">{feature.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(feature)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(feature.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
