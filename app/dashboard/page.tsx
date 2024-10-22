"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, DollarSign, Gift, AlertCircle, UserPlus, FileText, PieChart } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [userName, setUserName] = useState('')
  const [employeeCount, setEmployeeCount] = useState(0)
  const [totalPayroll, setTotalPayroll] = useState(0)
  const [activeBenefits, setActiveBenefits] = useState(0)
  const [pendingActions, setPendingActions] = useState(0)
  const [payrollData, setPayrollData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      // Fetch admin name
      const { data: adminData, error: adminError } = await supabase
        .from('admin')
        .select('name')
        .eq('user_id', user.id)
        .single()

      if (adminError) throw adminError
      setUserName(adminData?.name || '')

      // Fetch employee count
      const { count: empCount, error: empError } = await supabase
        .from('employees')
        .select('id', { count: 'exact', head: true })

      if (empError) throw empError
      setEmployeeCount(empCount || 0)

      // Fetch total payroll
      const { data: payrollData, error: payrollError } = await supabase
        .from('payments')
        .select('amount')

      if (payrollError) throw payrollError
      const total = payrollData?.reduce((sum, payment) => sum + payment.amount, 0) || 0
      setTotalPayroll(total)

      // Fetch active benefits count
      const { count: benefitsCount, error: benefitsError } = await supabase
        .from('benefits_type')
        .select('id', { count: 'exact', head: true })

      if (benefitsError) throw benefitsError
      setActiveBenefits(benefitsCount || 0)

      // Fetch payroll data for chart
      const { data: chartData, error: chartError } = await supabase
        .from('payments')
        .select('date, amount')
        .order('date', { ascending: true })
        .limit(6)

      if (chartError) throw chartError
      setPayrollData(chartData?.map(item => ({
        month: new Date(item.date).toLocaleString('default', { month: 'short' }),
        amount: item.amount
      })) || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError(error.message)
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Employees" value={employeeCount} icon={<Users className="h-4 w-4" />} />
        <MetricCard title="Monthly Payroll" value={`KES ${totalPayroll.toLocaleString()}`} icon={<DollarSign className="h-4 w-4" />} />
        <MetricCard title="Active Benefits" value={activeBenefits} icon={<Gift className="h-4 w-4" />} />
        <MetricCard title="Pending Actions" value={pendingActions} icon={<AlertCircle className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Payroll Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payrollData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#2A9D8F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <ActivityItem
                icon={<UserPlus className="mr-2 h-4 w-4" />}
                title="New employee added"
                description="Jane Smith joined as Designer"
                time="Just now"
              />
              <ActivityItem
                icon={<FileText className="mr-2 h-4 w-4" />}
                title="Payroll processed"
                description="May payroll completed"
                time="2 hours ago"
              />
              <ActivityItem
                icon={<PieChart className="mr-2 h-4 w-4" />}
                title="New report available"
                description="Q2 performance report ready"
                time="Yesterday"
              />
            </div>
          </CardContent>
        </Card>
      </div>
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

function ActivityItem({ icon, title, description, time }: { icon: React.ReactNode, title: string, description: string, time: string }) {
  return (
    <div className="flex items-center">
      {icon}
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="ml-auto font-medium text-gray-600">{time}</div>
    </div>
  )
}