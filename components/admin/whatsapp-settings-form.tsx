"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"

interface WhatsAppSettingsFormProps {
  initialWhatsappNumber: string
}

export default function WhatsAppSettingsForm({ initialWhatsappNumber }: WhatsAppSettingsFormProps) {
  const [whatsappNumber, setWhatsappNumber] = useState(initialWhatsappNumber)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMessage("")

    try {
      const response = await fetch("/api/admin/settings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "whatsapp_number", value: whatsappNumber }),
      })

      if (response.ok) {
        setSuccessMessage("تم حفظ التغييرات بنجاح")
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">{successMessage}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="whatsapp_number">رقم واتساب</Label>
        <Input
          id="whatsapp_number"
          type="text"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder="+964 775 173 5156"
          dir="ltr"
          className="text-right"
        />
      </div>

      <div className="flex justify-end border-t pt-4">
        <Button type="submit" disabled={saving}>
          <Save className="ml-2 h-4 w-4" />
          {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>
    </form>
  )
}
