import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, CreditCard, BarChart, HeadphonesIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-8 w-8 mb-4" />,
    title: "Quick and Easy Setup",
    description: "Start managing payroll in minutes with a user-friendly platform tailored to Kenyan businesses.",
  },
  {
    icon: <Users className="h-8 w-8 mb-4" />,
    title: "Centralized Employee Management",
    description: "Organize all worker details securely in one place, making payroll administration easier than ever.",
  },
  {
    icon: <CreditCard className="h-8 w-8 mb-4" />,
    title: "Flexible Payment Methods",
    description: "Pay your casual workers via M-Pesa, card, or bank transfer, giving you options that best suit your business needs.",
  },
  {
    icon: <ArrowRight className="h-8 w-8 mb-4" />,
    title: "Automatic Remittances",
    description: "Ensure compliance with effortless, automated contributions to retirement and healthcare benefits, so you can focus on growing your business.",
  },
  {
    icon: <BarChart className="h-8 w-8 mb-4" />,
    title: "Real-Time Reporting and Analytics",
    description: "Access up-to-date insights on payroll and benefits, helping you make informed decisions with accurate data at your fingertips.",
  },
  {
    icon: <HeadphonesIcon className="h-8 w-8 mb-4" />,
    title: "Dedicated Customer Support",
    description: "Receive priority support from our team to assist you with setup, troubleshooting, and any questions you have, so you're never on your own.",
  },
]

const faqData = {
  all: [
    {
      question: "What is OlivaPay?",
      answer: "OlivaPay is a comprehensive payroll management platform designed specifically for Kenyan businesses to handle casual worker payments, ensuring compliance with local regulations and streamlining retirement and healthcare benefits.",
    },
    {
      question: "How does OlivaPay ensure compliance with Kenyan regulations?",
      answer: "OlivaPay is built with Kenyan labor laws and regulations in mind. Our system automatically calculates the correct deductions, taxes, and contributions required by law, helping you stay compliant without the hassle of manual calculations.",
    },
    {
      question: "What payment methods does OlivaPay support?",
      answer: "OlivaPay supports various payment methods including M-Pesa, bank transfers, and card payments, giving you flexibility in how you pay your casual workers.",
    },
  ],
  general: [
    {
      question: "How do I get started with OlivaPay?",
      answer: "Getting started is easy! Simply sign up for a free 30-day trial on our website. Our team will guide you through the setup process and help you import your employee data.",
    },
    {
      question: "Is OlivaPay suitable for businesses of all sizes?",
      answer: "Yes, OlivaPay is designed to scale with your business. Whether you're a small startup or a large corporation, our platform can accommodate your payroll needs.",
    },
  ],
  payments: [
    {
      question: "How often can I run payroll with OlivaPay?",
      answer: "You can run payroll as frequently as you need. Our system supports daily, weekly, bi-weekly, or monthly payroll cycles to suit your business needs.",
    },
    {
      question: "Are there any transaction fees for payments?",
      answer: "Transaction fees may vary depending on the payment method chosen. We strive to keep our fees competitive and transparent. Please check our pricing page for the most up-to-date information.",
    },
  ],
  compliance: [
    {
      question: "Does OlivaPay handle tax calculations and remittances?",
      answer: "Yes, OlivaPay automatically calculates the correct taxes and statutory deductions based on current Kenyan regulations. We also generate reports to help you with remittances to the relevant authorities.",
    },
    {
      question: "How does OlivaPay stay updated with changing regulations?",
      answer: "Our team of experts constantly monitors changes in Kenyan labor laws and tax regulations. We promptly update our system to ensure ongoing compliance, giving you peace of mind.",
    },
  ],
  security: [
    {
      question: "How secure is my data with OlivaPay?",
      answer: "We take data security very seriously. OlivaPay uses bank-level encryption to protect your data, and we comply with international data protection standards to ensure your information is always safe.",
    },
    {
      question: "Can I control access levels for different users?",
      answer: "Absolutely! OlivaPay offers role-based access control, allowing you to set different permission levels for various users in your organization, ensuring data privacy and security.",
    },
  ],
}

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <section className="py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Simplify Casual Worker Payments and Benefits
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Built for Kenyan businesses handling casual worker payments, OlivaPay
          ensures compliance and streamlines retirement and healthcare
          benefits—all while supporting your employees&apos; well-being.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800" asChild>
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">Download for iOS</Button>
          <Button variant="outline">Get it on Android</Button>
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features of OlivaPay</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Got questions? We&apos;ve got answers.</h2>
          <h3 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h3>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Find answers to common questions about OlivaPay&apos;s features, technology, and security.
          </p>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Input type="text" placeholder="Search questions..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <Tabs defaultValue="all" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            {Object.entries(faqData).map(([category, questions]) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-4">
                  {questions.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-semibold mb-2">{item.question}</h4>
                      <p>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your Payroll?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join over 1,000 Kenyan businesses that trust OlivaPay to simplify
            their casual worker payments and benefits.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}