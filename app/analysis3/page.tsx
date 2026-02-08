"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Sparkles, Search, Clock, ChevronDown, CheckCircle, HelpCircle, TrendingUp, Users, Bookmark, Archive, Video, Target, DollarSign, Shield, Database, Building, TrendingDown, UserCircle, UserCheck, Network, Briefcase, Star, Award, Trophy, TrendingDown as TrendingDownIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearch } from "@/lib/search-context"

function FlowConnector() {
  return (
    <div className="relative my-2 flex justify-center pointer-events-none">
      <div className="relative flex flex-col items-center scale-50">
        {/* Vertical shimmering line */}
        <div className="relative h-14 w-1 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/60 to-primary/20" />
          <div className="absolute inset-0 bg-shimmer opacity-40" />
        </div>
        {/* Center node with pulse */}
        <div className="relative mt-2 mb-1">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-md animate-pulse-glow" />
          <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border border-border" />
        </div>
        {/* Bottom short line */}
        <div className="relative h-14 w-1 rounded-full overflow-hidden -mt-1">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/20 to-primary/0" />
          <div className="absolute inset-0 bg-shimmer opacity-30" />
        </div>
      </div>
    </div>
  )
}

export default function Analysis3Page() {
  const { searchPrompt } = useSearch()
  const [currentAnalyzing, setCurrentAnalyzing] = useState<string | null>(null)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [isUsageOpen, setIsUsageOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('workspace')
  
  // Generate prompt text from search context
  const generatePromptText = () => {
    return `We are a ${searchPrompt.companyType} based in ${searchPrompt.location} with ${searchPrompt.teamSize}. We are hiring a ${searchPrompt.role} with ${searchPrompt.experience} experience who is skilled in ${searchPrompt.skills.join(", ")}.`
  }
  
  const promptText = generatePromptText()
  const [currentMessage, setCurrentMessage] = useState(`I will do multiple searches to find candidates matching ${searchPrompt.role}`)

  // Generate responsibilities based on role and skills
  const generateResponsibilities = () => {
    const role = searchPrompt.role.toLowerCase()
    const skills = searchPrompt.skills.map(s => s.toLowerCase())
    
    const responsibilities: string[] = []
    
    // Role-based responsibilities
    if (role.includes('engineer') || role.includes('developer')) {
      responsibilities.push(`Design and develop scalable solutions using ${searchPrompt.skills.slice(0, 2).join(' and ')}`)
      responsibilities.push(`Build and maintain high-quality code following best practices and industry standards`)
      responsibilities.push(`Collaborate with cross-functional teams to deliver innovative features`)
    } else if (role.includes('designer')) {
      responsibilities.push(`Create user-centered designs and prototypes using ${searchPrompt.skills.find(s => s.toLowerCase().includes('figma') || s.toLowerCase().includes('design')) || 'design tools'}`)
      responsibilities.push(`Work closely with product and engineering teams to implement designs`)
      responsibilities.push(`Conduct user research and usability testing to inform design decisions`)
    } else if (role.includes('product') || role.includes('manager')) {
      responsibilities.push(`Define product strategy and roadmap aligned with business objectives`)
      responsibilities.push(`Collaborate with engineering, design, and stakeholders to deliver products`)
      responsibilities.push(`Analyze user data and feedback to drive product improvements`)
    } else {
      responsibilities.push(`Execute key responsibilities for ${searchPrompt.role} role`)
      responsibilities.push(`Collaborate with team members to achieve project goals`)
      responsibilities.push(`Continuously improve processes and deliver high-quality results`)
    }
    
    // Skills-based additional responsibilities
    if (skills.some(s => s.includes('react') || s.includes('frontend'))) {
      responsibilities.push(`Develop responsive and interactive user interfaces`)
    }
    if (skills.some(s => s.includes('node') || s.includes('backend'))) {
      responsibilities.push(`Build robust APIs and backend services`)
    }
    if (skills.some(s => s.includes('data') || s.includes('analytics'))) {
      responsibilities.push(`Analyze and process data to drive insights and decisions`)
    }
    
    return responsibilities.slice(0, 6) // Max 6 responsibilities
  }

  // Generate key features based on role and skills
  const generateKeyFeatures = () => {
    const role = searchPrompt.role.toLowerCase()
    const skills = searchPrompt.skills.map(s => s.toLowerCase())
    const features: Array<{ title: string; description: string }> = []
    
    // Role-based features
    if (role.includes('engineer') || role.includes('developer')) {
      if (skills.some(s => s.includes('react') || s.includes('frontend'))) {
        features.push({ title: "Frontend Development", description: `${searchPrompt.skills.find(s => s.toLowerCase().includes('react')) || 'Modern'} expertise` })
      }
      if (skills.some(s => s.includes('node') || s.includes('backend'))) {
        features.push({ title: "Backend Development", description: "API and server-side expertise" })
      }
      features.push({ title: "Code Quality", description: "Best practices and clean code" })
    } else if (role.includes('designer')) {
      features.push({ title: "UI/UX Design", description: "User-centered design approach" })
      features.push({ title: "Design Systems", description: "Consistent and scalable designs" })
      features.push({ title: "Prototyping", description: "Interactive prototypes and testing" })
    } else if (role.includes('product') || role.includes('manager')) {
      features.push({ title: "Product Strategy", description: "Roadmap and planning expertise" })
      features.push({ title: "Stakeholder Management", description: "Cross-functional collaboration" })
      features.push({ title: "Data-Driven Decisions", description: "Analytics and insights" })
    }
    
    // Skills-based features
    if (skills.some(s => s.includes('cloud') || s.includes('aws') || s.includes('azure'))) {
      features.push({ title: "Cloud Platforms", description: `${searchPrompt.skills.find(s => s.toLowerCase().includes('aws') || s.toLowerCase().includes('azure') || s.toLowerCase().includes('cloud')) || 'Cloud'} experience` })
    }
    if (skills.some(s => s.includes('data') || s.includes('sql'))) {
      features.push({ title: "Data Management", description: "Database and analytics expertise" })
    }
    
    // Fill remaining slots with generic features
    while (features.length < 6) {
      features.push({ 
        title: `${searchPrompt.skills[features.length % searchPrompt.skills.length] || 'Technical'} Expertise`, 
        description: "Professional proficiency" 
      })
    }
    
    return features.slice(0, 6) // Max 6 features
  }

  // Get analysis message based on current step
  const getAnalysisMessage = (step: string | null) => {
    const messages: Record<string, string> = {
      external: `Scanning external sources like LinkedIn, GitHub, and professional networks for ${searchPrompt.role} candidates...`,
      internal: "Checking internal databases and previous applicants to identify potential matches...",
      people: "Analyzing candidate profiles and matching requirements. Found 4670 potential candidates so far...",
      competitors: "Researching competitor companies and market insights to understand hiring landscape...",
      matches: "Evaluating candidates and identifying the top 12 best matches based on skills, experience, and cultural fit..."
    }
    return messages[step || ''] || `I will do multiple searches to find candidates matching ${searchPrompt.role}`
  }

  // Get stats for each analysis step
  const getStepStats = (step: string | null) => {
    const stats: Record<string, Array<{ label: string; value: string | number; icon?: any }>> = {
      external: [
        { label: "Sources Scanned", value: 6 },
        { label: "Candidates Found", value: 124 }
      ],
      internal: [
        { label: "Internal Sources", value: 2 },
        { label: "Previous Applicants", value: 89 }
      ],
      people: [
        { label: "Total Candidates", value: 4670 },
        { label: "Qualified Profiles", value: 187 }
      ],
      competitors: [
        { label: "Companies Analyzed", value: 8 },
        { label: "Market Insights", value: 12 }
      ],
      matches: [
        { label: "Best Matches", value: 12 },
        { label: "Highly Qualified", value: 8 }
      ]
    }
    return stats[step || ''] || []
  }


  useEffect(() => {
    const sections = ['external', 'internal', 'people', 'competitors', 'matches']
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < sections.length) {
        const currentStep = sections[currentIndex]
        setCurrentAnalyzing(currentStep)
        setCurrentMessage(getAnalysisMessage(currentStep))
        
        // Scroll to the current analyzing section
        const sectionElement = document.getElementById(currentStep)
        if (sectionElement) {
          sectionElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }
        
        currentIndex++
      } else {
        setCurrentAnalyzing(null)
        setAnalysisComplete(true)
        setCurrentMessage("Analysis complete! All sources have been analyzed and candidates have been identified.")
        // Automatically open the Analysis modal
        setIsUsageOpen(true)
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left – AI chat */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
            {/* Header tabs */}
            <div className="flex items-center gap-6 text-sm mb-4">
              <button className="relative text-foreground font-medium">
                AI chat
                <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-foreground rounded"></span>
              </button>
              <button className="text-muted-foreground hover:text-foreground">Team chat</button>
              <button className="ml-auto text-muted-foreground">⌁</button>
            </div>

            {/* Chat body */}
            <div className="space-y-4 rounded-2xl bg-accent/20 border border-border/50 p-4">
              {/* Prompt bubble */}
              <div className="rounded-[16px] bg-background border border-border/60 p-4 shadow-sm w-full">
                <div className="text-sm leading-6">
                  {promptText.length > 80 ? (
                    <>
                      {promptText.substring(0, 80)}…
                      <button className="ml-1 text-primary hover:underline">see more</button>
                    </>
                  ) : (
                    promptText
                  )}
                </div>
              </div>

              {/* Muffin message */}
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">Muffin</span>
                <span>12:02</span>
              </div>
              <Card className={`border-border/60 shadow-sm rounded-[16px] bg-background transition-all duration-700 ${
                currentAnalyzing === 'external' 
                  ? 'ring-2 ring-blue-500/50 shadow-lg scale-[1.02] animate-scanning-glow' :
                currentAnalyzing === 'internal' 
                  ? 'ring-2 ring-purple-500/50 shadow-lg scale-[1.02] animate-scanning-glow' :
                currentAnalyzing === 'people' 
                  ? 'ring-2 ring-green-500/50 shadow-lg scale-[1.02] animate-scanning-glow' :
                currentAnalyzing === 'competitors' 
                  ? 'ring-2 ring-orange-500/50 shadow-lg scale-[1.02] animate-scanning-glow' :
                currentAnalyzing === 'matches' 
                  ? 'ring-2 ring-pink-500/50 shadow-lg scale-[1.02] animate-scanning-glow' :
                ''
              }`}>
                <CardContent className="p-6">
                  <div className="text-lg text-foreground font-medium mb-4">
                    {currentMessage}
                  </div>
                  
                  {/* Stats for current step */}
                  {currentAnalyzing && getStepStats(currentAnalyzing).length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/60">
                      {getStepStats(currentAnalyzing).map((stat, idx) => {
                        const icons = [
                          <Database className="w-4 h-4" />,
                          <Users className="w-4 h-4" />,
                          <Building className="w-4 h-4" />,
                          <TrendingUp className="w-4 h-4" />
                        ]
                        const Icon = icons[idx % icons.length]
                        return (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {Icon}
                              <span>{stat.label}</span>
                            </div>
                            <div className="text-xl font-bold text-foreground">
                              {stat.value}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

            </div>
            </div>
          </aside>

          {/* Right – Pipeline */}
          <main className="lg:col-span-2">
            <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
              <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></div>
              <span className="mr-2">Searching for people…</span>
              <div className="w-20 h-2 rounded-full bg-primary/10 overflow-hidden">
                <div className="h-full bg-primary/40 bg-shimmer"></div>
              </div>
            </div>

            <div className="space-y-4">
              {/* External sources */}
              <Card id="external" className={`border-0 shadow-sm bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50 transition-all duration-700 ${
                currentAnalyzing === 'external' 
                  ? 'ring-2 ring-primary/50 shadow-lg scale-[1.02] animate-scanning-glow' 
                  : 'opacity-100'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs tracking-wide text-gray-700 text-center font-medium">EXTERNAL SOURCES</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="relative w-full overflow-hidden rounded-full border border-gray-200/40 bg-background/60">
                    <div className="flex items-center gap-3 py-3 animate-marquee" style={{animationDuration: "20s", animationTimingFunction: "linear"}}>
                      
                      {/* Meta - Infinity symbol */}
                      <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center">
                          <svg viewBox="0 0 20 10" className="w-8 h-4" fill="none">
                            <path d="M6 5 C4 5, 2 6, 2 7 C2 8, 4 9, 6 9 C8 9, 10 8, 10 7 C10 6, 12 5, 14 5 C16 5, 18 6, 18 7 C18 8, 16 9, 14 9 C12 9, 10 8, 10 7" stroke="#1877F2" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* AWS */}
                      <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center shadow-md shrink-0">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-white font-bold text-[10px] leading-tight">aws</span>
                          <svg viewBox="0 0 16 6" className="w-4 h-2 mt-0.5">
                            <path d="M1 3 L15 3 L12 0" stroke="#ff9900" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Google */}
                      <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                        <div className="relative w-10 h-10">
                          <svg viewBox="0 0 24 24" className="w-10 h-10">
                            <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                      </div>
                      
                      
                      {/* Duplicate set for seamless loop */}
                      {/* Meta */}
                      <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center">
                          <svg viewBox="0 0 20 10" className="w-8 h-4" fill="none">
                            <path d="M6 5 C4 5, 2 6, 2 7 C2 8, 4 9, 6 9 C8 9, 10 8, 10 7 C10 6, 12 5, 14 5 C16 5, 18 6, 18 7 C18 8, 16 9, 14 9 C12 9, 10 8, 10 7" stroke="#1877F2" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* AWS */}
                      <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center shadow-md shrink-0">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-white font-bold text-[10px] leading-tight">aws</span>
                          <svg viewBox="0 0 16 6" className="w-4 h-2 mt-0.5">
                            <path d="M1 3 L15 3 L12 0" stroke="#ff9900" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Google */}
                      <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                        <div className="relative w-10 h-10">
                          <svg viewBox="0 0 24 24" className="w-10 h-10">
                            <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Stack Overflow */}
                      <div className="w-16 h-16 rounded-xl bg-orange-500 flex items-center justify-center shadow-md shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                            <path d="M15.5 17.5h2.5l-.9-7.07 2-.25L20 18H4l1.4-7.82 2 .25L6.5 17.5h2.5l.5-2.5h6l.5 2.5z"/>
                            <path d="M6.1 5.5l.7 2.2-1.9.6-.7-2.2 1.9-.6zm3.5-1.4l1.4 1.8-1.4 1.1-1.4-1.8 1.4-1.1zm3.3-1.2l1.8 1.4-1.1 1.4-1.8-1.4 1.1-1.4z"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Dribbble */}
                      <div className="w-16 h-16 rounded-xl bg-pink-500 flex items-center justify-center shadow-md shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                            <circle cx="12" cy="12" r="2"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.19.26-2.32.72-3.34 1.32 1.76 3.22 3.06 5.28 3.72.41 1.01.75 2.04 1.01 3.09.26.69.6 1.36 1 1.99.4.63.87 1.22 1.41 1.74.54.52 1.14.98 1.78 1.38.64.4 1.31.74 2 .99 1.05.26 2.08.6 3.09 1.01.66-.06 1.32-.36 1.96-.84C19.32 18.26 18.19 20 16 20zm8-8c0 1.19-.26 2.32-.72 3.34-1.32-1.76-3.22-3.06-5.28-3.72-.41-1.01-.75-2.04-1.01-3.09-.26-.69-.6-1.36-1-1.99-.4-.63-.87-1.22-1.41-1.74-.54-.52-1.14-.98-1.78-1.38-.64-.4-1.31-.74-2-.99-1.05-.26-2.08-.6-3.09-1.01C4.68 5.74 5.81 4 8 4c4.41 0 8 3.59 8 8z"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* GitHub */}
                      <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center shadow-md shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <FlowConnector />

              {/* Internal sources */}
              <Card id="internal" className={`border-0 shadow-sm bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50 transition-all duration-700 ${
                currentAnalyzing === 'internal' 
                  ? 'ring-2 ring-primary/50 shadow-lg scale-[1.02] animate-scanning-glow' 
                  : 'opacity-100'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs tracking-wide text-gray-700 text-center font-medium">INTERNAL SOURCES</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {/* Network and Applied - separated cards with icons */}
                  <div className="flex items-center justify-center gap-4">
                    {/* Network */}
                    <div className="flex-1 max-w-[45%] h-20 rounded-full bg-white border border-gray-200/60 shadow-sm flex items-center justify-center gap-3 px-4">
                      <div className="flex items-center -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                          <Network className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                          <UserCircle className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Network</span>
                    </div>
                    
                    {/* Applied */}
                    <div className="flex-1 max-w-[45%] h-20 rounded-full bg-white border border-gray-200/60 shadow-sm flex items-center justify-center gap-3 px-4">
                      <div className="flex items-center -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                          <Users className="w-5 h-5 text-orange-600" />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Applied</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <FlowConnector />

              {/* People found */}
              <Card id="people" className={`border-0 shadow-sm bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50 transition-all duration-700 ${
                currentAnalyzing === 'people' 
                  ? 'ring-2 ring-primary/50 shadow-lg scale-[1.02] animate-scanning-glow' 
                  : 'opacity-100'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs tracking-wide text-gray-700 text-center font-medium">PEOPLE FOUND</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex items-center gap-3">
                    <div className="relative w-full overflow-hidden rounded-full border border-gray-200/40 bg-background/60">
                      <div className="flex items-center gap-4 py-3 animate-marquee" style={{animationDuration: "20s"}}>
                        {Array.from({ length: 14 }).map((_, idx) => {
                          const icons = [
                            <UserCircle className="w-5 h-5 text-pink-600" />,
                            <Users className="w-5 h-5 text-red-600" />,
                            <UserCheck className="w-5 h-5 text-pink-500" />,
                            <Network className="w-5 h-5 text-red-500" />
                          ]
                          const bgColors = [
                            "bg-pink-100",
                            "bg-red-100",
                            "bg-pink-50",
                            "bg-red-50"
                          ]
                          const Icon = icons[idx % icons.length]
                          const bgColor = bgColors[idx % bgColors.length]
                          return (
                            <div key={idx} className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                              <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
                                {Icon}
                              </div>
                            </div>
                          )
                        })}
                        {Array.from({ length: 14 }).map((_, idx) => {
                          const icons = [
                            <UserCircle className="w-5 h-5 text-purple-600" />,
                            <Users className="w-5 h-5 text-pink-600" />,
                            <UserCheck className="w-5 h-5 text-purple-500" />,
                            <Network className="w-5 h-5 text-pink-500" />
                          ]
                          const bgColors = [
                            "bg-purple-100",
                            "bg-pink-100",
                            "bg-purple-50",
                            "bg-pink-50"
                          ]
                          const Icon = icons[idx % icons.length]
                          const bgColor = bgColors[idx % bgColors.length]
                          return (
                            <div key={`pf-${idx}`} className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                              <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
                                {Icon}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <Badge variant="secondary" className="rounded-full px-3 py-1">4670</Badge>
                  </div>
                </CardContent>
              </Card>

              <FlowConnector />

              {/* Competitors */}
              <Card id="competitors" className={`border-0 shadow-sm bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50 transition-all duration-700 ${
                currentAnalyzing === 'competitors' 
                  ? 'ring-2 ring-primary/50 shadow-lg scale-[1.02] animate-scanning-glow' 
                  : 'opacity-100'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs tracking-wide text-gray-700 text-center font-medium">COMPETITORS</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex items-center gap-3">
                    <div className="relative w-full overflow-hidden rounded-full border border-gray-200/40 bg-background/60">
                      <div className="flex items-center gap-4 py-3 animate-marquee" style={{animationDuration: "25s"}}>
                        {Array.from({ length: 10 }).map((_, i) => {
                          const icons = [
                            <Building className="w-5 h-5 text-blue-600" />,
                            <TrendingUp className="w-5 h-5 text-purple-600" />,
                            <Target className="w-5 h-5 text-blue-500" />,
                            <Database className="w-5 h-5 text-purple-500" />,
                            <Briefcase className="w-5 h-5 text-blue-600" />
                          ]
                          const bgColors = [
                            "bg-blue-100",
                            "bg-purple-100",
                            "bg-blue-50",
                            "bg-purple-50",
                            "bg-blue-100"
                          ]
                          const Icon = icons[i % icons.length]
                          const bgColor = bgColors[i % bgColors.length]
                          return (
                            <div key={i} className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                              <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
                                {Icon}
                              </div>
                            </div>
                          )
                        })}
                        {Array.from({ length: 10 }).map((_, i) => {
                          const icons = [
                            <Building className="w-5 h-5 text-green-600" />,
                            <TrendingUp className="w-5 h-5 text-blue-600" />,
                            <Target className="w-5 h-5 text-green-500" />,
                            <Database className="w-5 h-5 text-blue-500" />,
                            <Briefcase className="w-5 h-5 text-green-600" />
                          ]
                          const bgColors = [
                            "bg-green-100",
                            "bg-blue-100",
                            "bg-green-50",
                            "bg-blue-50",
                            "bg-green-100"
                          ]
                          const Icon = icons[i % icons.length]
                          const bgColor = bgColors[i % bgColors.length]
                          return (
                            <div key={`comp-${i}`} className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                              <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
                                {Icon}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <Badge variant="secondary" className="rounded-full px-3 py-1">+8</Badge>
                  </div>
                </CardContent>
              </Card>

              <FlowConnector />

              {/* Best matches */}
              <Card id="matches" className={`border-0 shadow-sm bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50 transition-all duration-700 ${
                currentAnalyzing === 'matches' 
                  ? 'ring-2 ring-primary/50 shadow-lg scale-[1.02] animate-scanning-glow' 
                  : 'opacity-100'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs tracking-wide text-gray-700 text-center font-medium">BEST MATCHES</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex items-center gap-3">
                    <div className="relative w-full overflow-hidden rounded-full border border-gray-200/40 bg-background/60">
                      <div className="flex items-center gap-4 py-3 animate-marquee" style={{animationDuration: "22s"}}>
                        {Array.from({ length: 12 }).map((_, idx) => {
                          const icons = [
                            <Star className="w-5 h-5 text-green-600" />,
                            <Award className="w-5 h-5 text-blue-600" />,
                            <Trophy className="w-5 h-5 text-green-500" />,
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          ]
                          const bgColors = [
                            "bg-green-100",
                            "bg-blue-100",
                            "bg-green-50",
                            "bg-blue-50"
                          ]
                          const Icon = icons[idx % icons.length]
                          const bgColor = bgColors[idx % bgColors.length]
                          return (
                            <div key={idx} className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                              <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
                                {Icon}
                              </div>
                            </div>
                          )
                        })}
                        {Array.from({ length: 12 }).map((_, idx) => {
                          const icons = [
                            <Star className="w-5 h-5 text-orange-600" />,
                            <Award className="w-5 h-5 text-yellow-600" />,
                            <Trophy className="w-5 h-5 text-orange-500" />,
                            <CheckCircle className="w-5 h-5 text-yellow-500" />
                          ]
                          const bgColors = [
                            "bg-orange-100",
                            "bg-yellow-100",
                            "bg-orange-50",
                            "bg-yellow-50"
                          ]
                          const Icon = icons[idx % icons.length]
                          const bgColor = bgColors[idx % bgColors.length]
                          return (
                            <div key={`m-${idx}`} className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-md shrink-0">
                              <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
                                {Icon}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <Badge variant="secondary" className="rounded-full px-3 py-1">+12</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        {/* Analysis Modal */}
        <Dialog open={isUsageOpen} onOpenChange={setIsUsageOpen}>
          <DialogContent className="w-[92vw] max-w-[92vw] h-[85vh] overflow-hidden p-0" style={{ maxWidth: '92vw', height: '85vh', maxHeight: '85vh' }}>
            <div className="flex h-full" style={{ height: '85vh', maxHeight: '85vh' }}>
              {/* Left Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto" style={{ maxHeight: '85vh' }}>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 mb-2">ANALYSIS</h4>
                    <div className="space-y-1">
                      <div 
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSection === 'workspace' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveSection('workspace')}
                      >
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">My Muffin</span>
                      </div>
                      <div 
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSection === 'sources' ? 'bg-white border border-gray-300' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveSection('sources')}
                      >
                        <Bookmark className="w-5 h-5 text-gray-600" />
                        <span className={`text-sm ${activeSection === 'sources' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>Sources</span>
                      </div>
                      <div 
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSection === 'components' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveSection('components')}
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                          </svg>
                        </div>
                        <span className={`text-sm ${activeSection === 'components' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>Components</span>
                      </div>
                      <div 
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSection === 'profile' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveSection('profile')}
                      >
                        <Users className="w-5 h-5 text-gray-600" />
                        <span className={`text-sm ${activeSection === 'profile' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>Ideal Profile</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 mb-2">REPORTS</h4>
                    <div className="space-y-1">
                      <div 
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSection === 'salary' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveSection('salary')}
                      >
                        <Archive className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Salary Range</span>
                      </div>
                      <div 
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSection === 'security' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveSection('security')}
                      >
                        <Shield className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Security</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 overflow-y-auto p-8 pb-24" style={{ maxHeight: '85vh', height: '85vh' }}>
                {activeSection === 'workspace' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analysis Results</h1>
                    </div>

                    {/* Stats Grid - Project Detail Style - 3 columns - Larger */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: "Total Sourced", count: 280, icon: Users, idx: 0 },
                        { name: "Interview", count: 35, icon: Video, idx: 1 },
                        { name: "ATS", count: 22, icon: Target, idx: 2 },
                        { name: "Salary", count: 14, icon: DollarSign, idx: 3 },
                        { name: "Shortlist", count: 8, icon: Bookmark, idx: 4 },
                        { name: "Goal for hire", count: 1, icon: TrendingUp, idx: 5 },
                      ].map((stage) => {
                        const colors = [
                          { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", textDark: "text-blue-900", icon: Users },
                          { bg: "bg-green-50", border: "border-green-200", text: "text-green-600", textDark: "text-green-900", icon: Video },
                          { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", textDark: "text-purple-900", icon: Target },
                          { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", textDark: "text-orange-900", icon: DollarSign },
                          { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600", textDark: "text-indigo-900", icon: Bookmark },
                          { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600", textDark: "text-pink-900", icon: TrendingUp },
                        ]
                        const colorConfig = colors[stage.idx % colors.length]
                        const Icon = stage.icon
                        
                        return (
                          <div key={stage.name} className={`${colorConfig.bg} rounded-xl p-6 border-2 ${colorConfig.border} transition-all hover:shadow-md`}>
                            <div className="flex items-center gap-4">
                              <Icon className={`w-8 h-8 ${colorConfig.text}`} />
                              <div>
                                <p className={`text-sm ${colorConfig.text} font-semibold mb-1`}>{stage.name}</p>
                                <p className={`text-3xl font-bold ${colorConfig.textDark}`}>{stage.count}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Additional spacing to enable scroll */}
                    <div className="pb-20"></div>
                  </div>
                )}

                {activeSection === 'sources' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Sources</h1>
                      <p className="text-sm text-gray-600 mb-6">External and internal sources used for candidate analysis</p>
                    </div>

                    {/* External Sources */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">External Sources</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">LI</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                              <p className="text-xs text-gray-600">124 candidates</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">GH</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">GitHub</p>
                              <p className="text-xs text-gray-600">89 candidates</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">G2</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">G2</p>
                              <p className="text-xs text-gray-600">32 candidates</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">CB</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Crunchbase</p>
                              <p className="text-xs text-gray-600">18 candidates</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">PH</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Product Hunt</p>
                              <p className="text-xs text-gray-600">12 candidates</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">GO</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Google Jobs</p>
                              <p className="text-xs text-gray-600">5 candidates</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Internal Sources */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Internal Sources</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Company Network</p>
                              <p className="text-xs text-gray-600">28 candidates</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                              <Archive className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Previous Applicants</p>
                              <p className="text-xs text-gray-600">15 candidates</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Competitors */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitor Analysis</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <span className="text-sm font-medium text-gray-900">Netflix</span>
                            <span className="text-xs text-gray-600">Market leader in data engineering</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <span className="text-sm font-medium text-gray-900">Uber</span>
                            <span className="text-xs text-gray-600">Strong big data infrastructure</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <span className="text-sm font-medium text-gray-900">Airbnb</span>
                            <span className="text-xs text-gray-600">Advanced analytics platform</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <span className="text-sm font-medium text-gray-900">Spotify</span>
                            <span className="text-xs text-gray-600">Real-time streaming expertise</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeSection === 'components' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">Included Components</h1>
                      <p className="text-sm text-gray-600 mb-6">Components included in the analysis process</p>
                    </div>

                    {/* Included Components */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Included Components</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-purple-50 border border-purple-200">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">🧁</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">Muffin Interview</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">💼</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">Native Interview</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">📊</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">ATS</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-orange-50 border border-orange-200">
                            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">💰</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">Salary</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-pink-50 border border-pink-200">
                            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">📈</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">Org Chart</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Additional spacing */}
                    <div className="pb-20"></div>
                  </div>
                )}

                {activeSection === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">Ideal Candidate Profile</h1>
                      <p className="text-sm text-gray-600 mb-6">Detailed requirements and qualifications for {searchPrompt.role} position</p>
                    </div>

                    {/* Ideal Candidate Profile */}
                    <div>

                      {/* Role Overview */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Overview</h3>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                          We are a {searchPrompt.companyType} based in {searchPrompt.location} with {searchPrompt.teamSize}. 
                          We are hiring a {searchPrompt.role} with {searchPrompt.experience} experience who is skilled in {searchPrompt.skills.join(", ")}.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Experience Required</p>
                            <p className="text-sm font-medium text-gray-900">{searchPrompt.experience}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Location</p>
                            <p className="text-sm font-medium text-gray-900">{searchPrompt.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Required Skills */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {searchPrompt.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Key Responsibilities */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
                        <ul className="space-y-2">
                          {generateResponsibilities().map((responsibility, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Key Features */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {generateKeyFeatures().map((feature, index) => (
                            <div key={index} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                              <p className="text-sm font-medium text-gray-900 mb-1">{feature.title}</p>
                              <p className="text-xs text-gray-600">{feature.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    </div>

                    {/* Additional spacing */}
                    <div className="pb-20"></div>
                  </div>
                )}

                {activeSection === 'salary' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">Salary Range Analysis</h1>
                      <p className="text-sm text-gray-600 mb-6">Detailed salary information for Data Engineer position</p>
                    </div>

                    {/* Market Salary Overview */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Salary Overview</h3>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Market Average</p>
                            <p className="text-3xl font-bold text-gray-900">$95,000</p>
                            <p className="text-xs text-gray-600 mt-1">Based on industry data</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Your Offering</p>
                            <p className="text-3xl font-bold text-blue-600">$90K - $110K</p>
                            <p className="text-xs text-gray-600 mt-1">Competitive range</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Salary Percentiles */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Distribution</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">25th Percentile</p>
                              <p className="text-xs text-gray-600">Lower quartile</p>
                            </div>
                            <p className="text-xl font-bold text-gray-900">$88,000</p>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">50th Percentile (Median)</p>
                              <p className="text-xs text-gray-600">Market average</p>
                            </div>
                            <p className="text-xl font-bold text-blue-600">$95,000</p>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">75th Percentile</p>
                              <p className="text-xs text-gray-600">Upper quartile</p>
                            </div>
                            <p className="text-xl font-bold text-gray-900">$105,000</p>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">90th Percentile</p>
                              <p className="text-xs text-gray-600">Top earners</p>
                            </div>
                            <p className="text-xl font-bold text-green-600">$120,000</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Salary by Experience */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary by Experience Level</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Junior (0-2 years)</p>
                              <p className="text-xs text-gray-600">Entry level position</p>
                            </div>
                            <p className="text-lg font-bold text-gray-900">$70K - $85K</p>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Mid-level (3-5 years)</p>
                              <p className="text-xs text-gray-600">Target range for this role</p>
                            </div>
                            <p className="text-lg font-bold text-blue-600">$90K - $110K</p>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Senior (6-8 years)</p>
                              <p className="text-xs text-gray-600">Experienced professionals</p>
                            </div>
                            <p className="text-lg font-bold text-gray-900">$110K - $130K</p>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Lead/Principal (9+ years)</p>
                              <p className="text-xs text-gray-600">Leadership positions</p>
                            </div>
                            <p className="text-lg font-bold text-gray-900">$130K - $160K</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>


                    {/* Additional spacing */}
                    <div className="pb-20"></div>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">Security & Privacy</h1>
                      <p className="text-sm text-gray-600 mb-6">Data security, privacy compliance, and export settings</p>
                    </div>

                    {/* GDPR Compliance */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">GDPR Compliance</h3>
                          <Badge className="bg-green-100 text-green-800 border-green-200">Compliant</Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">
                          All candidate data is processed in accordance with GDPR regulations. Personal information is encrypted and stored securely.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded border-2 border-green-600 flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-700">Right to Erasure enabled</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded border-2 border-green-600 flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-700">Data Export functionality available</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded border-2 border-green-600 flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-700">Consent management implemented</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">View Agreement</Button>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Data Export */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h3>
                        <p className="text-sm text-gray-700 mb-4">
                          Export candidate data in various formats for analysis, reporting, or compliance purposes.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">CSV Export</p>
                              <p className="text-xs text-gray-600">Spreadsheet format with all candidate data</p>
                            </div>
                            <Button variant="outline" size="sm">Export</Button>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">JSON Export</p>
                              <p className="text-xs text-gray-600">Machine-readable format for integrations</p>
                            </div>
                            <Button variant="outline" size="sm">Export</Button>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">PDF Report</p>
                              <p className="text-xs text-gray-600">Formatted analysis report document</p>
                            </div>
                            <Button variant="outline" size="sm">Export</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Data Security */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Data Security</h3>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Encrypted</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">End-to-end encryption enabled</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">Access logging active</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">Regular security audits performed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">Two-factor authentication available</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" size="sm">View Security Report</Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Privacy Policy & Terms */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Policy & Terms</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Privacy Policy</p>
                              <p className="text-xs text-gray-600">How we handle and protect your data</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Terms of Service</p>
                              <p className="text-xs text-gray-600">Service usage terms and conditions</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Data Processing Agreement</p>
                              <p className="text-xs text-gray-600">GDPR data processing terms</p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Additional spacing */}
                    <div className="pb-20"></div>
                  </div>
                )}

                {/* Default content for other tabs */}
                {activeSection !== 'workspace' && activeSection !== 'sources' && activeSection !== 'components' && activeSection !== 'salary' && activeSection !== 'profile' && activeSection !== 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
                      <p className="text-sm text-gray-600">Content for {activeSection} section</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Analysis completed successfully</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <Button 
                onClick={() => {
                  setIsUsageOpen(false)
                  window.location.href = '/ex3'
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8"
              >
                Hire Best Candidate
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

