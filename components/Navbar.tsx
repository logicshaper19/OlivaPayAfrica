"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Leaf, Home, Users, DollarSign, Gift, FileText, Settings, UserPlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [onboardingCompleted, setOnboardingCompleted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        setOnboardingCompleted(session.user.user_metadata.onboarding_completed)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        setOnboardingCompleted(session.user.user_metadata.onboarding_completed)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const isLoggedIn = !!session
  const isLandingPage = pathname === '/'

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-black">OlivaPay</span>
          </Link>
          {isLandingPage ? (
            <div className="space-x-4">
              <Button asChild variant="ghost">
                <Link href="/#features">Features</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/#faq">FAQ</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          ) : isLoggedIn && onboardingCompleted ? (
            <div className="flex space-x-4">
              <NavLink href="/dashboard" icon={<Home size={20} />} label="Home" />
              <NavLink href="/dashboard/employees" icon={<Users size={20} />} label="Employees" />
              <NavLink href="/dashboard/payments" icon={<DollarSign size={20} />} label="Payments" />
              <NavLink href="/dashboard/benefits" icon={<Gift size={20} />} label="Benefits" />
              <NavLink href="/dashboard/transactions" icon={<FileText size={20} />} label="Transactions" />
              <NavLink href="/dashboard/teams" icon={<UserPlus size={20} />} label="Teams" />
              <NavLink href="/dashboard/settings" icon={<Settings size={20} />} label="Settings" />
              <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
            </div>
          ) : isLoggedIn && !onboardingCompleted ? (
            <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink = ({ href, icon, label }: NavLinkProps) => (
  <Link href={href} className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
    {icon}
    <span>{label}</span>
  </Link>
)

export default Navbar
