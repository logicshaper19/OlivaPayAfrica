"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

type AddEmployeeModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function AddEmployeeModal({ isOpen, onClose }: AddEmployeeModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    jobTitle: '',
    department: '',
    startDate: '',
    identityType: '',
    identityNumber: '',
    kraPIN: '',
    salary: '',
    paymentFrequency: '',
    paymentMode: '',
    bankName: '',
    accountNumber: '',
    nhifNumber: '',
    shifNumber: '',
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    toast({
      title: "Employee Added",
      description: "The new employee has been successfully added to the system.",
    })
    onClose()
    setStep(1)
    setFormData({} as any) // Reset form data
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Employee - Step {step} of 5</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Select onValueChange={handleSelectChange('gender')}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateOfBirth" className="text-right">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jobTitle" className="text-right">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="identityType" className="text-right">
                  ID Type
                </Label>
                <Select onValueChange={handleSelectChange('identityType')}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National ID</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="identityNumber" className="text-right">
                  ID Number
                </Label>
                <Input
                  id="identityNumber"
                  name="identityNumber"
                  value={formData.identityNumber}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="kraPIN" className="text-right">
                  KRA PIN
                </Label>
                <Input
                  id="kraPIN"
                  name="kraPIN"
                  value={formData.kraPIN}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right">
                  Salary
                </Label>
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentFrequency" className="text-right">
                  Payment Frequency
                </Label>
                <Select onValueChange={handleSelectChange('paymentFrequency')}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Biweekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentMode" className="text-right">
                  Payment Mode
                </Label>
                <Select onValueChange={handleSelectChange('paymentMode')}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.paymentMode === 'bank' && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bankName" className="text-right">
                      Bank Name
                    </Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="accountNumber" className="text-right">
                      Account Number
                    </Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
            </div>
          )}
          {step === 5 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nhifNumber" className="text-right">
                  NHIF Number
                </Label>
                <Input
                  id="nhifNumber"
                  name="nhifNumber"
                  value={formData.nhifNumber}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shifNumber" className="text-right">
                  SHIF Number
                </Label>
                <Input
                  id="shifNumber"
                  name="shifNumber"
                  value={formData.shifNumber}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {step < 5 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}