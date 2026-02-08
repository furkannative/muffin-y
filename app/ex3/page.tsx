"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, Calendar, MessageCircle, User, ChevronDown, Archive, Rocket, Bookmark, Video, Hash, ArrowUp, Paperclip, Plus, Users, X, ZoomIn, ZoomOut, Maximize, HelpCircle, Settings, TrendingUp, LogOut, Mail, ArrowUpRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

export default function Ex3Page() {
  const router = useRouter()
  const [companyType, setCompanyType] = useState("Tech")
  const [location, setLocation] = useState("Berlin")
  const [companySize, setCompanySize] = useState("50+")
  const [jobTitle, setJobTitle] = useState("Frontend Developer")
  const [experience, setExperience] = useState("3+")
  const [skills, setSkills] = useState("React, TypeScript, Figma")
  const [isOrgChartOpen, setIsOrgChartOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isUsageOpen, setIsUsageOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("Current")
  const [activeTab, setActiveTab] = useState("ats")
  const [activeModules, setActiveModules] = useState({
    ats: true,
    salary: true,
    interview: true,
    orgChart: false
  })
  const [draggedPerson, setDraggedPerson] = useState<{ name: string; role: string } | null>(null)
  const [showSimilarSearch, setShowSimilarSearch] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeUsageTab, setActiveUsageTab] = useState('plans')
  const [activeSettingsTab, setActiveSettingsTab] = useState('general')
  const [activeNotificationTab, setActiveNotificationTab] = useState('all')
  const [isCatalystMenuOpen, setIsCatalystMenuOpen] = useState(false)
  const catalystMenuRef = useRef<HTMLDivElement>(null)
  
  // Plan configuration state
  const [selectedPlan, setSelectedPlan] = useState<'founder' | 'talent' | 'recruiters'>('founder')
  const [monthlyCredits, setMonthlyCredits] = useState(100)
  const [additionalCredits, setAdditionalCredits] = useState(0)
  const [hasMarketingPackage, setHasMarketingPackage] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (catalystMenuRef.current && !catalystMenuRef.current.contains(event.target as Node)) {
        setIsCatalystMenuOpen(false)
      }
    }

    if (isCatalystMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCatalystMenuOpen])

  const jobs = [
    {
      title: "UX Strategist",
      assignedTo: "Josefine Thompson",
      avatar: "/professional-woman-developer.png",
      status: "Published",
      metrics: {
        search: 0,
        bookmark: 0,
        message: 0,
        video: 0,
        count: 24
      }
    },
    {
      title: "Chief Design Officer",
      assignedTo: "Josefine Thompson",
      avatar: "/professional-woman-developer.png",
      status: "Published",
      metrics: {
        search: 0,
        bookmark: 0,
        message: 0,
        video: 0,
        count: 20
      }
    },
    {
      title: "Principal UX Designer",
      assignedTo: "Josefine Thompson",
      avatar: "/professional-woman-developer.png",
      status: "Published",
      metrics: {
        search: 0,
        bookmark: 0,
        message: 0,
        video: 0,
        count: 24
      }
    }
  ]

  return (
    <div className="relative" style={{ minHeight: '100vh' }}>
      {/* Background with nature image effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-200 via-green-100 to-yellow-100" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5f3e5' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        {/* Additional blur effect */}
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>

      {/* Top Section */}
      <div className="relative pt-8 px-6" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-12">
          {/* Left - Logo */}
          <div className="flex items-center gap-3 relative" ref={catalystMenuRef}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/ex3')}
                className="flex items-center"
              >
                <Image
                  src="/catalyst.svg"
                  alt="Muffin Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </button>
              {/* Catalyst Expand Button */}
              <button
                onClick={() => setIsCatalystMenuOpen(!isCatalystMenuOpen)}
                className="flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCatalystMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Right Panel - Opens when clicked */}
            {isCatalystMenuOpen && (
              <div 
                className="absolute left-full top-0 ml-4 bg-white rounded-lg shadow-xl border border-gray-200 py-3 min-w-[240px] z-50 transition-all duration-200"
              >
                <div className="overflow-y-auto max-h-[400px]">
                  {/* Layoff Mode */}
                  <button
                    onClick={() => {
                      setIsCatalystMenuOpen(false)
                      router.push('/layoff-copy')
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_layoff)">
                          <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#DC2626"/>
                          <path d="M0 36.0001C6.62744 36.0001 12 30.6275 12 24.0002C12 17.3727 6.62744 12.0001 0 12.0001V20.4001C1.98821 20.4001 3.59998 22.0119 3.59998 24.0002C3.59998 25.9883 1.98821 27.6001 0 27.6001V36.0001Z" fill="url(#paint0_linear_layoff)" fillOpacity="0.72"/>
                          <path d="M40 16.0005C37.9494 15.3509 35.7657 15.0004 33.4999 15.0004C21.6258 15.0004 12 24.6263 12 36.5003C12 37.6922 12.097 38.8614 12.2834 40.0004H25.6421C25.1652 38.9312 24.9001 37.7468 24.9001 36.5003C24.9001 31.7507 28.7503 27.9003 33.4999 27.9003C36.0959 27.9003 38.4231 29.0505 40 30.869V16.0005Z" fill="url(#paint1_linear_layoff)" fillOpacity="0.88"/>
                          <path d="M2.10986 0.000366211C3.10475 9.00025 10.7349 16.0004 20 16.0004C29.265 16.0004 36.8953 9.00025 37.8901 0.000366211H25.0175C24.2228 1.99258 22.2757 3.40035 20 3.40035C17.7242 3.40035 15.7773 1.99258 14.9825 0.000366211H2.10986Z" fill="url(#paint2_linear_layoff)" fillOpacity="0.72"/>
                        </g>
                        <defs>
                          <linearGradient id="paint0_linear_layoff" x1="5.99999" y1="12.0001" x2="5.99999" y2="48.3926" gradientUnits="userSpaceOnUse">
                            <stop offset="0.313079" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                          </linearGradient>
                          <linearGradient id="paint1_linear_layoff" x1="26" y1="15.0004" x2="26" y2="52.9092" gradientUnits="userSpaceOnUse">
                            <stop offset="0.313079" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                          </linearGradient>
                          <linearGradient id="paint2_linear_layoff" x1="20" y1="0.000366211" x2="20" y2="24.2621" gradientUnits="userSpaceOnUse">
                            <stop offset="0.313079" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                          </linearGradient>
                          <clipPath id="clip0_layoff">
                            <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">Layoff Mode</div>
                      <div className="text-xs text-gray-500 mt-0.5">Workforce Optimization</div>
                    </div>
                  </button>
                  
                  {/* Founder Mode */}
                  <button
                    onClick={() => {
                      setIsCatalystMenuOpen(false)
                      router.push('/founder-mode')
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_founder)">
                          <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#2563EB"/>
                          <path d="M0 36.0001C6.62744 36.0001 12 30.6275 12 24.0002C12 17.3727 6.62744 12.0001 0 12.0001V20.4001C1.98821 20.4001 3.59998 22.0119 3.59998 24.0002C3.59998 25.9883 1.98821 27.6001 0 27.6001V36.0001Z" fill="url(#paint0_linear_founder)" fillOpacity="0.72"/>
                          <path d="M40 16.0005C37.9494 15.3509 35.7657 15.0004 33.4999 15.0004C21.6258 15.0004 12 24.6263 12 36.5003C12 37.6922 12.097 38.8614 12.2834 40.0004H25.6421C25.1652 38.9312 24.9001 37.7468 24.9001 36.5003C24.9001 31.7507 28.7503 27.9003 33.4999 27.9003C36.0959 27.9003 38.4231 29.0505 40 30.869V16.0005Z" fill="url(#paint1_linear_founder)" fillOpacity="0.88"/>
                          <path d="M2.10986 0.000366211C3.10475 9.00025 10.7349 16.0004 20 16.0004C29.265 16.0004 36.8953 9.00025 37.8901 0.000366211H25.0175C24.2228 1.99258 22.2757 3.40035 20 3.40035C17.7242 3.40035 15.7773 1.99258 14.9825 0.000366211H2.10986Z" fill="url(#paint2_linear_founder)" fillOpacity="0.72"/>
                        </g>
                        <defs>
                          <linearGradient id="paint0_linear_founder" x1="5.99999" y1="12.0001" x2="5.99999" y2="48.3926" gradientUnits="userSpaceOnUse">
                            <stop offset="0.313079" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                          </linearGradient>
                          <linearGradient id="paint1_linear_founder" x1="26" y1="15.0004" x2="26" y2="52.9092" gradientUnits="userSpaceOnUse">
                            <stop offset="0.313079" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                          </linearGradient>
                          <linearGradient id="paint2_linear_founder" x1="20" y1="0.000366211" x2="20" y2="24.2621" gradientUnits="userSpaceOnUse">
                            <stop offset="0.313079" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                          </linearGradient>
                          <clipPath id="clip0_founder">
                            <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">Founder Mode</div>
                      <div className="text-xs text-gray-500 mt-0.5">Startup Growth</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={() => setIsUsageOpen(true)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gray-600" />
              </button>
              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
              >
                <User className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Prompt Section */}
        <div className="text-center mb-16">
          {/* Muffin Icon */}
          <div className="w-10 h-10 mx-auto mb-6 flex items-center justify-center">
            <div className="w-8 h-8 relative">
              <div className="w-full h-full bg-gradient-to-br from-[#E0406A] to-[#FF6B9D] rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#E0406A] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Prompt */}
          <h1 className="text-3xl font-serif text-gray-800 mb-8">Describe who you want to hire</h1>

          {/* Interactive Prompt Area */}
          <div 
            className="max-w-4xl mx-auto"
            onDrop={(e) => {
              e.preventDefault();
              console.log('🎯 DROP EVENT TRIGGERED!');
              
              // Basit yaklaşım - direkt test
              setDraggedPerson({ name: 'Samantha Creek', role: 'CTO' });
              setShowSimilarSearch(true);
              setIsOrgChartOpen(false);
              console.log('✅ Person set to Samantha Creek');
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              console.log('Drag over prompt area');
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              console.log('Drag enter prompt area');
            }}
          >
            {!showSimilarSearch ? (
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              {/* Prompt Text with Editable Fields */}
              <div className="text-left space-y-4 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are a{" "}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    <Input
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className="w-16 h-6 px-1 text-center bg-transparent border-0 text-blue-800 font-medium text-sm focus:ring-0 focus:outline-none"
                    />
                  </span>
                  {" "}company based in{" "}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-16 h-6 px-1 text-center bg-transparent border-0 text-green-800 font-medium text-sm focus:ring-0 focus:outline-none"
                    />
                  </span>
                  {" "}with{" "}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                    <Input
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-16 h-6 px-1 text-center bg-transparent border-0 text-purple-800 font-medium text-sm focus:ring-0 focus:outline-none"
                    />
                  </span>
                  {" "}employes.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are hiring a{" "}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                    <Input
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-24 h-6 px-1 text-center bg-transparent border-0 text-orange-800 font-medium text-sm focus:ring-0 focus:outline-none"
                    />
                  </span>
                  {" "}with{" "}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800 border border-pink-200">
                    <Input
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-16 h-6 px-1 text-center bg-transparent border-0 text-pink-800 font-medium text-sm focus:ring-0 focus:outline-none"
                    />
                  </span>
                  {" "}years experience
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  who is skilled in{" "}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                    <Input
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-40 h-6 px-1 text-center bg-transparent border-0 text-indigo-800 font-medium text-sm focus:ring-0 focus:outline-none"
                    />
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* ATS Module */}
                  <div className="relative group">
                    <div className="flex items-center gap-1 px-4 py-2 rounded-lg border transition-all hover:shadow-md"
                      style={{
                        backgroundColor: activeModules.ats ? 'rgb(239, 246, 255)' : 'rgb(250, 250, 250)',
                        borderColor: activeModules.ats ? 'rgb(59, 130, 246)' : 'rgb(229, 231, 235)'
                      }}
                    >
                      <button 
                        onClick={() => {
                          setActiveTab("ats")
                          setActiveModules(prev => ({ ...prev, ats: !prev.ats }))
                        }}
                        className="text-sm font-medium pr-6"
                        style={{ color: activeModules.ats ? 'rgb(59, 130, 246)' : 'rgb(107, 114, 128)' }}
                      >
                        ATS
                      </button>
                      <div className="relative">
                        <HelpCircle className="w-3 h-3 absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-help" />
                        {/* Tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-48" style={{ fontFamily: 'cursive', fontStyle: 'italic' }}>
                            <p className="text-xs text-gray-700 leading-relaxed">
                              Applicant Tracking System
                            </p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-1">
                              Manage all your candidates here
                            </p>
                          </div>
                          {/* Arrow */}
                          <div className="absolute left-1/2 -translate-x-1/2 -top-1">
                            <div className="w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Salary Module */}
                  <div className="relative group">
                    <div className="flex items-center gap-1 px-4 py-2 rounded-lg border transition-all hover:shadow-md"
                      style={{
                        backgroundColor: activeModules.salary ? 'rgb(239, 246, 255)' : 'rgb(250, 250, 250)',
                        borderColor: activeModules.salary ? 'rgb(59, 130, 246)' : 'rgb(229, 231, 235)'
                      }}
                    >
                      <button 
                        onClick={() => {
                          setActiveTab("salary")
                          setActiveModules(prev => ({ ...prev, salary: !prev.salary }))
                        }}
                        className="text-sm font-medium pr-6"
                        style={{ color: activeModules.salary ? 'rgb(59, 130, 246)' : 'rgb(107, 114, 128)' }}
                      >
                        Salary
                      </button>
                      <div className="relative">
                        <HelpCircle className="w-3 h-3 absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-help" />
                        {/* Tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-48" style={{ fontFamily: 'cursive', fontStyle: 'italic' }}>
                            <p className="text-xs text-gray-700 leading-relaxed">
                              Salary Expectations
                            </p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-1">
                              Set and manage salary ranges
                            </p>
                          </div>
                          {/* Arrow */}
                          <div className="absolute left-1/2 -translate-x-1/2 -top-1">
                            <div className="w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interview Module */}
                  <div className="relative group">
                    <div className="flex items-center gap-1 px-4 py-2 rounded-lg border transition-all hover:shadow-md"
                      style={{
                        backgroundColor: activeModules.interview ? 'rgb(239, 246, 255)' : 'rgb(250, 250, 250)',
                        borderColor: activeModules.interview ? 'rgb(59, 130, 246)' : 'rgb(229, 231, 235)'
                      }}
                    >
                      <button 
                        onClick={() => {
                          setActiveTab("interview")
                          setActiveModules(prev => ({ ...prev, interview: !prev.interview }))
                        }}
                        className="text-sm font-medium pr-6"
                        style={{ color: activeModules.interview ? 'rgb(59, 130, 246)' : 'rgb(107, 114, 128)' }}
                      >
                        Interview
                      </button>
                      <div className="relative">
                        <HelpCircle className="w-3 h-3 absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-help" />
                        {/* Tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-48" style={{ fontFamily: 'cursive', fontStyle: 'italic' }}>
                            <p className="text-xs text-gray-700 leading-relaxed">
                              Interview Scheduling
                            </p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-1">
                              Plan and track interviews
                            </p>
                          </div>
                          {/* Arrow */}
                          <div className="absolute left-1/2 -translate-x-1/2 -top-1">
                            <div className="w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Org Chart Module */}
                  <div className="relative group">
                    <div className="flex items-center gap-1 px-4 py-2 rounded-lg border transition-all hover:shadow-md"
                      style={{
                        backgroundColor: activeModules.orgChart ? 'rgb(239, 246, 255)' : 'rgb(250, 250, 250)',
                        borderColor: activeModules.orgChart ? 'rgb(59, 130, 246)' : 'rgb(229, 231, 235)'
                      }}
                    >
                      <button 
                        onClick={() => {
                          setActiveTab("orgChart")
                          setActiveModules(prev => ({ ...prev, orgChart: !prev.orgChart }))
                          setIsOrgChartOpen(true)
                        }}
                        className="text-sm font-medium flex items-center gap-2 pr-6"
                        style={{ color: activeModules.orgChart ? 'rgb(59, 130, 246)' : 'rgb(107, 114, 128)' }}
                      >
                        <Users className="w-4 h-4" />
                        Org Chart
                      </button>
                      <div className="relative">
                        <HelpCircle className="w-3 h-3 absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-help" />
                        {/* Tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-48" style={{ fontFamily: 'cursive', fontStyle: 'italic' }}>
                            <p className="text-xs text-gray-700 leading-relaxed">
                              Organizational Chart
                            </p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-1">
                              Visualize team structure
                            </p>
                          </div>
                          {/* Arrow */}
                          <div className="absolute left-1/2 -translate-x-1/2 -top-1">
                            <div className="w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                
                <Button 
                  onClick={() => window.location.href = '/analysis3'}
                  size="sm" 
                  className="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg"
                >
                  <ArrowUp className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>
            ) : (
              /* Similar Search Interface - Sadece Search Interface, People List Card yok */
              <div className="space-y-4">
                {/* Search Interface */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                  {/* Search Bar */}
                  <div className="flex items-center gap-3 mb-4">
                    <Search className="w-5 h-5 text-gray-400" />
                    <Input 
                      placeholder="@mention people to find similar matches"
                      className="flex-1 border-0 focus:ring-0 text-lg"
                    />
                    <Button variant="ghost" size="sm" className="p-1">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Similar Search Panel */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-gray-700 font-medium">Find people similar to</span>
                      {draggedPerson && (
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border cursor-pointer">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {draggedPerson.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium">{draggedPerson.name}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1 h-auto"
                            onClick={() => setDraggedPerson(null)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                        <Search className="w-4 h-4" />
                        Find similar
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-3 h-3 border-2 border-gray-600 rounded-sm"></div>
                        </div>
                        Compare
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-auto p-2"
                        onClick={() => setShowSimilarSearch(false)}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="relative px-6 pb-8" style={{ position: 'relative', zIndex: 1 }}>
        <Card className="bg-white shadow-xl rounded-2xl border-0">
          <CardContent className="p-8">
            {/* Jobs Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Jobs</h2>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search jobs..."
                  className="pl-10 bg-white border-gray-200 rounded-lg"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-white border-gray-200">
                <User className="w-4 h-4 text-lime-500" />
                Only my jobs
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-white border-gray-200">
                <Archive className="w-4 h-4" />
                Show archived
              </Button>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Senior Product Designer",
                  assignedTo: "Tom Gunnarsson",
                  avatar: "/placeholder-user.jpg",
                  status: "Published",
                  metrics: {
                    found: 224,
                    saved: 41,
                    contacted: 32,
                    interview: 3
                  },
                  action: "2 actions needed"
                },
                {
                  title: "Principal UX Designer", 
                  assignedTo: "Amanda J.",
                  avatar: "/placeholder-user.jpg",
                  status: "Published",
                  metrics: {
                    found: 24,
                    saved: 20,
                    contacted: 22,
                    interview: 14
                  },
                  action: "4 actions needed"
                },
                {
                  title: "Chief Design Officer",
                  assignedTo: "Richard Smalls", 
                  avatar: "/placeholder-user.jpg",
                  status: "Published",
                  metrics: {
                    found: 1202,
                    saved: 52,
                    contacted: 25,
                    interview: 7
                  },
                  action: "Review job description"
                }
              ].map((job, index) => (
                index === 1 ? (
                  // Second card - Current Project style
                  <Card key={index} className="bg-blue-50 shadow-sm hover:shadow-md transition-shadow border-gray-100">
                    <CardContent className="px-6 pt-4 pb-6">
                      {/* Header */}
                      <div className="px-4 py-2.5 rounded-lg mb-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-normal text-gray-900">SaaS - Full Stack Web Dev</h4>
                        <button 
                          onClick={() => window.location.href = '/project-detail/1'}
                          className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm text-gray-700"
                        >
                          Details
                        </button>
                      </div>
                        <div className="mt-3 border-b border-blue-200"></div>
                      </div>

                      {/* Project Manager and Status */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-500">Project Manager</label>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-pink-100 text-pink-700 text-xs">LP</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-900">Laura P.</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-500">Status</label>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              In Progress
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2 mb-4">
                        <label className="text-xs text-gray-500">Timeline</label>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-900">01/15/2025 · 02/15/2025</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2 mb-4">
                        <label className="text-xs text-gray-500">Description</label>
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-900">We are a Tech company based in Berlin with 50+ employes. We are hiring a Full Stack Web Developer with 3+ years experience who is skilled in React, TypeScript, Figma</span>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="pt-4 mt-4 border-t border-gray-200">
                        <label className="text-xs text-gray-500 mb-3 block">Project Metrics</label>
                        <div className="grid grid-cols-4 gap-3">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Search className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-500 mb-1">Found</p>
                            <p className="text-lg font-bold text-gray-900">224</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Bookmark className="w-5 h-5 text-green-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-500 mb-1">Saved</p>
                            <p className="text-lg font-bold text-gray-900">41</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-500 mb-1">Contacted</p>
                            <p className="text-lg font-bold text-gray-900">32</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Video className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-500 mb-1">Interview</p>
                            <p className="text-lg font-bold text-gray-900">3</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card key={index} className={`${index === 0 ? 'bg-green-50' : index === 2 ? 'bg-purple-50' : 'bg-pink-50'} shadow-sm hover:shadow-md transition-shadow border-gray-100`}>
                    <CardContent className="px-6 pt-4 pb-6">
                      {/* Header */}
                      <div className="px-4 py-2.5 rounded-lg mb-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-normal text-gray-900">
                            {index === 0 ? "Data Engineer - Big Data & Analytics" : index === 2 ? "FinTech Marketing Manager" : "TechFlow - Mobile Developer"}
                          </h4>
                          <button 
                            onClick={() => {
                              if (index === 0) {
                                window.location.href = '/project-detail/3'
                              } else if (index === 2) {
                                window.location.href = '/project-detail/4'
                              }
                            }}
                            className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm text-gray-700"
                          >
                            Details
                          </button>
                        </div>
                        <div className="mt-3 border-b border-blue-200"></div>
                      </div>

                      {/* Project Manager and Status */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-500">Project Manager</label>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className={`${index === 0 ? 'bg-green-100 text-green-700' : index === 2 ? 'bg-pink-100 text-pink-700' : 'bg-red-100 text-red-700'} text-xs`}>
                                {index === 0 ? 'DT' : index === 2 ? 'LP' : 'AJ'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-900">{index === 0 ? 'Data Team Lead' : index === 2 ? 'Laura P.' : 'Amanda J.'}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-500">Status</label>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Published
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2 mb-4">
                        <label className="text-xs text-gray-500">Timeline</label>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-900">{index === 0 ? '01/01/2025 · 02/01/2025' : '02/01/2025 · 03/01/2025'}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2 mb-4">
                        <label className="text-xs text-gray-500">Description</label>
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-900">
                            {index === 0 
                              ? 'We are a Tech company based in Berlin with 50+ employes. We are hiring a Data Engineer with 3+ years experience who is skilled in Python, Spark, Kafka, AWS/GCP'
                              : index === 2
                              ? 'We are a FinTech company based in Istanbul with 50+ employes. We are hiring a Marketing Manager with 3+ years experience who is skilled in Digital Marketing, SEO, Analytics, Social Media'
                              : 'We are a SaaS company based in London with 50+ employes. We are hiring a Mobile Developer with 3+ years experience who is skilled in React Native, Swift, Kotlin'
                            }
                          </span>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="pt-4 mt-4 border-t border-gray-200">
                        <label className="text-xs text-gray-500 mb-3 block">Project Metrics</label>
                        <div className="grid grid-cols-4 gap-3">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Search className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-500 mb-1">Sourced</p>
                            <p className="text-lg font-bold text-gray-900">{index === 0 ? 280 : job.metrics.found || 0}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Bookmark className="w-5 h-5 text-green-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-500 mb-1">Interview</p>
                            <p className="text-lg font-bold text-gray-900">{index === 0 ? 35 : job.metrics.saved || 0}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-500 mb-1">ATS</p>
                            <p className="text-lg font-bold text-gray-900">{index === 0 ? 22 : job.metrics.contacted || 0}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Video className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-500 mb-1">Shortlist</p>
                            <p className="text-lg font-bold text-gray-900">{index === 0 ? 8 : job.metrics.interview || 0}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Org Chart Modal */}
      <Dialog open={isOrgChartOpen} onOpenChange={setIsOrgChartOpen}>
        <DialogContent 
          className="w-[95vw] h-[100vh] max-w-none p-0 fixed right-0 top-0 translate-x-0 translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right rounded-l-2xl border-l border-gray-200" 
          style={{ 
            right: 0, 
            left: 'auto',
            margin: 0,
            transform: 'none',
            width: '50vw',
            maxWidth: 'none',
            minWidth: '50vw'
          }}
        >
          <DialogHeader className="p-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOrgChartOpen(false)}
                  className="w-8 h-8 p-0 rounded-full hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-800">FinTech Growth Planner</DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">Plan and visualize your organization's growth</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Growth Projection */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm font-medium text-gray-700">Growth Projection:</span>
              <div className="flex gap-2">
                {["Current", "6 Months", "1 Year", "3 Years"].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={selectedTimeframe === timeframe ? "bg-gray-800 text-white" : ""}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
          </DialogHeader>

          {/* Org Chart Content */}
          <div className="flex-1 p-4 pt-4 overflow-auto">
            <div className="relative min-h-[400px] bg-gray-50 rounded-lg p-4">
              {/* Interactive Org Chart Nodes */}
              <div className="relative w-full h-full min-h-[500px]">
                {/* CEO Node */}
                <div 
                  className="absolute bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg cursor-move select-none hover:bg-blue-700 transition-colors"
                  style={{ left: '50%', top: '20px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM CEO');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'ceo');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Patricia Holm', role: 'CEO' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="text-lg font-bold">Patricia Holm</div>
                  <div className="text-sm opacity-90">CEO</div>
                </div>

                {/* C-Level Nodes */}
                <div 
                  className="absolute bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg cursor-move select-none hover:bg-blue-700 transition-colors"
                  style={{ left: '25%', top: '150px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM CTO');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'cto');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Samantha Creek', role: 'CTO' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="text-lg font-bold">Samantha Creek</div>
                  <div className="text-sm opacity-90">CTO</div>
                </div>

                <div 
                  className="absolute bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg cursor-move select-none hover:bg-blue-700 transition-colors"
                  style={{ left: '75%', top: '150px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM CFO');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'cfo');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Daniel Louis', role: 'CFO' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="text-lg font-bold">Daniel Louis</div>
                  <div className="text-sm opacity-90">CFO</div>
                </div>

                {/* Samantha's Team Nodes */}
                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '15%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM DEVELOPER');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'dev1');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Edward Scott', role: 'Developer' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Edward Scott</div>
                  <div className="text-sm text-gray-600">Developer</div>
                </div>

                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '35%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM DESIGNER');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'designer');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Jane Frida', role: 'Designer' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Jane Frida</div>
                  <div className="text-sm text-gray-600">Designer</div>
                </div>

                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '55%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM MANAGER');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'manager');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Tia Freeman', role: 'Manager' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Tia Freeman</div>
                  <div className="text-sm text-gray-600">Manager</div>
                </div>

                {/* Daniel's Team Nodes */}
                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '65%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM ANALYST');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'analyst');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Hugh Tran', role: 'Analyst' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Hugh Tran</div>
                  <div className="text-sm text-gray-600">Analyst</div>
                </div>

                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '85%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM SPECIALIST');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'specialist');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Richard Johansson', role: 'Specialist' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Richard Johansson</div>
                  <div className="text-sm text-gray-600">Specialist</div>
                </div>
              </div>

              {/* Dynamic Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                {/* CEO to C-Level */}
                <line x1="50%" y1="100" x2="50%" y2="140" stroke="#3B82F6" strokeWidth="4" />
                <line x1="25%" y1="140" x2="75%" y2="140" stroke="#3B82F6" strokeWidth="4" />
                <line x1="25%" y1="140" x2="25%" y2="180" stroke="#3B82F6" strokeWidth="4" />
                <line x1="75%" y1="140" x2="75%" y2="180" stroke="#3B82F6" strokeWidth="4" />
                
                {/* C-Level to Teams */}
                <line x1="25%" y1="220" x2="25%" y2="260" stroke="#3B82F6" strokeWidth="4" />
                <line x1="15%" y1="260" x2="55%" y2="260" stroke="#3B82F6" strokeWidth="4" />
                <line x1="15%" y1="260" x2="15%" y2="300" stroke="#3B82F6" strokeWidth="4" />
                <line x1="35%" y1="260" x2="35%" y2="300" stroke="#3B82F6" strokeWidth="4" />
                <line x1="55%" y1="260" x2="55%" y2="300" stroke="#3B82F6" strokeWidth="4" />
                
                <line x1="75%" y1="220" x2="75%" y2="260" stroke="#3B82F6" strokeWidth="4" />
                <line x1="65%" y1="260" x2="85%" y2="260" stroke="#3B82F6" strokeWidth="4" />
                <line x1="65%" y1="260" x2="65%" y2="300" stroke="#3B82F6" strokeWidth="4" />
                <line x1="85%" y1="260" x2="85%" y2="300" stroke="#3B82F6" strokeWidth="4" />
              </svg>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Departments</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">9 departments</Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="w-[92vw] max-w-[92vw] h-[85vh] overflow-hidden p-0" style={{ maxWidth: '92vw', height: '85vh' }}>
          <div className="flex h-full max-h-[85vh]">
            {/* Left Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">SETTINGS</h4>
                  <div className="space-y-1">
                    <div 
                      onClick={() => setActiveSettingsTab('general')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSettingsTab === 'general' ? 'bg-white border border-gray-300' : 'hover:bg-gray-100'}`}
                    >
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className={`text-sm ${activeSettingsTab === 'general' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>General</span>
                    </div>
                    <div 
                      onClick={() => setActiveSettingsTab('notifications')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSettingsTab === 'notifications' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    >
                      <Bell className="w-5 h-5 text-gray-600" />
                      <span className={`text-sm ${activeSettingsTab === 'notifications' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>Notifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto p-8" style={{ maxHeight: '85vh' }}>
              <div className="space-y-6">
                {activeSettingsTab === 'general' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">General Settings</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        Manage your workspace settings and preferences here.
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Workspace Settings */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Workspace Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Workspace Name</label>
                            <Input placeholder="My Muffin" className="mt-1" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Timezone</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                              <option>Europe/Istanbul</option>
                              <option>America/New_York</option>
                              <option>Asia/Tokyo</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Workspace URL</label>
                            <Input placeholder="muffin-workspace" className="mt-1" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Privacy & Security */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                            </svg>
                            Privacy & Security
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Button variant="outline" className="w-full">Change Password</Button>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                              <p className="text-xs text-gray-500">Add an extra layer of security</p>
                            </div>
                            <Button size="sm" variant="outline">Enable</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Session Management</p>
                              <p className="text-xs text-gray-500">Manage active sessions</p>
                            </div>
                            <Button size="sm" variant="outline">Manage</Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Appearance */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                              </svg>
                            </div>
                            Appearance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Theme</p>
                              <p className="text-xs text-gray-500">Light mode</p>
                            </div>
                            <Button size="sm" variant="outline">Change</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Language</p>
                              <p className="text-xs text-gray-500">English</p>
                            </div>
                            <Button size="sm" variant="outline">Change</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Additional spacing for scroll */}
                    <div className="pb-20"></div>
                  </>
                )}

                {activeSettingsTab === 'notifications' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Notification Settings</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        Configure how and when you receive notifications.
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Email Notifications */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Email Notifications
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                              <p className="text-xs text-gray-500">Receive email updates</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Candidate Matches</p>
                              <p className="text-xs text-gray-500">Get notified when new candidates match</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Search Complete</p>
                              <p className="text-xs text-gray-500">Notifications when searches finish</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Weekly Summary</p>
                              <p className="text-xs text-gray-500">Weekly activity report</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Push Notifications */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Push Notifications
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Browser Notifications</p>
                              <p className="text-xs text-gray-500">Receive browser push notifications</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Desktop Notifications</p>
                              <p className="text-xs text-gray-500">Desktop app notifications</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Notification Preferences */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Notification Preferences
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Quiet Hours</label>
                            <div className="flex items-center gap-4">
                              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                                <option>9:00 PM</option>
                                <option>10:00 PM</option>
                                <option>11:00 PM</option>
                              </select>
                              <span className="text-sm text-gray-600">to</span>
                              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                                <option>8:00 AM</option>
                                <option>9:00 AM</option>
                                <option>10:00 AM</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Mute All Notifications</p>
                              <p className="text-xs text-gray-500">Temporarily disable all notifications</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Additional spacing for scroll */}
                    <div className="pb-20"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Usage Modal */}
      <Dialog open={isUsageOpen} onOpenChange={setIsUsageOpen}>
        <DialogContent className="w-[92vw] max-w-[92vw] h-[85vh] overflow-hidden p-0" style={{ maxWidth: '92vw', height: '85vh' }}>
          <div className="flex h-full max-h-[85vh]">
            {/* Left Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">WORKSPACE</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-100 cursor-pointer">
                      <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">My Muffin</span>
                    </div>
                    <div 
                      onClick={() => setActiveUsageTab('people')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeUsageTab === 'people' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    >
                      <Users className="w-5 h-5 text-gray-600" />
                      <span className={`text-sm ${activeUsageTab === 'people' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>People</span>
                    </div>
                    <div 
                      onClick={() => setActiveUsageTab('plans')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeUsageTab === 'plans' ? 'bg-white border border-gray-300' : 'hover:bg-gray-100'}`}
                    >
                      <Bookmark className="w-5 h-5 text-gray-600" />
                      <span className={`text-sm ${activeUsageTab === 'plans' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>Plans & credits</span>
                    </div>
                    <div 
                      onClick={() => setActiveUsageTab('status')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeUsageTab === 'status' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                      </div>
                      <span className={`text-sm ${activeUsageTab === 'status' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>Status</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto p-8" style={{ maxHeight: '85vh' }}>
              <div className="space-y-6">
                {activeUsageTab === 'plans' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Plans & credits</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        You're currently on plan: <strong>Free</strong>. <span className="underline cursor-pointer">Manage your payment preferences</span> and <span className="underline cursor-pointer">view past invoices</span>, or change your plan below.
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                  {/* Founder Plan */}
                  <Card 
                    className={`border-2 cursor-pointer transition-all ${selectedPlan === 'founder' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setSelectedPlan('founder')
                      setMonthlyCredits(100)
                    }}
                  >
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Founder</h3>
                      <p className="text-sm text-gray-600 mb-4">Designed for fast-moving teams building together in real time.</p>
                      <div className="text-5xl font-bold text-gray-900 mb-4">$399</div>
                      <p className="text-sm text-gray-500 mb-4">/month</p>
                      <p className="text-xs text-gray-500 mb-6">3 days free trial</p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">Details</Button>
                      <div className="text-xs text-gray-600 mb-3">All features in Free, plus:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <div className="flex-1">
                            <span>100 monthly credits</span>
                            <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>5 daily credits (up to 150/month)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Talent Acquisition Plan */}
                  <Card 
                    className={`border-2 cursor-pointer transition-all ${selectedPlan === 'talent' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setSelectedPlan('talent')
                      setMonthlyCredits(200)
                    }}
                  >
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Talent Acquisition</h3>
                      <p className="text-sm text-gray-600 mb-4">Advanced controls and power features for growing departments</p>
                      <div className="text-5xl font-bold text-gray-900 mb-4">$699</div>
                      <p className="text-sm text-gray-500 mb-4">/month</p>
                      <p className="text-xs text-gray-500 mb-6">3 days free trial</p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">Details</Button>
                      <div className="text-xs text-gray-600 mb-3">All features in Founder, plus:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <div className="flex-1">
                            <span>200 monthly credits</span>
                            <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>SSO</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Recruiters Plan */}
                  <Card 
                    className={`border-2 cursor-pointer transition-all ${selectedPlan === 'recruiters' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setSelectedPlan('recruiters')
                      setMonthlyCredits(500)
                    }}
                  >
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Recruiters</h3>
                      <p className="text-sm text-gray-600 mb-4">Built for large orgs needing flexibility, scale, and governance.</p>
                      <div className="text-5xl font-bold text-gray-900 mb-4">$999</div>
                      <p className="text-sm text-gray-500 mb-4">/month</p>
                      <p className="text-xs text-gray-500 mb-6">3 days free trial</p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">Details</Button>
                      <div className="text-xs text-gray-600 mb-3">All features in Talent Acquisition, plus:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>500 monthly credits</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>Dedicated support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>Onboarding services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>Custom connections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>Group-based access control</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                    </div>

                    {/* Configure Plan Section */}
                    <div className="mt-12 grid grid-cols-2 gap-8">
                      {/* Left: Configure */}
                      <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Configure your plan</h2>
                            <p className="text-sm text-gray-600">Adjust to match your needs</p>
                          </div>
                          <Select defaultValue="usd">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">US USD</SelectItem>
                              <SelectItem value="eur">EU EUR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Monthly Credits */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <label className="text-sm font-medium text-gray-900">Monthly Credits</label>
                              <p className="text-xs text-gray-500">Number of credits per month</p>
                            </div>
                            <Input 
                              type="number" 
                              value={monthlyCredits} 
                              onChange={(e) => setMonthlyCredits(Number(e.target.value))}
                              className="w-20 text-right"
                              min={100}
                              max={10000}
                            />
                          </div>
                          <Slider
                            value={[monthlyCredits]}
                            onValueChange={(value) => setMonthlyCredits(value[0])}
                            min={100}
                            max={10000}
                            step={100}
                            className="mt-4"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>100</span>
                            <span>10,000+</span>
                          </div>
                        </div>

                        {/* Additional Credits */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <label className="text-sm font-medium text-gray-900">Additional Credits</label>
                              <p className="text-xs text-gray-500">Extra credits beyond base plan</p>
                            </div>
                            <Input 
                              type="number" 
                              value={additionalCredits} 
                              onChange={(e) => setAdditionalCredits(Number(e.target.value))}
                              className="w-20 text-right"
                              min={0}
                              max={5000}
                            />
                          </div>
                          <Slider
                            value={[additionalCredits]}
                            onValueChange={(value) => setAdditionalCredits(value[0])}
                            min={0}
                            max={5000}
                            step={50}
                            className="mt-4"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>0</span>
                            <span>5,000+</span>
                          </div>
                        </div>

                        {/* Marketing Package */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-900">Add Marketing Package</label>
                              <p className="text-xs text-gray-500">AI-powered lead generation & campaign management</p>
                              <p className="text-xs text-purple-600 font-medium mt-1">+$1,500/mo</p>
                            </div>
                            <Switch 
                              checked={hasMarketingPackage}
                              onCheckedChange={setHasMarketingPackage}
                            />
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-gray-600">Direct PMS booking</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-gray-600">24/7 availability</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-gray-600">Cancel anytime</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Monthly Estimate */}
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Monthly Estimate</h3>
                        <div className="text-6xl font-bold mb-2">
                          ${(() => {
                            const basePrice = selectedPlan === 'founder' ? 399 : selectedPlan === 'talent' ? 699 : 999
                            const creditPrice = additionalCredits > 0 ? Math.ceil(additionalCredits / 100) * 10 : 0
                            const marketingPrice = hasMarketingPackage ? 1500 : 0
                            return (basePrice + creditPrice + marketingPrice).toLocaleString()
                          })()}
                        </div>
                        <p className="text-gray-400 mb-8">per month</p>

                        <div className="space-y-4 mb-8">
                          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Breakdown</h4>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Platform fee</span>
                            <span className="text-sm font-medium">
                              ${selectedPlan === 'founder' ? 399 : selectedPlan === 'talent' ? 699 : 999}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Included credits</span>
                            <span className="text-sm font-medium text-green-400">{monthlyCredits} credits</span>
                          </div>
                          {additionalCredits > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-300">Additional credits</span>
                              <span className="text-sm font-medium">
                                ${Math.ceil(additionalCredits / 100) * 10}
                              </span>
                            </div>
                          )}
                          {hasMarketingPackage && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-300">Marketing Package</span>
                              <span className="text-sm font-medium">$1,500</span>
                            </div>
                          )}
                          <div className="border-t border-gray-700 pt-4 mt-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold">Total</span>
                              <span className="text-lg font-bold">
                                ${(() => {
                                  const basePrice = selectedPlan === 'founder' ? 399 : selectedPlan === 'talent' ? 699 : 999
                                  const creditPrice = additionalCredits > 0 ? Math.ceil(additionalCredits / 100) * 10 : 0
                                  const marketingPrice = hasMarketingPackage ? 1500 : 0
                                  return (basePrice + creditPrice + marketingPrice).toLocaleString()
                                })()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 text-base font-medium py-6 flex items-center justify-center gap-2">
                          Get Started
                          <ArrowUpRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {activeUsageTab === 'status' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Status</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        Track your current usage and monitor your account status. <strong>Free plan</strong> includes 100 monthly credits.
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Monthly Usage */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Usage</h3>
                          <p className="text-sm text-gray-600 mb-4">Your monthly credit consumption and remaining balance.</p>
                          <div className="text-5xl font-bold text-gray-900 mb-4">73</div>
                          <p className="text-sm text-gray-500 mb-4">of 100 credits used</p>
                          <p className="text-xs text-gray-500 mb-6">27 credits remaining this month</p>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Used</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-blue-600 rounded-full" style={{ width: '73%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">100</span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">View Details</Button>
                          <div className="border border-gray-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-700">
                              <span>Next reset: Dec 1, 2025</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Current usage includes:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <div className="flex-1">
                                <span>51 candidate searches</span>
                                <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>22 AI analysis requests</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Daily Usage */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Daily Usage</h3>
                          <p className="text-sm text-gray-600 mb-4">Track your daily credit consumption and limits.</p>
                          <div className="text-5xl font-bold text-gray-900 mb-4">3</div>
                          <p className="text-sm text-gray-500 mb-4">of 5 credits used today</p>
                          <p className="text-xs text-gray-500 mb-6">2 credits remaining today</p>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Used</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-purple-600 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">5</span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">View Details</Button>
                          <div className="border border-gray-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-700">
                              <span>Resets in: 14h 32m</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Today's activity:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <div className="flex-1">
                                <span>3 searches performed</span>
                                <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>2 candidates found</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* AI Requests */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Requests</h3>
                          <p className="text-sm text-gray-600 mb-4">Monthly AI analysis and processing requests.</p>
                          <div className="mb-4">
                            <div className="text-sm text-gray-700 mb-2">1,247 requests</div>
                            <div className="text-sm text-gray-700 mb-4">this month</div>
                          </div>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Used</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-green-600 rounded-full" style={{ width: '83%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">83%</span>
                          </div>
                          <Button variant="outline" className="w-full mb-4">View Analytics</Button>
                          <div className="text-xs text-gray-600 mb-3">Request summary:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Avg: 42 requests/day</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Peak: 68 requests/day</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Candidate analysis: 892</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Search queries: 355</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                {activeUsageTab === 'people' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">People</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        Manage your team members and their permissions. <strong>You have 8 active members</strong> in your workspace.
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Team Members */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Team Members</h3>
                          <p className="text-sm text-gray-600 mb-4">Active team members and their roles in your workspace.</p>
                          <div className="text-5xl font-bold text-gray-900 mb-4">8</div>
                          <p className="text-sm text-gray-500 mb-4">active members</p>
                          <p className="text-xs text-gray-500 mb-6">2 pending invitations</p>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Active</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">10</span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">Invite Member</Button>
                          <div className="border border-gray-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-700">
                              <span>Last active: 2 hours ago</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Member roles include:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <div className="flex-1">
                                <span>3 Admins</span>
                                <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>5 Members</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Permissions */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Permissions</h3>
                          <p className="text-sm text-gray-600 mb-4">Access levels and permission settings for your team.</p>
                          <div className="text-5xl font-bold text-gray-900 mb-4">12</div>
                          <p className="text-sm text-gray-500 mb-4">active permissions</p>
                          <p className="text-xs text-gray-500 mb-6">across 3 role types</p>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Configured</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-purple-600 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">16</span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">Manage Permissions</Button>
                          <div className="border border-gray-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-700">
                              <span>Last updated: 1 day ago</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Permission types:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <div className="flex-1">
                                <span>Full access: 3 users</span>
                                <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Limited access: 5 users</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Workspace Access */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Workspace Access</h3>
                          <p className="text-sm text-gray-600 mb-4">Members with access to different workspace areas.</p>
                          <div className="mb-4">
                            <div className="text-sm text-gray-700 mb-2">8 members</div>
                            <div className="text-sm text-gray-700 mb-4">have workspace access</div>
                          </div>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Active</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-green-600 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">90%</span>
                          </div>
                          <Button variant="outline" className="w-full mb-4">View Members</Button>
                          <div className="text-xs text-gray-600 mb-3">Access summary:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Projects: 8 members</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Candidates: 6 members</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Analytics: 3 members</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Settings: 3 members</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Overlays */}
      {(isNotificationOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsNotificationOpen(false)
            setIsProfileOpen(false)
          }}
        />
      )}

      {/* Notification Panel */}
      {isNotificationOpen && (
        <div className="fixed top-20 right-6 w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-[600px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                Mark all as read
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center px-4 border-b border-gray-200">
            <button 
              onClick={() => setActiveNotificationTab('all')}
              className={`px-4 py-3 text-sm font-medium relative ${activeNotificationTab === 'all' ? 'border-b-2 border-purple-600 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveNotificationTab('applications')}
              className={`px-4 py-3 text-sm relative ${activeNotificationTab === 'applications' ? 'border-b-2 border-purple-600 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Applications
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">3</span>
              </span>
            </button>
            <button 
              onClick={() => setActiveNotificationTab('interviews')}
              className={`px-4 py-3 text-sm ${activeNotificationTab === 'interviews' ? 'border-b-2 border-purple-600 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Interviews
            </button>
            <button 
              onClick={() => setActiveNotificationTab('analysis')}
              className={`px-4 py-3 text-sm ${activeNotificationTab === 'analysis' ? 'border-b-2 border-purple-600 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Analysis
            </button>
            <div className="ml-auto">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Notifications Content */}
          <div className="overflow-y-auto flex-1">
            <div className="p-4 space-y-4">
              {/* All Tab - Show all notifications */}
              {activeNotificationTab === 'all' && (
                <>
                  {/* Notification 1 - Application */}
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          New candidate applied for <span className="font-semibold">Full Stack Web Dev</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">8 min ago</span>
                          <span className="text-purple-500 text-xs">📋</span>
                          <span className="text-xs text-purple-600">SaaS Project</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                            Shortlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification 2 - Interview */}
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Interview scheduled with <span className="font-semibold">Sarah Johnson</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">2 hours ago</span>
                          <span className="text-orange-500 text-xs">📅</span>
                          <span className="text-xs text-orange-600">Tomorrow, 2:00 PM</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Details
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                            Join Meeting
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification 3 - Analysis */}
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <Search className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Analysis completed for <span className="font-semibold">Flutter Developer</span> search
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">3 hours ago</span>
                          <span className="text-blue-500 text-xs">✅</span>
                          <span className="text-xs text-blue-600">224 candidates found</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <Search className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">View Results</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification 4 - Email */}
                  <div className="relative pb-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Email sent to <span className="font-semibold">Michael Chen</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">2 days ago</span>
                          <span className="text-green-500 text-xs">✉️</span>
                          <span className="text-xs text-green-600">Data Engineer Role</span>
                        </div>
                        <div className="mt-3 px-3 py-2 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">Subject: Interview Invitation - Data Engineer Position</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Applications Tab */}
              {activeNotificationTab === 'applications' && (
                <>
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          New candidate applied for <span className="font-semibold">Full Stack Web Dev</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">8 min ago</span>
                          <span className="text-purple-500 text-xs">📋</span>
                          <span className="text-xs text-purple-600">SaaS Project</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                            Shortlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">Alex Martinez</span> applied for <span className="font-semibold">Flutter Developer</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">1 hour ago</span>
                          <span className="text-blue-500 text-xs">📋</span>
                          <span className="text-xs text-blue-600">Mobile Team Project</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View Profile
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">Emily Rodriguez</span> submitted application for <span className="font-semibold">Data Engineer</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">3 hours ago</span>
                          <span className="text-pink-500 text-xs">📋</span>
                          <span className="text-xs text-pink-600">Big Data & Analytics</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View CV
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-pink-600 rounded-lg hover:bg-pink-700">
                            Schedule Interview
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Interviews Tab */}
              {activeNotificationTab === 'interviews' && (
                <>
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Interview scheduled with <span className="font-semibold">Sarah Johnson</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">2 hours ago</span>
                          <span className="text-orange-500 text-xs">📅</span>
                          <span className="text-xs text-orange-600">Tomorrow, 2:00 PM</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Details
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                            Join Meeting
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Interview reminder: <span className="font-semibold">David Kim</span> in 30 minutes
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">5 hours ago</span>
                          <span className="text-red-500 text-xs">⏰</span>
                          <span className="text-xs text-red-600">Today, 3:30 PM</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Reschedule
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">
                            Prepare
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">Lisa Anderson</span> completed technical interview
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">1 day ago</span>
                          <span className="text-green-500 text-xs">✅</span>
                          <span className="text-xs text-green-600">Frontend Developer Role</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View Feedback
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700">
                            Next Step
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Analysis Tab */}
              {activeNotificationTab === 'analysis' && (
                <>
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <Search className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Analysis completed for <span className="font-semibold">Flutter Developer</span> search
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">3 hours ago</span>
                          <span className="text-blue-500 text-xs">✅</span>
                          <span className="text-xs text-blue-600">224 candidates found</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <Search className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">View Results</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <Search className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Candidate search in progress for <span className="font-semibold">Full Stack Web Dev</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">1 day ago</span>
                          <span className="text-purple-500 text-xs">🔄</span>
                          <span className="text-xs text-purple-600">Scanning 3,200 profiles...</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">65%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                          <Search className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">Data Engineer</span> analysis found <span className="font-semibold">156 top matches</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">2 days ago</span>
                          <span className="text-teal-500 text-xs">✨</span>
                          <span className="text-xs text-teal-600">Big Data & Analytics Project</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <Search className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">View Best Matches</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
            <span className="text-xs text-gray-500">Use →I to navigate</span>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Manage Notification</span>
            </button>
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="fixed top-20 right-6 w-[240px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
          <div className="p-2">
            <button
              onClick={() => {
                window.location.href = "/signup"
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 text-gray-600" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
