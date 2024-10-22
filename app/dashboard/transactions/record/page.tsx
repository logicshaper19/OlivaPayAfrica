"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from "@/components/ui/use-toast"

export default function RecordTransaction() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    employee_id: '',
    transaction_type: '',
    amount: '',
    transaction_date: '',
    description: '',
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
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to record transaction')
      }

      const data = await response.json()

      toast({
        title: "Transaction Recorded",
        description: "The transaction has been successfully recorded in the system.",
      })
      router.push('/dashboard/transactions')
    } catch (error) {
      console.error('Error recording transaction:', error)
      toast({
        title: "Error",
        description: "There was an error recording the transaction. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader>
        <CardTitle>Record Transaction</CardTitle>
        <CardDescription>Enter transaction details</CardDescription>
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
            <Label htmlFor="transaction_type">Transaction Type</Label>
            <Select onValueChange={handleSelectChange('transaction_type')}>
              <SelectTrigger>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="deduction">Deduction</SelectItem>
                <SelectItem value="reimbursement">Reimbursement</SelectItem>
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
            <Label htmlFor="transaction_date">Transaction Date</Label>
            <Input
              id="transaction_date"
              name="transaction_date"
              type="date"
              value={formData.transaction_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Record Transaction</Button>
        </form>
      </CardContent>
    </Card>
  )
}