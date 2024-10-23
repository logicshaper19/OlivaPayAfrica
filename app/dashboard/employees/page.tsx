"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, DollarSign, Heart, Building } from 'lucide-react'

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  salary?: number;
  last_payment?: string;
  next_payment?: string;
  payment_frequency?: string;
}

export default function EmployeesDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    try {
      setLoading(true)
      const response = await fetch('/api/employees')
      const data: Employee[] = await response.json()
      setEmployees(data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEmployees = employees.filter(employee => 
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalEmployees = employees.length
  const totalPayroll = employees.reduce((sum, employee) => sum + (employee.salary || 0), 0)
  const totalSHIF = totalPayroll * 0.02 // Assuming SHIF is 2% of total payroll
  const totalNSSF = totalPayroll * 0.06 // Assuming NSSF is 6% of total payroll

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Employees Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Employees" value={totalEmployees} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <MetricCard title="Total Payroll" value={`KES ${totalPayroll.toLocaleString()}`} icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} />
        <MetricCard title="Total SHIF" value={`KES ${totalSHIF.toLocaleString()}`} icon={<Heart className="h-4 w-4 text-muted-foreground" />} />
        <MetricCard title="Total NSSF" value={`KES ${totalNSSF.toLocaleString()}`} icon={<Building className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <Button asChild className="mr-2">
            <Link href="/dashboard/employees/add">Add Employee</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/employees/invite">Invite Employee</Link>
          </Button>
        </div>
        <Input
          className="max-w-sm"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading employees...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Payment Frequency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
                    <TableCell>{employee.job_title}</TableCell>
                    <TableCell>KES {employee.salary?.toLocaleString()}</TableCell>
                    <TableCell>{employee.last_payment}</TableCell>
                    <TableCell>{employee.next_payment}</TableCell>
                    <TableCell>{employee.payment_frequency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
