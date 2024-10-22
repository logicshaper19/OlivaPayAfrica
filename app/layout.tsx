import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OlivaPay',
  description: 'Simplify Casual Worker Payments and Benefits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}