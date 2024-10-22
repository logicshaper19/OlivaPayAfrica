"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

type InviteEmployeeModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function InviteEmployeeModal({ isOpen, onClose }: InviteEmployeeModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleInvite = () => {
    // Here you would typically handle the invitation logic
    toast({
      title: "Invitation Sent",
      description: "An invitation email has been sent to the employee.",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Employee</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="employeeSearch" className="text-right">
              Search
            </Label>
            <Input
              id="employeeSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="col-span-3"
              placeholder="Search for employee..."
            />
          </div>
          {/* Here you would typically display search results */}
        </div>
        <Button onClick={handleInvite}>Send Invite</Button>
      </DialogContent>
    </Dialog>
  )
}