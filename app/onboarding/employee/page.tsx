"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"

export default function EmployeeOnboarding() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically handle the onboarding submission
    toast({
      title: "Onboarding complete",
      description: "Your account is now set up and ready to use.",
    })
    router.push('/dashboard')
  }

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Employee Onboarding</CardTitle>
        <CardDescription>Complete your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" required />
            </div>
            <Button type="submit" className="w-full">Complete Onboarding</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}