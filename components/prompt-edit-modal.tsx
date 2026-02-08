"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PromptEditModalProps {
  isOpen: boolean
  onClose: () => void
  field: string
  value: string
  onSave: (value: string) => void
  icon?: React.ReactNode
}

export function PromptEditModal({ isOpen, onClose, field, value, onSave, icon }: PromptEditModalProps) {
  const [editValue, setEditValue] = useState(value)

  const handleSave = () => {
    onSave(editValue)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            Edit {field}
          </DialogTitle>
          <DialogDescription>Update the {field.toLowerCase()} for your search criteria</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-field">{field}</Label>
            <Input
              id="edit-field"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={`Enter ${field.toLowerCase()}`}
              autoFocus
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
