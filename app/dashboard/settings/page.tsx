"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsDashboard() {
  const [departments, setDepartments] = useState(['HR', 'IT', 'Finance'])
  const [jobTitles, setJobTitles] = useState(['Manager', 'Developer', 'Accountant'])
  const [currency, setCurrency] = useState('KES')
  const [benefits, setBenefits] = useState(['Health Insurance', 'Retirement Plan'])
  const [newItem, setNewItem] = useState('')
  const { toast } = useToast()

  const handleAddItem = (category: string) => {
    if (newItem) {
      switch (category) {
        case 'department':
          setDepartments(prev => [...prev, newItem])
          break
        case 'jobTitle':
          setJobTitles(prev => [...prev, newItem])
          break
        case 'benefit':
          setBenefits(prev => [...prev, newItem])
          break
      }
      setNewItem('')
      toast({
        title: "Item Added",
        description: `New ${category} has been added successfully.`,
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="New Department"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <Button onClick={() => handleAddItem('department')}>Add</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept, index) => (
                <TableRow key={index}>
                  <TableCell>{dept}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Titles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="New Job Title"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <Button onClick={() => handleAddItem('jobTitle')}>Add</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobTitles.map((title, index) => (
                <TableRow key={index}>
                  <TableCell>{title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Currency of Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="currency">Select Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KES">Kenyan Shilling (KES)</SelectItem>
              <SelectItem value="USD">US Dollar (USD)</SelectItem>
              <SelectItem value="EUR">Euro (EUR)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="New Benefit"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <Button onClick={() => handleAddItem('benefit')}>Add</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Benefit Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benefits.map((benefit, index) => (
                <TableRow key={index}>
                  <TableCell>{benefit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}