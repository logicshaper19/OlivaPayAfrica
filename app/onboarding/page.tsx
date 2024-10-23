"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [countries, setCountries] = useState<Array<{id: number, name: string}>>([])
  const [counties, setCounties] = useState<Array<{id: number, name: string}>>([])
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    phoneNumber: '',
    companyName: '',
    companyType: '',
    website: '',
    country: '',
    county: '',
    companySize: '',
    employeeCount: '',
    needAssistance: false
  })

  const supabase = createClientComponentClient()

  const handleError = useCallback((error: any) => {
    toast({
      title: "Error",
      description: error.message || "An error occurred. Please try again.",
    })
    if (error.code === 'PGRST301' || error.name === 'AuthSessionMissingError') {
      router.push('/login')
    }
  }, [toast, router])

  const fetchCountries = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('country').select('id, name')
      if (error) throw error
      setCountries(data)
    } catch (error) {
      console.error('Error fetching countries:', error)
      handleError(error)
    }
  }, [supabase, handleError])

  const fetchCounties = useCallback(async (countryId: string) => {
    try {
      const { data, error } = await supabase
        .from('county')
        .select('id, name')
        .eq('country_id', countryId)
      if (error) throw error
      setCounties(data)
    } catch (error) {
      console.error('Error fetching counties:', error)
      handleError(error)
    }
  }, [supabase, handleError])

  const fetchCompanyData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('company')
          .select('name')
          .eq('id', user.id)
          .single()
        if (error) throw error
        setFormData(prev => ({ ...prev, companyName: data.name }))
      }
    } catch (error) {
      console.error('Error fetching company data:', error)
      handleError(error)
    }
  }, [supabase, handleError])

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
    } else {
      fetchCountries()
      fetchCompanyData()
    }
  }, [supabase, router, fetchCountries, fetchCompanyData])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'country' && value === '1') {
      fetchCounties(value)
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, needAssistance: checked }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user found')

        // Update company information
        const { data: companyData, error: companyError } = await supabase
          .from('company')
          .update({ 
            name: formData.companyName,
            type: formData.companyType,
            website: formData.website,
            country_id: formData.country,
            county_id: formData.county,
            size: formData.companySize
          })
          .eq('id', user.id)
          .select()

        if (companyError) throw companyError

        // Update admin information
        const { error: adminError } = await supabase
          .from('admin')
          .update({ 
            phone_number: formData.phoneNumber
          })
          .eq('user_id', user.id)

        if (adminError) throw adminError

        // Update user metadata to mark onboarding as completed
        const { error: userUpdateError } = await supabase.auth.updateUser({
          data: { onboarding_completed: true }
        })

        if (userUpdateError) throw userUpdateError

        toast({
          title: "Onboarding complete",
          description: "Your account is now set up and ready to use.",
        })
        router.push('/dashboard')
      } catch (error) {
        console.error('Error during onboarding:', error)
        handleError(error)
      }
    }
  }

  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>Step {step} of 3</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyType">Company Type</Label>
                <Select name="companyType" onValueChange={handleSelectChange('companyType')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Business Name">Business Name</SelectItem>
                    <SelectItem value="Private Limited Company">Private Limited Company</SelectItem>
                    <SelectItem value="Public Limited Company">Public Limited Company</SelectItem>
                    <SelectItem value="Company Limited by Guarantee">Company Limited by Guarantee</SelectItem>
                    <SelectItem value="Limited Liability Partnership">Limited Liability Partnership</SelectItem>
                    <SelectItem value="Limited Partnership">Limited Partnership</SelectItem>
                    <SelectItem value="Foreign Company">Foreign Company</SelectItem>
                    <SelectItem value="Trusts">Trusts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select name="country" onValueChange={handleSelectChange('country')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id.toString()}>{country.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.country === '1' && (
                <div className="space-y-2">
                  <Label htmlFor="county">County</Label>
                  <Select name="county" onValueChange={handleSelectChange('county')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((county) => (
                        <SelectItem key={county.id} value={county.id.toString()}>{county.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Select name="companySize" onValueChange={handleSelectChange('companySize')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 Employees</SelectItem>
                    <SelectItem value="11-50">11-50 Employees</SelectItem>
                    <SelectItem value="51-100">51-100 Employees</SelectItem>
                    <SelectItem value="101+">101+ Employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Number of Employees to Onboard</Label>
                <Input
                  id="employeeCount"
                  name="employeeCount"
                  type="number"
                  value={formData.employeeCount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needAssistance"
                  checked={formData.needAssistance}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="needAssistance">Do You Need Assistance with Onboarding?</Label>
              </div>
            </div>
          )}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button type="button" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <Button type="submit">
              {step < 3 ? 'Next' : 'Complete Onboarding'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
