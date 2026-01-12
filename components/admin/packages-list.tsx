"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { Package } from "@/lib/content"
import { ChevronUp, ChevronDown, Pencil, Trash2, Plus, Save, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface PackagesListProps {
  packages: Package[]
}

export function PackagesList({ packages: initialPackages }: PackagesListProps) {
  const [packages, setPackages] = useState(initialPackages)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    price: "",
    currency: "IQD",
    features: "",
    is_featured: false,
    is_active: true,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      speed: "",
      price: "",
      currency: "IQD",
      features: "",
      is_featured: false,
      is_active: true,
    })
  }

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg.id)
    const features = JSON.parse(pkg.features) as string[]
    setFormData({
      name: pkg.name,
      speed: pkg.speed,
      price: pkg.price.toString(),
      currency: pkg.currency,
      features: features.join("\n"),
      is_featured: pkg.is_featured,
      is_active: pkg.is_active,
    })
  }

  const handleSave = async (id: number) => {
    if (!formData.name.trim() || !formData.speed.trim() || !formData.price.trim() || !formData.features.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    const featuresArray = formData.features
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0)

    setIsSaving(true)

    try {
      const response = await fetch("/api/admin/packages/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: formData.name,
          speed: formData.speed,
          price: Number.parseFloat(formData.price),
          currency: formData.currency,
          features: JSON.stringify(featuresArray),
          is_featured: formData.is_featured,
          is_active: formData.is_active,
        }),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم الحفظ",
        description: "تم تحديث الباقة بنجاح",
      })

      setTimeout(() => window.location.reload(), 1500)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الحفظ",
        variant: "destructive",
      })
      setIsSaving(false)
    }
  }

  const handleCreate = async () => {
    if (!formData.name.trim() || !formData.speed.trim() || !formData.price.trim() || !formData.features.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    const featuresArray = formData.features
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0)

    setIsCreating(true)

    try {
      const response = await fetch("/api/admin/packages/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          speed: formData.speed,
          price: Number.parseFloat(formData.price),
          currency: formData.currency,
          features: JSON.stringify(featuresArray),
          is_featured: formData.is_featured,
          sort_order: packages.length + 1,
        }),
      })

      if (!response.ok) throw new Error("Failed to create")

      toast({
        title: "تم الإضافة",
        description: "تم إضافة الباقة بنجاح",
      })

      setTimeout(() => window.location.reload(), 1500)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الإضافة",
        variant: "destructive",
      })
      setIsCreating(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الباقة?")) return

    setIsDeleting(true)

    try {
      const response = await fetch("/api/admin/packages/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "تم الحذف",
        description: "تم حذف الباقة بنجاح",
      })

      setTimeout(() => window.location.reload(), 1500)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الحذف",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  const handleReorder = async (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === packages.length - 1)) return

    const newPackages = [...packages]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    ;[newPackages[index], newPackages[targetIndex]] = [newPackages[targetIndex], newPackages[index]]

    setPackages(newPackages)

    try {
      await fetch("/api/admin/packages/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id1: newPackages[index].id,
          sortOrder1: index + 1,
          id2: newPackages[targetIndex].id,
          sortOrder2: targetIndex + 1,
        }),
      })

      toast({
        title: "تم التحديث",
        description: "تم تغيير ترتيب الباقات",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إعادة الترتيب",
        variant: "destructive",
      })
      setPackages(initialPackages)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">قائمة الباقات</h2>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "outline" : "default"}>
          {isAdding ? <X className="ml-2 h-4 w-4" /> : <Plus className="ml-2 h-4 w-4" />}
          {isAdding ? "إلغاء" : "إضافة باقة جديدة"}
        </Button>
      </div>

      {isAdding && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>باقة جديدة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>اسم الباقة</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>السرعة</Label>
                <Input
                  value={formData.speed}
                  onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                  placeholder="10 Mbps"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>السعر</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>العملة</Label>
                <Input
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  placeholder="IQD"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>المميزات (كل ميزة في سطر)</Label>
              <Textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={5}
                placeholder="إنترنت عالي السرعة&#10;دعم فني 24/7&#10;بدون حد للاستخدام"
              />
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="new-featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
              />
              <Label htmlFor="new-featured">باقة مميزة (الأكثر شعبية)</Label>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button onClick={handleCreate} className="flex-1" disabled={isCreating}>
              <Save className="ml-2 h-4 w-4" />
              {isCreating ? "جاري الحفظ..." : "حفظ"}
            </Button>
            <Button
              onClick={() => {
                setIsAdding(false)
                resetForm()
              }}
              variant="outline"
              className="flex-1"
              disabled={isCreating}
            >
              <X className="ml-2 h-4 w-4" />
              إلغاء
            </Button>
          </CardFooter>
        </Card>
      )}

      {packages.map((pkg, index) => {
        const isEditing = editingId === pkg.id
        const features = JSON.parse(pkg.features) as string[]

        return (
          <Card key={pkg.id} className={!pkg.is_active ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>اسم الباقة</Label>
                          <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>السرعة</Label>
                          <Input
                            value={formData.speed}
                            onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>السعر</Label>
                          <Input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>العملة</Label>
                          <Input
                            value={formData.currency}
                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>المميزات (كل ميزة في سطر)</Label>
                        <Textarea
                          value={formData.features}
                          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                          rows={5}
                        />
                      </div>

                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={`featured-${pkg.id}`}
                            checked={formData.is_featured}
                            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
                          />
                          <Label htmlFor={`featured-${pkg.id}`}>باقة مميزة</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={`active-${pkg.id}`}
                            checked={formData.is_active}
                            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
                          />
                          <Label htmlFor={`active-${pkg.id}`}>مفعّل</Label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {pkg.name}
                        {pkg.is_featured && (
                          <span className="mr-2 text-sm bg-primary text-white px-2 py-1 rounded">الأكثر شعبية</span>
                        )}
                      </CardTitle>
                      <p className="text-xl text-primary font-bold">{pkg.speed}</p>
                      <p className="text-2xl font-bold mt-2">
                        {pkg.price.toLocaleString()} {pkg.currency}
                        <span className="text-sm text-gray-500 mr-1">/ شهرياً</span>
                      </p>
                      <ul className="mt-4 space-y-2">
                        {features.map((feature, idx) => (
                          <li key={idx} className="text-gray-700">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-0.5">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => handleReorder(index, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => handleReorder(index, "down")}
                    disabled={index === packages.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardFooter className="gap-2">
              {isEditing ? (
                <>
                  <Button onClick={() => handleSave(pkg.id)} className="flex-1" disabled={isSaving}>
                    <Save className="ml-2 h-4 w-4" />
                    {isSaving ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingId(null)
                      resetForm()
                    }}
                    variant="outline"
                    className="flex-1"
                    disabled={isSaving}
                  >
                    <X className="ml-2 h-4 w-4" />
                    إلغاء
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleDelete(pkg.id)}
                    variant="destructive"
                    className="flex-1"
                    disabled={isDeleting}
                  >
                    <Trash2 className="ml-2 h-4 w-4" />
                    {isDeleting ? "جاري الحذف..." : "حذف"}
                  </Button>
                  <Button onClick={() => handleEdit(pkg)} variant="outline" className="flex-1">
                    <Pencil className="ml-2 h-4 w-4" />
                    تعديل
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
