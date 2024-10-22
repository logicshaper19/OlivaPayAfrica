"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from "@/components/ui/use-toast"

export default function AddBenefit() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    employee_id: '',
    benefit_type: '',
    amount: '',
    start_date: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/benefits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to add benefit')
      }

      const data = await response.json()

      toast({
        title: "Benefit Added",
        description: "The benefit has been successfully added to the system.",
      })
      router.push('/dashboard/benefits')
    } catch (error) {
      console.error('Error adding benefit:', error)
      toast({
        title: "Error",
        description: "There was an error adding the benefit. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader>
        <CardTitle>Add Benefit</CardTitle>
        <CardDescription>Enter benefit details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee_id">Employee ID</Label>
            <Input
              id="employee_id"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="benefit_type">Benefit Type</Label>
            <Select onValueChange={handleSelectChange('benefit_type')}>
              <SelectTrigger>
                <SelectValue placeholder="Select benefit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health_insurance">Health Insurance</SelectItem>
                <SelectItem value="retirement_plan">Retirement Plan</SelectItem>
                <SelectItem value="paid_time_off">Paid Time Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              id="start_date"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Add Benefit</Button>
        </form>
      </CardContent>
    </Card>
  )
}