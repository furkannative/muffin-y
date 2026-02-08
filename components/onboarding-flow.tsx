"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ArrowRight, Users, Search, Mail, BarChart3, Building2, User, CheckCircle2, Video, MessageSquare, Award, Network, DollarSign } from "lucide-react"

const steps = [
  { id: 1, title: "Sign up", completed: true },
  { id: 2, title: "Basic information", completed: true },
  { id: 3, title: "Company details", completed: false },
  { id: 4, title: "Team setup", completed: false },
  { id: 5, title: "Choose goals", completed: false },
]

const products = [
  {
    id: "sourcing",
    icon: Search,
    title: "Sourcing",
    description: "AI-powered candidate discovery and sourcing across multiple platforms and databases.",
    isTopInterest: true,
  },
  {
    id: "interview",
    icon: Video,
    title: "Interview",
    description: "Conduct technical interviews with automated assessment and scoring capabilities.",
    isTopInterest: false,
  },
  {
    id: "native",
    icon: MessageSquare,
    title: "Native",
    description: "Language proficiency assessment with multi-accent recognition and evaluation.",
    isTopInterest: false,
  },
  {
    id: "ranking",
    icon: Award,
    title: "Ranking",
    description: "AI-driven candidate ranking and CV evaluation with comprehensive scoring system.",
    isTopInterest: false,
  },
  {
    id: "orgchart",
    icon: Network,
    title: "Org Chart",
    description: "Visualize and manage organizational structure with interactive team hierarchies.",
    isTopInterest: false,
  },
  {
    id: "salary",
    icon: DollarSign,
    title: "Salary Explorer",
    description: "Market salary insights and compensation analysis for informed hiring decisions.",
    isTopInterest: false,
  },
]

export function OnboardingFlow() {
  const [selectedProducts, setSelectedProducts] = useState(["sourcing"])
  const [currentStep, setCurrentStep] = useState(3)
  const [showSuccess, setShowSuccess] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    location: "",
    website: "",
  })
  const [teamInfo, setTeamInfo] = useState({
    role: "",
    teamSize: "",
    hiringGoals: "",
  })

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      // Create workspace and redirect to ex3
      window.location.href = "/ex3"
    }
  }

  const renderStepContent = () => {
    if (showSuccess) {
      return (
        <div className="w-full max-w-2xl flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-primary animate-bounce" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-foreground mt-8 animate-fade-in">Workspace Created!</h2>
          <p className="text-muted-foreground text-lg mt-4 animate-fade-in">
            Setting up your personalized hiring dashboard...
          </p>
          <div className="flex gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      )
    }

    switch (currentStep) {
      case 3:
        return (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-foreground mb-4">Tell us about your company</h2>
              <p className="text-muted-foreground text-lg">
                This helps us personalize your hiring experience and provide better candidate matches.
              </p>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={companyInfo.companyName}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                      placeholder="e.g., Acme Corp"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select
                      value={companyInfo.industry}
                      onValueChange={(value) => setCompanyInfo({ ...companyInfo, industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size *</Label>
                    <Select
                      value={companyInfo.companySize}
                      onValueChange={(value) => setCompanyInfo({ ...companyInfo, companySize: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-1000">201-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Primary Location *</Label>
                    <Input
                      id="location"
                      value={companyInfo.location}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })}
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Company Website</Label>
                  <Input
                    id="website"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                    placeholder="e.g., https://acme.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-foreground mb-4">Set up your hiring team</h2>
              <p className="text-muted-foreground text-lg">
                Help us understand your role and hiring needs to provide the best experience.
              </p>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Role & Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role *</Label>
                  <Select value={teamInfo.role} onValueChange={(value) => setTeamInfo({ ...teamInfo, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="founder">Founder/CEO</SelectItem>
                      <SelectItem value="hr-manager">HR Manager</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                      <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                      <SelectItem value="talent-acquisition">Talent Acquisition</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamSize">Hiring Team Size *</Label>
                  <Select
                    value={teamInfo.teamSize}
                    onValueChange={(value) => setTeamInfo({ ...teamInfo, teamSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="just-me">Just me</SelectItem>
                      <SelectItem value="2-5">2-5 people</SelectItem>
                      <SelectItem value="6-15">6-15 people</SelectItem>
                      <SelectItem value="16+">16+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hiringGoals">Monthly Hiring Goals *</Label>
                  <Select
                    value={teamInfo.hiringGoals}
                    onValueChange={(value) => setTeamInfo({ ...teamInfo, hiringGoals: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hiring volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 hires per month</SelectItem>
                      <SelectItem value="6-15">6-15 hires per month</SelectItem>
                      <SelectItem value="16-30">16-30 hires per month</SelectItem>
                      <SelectItem value="30+">30+ hires per month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 5:
        return (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Which Muffin modules are you interested in?
              </h2>
              <p className="text-muted-foreground text-lg">
                Your first choice will be marked as your top interest, which we'll use to personalize your experience.
                Selecting modules doesn't commit you to any purchases.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {products.map((product) => {
                const Icon = product.icon
                const isSelected = selectedProducts.includes(product.id)
                const isTopInterest = product.isTopInterest && isSelected

                return (
                  <Card
                    key={product.id}
                    className={`
                      cursor-pointer transition-all duration-200 hover:shadow-md
                      ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
                    `}
                    onClick={() => toggleProduct(product.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`
                            w-10 h-10 rounded-lg flex items-center justify-center
                            ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}
                          `}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{product.title}</CardTitle>
                            {isTopInterest && (
                              <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary">
                                TOP INTEREST
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div
                          className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center
                          ${isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"}
                        `}
                        >
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">{product.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar - Progress */}
      <div className="w-80 bg-primary text-primary-foreground p-8 flex flex-col">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground/10 mb-4">
            <div className="w-5 h-5 rounded bg-primary-foreground"></div>
          </div>
          <h1 className="text-xl font-semibold mb-2">Create your account in a few clicks</h1>
        </div>

        <div className="space-y-6 flex-1">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep
            const isCurrent = step.id === currentStep
            return (
            <div key={step.id} className="flex items-center space-x-4">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  isCompleted
                    ? "bg-primary-foreground text-primary"
                    : isCurrent
                      ? "bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground"
                      : "bg-primary-foreground/10 text-primary-foreground/60"
                }
              `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`
                ${isCompleted || isCurrent ? "text-primary-foreground" : "text-primary-foreground/60"}
              `}
              >
                {step.title}
              </span>
            </div>
          )})}
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20">
          <div className="flex items-center space-x-4 text-primary-foreground/60">
            <button className="text-sm hover:text-primary-foreground">Logout</button>
            <button className="text-sm hover:text-primary-foreground">Change password</button>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8 flex items-center justify-center">
        {renderStepContent()}

        {!showSuccess && (
          <div className="fixed bottom-8 right-8">
            <Button
              onClick={handleContinue}
              size="lg"
              className="px-8"
              disabled={
                (currentStep === 3 &&
                  (!companyInfo.companyName ||
                    !companyInfo.industry ||
                    !companyInfo.companySize ||
                    !companyInfo.location)) ||
                (currentStep === 4 && (!teamInfo.role || !teamInfo.teamSize || !teamInfo.hiringGoals))
              }
            >
              {currentStep === 5 ? "Create Workspace" : "Continue"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
