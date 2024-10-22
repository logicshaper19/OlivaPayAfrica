"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"

// Mock employee data for autocomplete
const employees = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
]

export default function InviteEmployee() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employees[0] | null>(null)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { toast } = useToast()

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectEmployee = (employee: typeof employees[0]) => {
    setSelectedEmployee(employee)
    setStep(2)
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedEmployee) {
      toast({
        title: "Invitation Sent",
        description: `An invitation email has been sent to ${selectedEmployee.name}.`,
      })
      router.push('/dashboard/employees')
    }
  }

  const handleCancel = () => {
    setSelectedEmployee(null)
    setSearchTerm('')
    setStep(1)
  }

  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader>
        <CardTitle>Invite Employee</CardTitle>
        <CardDescription>Search for an employee and send an invitation</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeSearch">Search Employee</Label>
              <Input
                id="employeeSearch"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for employee..."
              />
            </div>
            {searchTerm && (
              <ul className="mt-2 border rounded-md divide-y">
                {filteredEmployees.map(employee => (
                  <li 
                    key={employee.id} 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectEmployee(employee)}
                  >
                    {employee.name} ({employee.email})
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {step === 2 && selectedEmployee && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Employee Preview</h3>
            <p><strong>Name:</strong> {selectedEmployee.name}</p>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <div className="flex space-x-2">
              <Button onClick={handleInvite}>Send Invite</Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}