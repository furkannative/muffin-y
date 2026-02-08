"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  Calendar,
  Building2,
  Award,
  Star,
  Play,
  Pause,
  Volume2,
  Maximize,
  Eye,
  MessageSquare,
  UserPlus,
  MoreHorizontal,
  Check,
} from "lucide-react"

interface CandidateDetailPageProps {
  candidateId: string
}

const candidateData = {
  1: {
    name: "Anne Smith",
    title: "HR Manager",
    location: "Tokyo, Japan",
    flag: "🇯🇵",
    avatar: "/professional-woman-hr.png",
    aiScore: 95,
    email: "anne.smith@example.com",
    phone: "+81 90-1234-5678",
    linkedin: "linkedin.com/in/annesmith",
    github: "github.com/annesmith",
    website: "annesmith.dev",
    summary:
      "Experienced HR Manager with 8+ years in talent acquisition and employee development. Proven track record in building high-performing teams and implementing innovative recruitment strategies.",
    experience: [
      {
        company: "TechCorp Japan",
        role: "Senior HR Manager",
        duration: "2021 - Present",
        description: "Leading talent acquisition for 200+ employee tech company. Reduced time-to-hire by 40%.",
      },
      {
        company: "StartupHub Tokyo",
        role: "HR Business Partner",
        duration: "2019 - 2021",
        description: "Managed HR operations for multiple startups. Implemented performance management systems.",
      },
    ],
    education: [
      {
        institution: "University of Tokyo",
        degree: "Master of Business Administration",
        year: "2018",
      },
      {
        institution: "Waseda University",
        degree: "Bachelor of Psychology",
        year: "2016",
      },
    ],
    skills: ["Talent Acquisition", "Performance Management", "Employee Relations", "HR Analytics", "Leadership"],
    languages: ["Japanese (Native)", "English (Fluent)", "Mandarin (Conversational)"],
    pipelineStatus: "shortlist",
  },
}

const pipelineSteps = [
  { id: "sourced", title: "Sourced", icon: UserPlus, completed: true },
  { id: "shortlist", title: "Shortlisted", icon: Star, completed: true },
  { id: "interview", title: "Interview Scheduled", icon: Calendar, completed: false },
  { id: "offer", title: "Offer Extended", icon: Award, completed: false },
  { id: "hired", title: "Hired", icon: Building2, completed: false },
]

export function CandidateDetailPage({ candidateId }: CandidateDetailPageProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentTab, setCurrentTab] = useState("profile")

  // Convert string candidateId to number for type safety
  const numericCandidateId = Number(candidateId) || 1
  
  const candidate = candidateData[numericCandidateId as keyof typeof candidateData] ?? candidateData[1]

  const handleBack = () => {
    window.history.back()
  }

  const handleSendEmail = () => {
    window.location.href = "/email"
  }

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying)
  }

  const currentStepIndex = pipelineSteps.findIndex((step) => step.id === candidate.pipelineStatus)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button onClick={handleSendEmail} size="sm">
                Watch AI Interview
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Pipeline & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pipeline Status - Onboarding Style */}
            <Card className="border-border/50 shadow-lg bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg text-primary-foreground">Recruitment Pipeline</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Track {candidate.name.split(" ")[0]}'s progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pipelineSteps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === currentStepIndex
                  const isCompleted = index < currentStepIndex

                  return (
                    <div key={step.id} className="flex items-center space-x-4">
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                          ${
                            isCompleted
                              ? "bg-primary-foreground text-primary"
                              : isActive
                                ? "bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground"
                                : "bg-primary-foreground/10 text-primary-foreground/60"
                          }
                        `}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`
                            font-medium
                            ${isCompleted || isActive ? "text-primary-foreground" : "text-primary-foreground/60"}
                          `}
                        >
                          {step.title}
                        </div>
                        {isActive && <div className="text-xs text-primary-foreground/80 mt-1">Current stage</div>}
                        {isCompleted && <div className="text-xs text-primary-foreground/80 mt-1">Completed</div>}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* AI Interview Score */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">AI screening</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-2xl font-bold text-green-600">{candidate.aiScore}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Video Player */}
                <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden mb-4">
                  <div className="aspect-video flex items-center justify-center">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                      <AvatarFallback className="text-2xl">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="secondary" onClick={toggleVideo}>
                          {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button size="sm" variant="secondary">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                      <div className="bg-white h-1 rounded-full w-1/3"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Communication</span>
                    <span className="text-sm font-medium">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Technical Skills</span>
                    <span className="text-sm font-medium">Strong</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cultural Fit</span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Candidate Header */}
            <Card className="border-border/50 shadow-lg mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                    <AvatarFallback className="text-xl">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground mb-1">{candidate.name}</h1>
                        <p className="text-lg text-muted-foreground mb-2">{candidate.title}</p>
                        <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                          <span className="text-lg">{candidate.flag}</span>
                          <MapPin className="w-4 h-4" />
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button onClick={handleSendEmail}>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.linkedin}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Github className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.github}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.website}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card className="border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Professional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{candidate.summary}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <div className="space-y-4">
                  {candidate.experience.map((exp, index) => (
                    <Card key={index} className="border-border/50 shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{exp.role}</CardTitle>
                            <CardDescription className="text-base">{exp.company}</CardDescription>
                          </div>
                          <Badge variant="secondary">{exp.duration}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{exp.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <div className="space-y-4">
                  {candidate.education.map((edu, index) => (
                    <Card key={index} className="border-border/50 shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{edu.degree}</CardTitle>
                            <CardDescription className="text-base">{edu.institution}</CardDescription>
                          </div>
                          <Badge variant="secondary">{edu.year}</Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <Card className="border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Languages</h4>
                      <div className="space-y-2">
                        {candidate.languages.map((language) => (
                          <div key={language} className="text-muted-foreground">
                            {language}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
