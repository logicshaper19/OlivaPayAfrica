"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from "@/components/ui/use-toast"

export default function AddEmployee() {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { toast } = useToast()
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
    console.log(formData)
    toast({
      title: "Employee Added",
      description: "The new employee has been successfully added to the system.",
    })
    router.push('/dashboard/employees')
  }

  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader>
        <CardTitle>Add New Employee</CardTitle>
        <CardDescription>Step {step} of 5</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Form fields for each step */}
          <div className="flex justify-between mt-6">
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
      </CardContent>
    </Card>
  )
}