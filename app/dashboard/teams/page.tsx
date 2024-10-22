"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for team members
const initialTeamMembers = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'Active' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', status: 'Pending' },
  { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@example.com', status: 'Active' },
]

export default function TeamsDashboard() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [newMember, setNewMember] = useState({ firstName: '', lastName: '', email: '' })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMember(prev => ({ ...prev, [name]: value }))
  }

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMember.firstName && newMember.lastName && newMember.email) {
      setTeamMembers(prev => [...prev, { id: Date.now(), ...newMember, status: 'Pending' }])
      setNewMember({ firstName: '', lastName: '', email: '' })
      toast({
        title: "Team Member Added",
        description: "The new team member has been successfully added.",
      })
    }
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, status: newStatus } : member
    ))
    toast({
      title: "Status Updated",
      description: `Team member status has been updated to ${newStatus}.`,
    })
  }

  const handleDelete = (id: number) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id))
    toast({
      title: "Team Member Deleted",
      description: "The team member has been removed from the list.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Teams Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Add Team Member</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMember} className="space-y-4">
            <Input
              placeholder="First Name"
              name="firstName"
              value={newMember.firstName}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Last Name"
              name="lastName"
              value={newMember.lastName}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Email Address"
              name="email"
              type="email"
              value={newMember.email}
              onChange={handleInputChange}
            />
            <Button type="submit">Add Member</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.firstName}</TableCell>
                  <TableCell>{member.lastName}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.status}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusChange(member.id, 'Active')}>
                          Set as Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(member.id, 'Suspended')}>
                          Suspend
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(member.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}