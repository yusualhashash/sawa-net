"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Save, X, ChevronUp, ChevronDown, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FooterLink {
  id: number
  title: string
  url: string
  sort_order: number
  is_active: boolean
}

interface FooterLinksFormProps {
  links: FooterLink[]
}

export function FooterLinksForm({ links: initialLinks }: FooterLinksFormProps) {
  const [links, setLinks] = useState<FooterLink[]>(initialLinks)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [editForm, setEditForm] = useState({ title: "", url: "", is_active: true })
  const [newForm, setNewForm] = useState({ title: "", url: "" })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const startEdit = (link: FooterLink) => {
    setEditingId(link.id)
    setEditForm({ title: link.title, url: link.url, is_active: link.is_active })
    setShowNewForm(false)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ title: "", url: "", is_active: true })
  }

  const handleSave = async (id: number) => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/footer/links/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editForm }),
      })

      if (!response.ok) throw new Error("فشل في الحفظ")

      setLinks(
        links.map((link) =>
          link.id === id ? { ...link, title: editForm.title, url: editForm.url, is_active: editForm.is_active } : link,
        ),
      )
      setEditingId(null)

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث الرابط بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ التغييرات",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreate = async () => {
    if (!newForm.title || !newForm.url) {
      toast({
        title: "تحذير",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/footer/links/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newForm, sort_order: links.length }),
      })

      if (!response.ok) throw new Error("فشل في الإنشاء")

      const result = await response.json()
      setLinks([...links, result.link])
      setNewForm({ title: "", url: "" })
      setShowNewForm(false)

      toast({
        title: "تم الإنشاء بنجاح",
        description: "تم إضافة الرابط بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إنشاء الرابط",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الرابط؟")) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/footer/links/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("فشل في الحذف")

      setLinks(links.filter((link) => link.id !== id))

      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الرابط بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حذف الرابط",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleReorder = async (id: number, direction: "up" | "down") => {
    const index = links.findIndex((l) => l.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === links.length - 1)) return

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newLinks = [...links]
    ;[newLinks[index], newLinks[newIndex]] = [newLinks[newIndex], newLinks[index]]

    setLinks(newLinks)

    try {
      await fetch("/api/admin/footer/links/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links: newLinks.map((l, idx) => ({ id: l.id, sort_order: idx })) }),
      })
    } catch (error) {
      console.error("Failed to reorder:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>روابط سريعة</CardTitle>
            <CardDescription>إدارة روابط التنقل في الفوتر</CardDescription>
          </div>
          <Button onClick={() => setShowNewForm(!showNewForm)}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة رابط جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showNewForm && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>العنوان</Label>
                  <Input
                    value={newForm.title}
                    onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                    placeholder="الرئيسية"
                  />
                </div>
                <div className="space-y-2">
                  <Label>الرابط</Label>
                  <Input
                    value={newForm.url}
                    onChange={(e) => setNewForm({ ...newForm, url: e.target.value })}
                    placeholder="/"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreate} className="min-w-[120px]" disabled={isSaving}>
                  <Save className="ml-2 h-4 w-4" />
                  {isSaving ? "جاري الحفظ..." : "حفظ"}
                </Button>
                <Button onClick={() => setShowNewForm(false)} variant="outline" disabled={isSaving}>
                  <X className="ml-2 h-4 w-4" />
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {links.map((link) => (
          <Card key={link.id}>
            <CardContent className="pt-6">
              {editingId === link.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>العنوان</Label>
                      <Input
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>الرابط</Label>
                      <Input value={editForm.url} onChange={(e) => setEditForm({ ...editForm, url: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button onClick={() => handleSave(link.id)} className="min-w-[120px]" disabled={isSaving}>
                        <Save className="ml-2 h-4 w-4" />
                        {isSaving ? "جاري الحفظ..." : "حفظ"}
                      </Button>
                      <Button onClick={cancelEdit} variant="outline" disabled={isSaving}>
                        <X className="ml-2 h-4 w-4" />
                        إلغاء
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label>نشط</Label>
                      <Switch
                        checked={editForm.is_active}
                        onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">{link.url}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleReorder(link.id, "up")}>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleReorder(link.id, "down")}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => startEdit(link)}>
                      تعديل
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(link.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
