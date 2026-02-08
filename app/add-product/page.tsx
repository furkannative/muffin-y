"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Check, Plus, Info, ShoppingBag, Search, Code, Globe, BarChart3, DollarSign, Network, ArrowLeft, Grid3x3, Settings, Headphones, Tag, ChevronRight, User, CheckCircle2, Filter, Link2 } from "lucide-react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddProductPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [companyName, setCompanyName] = useState("")
  const [sector, setSector] = useState("")
  const [numberOfEmployees, setNumberOfEmployees] = useState("")
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const [promoCode, setPromoCode] = useState("")

  useEffect(() => {
    // Body ve HTML'e direkt style ekle
    document.documentElement.style.margin = '0'
    document.documentElement.style.padding = '0'
    document.documentElement.style.height = '100%'
    document.documentElement.style.overflow = 'hidden'
    
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'
    document.body.style.width = '100%'
    document.body.style.position = 'fixed'
    document.body.style.top = '0'
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.bottom = '0'

    // Cleanup
    return () => {
      document.documentElement.style.margin = ''
      document.documentElement.style.padding = ''
      document.documentElement.style.height = ''
      document.documentElement.style.overflow = ''
      
      document.body.style.margin = ''
      document.body.style.padding = ''
      document.body.style.height = ''
      document.body.style.overflow = ''
      document.body.style.width = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.bottom = ''
    }
  }, [])

  const modules = [
    { id: "sourcing", name: "Sourcing", description: "Find and source candidates", icon: Search, color: "bg-blue-500" },
    { id: "technic-interview", name: "Technic Interview", description: "Technical assessment and evaluation", icon: Code, color: "bg-purple-500" },
    { id: "language-interview", name: "Language Interview", description: "Language proficiency testing", icon: Globe, color: "bg-green-500" },
    { id: "ranking", name: "Ranking", description: "Rank and compare candidates", icon: BarChart3, color: "bg-orange-500" },
    { id: "salary-offer", name: "Salary and Offer", description: "Salary negotiation and offers", icon: DollarSign, color: "bg-pink-500" },
    { id: "org-chart", name: "Org Chart", description: "Organizational structure view", icon: Network, color: "bg-indigo-500" },
  ]

  const steps = [
    { number: 1, label: "General Information", completed: currentStep > 1, active: currentStep === 1 },
    { number: 2, label: "Modules", completed: currentStep > 2, active: currentStep === 2 },
    { number: 3, label: "Pricing Details", completed: currentStep > 3, active: currentStep === 3 },
    { number: 4, label: "Summary", completed: false, active: currentStep === 4 },
  ]

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const packages = [
    { id: "founder", name: "Founder", price: "$399", period: "month", color: "bg-pink-500" },
    { id: "talent-acquisition", name: "Talent Acquisition", price: "$699", period: "month", color: "bg-orange-400" },
    { id: "recruiters", name: "Recruiters", price: "$999", period: "month", color: "bg-purple-400" },
  ]

  const isContinueDisabled = 
    currentStep === 1 
      ? !companyName || !sector || !numberOfEmployees
      : currentStep === 2
      ? selectedModules.length === 0
      : currentStep === 3
      ? !selectedPackage
      : false

  return (
    <div 
      className="flex flex-col bg-gray-50 overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        minWidth: '100vw',
        minHeight: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        margin: 0,
        padding: 0,
        zIndex: 1,
        boxSizing: 'border-box'
      }}
    >
      {/* Main Content - 3 Column Layout (1:3:4) */}
      <div className="flex-1 flex overflow-hidden" style={{ width: '100%', height: '100%' }}>
        {/* Left Sidebar - 1 unit (Logo + Steps) */}
        <div className="w-[12.5%] bg-white border-r border-gray-200 flex flex-col flex-shrink-0 relative">
          <div className="p-6 flex flex-col h-full">
            {/* Logo */}
            <div className="mb-12">
              <Image
                src="/catalyst.svg"
                alt="Catalyst Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>

            {/* Steps */}
            <div className="flex-1 flex flex-col justify-start pt-4 space-y-9">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-4 top-9 w-0.5 h-9 ${
                        step.completed ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                        step.active
                          ? "bg-orange-500 border-orange-500"
                          : step.completed
                          ? "bg-green-500 border-green-500"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <span
                          className={`text-sm font-semibold ${
                            step.active ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {step.number}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div
                        className={`text-xs font-medium mb-1 ${
                          step.active
                            ? "text-orange-600"
                            : step.completed
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        Step {step.number}/4
                      </div>
                      <div
                        className={`text-sm leading-tight ${
                          step.active
                            ? "text-orange-600 font-semibold"
                            : step.completed
                            ? "text-gray-900 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {step.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Copyright */}
          <div className="px-6 py-4 border-t border-gray-200 space-y-1">
            <p className="text-xs font-medium text-gray-700">Muffin</p>
            <p className="text-xs text-gray-600">One prompt. The right talent.</p>
          </div>
        </div>

        {/* Middle Panel - 3 units (Preview) */}
        <div className="w-[37.5%] p-6 overflow-auto">
          {/* Product Preview */}
          <div 
            className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-xl relative mt-16"
            style={{
              backgroundImage: 'radial-gradient(circle, #f3f4f6 0.5px, transparent 0.5px)',
              backgroundSize: '12px 12px',
              backgroundPosition: '0 0'
            }}
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                  Preview
                </h3>
                <p className="text-xs text-gray-500">
                  This is how your product will appear.
                </p>
              </div>
            </div>

            {currentStep === 2 ? (
              /* Sidebar Preview for Step 2 */
              <div className="space-y-4">
                {/* Logo Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/catalyst.svg"
                      alt="Muffin Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Muffin</div>
                      <div className="text-xs text-gray-500">One Prompt for Hiring</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                {/* MAIN Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">MAIN</div>
                  <div className="bg-orange-500 rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Grid3x3 className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Overview</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Selected Modules Section */}
                {selectedModules.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">MODULES</div>
                    <div className="space-y-1">
                      {selectedModules.map((moduleId) => {
                        const module = modules.find(m => m.id === moduleId)
                        if (!module) return null
                        const Icon = module.icon
                        return (
                          <div key={moduleId} className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center gap-2">
                              <div className={`w-5 h-5 rounded ${module.color} flex items-center justify-center`}>
                                <Icon className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-sm text-gray-700">{module.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* OTHERS Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">OTHERS</div>
                  <div className="space-y-1">
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Support</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* User Profile */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900">Muffin Support</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="text-xs text-gray-500">support@muffin.team</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ) : currentStep === 1 ? (
              /* Sidebar Preview for Step 1 */
              <div className="space-y-4">
                {/* Mini Labels - Company Info (Above Sidebar) */}
                {(companyName || sector || numberOfEmployees) && (
                  <div className="space-y-1.5">
                    {companyName && (
                      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-orange-50 rounded-md border border-orange-200">
                        <span className="text-xs text-orange-600 font-medium">Company:</span>
                        <span className="text-xs text-orange-900 font-semibold">{companyName}</span>
                      </div>
                    )}
                    {sector && (
                      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-blue-50 rounded-md border border-blue-200">
                        <span className="text-xs text-blue-600 font-medium">Sector:</span>
                        <span className="text-xs text-blue-900 font-semibold">{sector}</span>
                      </div>
                    )}
                    {numberOfEmployees && (
                      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-green-50 rounded-md border border-green-200">
                        <span className="text-xs text-green-600 font-medium">Employees:</span>
                        <span className="text-xs text-green-900 font-semibold">{numberOfEmployees}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Logo Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/catalyst.svg"
                      alt="Muffin Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Muffin</div>
                      <div className="text-xs text-gray-500">One Prompt for Hiring</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                {/* MAIN Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">MAIN</div>
                  <div className="bg-orange-500 rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Grid3x3 className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Overview</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* OTHERS Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">OTHERS</div>
                  <div className="space-y-1">
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Support</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* User Profile */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900">Muffin Support</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="text-xs text-gray-500">support@muffin.team</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ) : currentStep === 3 ? (
              /* Sidebar Preview for Step 3 */
              <div className="space-y-4">
                {/* Logo Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/catalyst.svg"
                      alt="Muffin Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Muffin</div>
                      <div className="text-xs text-gray-500">One Prompt for Hiring</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                {/* MAIN Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">MAIN</div>
                  <div className="bg-orange-500 rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Grid3x3 className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Overview</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Selected Modules Section */}
                {selectedModules.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">MODULES</div>
                    <div className="space-y-1">
                      {selectedModules.map((moduleId) => {
                        const module = modules.find(m => m.id === moduleId)
                        if (!module) return null
                        const Icon = module.icon
                        return (
                          <div key={moduleId} className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center gap-2">
                              <div className={`w-5 h-5 rounded ${module.color} flex items-center justify-center`}>
                                <Icon className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-sm text-gray-700">{module.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Selected Package Section */}
                {selectedPackage && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">PACKAGE</div>
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded ${packages.find(p => p.id === selectedPackage)?.color || 'bg-gray-500'} flex items-center justify-center`}>
                          <Tag className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {packages.find(p => p.id === selectedPackage)?.name || selectedPackage}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {packages.find(p => p.id === selectedPackage)?.price}/{packages.find(p => p.id === selectedPackage)?.period}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* OTHERS Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">OTHERS</div>
                  <div className="space-y-1">
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Support</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* User Profile */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900">Muffin Support</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="text-xs text-gray-500">support@muffin.team</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ) : currentStep === 4 ? (
              /* Sidebar Preview for Step 4 */
              <div className="space-y-4">
                {/* Logo Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/catalyst.svg"
                      alt="Muffin Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Muffin</div>
                      <div className="text-xs text-gray-500">One Prompt for Hiring</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                {/* MAIN Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">MAIN</div>
                  <div className="bg-orange-500 rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Grid3x3 className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Overview</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Selected Modules Section */}
                {selectedModules.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">MODULES</div>
                    <div className="space-y-1">
                      {selectedModules.map((moduleId) => {
                        const module = modules.find(m => m.id === moduleId)
                        if (!module) return null
                        const Icon = module.icon
                        return (
                          <div key={moduleId} className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center gap-2">
                              <div className={`w-5 h-5 rounded ${module.color} flex items-center justify-center`}>
                                <Icon className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-sm text-gray-700">{module.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Selected Package Section */}
                {selectedPackage && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">PACKAGE</div>
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded ${packages.find(p => p.id === selectedPackage)?.color || 'bg-gray-500'} flex items-center justify-center`}>
                          <Tag className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {packages.find(p => p.id === selectedPackage)?.name || selectedPackage}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {packages.find(p => p.id === selectedPackage)?.price}/{packages.find(p => p.id === selectedPackage)?.period}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* OTHERS Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">OTHERS</div>
                  <div className="space-y-1">
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Support</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* User Profile */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900">Muffin Support</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="text-xs text-gray-500">support@muffin.team</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ) : (
              /* Default Preview for other steps */
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span>SKU:</span>
                  <span>000-00-0000</span>
                  <Info className="w-3 h-3 text-gray-400" />
                </div>

                {/* Feature List */}
                <div className="space-y-2">
                  {/* Filtering applicants */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Filter className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-700">Filtering applicants...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">W</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">i</span>
                      </div>
                    </div>
                  </div>

                  {/* Scanning network */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Link2 className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-700">Scanning network...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-blue-400 border border-blue-300"></div>
                      <div className="w-5 h-5 rounded-full bg-purple-400 border border-purple-300"></div>
                      <div className="w-5 h-5 rounded-full bg-pink-400 border border-pink-300"></div>
                    </div>
                  </div>

                  {/* Searching - Highlighted */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Search className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-white">Searching...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">G</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">O</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">O</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">Q</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-1 pt-2">
                  <div className="text-xs text-gray-500">Category name</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {companyName || "Company name"}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Number of employees</div>
                </div>

                {/* Workspace Status */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Workspace Status</span>
                  <span className="text-xs font-medium text-gray-600">Active</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - 4 units (Form) */}
        <div className="w-[50%] p-6 overflow-auto">
          <div className={`bg-white rounded-lg border border-gray-200 p-6 ${
            currentStep === 1 ? "flex flex-col justify-center min-h-full" : ""
          }`}>
            {currentStep === 1 ? (
              <div className="max-w-md mx-auto w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        General Information
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">Step 1 of 4</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-md">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  Provide basic information about your company. Fill in all required fields to continue.
                </p>

                <div className="space-y-5">
                  {/* Company Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                      Company Name
                      <span className="text-orange-500">*</span>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    </label>
                    <Input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name..."
                      className="h-11 text-sm border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                  </div>

                  {/* Sector */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                      Sector
                      <span className="text-orange-500">*</span>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    </label>
                    <Select value={sector} onValueChange={setSector}>
                      <SelectTrigger className="h-11 text-sm border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all">
                        <SelectValue placeholder="Select sector..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of Employees */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                      Number of Employees
                      <span className="text-orange-500">*</span>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    </label>
                    <Input
                      type="text"
                      value={numberOfEmployees}
                      onChange={(e) => setNumberOfEmployees(e.target.value)}
                      placeholder="Enter number of employees..."
                      className="h-11 text-sm border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                  </div>

                  {/* Continue Button */}
                  <div className="pt-3">
                    <Button
                      onClick={handleContinue}
                      disabled={isContinueDisabled}
                      className={`w-full h-11 text-sm font-semibold transition-all shadow-sm ${
                        isContinueDisabled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg"
                      }`}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            ) : currentStep === 2 ? (
              <>
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to General Information</span>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-md">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add modules
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Select the modules you want to include in your workspace.
                  </p>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {modules.map((module) => {
                    const Icon = module.icon
                    const isSelected = selectedModules.includes(module.id)
                    return (
                      <div
                        key={module.id}
                        onClick={() => toggleModule(module.id)}
                        className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? "border-orange-300 bg-orange-50/50"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                        }`}
                      >
                        <div className="absolute top-3 right-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleModule(module.id)}
                            className="border border-gray-300"
                          />
                        </div>
                        <div className="flex flex-col gap-2.5 pr-8">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            isSelected 
                              ? "bg-orange-100" 
                              : "bg-gray-50"
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              isSelected ? "text-orange-600" : "text-gray-500"
                            }`} />
                          </div>
                          <div>
                            <h4 className={`font-semibold text-gray-900 text-sm mb-0.5 ${
                              isSelected ? "text-orange-700" : ""
                            }`}>
                              {module.name}
                            </h4>
                            <p className={`text-xs leading-snug ${
                              isSelected ? "text-orange-600/80" : "text-gray-500"
                            }`}>
                              {module.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Continue Button */}
                <div className="pt-3">
                  <Button
                    onClick={handleContinue}
                    disabled={isContinueDisabled}
                    className={`w-full h-11 text-sm font-semibold transition-all shadow-sm ${
                      isContinueDisabled
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    Continue
                  </Button>
                </div>
              </>
            ) : currentStep === 3 ? (
              <>
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Modules</span>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-md">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Select packages
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        Choose the package that best fits your needs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Packages */}
                <div className="space-y-3 mb-6">
                  {packages.map((pkg) => {
                    const isSelected = selectedPackage === pkg.id
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`relative flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-1 h-16 ${pkg.color} rounded-full`}></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {pkg.name}
                          </h4>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-gray-900">{pkg.price}</span>
                            <span className="text-sm text-gray-500">/{pkg.period}</span>
                          </div>
                          <div className="mt-0.5">
                            <span className="text-[10px] text-gray-400 font-normal">3 days free trial</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="h-8 text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Details action
                          }}
                        >
                          Details
                        </Button>
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <Check className="w-5 h-5 text-orange-500" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code..."
                      className="h-10 text-sm border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                    <Button
                      disabled={!promoCode}
                      className={`h-10 px-4 text-sm ${
                        promoCode
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="pt-3">
                  <Button
                    onClick={handleContinue}
                    disabled={isContinueDisabled}
                    className={`w-full h-11 text-sm font-semibold transition-all shadow-sm ${
                      isContinueDisabled
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    Continue
                  </Button>
                </div>
              </>
            ) : currentStep === 4 ? (
              <>
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Pricing Details</span>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-md">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Header - Centered */}
                <div className="mb-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Summary
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Quick overview of workspace details and configuration
                  </p>
                </div>

                {/* Configuration Details */}
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-500">Company Name</span>
                    <span className="text-sm font-semibold text-gray-900">{companyName || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-500">Category</span>
                    <span className="text-sm font-semibold text-gray-900">{sector || "Not specified"}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2 border-t border-dashed border-gray-200 pt-4">
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Employees</span>
                      <span className="text-sm font-semibold text-gray-900">{numberOfEmployees || "Not specified"}</span>
                    </div>
                    <div className="border-l border-dashed border-gray-200 pl-4">
                      <span className="text-sm text-gray-500 block mb-1">Package</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedPackage ? packages.find(p => p.id === selectedPackage)?.name || "Not specified" : "Not specified"}
                      </span>
                    </div>
                    <div className="border-l border-dashed border-gray-200 pl-4">
                      <span className="text-sm text-gray-500 block mb-1">Price</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedPackage ? `${packages.find(p => p.id === selectedPackage)?.price}/${packages.find(p => p.id === selectedPackage)?.period}` : "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selected Modules */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Selected Modules</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModules.length > 0 ? (
                      selectedModules.map((moduleId) => {
                        const module = modules.find(m => m.id === moduleId)
                        if (!module) return null
                        const Icon = module.icon
                        return (
                          <div
                            key={moduleId}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg"
                          >
                            <Icon className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">{module.name}</span>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-sm text-gray-500">No modules selected</div>
                    )}
                  </div>
                </div>

                {/* Complete Button */}
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      window.location.href = "/ex3"
                    }}
                    className="w-full h-12 text-base font-semibold transition-all bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                  >
                    Complete
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
