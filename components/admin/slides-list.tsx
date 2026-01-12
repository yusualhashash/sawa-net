"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUp, ArrowDown, Edit, Trash2, Plus, Save, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import type { HeroSlide } from "@/lib/content"

interface SlidesListProps {
  slides: HeroSlide[]
}

export function SlidesList({ slides: initialSlides }: SlidesListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [slides, setSlides] = useState(initialSlides)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editForm, setEditForm] = useState({
    title: "",
    subtitle: "",
    button_text: "",
    button_link: "",
    image_url: "",
    is_active: true,
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "خطأ في الملف",
        description: "يرجى اختيار ملف صورة",
        variant: "destructive",
      })
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "حجم كبير",
        description: "حجم الصورة يجب أن يكون أقل من 2 ميجابايت",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setEditForm({ ...editForm, image_url: base64String })
    }
    reader.readAsDataURL(file)
  }

  const startEdit = (slide: HeroSlide) => {
    setEditingId(slide.id)
    setEditForm({
      title: slide.title,
      subtitle: slide.subtitle,
      button_text: slide.button_text,
      button_link: slide.button_link || "",
      image_url: slide.image_url,
      is_active: slide.is_active,
    })
    setIsAddingNew(false)
  }

  const startAddNew = () => {
    setIsAddingNew(true)
    setEditingId(null)
    setEditForm({
      title: "",
      subtitle: "",
      button_text: "",
      button_link: "",
      image_url: "",
      is_active: true,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAddingNew(false)
  }

  const saveSlide = async () => {
    try {
      if (!editForm.title || !editForm.subtitle || !editForm.button_text) {
        toast({
          title: "حقول مطلوبة",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        })
        return
      }

      if (isAddingNew) {
        const response = await fetch("/api/admin/slides/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editForm,
            sort_order: slides.length + 1,
          }),
        })

        if (!response.ok) {
          toast({
            title: "فشل الإنشاء",
            description: "فشل في إنشاء الشريحة. حاول مرة أخرى",
            variant: "destructive",
          })
          return
        }

        toast({
          title: "تمت الإضافة",
          description: "تمت إضافة الشريحة الجديدة بنجاح",
        })
      } else if (editingId) {
        const response = await fetch("/api/admin/slides/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            ...editForm,
          }),
        })

        if (!response.ok) {
          toast({
            title: "فشل التحديث",
            description: "فشل في تحديث الشريحة. حاول مرة أخرى",
            variant: "destructive",
          })
          return
        }

        toast({
          title: "تم الحفظ",
          description: "تم حفظ التغييرات بنجاح",
        })
      }

      setEditingId(null)
      setIsAddingNew(false)

      setTimeout(() => {
        router.refresh()
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.error("Error saving slide:", error)
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء الحفظ. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      })
    }
  }

  const deleteSlide = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الشريحة؟")) return

    try {
      const response = await fetch("/api/admin/slides/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        toast({
          title: "فشل الحذف",
          description: "فشل في حذف الشريحة. حاول مرة أخرى",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "تم الحذف",
        description: "تم حذف الشريحة بنجاح",
      })

      setTimeout(() => {
        router.refresh()
      }, 1500)
    } catch (error) {
      console.error("Error deleting slide:", error)
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      })
    }
  }

  const moveSlide = async (id: number, direction: "up" | "down") => {
    const index = slides.findIndex((s) => s.id === id)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === slides.length - 1) return

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newSlides = [...slides]
      ;[newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]]

    setSlides(newSlides)

    try {
      await fetch("/api/admin/slides/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newSlides[index].id,
          sort_order: index + 1,
        }),
      })

      await fetch("/api/admin/slides/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newSlides[newIndex].id,
          sort_order: newIndex + 1,
        }),
      })

      toast({
        title: "تم إعادة الترتيب",
        description: "تم تحديث ترتيب الشرائح بنجاح",
      })

      router.refresh()
    } catch (error) {
      console.error("Error reordering slides:", error)
      setSlides(slides)
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء إعادة الترتيب. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={startAddNew} className="w-full bg-transparent" variant="outline">
        <Plus className="w-4 h-4 ml-2" />
        إضافة شريحة جديدة
      </Button>

      {isAddingNew && (
        <div className="border rounded-lg p-4 space-y-4 bg-white">
          <h3 className="font-semibold text-lg">شريحة جديدة</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="new-title">العنوان الرئيسي</Label>
              <Input
                id="new-title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="text-right"
              />
            </div>

            <div>
              <Label htmlFor="new-subtitle">العنوان الفرعي</Label>
              <Textarea
                id="new-subtitle"
                value={editForm.subtitle}
                onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                className="text-right"
              />
            </div>

            <div>
              <Label htmlFor="new-image-upload">رابط الصورة</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    id="new-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-right"
                  />
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
                {editForm.image_url && (
                  <img
                    src={editForm.image_url || "/placeholder.svg"}
                    alt="Preview"
                    className="mt-2 w-full h-96 object-cover rounded border"
                  />
                )}
                <p className="text-sm text-gray-500">اختر صورة من جهازك (الحد الأقصى: 2 ميجابايت)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="new-active"
                checked={editForm.is_active}
                onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
              />
              <Label htmlFor="new-active">تفعيل الشريحة</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={saveSlide} className="flex-1">
              <Save className="w-4 h-4 ml-2" />
              حفظ الشريحة
            </Button>
            <Button onClick={cancelEdit} variant="outline" className="flex-1 bg-transparent">
              <X className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
          </div>
        </div>
      )}

      {slides.map((slide, index) => (
        <div key={slide.id} className="border rounded-lg p-4 space-y-4 bg-white">
          {editingId === slide.id ? (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`title-${slide.id}`}>العنوان الرئيسي</Label>
                  <Input
                    id={`title-${slide.id}`}
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="text-right"
                  />
                </div>

                <div>
                  <Label htmlFor={`subtitle-${slide.id}`}>العنوان الفرعي</Label>
                  <Textarea
                    id={`subtitle-${slide.id}`}
                    value={editForm.subtitle}
                    onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                    className="text-right"
                  />
                </div>

                <div>
                  <Label htmlFor={`image-upload-${slide.id}`}>رابط الصورة</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        id={`image-upload-${slide.id}`}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-right"
                      />
                      <Upload className="w-5 h-5 text-gray-400" />
                    </div>
                    {editForm.image_url && (
                      <img
                        src={editForm.image_url || "/placeholder.svg"}
                        alt="Preview"
                        className="mt-2 w-full h-96 object-cover rounded border"
                      />
                    )}
                    <p className="text-sm text-gray-500">اختر صورة جديدة أو اترك الحالية</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id={`active-${slide.id}`}
                    checked={editForm.is_active}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
                  />
                  <Label htmlFor={`active-${slide.id}`}>تفعيل الشريحة</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={saveSlide} className="flex-1">
                  <Save className="w-4 h-4 ml-2" />
                  حفظ التغييرات
                </Button>
                <Button onClick={cancelEdit} variant="outline" className="flex-1 bg-transparent">
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
                    <h3 className="font-semibold text-lg">{slide.title}</h3>
                    {!slide.is_active && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">معطل</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{slide.subtitle}</p>
                  <p className="text-emerald-600 text-sm font-medium">{slide.button_text}</p>
                  {slide.image_url && (
                    <img
                      src={slide.image_url || "/placeholder.svg"}
                      alt={slide.title}
                      className="mt-2 w-full h-96 object-cover rounded"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-0.5">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => moveSlide(slide.id, "up")}
                    disabled={index === 0}
                    className="h-8 w-8"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => moveSlide(slide.id, "down")}
                    disabled={index === slides.length - 1}
                    className="h-8 w-8"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button onClick={() => startEdit(slide)} variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 ml-2" />
                  تعديل
                </Button>
                <Button onClick={() => deleteSlide(slide.id)} variant="outline" className="flex-1 text-red-600">
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
