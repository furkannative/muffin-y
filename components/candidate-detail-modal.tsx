"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  X,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  XCircle,
  Calendar,
  MoreHorizontal,
  Edit,
  Linkedin,
  Mail,
  Briefcase,
  GraduationCap,
  FileText,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Video,
  Search,
  Target,
  FileCheck,
  Award,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface CandidateDetailModalProps {
  isOpen: boolean
  onClose: () => void
  candidateId: number | null
  projectTitle?: string
  candidateName?: string
  candidateEmail?: string
  candidateRole?: string
  projectId?: string
}

// Helper functions to get project-specific content
const getProjectSkills = (projectId: string): string[] => {
  const skillsMap: Record<string, string[]> = {
    "1": ["React", "TypeScript", "Node.js", "MongoDB"],
    "2": ["Flutter", "Dart", "Firebase", "Bloc"],
    "3": ["Python", "Spark", "Kafka", "AWS"],
  }
  return skillsMap[projectId] || skillsMap["1"]
}

const getMuffinInterviewScores = (projectId: string, candidateName: string) => {
  const skills = getProjectSkills(projectId)
  const hash = candidateName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const baseScores = projectId === "1" 
    ? [92 + (hash % 5), 88 + (hash % 3), 89 + (hash % 4), 91 + (hash % 2)]
    : projectId === "2"
    ? [90 + (hash % 4), 87 + (hash % 5), 85 + (hash % 6), 93 + (hash % 3)]
    : [94 + (hash % 3), 91 + (hash % 4), 88 + (hash % 5), 92 + (hash % 3)]
  
  return skills.map((skill, idx) => ({
    skill,
    score: Math.min(100, baseScores[idx % baseScores.length])
  }))
}

const getNativeInterviewScores = (candidateName: string) => {
  const hash = candidateName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const baseGrammar = 85 + (hash % 10)
  const baseFluency = 87 + (hash % 8)
  const baseVocab = 83 + (hash % 12)
  const baseIELTS = 7.5 + ((hash % 15) / 10)
  
  return {
    grammar: Math.min(100, baseGrammar),
    fluency: Math.min(100, baseFluency),
    vocabulary: Math.min(100, baseVocab),
    ieltsPte: Math.min(9.0, baseIELTS).toFixed(1)
  }
}

const getRankingScore = (projectId: string, candidateName: string) => {
  // Generate consistent ranking based on candidate name hash
  const hash = candidateName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const baseRank = (hash % 5) + 1
  const baseMatch = 85 + (hash % 15)
  return {
    rank: baseRank,
    match: baseMatch,
    technicalMatch: Math.min(100, baseMatch + 2),
    experience: Math.min(100, baseMatch + 4),
    skillsMatch: Math.min(100, baseMatch - 2),
    education: Math.max(75, baseMatch - 6)
  }
}

const getEducationContent = (projectId: string, candidateName: string) => {
  const hash = candidateName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  if (projectId === "4" && candidateName === "Alper Bulut") {
    return [
      {
        degree: "Ph.D. in Electrical Engineering (In Progress)",
        institution: "Istanbul Technical University, Institute of Science and Technology",
        period: "2008 - Present",
        grade: "",
        description: "Working toward Ph.D. degree in Electrical Engineering. Research areas include power system failures (blackouts) and congestion management in international synchronous power systems. Has five publications in national/international conference proceedings about integration process of international power systems, effective restoration schemes of international synchronous zones, and energy economics."
      },
      {
        degree: "Master of Science in Electrical Engineering",
        institution: "Istanbul Technical University, Institute of Science and Technology",
        period: "2006 - 2008",
        grade: "",
        description: "M.Sc. degree in Electrical Engineering"
      },
      {
        degree: "Bachelor of Science in Electrical Engineering",
        institution: "Istanbul Technical University",
        period: "2001 - 2006",
        grade: "",
        description: "B.Sc. degree in Electrical Engineering. Studies included Economics, Energy, and Management."
      }
    ]
  }
  
  if (projectId === "1") {
    return [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Technical University of Berlin",
        period: `${2015 + (hash % 3)} - ${2019 + (hash % 2)}`,
        grade: `GPA: ${3.6 + (hash % 40) / 100}/4.0`,
        description: "Focused on web development, software engineering, and modern frameworks. Completed capstone project on full-stack React applications."
      },
      {
        degree: "React Developer Certification",
        institution: "Meta (Facebook)",
        period: "2020",
        grade: "",
        description: ""
      }
    ]
  } else if (projectId === "2") {
    return [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Stanford University",
        period: `${2014 + (hash % 3)} - ${2018 + (hash % 2)}`,
        grade: `GPA: ${3.7 + (hash % 30) / 100}/4.0`,
        description: "Specialized in mobile app development and cross-platform technologies. Senior project on Flutter-based social media application."
      },
      {
        degree: "Flutter Mobile Development Certificate",
        institution: "Google",
        period: "2019",
        grade: "",
        description: ""
      }
    ]
  } else {
    return [
      {
        degree: "Master of Science in Data Science",
        institution: "University of London",
        period: `${2017 + (hash % 2)} - ${2019 + (hash % 1)}`,
        grade: "Distinction",
        description: "Specialized in big data processing, distributed systems, and machine learning. Thesis on scalable ETL pipeline optimization using Apache Spark."
      },
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Manchester",
        period: `${2013 + (hash % 2)} - ${2017 + (hash % 1)}`,
        grade: "First Class Honours",
        description: "Focused on database systems, distributed computing, and software engineering. Senior project on real-time data streaming architectures."
      },
      {
        degree: "AWS Certified Solutions Architect",
        institution: "Amazon Web Services",
        period: "2021",
        grade: "",
        description: ""
      },
      {
        degree: "Google Cloud Professional Data Engineer",
        institution: "Google Cloud",
        period: "2022",
        grade: "",
        description: ""
      }
    ]
  }
}

const getWorkHistory = (projectId: string, candidateName: string) => {
  const hash = candidateName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  if (projectId === "4" && candidateName === "Alper Bulut") {
    return [
      {
        title: "Senior Marketing Manager, Binance Turkey",
        company: "Binance",
        period: "Mar 2020 - Present",
        duration: "5 yrs 10 mos",
        current: true,
        bullets: [
          "Leading growth marketing strategies to acquire and retain users",
          "Creating and executing multi-channel marketing campaigns",
          "Managing and optimizing affiliate programs for maximum performance",
          "Building and engaging communities to foster brand loyalty and advocacy",
          "Driving engagement and brand presence through tailored content strategies",
          "Enhancing customer experience through targeted communication and personalized campaigns",
          "Developing compelling content that strengthens brand identity",
          "Managing external communications to build brand reputation",
          "Ensuring content relevance and resonance across diverse markets"
        ]
      },
      {
        title: "Project Manager",
        company: "Siemens",
        period: "Jun 2013 - Mar 2020",
        duration: "6 yrs 9 mos",
        current: false,
        bullets: [
          "Certified Project Manager with full Profit & Loss Responsibility",
          "Managing complex domestic and international Energy Automation / SCADA projects",
          "Overall responsibility of project results based on strategic priorities and set goals (budget, quality, schedule, scope)",
          "Responsible for resource management, contract management, quality management, claim and change order management",
          "Managing Key Performance Indicators in project portfolio",
          "Managing customer requirements by active communication and information gathering",
          "Defining project scope, goals and deliverables that support project goals",
          "Managing, developing, and coordinating customer requirements of complex systems",
          "Leading and managing cross-functional teams and external partners",
          "Managing the development of project plans and monitoring progress",
          "Performing and managing project risks analysis and coordinating mitigation actions",
          "Coaching and mentoring new team members"
        ]
      },
      {
        title: "Power System Analysis Consultant",
        company: "Siemens",
        period: "Jun 2008 - Jun 2013",
        duration: "5 yrs",
        current: false,
        bullets: [
          "Managing and performing power system analyze and planning projects in compliance with techniques and standards",
          "Attending trainings as an instructor for power system analysis and softwares",
          "First level technical support to the client in scope of network consulting services",
          "First level support to consultant services sale group and client visits",
          "First level support for network consulting offers and managing sales after services",
          "Expertise in HV-MV-LV switchgear/yard, generation plants",
          "Short circuit and load flow analysis",
          "Network elements' dimensioning",
          "Protection coordination",
          "Fault records analysis",
          "Motor start-up analysis",
          "Harmonic analysis",
          "Power System Reliability"
        ]
      }
    ]
  }
  
  if (projectId === "1") {
    return [
      {
        title: "Senior Full Stack Developer",
        company: "TechCorp Solutions",
        period: `${2021 + (hash % 2)} - Present`,
        duration: `${3 + (hash % 2)} years ${9 + (hash % 3)} months`,
        current: true,
        bullets: [
          "Led development of enterprise React/TypeScript applications serving 100K+ users",
          "Architected scalable Node.js backend services with MongoDB and PostgreSQL",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Mentored team of 3 junior developers on modern web development practices"
        ]
      },
      {
        title: "Full Stack Developer",
        company: "StartupHub",
        period: `${2019 + (hash % 2)} - ${2021 + (hash % 1)}`,
        duration: `${2 + (hash % 2)} years`,
        current: false,
        bullets: [
          "Developed responsive web applications using React, Node.js, and Express",
          "Designed and implemented RESTful APIs for mobile and web clients",
          "Optimized database queries improving application performance by 45%"
        ]
      }
    ]
  } else if (projectId === "2") {
    return [
      {
        title: "Senior Flutter Developer",
        company: "MobileTech Inc",
        period: `${2020 + (hash % 2)} - Present`,
        duration: `${4 + (hash % 1)} years`,
        current: true,
        bullets: [
          "Developed and launched 5+ cross-platform mobile apps with 500K+ downloads",
          "Implemented state management using Bloc and Riverpod patterns",
          "Integrated Firebase for real-time data synchronization and authentication",
          "Led mobile architecture decisions and mentored junior developers"
        ]
      },
      {
        title: "Flutter Developer",
        company: "AppStudio",
        period: `${2018 + (hash % 2)} - ${2020 + (hash % 1)}`,
        duration: `${2 + (hash % 1)} years`,
        current: false,
        bullets: [
          "Built Flutter applications for iOS and Android with shared codebase",
          "Implemented custom UI components and animations",
          "Collaborated with design team to implement pixel-perfect mobile interfaces"
        ]
      }
    ]
  } else {
    return [
      {
        title: "Senior Data Engineer",
        company: "DataTech Solutions",
        period: `${2021 + (hash % 1)} - Present`,
        duration: `${3 + (hash % 1)} years ${10 + (hash % 2)} months`,
        current: true,
        bullets: [
          "Architected and implemented scalable ETL pipelines processing 50TB+ daily using Spark and Kafka",
          "Led data infrastructure migration to AWS, reducing costs by 35% while improving performance",
          "Designed real-time streaming data platform serving 10M+ events per minute",
          "Mentored team of 4 junior data engineers on best practices and cloud technologies"
        ]
      },
      {
        title: "Data Engineer",
        company: "BigData Analytics Ltd",
        period: `${2019 + (hash % 1)} - ${2021 + (hash % 1)}`,
        duration: `${1 + (hash % 1)} years ${7 + (hash % 5)} months`,
        current: false,
        bullets: [
          "Built and maintained data pipelines using Python, Spark, and Airflow for analytics platform",
          "Optimized SQL queries and data warehouse schemas, improving query performance by 60%",
          "Implemented data quality frameworks and monitoring systems using Great Expectations",
          "Collaborated with data scientists to deploy machine learning models into production"
        ]
      },
      {
        title: "Junior Data Engineer",
        company: "StartupData Inc",
        period: `${2017 + (hash % 1)} - ${2019 + (hash % 1)}`,
        duration: "2 years",
        current: false,
        bullets: [
          "Developed ETL processes for ingesting data from multiple sources into data lake",
          "Created data transformation scripts in Python and PySpark for business intelligence",
          "Maintained and optimized data infrastructure on GCP using BigQuery and Cloud Storage"
        ]
      }
    ]
  }
}

const getAnalysisContent = (projectId: string, candidateName: string) => {
  const hash = candidateName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const baseMatch = 85 + (hash % 15)
  
  if (projectId === "1") {
    return {
      match: baseMatch,
      highlights: [
        {
          icon: CheckCircle2,
          title: "Strong Full Stack Expertise",
          description: `${candidateName} has ${3 + (hash % 3)}+ years of full stack development experience with proven expertise in React, TypeScript, and Node.js. Demonstrated ability to build scalable web applications.`
        },
        {
          icon: CheckCircle2,
          title: "Modern Tech Stack",
          description: "Excellent command of modern web technologies including React hooks, TypeScript, MongoDB, and RESTful API design. Familiar with Docker and CI/CD best practices."
        },
        {
          icon: CheckCircle2,
          title: "Team Leadership",
          description: "Experience leading development teams and mentoring junior developers. Strong collaboration skills with product and design teams."
        },
        {
          icon: AlertCircle,
          title: "Salary Expectations",
          description: "Salary expectations align well with market standards for senior full stack developer roles."
        }
      ],
      recommendation: `${candidateName} is a strong candidate for the Full Stack Web Developer position with relevant experience, technical skills, and leadership qualities. Recommended to proceed to interview stage.`
    }
  } else if (projectId === "2") {
    return {
      match: baseMatch,
      highlights: [
        {
          icon: CheckCircle2,
          title: "Expert Mobile Developer",
          description: `${candidateName} has ${4 + (hash % 3)}+ years of Flutter development experience. Expert in building cross-platform mobile applications for iOS and Android with excellent UI/UX skills.`
        },
        {
          icon: CheckCircle2,
          title: "Cross-Platform Mastery",
          description: "Proven expertise in Flutter, Dart, and Firebase. Strong portfolio of published apps with significant user bases. Deep understanding of state management patterns."
        },
        {
          icon: CheckCircle2,
          title: "Modern Mobile Architecture",
          description: "Experience with Bloc, Riverpod, and clean architecture patterns. Strong knowledge of mobile app performance optimization and native plugin integration."
        },
        {
          icon: AlertCircle,
          title: "Salary Expectations",
          description: "Salary expectations are reasonable for senior Flutter developer positions in the current market."
        }
      ],
      recommendation: `${candidateName} is an excellent candidate for the Flutter Developer position with strong mobile development skills, cross-platform expertise, and proven track record. Highly recommended to proceed to interview stage.`
    }
  } else {
    return {
      match: baseMatch + 2,
      highlights: [
        {
          icon: CheckCircle2,
          title: "Strong Big Data Expertise",
          description: `${candidateName} has ${5 + (hash % 3)}+ years of data engineering experience with proven expertise in Spark, Kafka, and cloud data platforms. Strong background in building scalable ETL pipelines and data infrastructure.`
        },
        {
          icon: CheckCircle2,
          title: "Cloud Platform Mastery",
          description: "Extensive experience with AWS, GCP, and Azure. Demonstrated ability to architect and implement data solutions on cloud platforms with focus on cost optimization and scalability."
        },
        {
          icon: CheckCircle2,
          title: "Real-time Streaming Experience",
          description: "Hands-on experience with Kafka and real-time data processing. Successfully implemented streaming pipelines for high-volume data ingestion and processing."
        },
        {
          icon: AlertCircle,
          title: "Salary Expectations",
          description: "Stated salary expectation aligns well with market standards for senior data engineering roles."
        }
      ],
      recommendation: `${candidateName} is an excellent candidate for the Data Engineer position with strong technical skills, cloud expertise, and real-time streaming experience. Highly recommended to proceed to interview stage.`
    }
  }
}

export function CandidateDetailModal({ 
  isOpen, 
  onClose, 
  candidateId, 
  projectTitle = "Sales Representative",
  candidateName = "Grace Frederick",
  candidateEmail = "grace.f@colostate.edu",
  candidateRole = "QA Engineer",
  projectId = "1"
}: CandidateDetailModalProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"general" | "work" | "education" | "analysis" | "interviews" | "ranking">("general")
  const [isEmailRevealed, setIsEmailRevealed] = useState(false)

  if (!isOpen || !candidateId) return null

  // Extract first and last name from candidateName
  const nameParts = candidateName.split(" ")
  const firstName = nameParts[0] || candidateName
  const lastName = nameParts.slice(1).join(" ") || ""
  
  // Set email for Alper Bulut
  const actualEmail = (projectId === "4" && candidateName === "Alper Bulut") 
    ? "alper.bulut@binance.com" 
    : candidateEmail
  
  const emailDisplay = (projectId === "4" && candidateName === "Alper Bulut" && !isEmailRevealed)
    ? "••••••••••••••••••••••"
    : actualEmail
  const phoneDisplay = "***********"
  const linkedinUrl = ""
  
  // Get project-specific data
  const muffinScores = getMuffinInterviewScores(projectId, candidateName)
  const nativeScores = getNativeInterviewScores(candidateName)
  const rankingData = getRankingScore(projectId, candidateName)
  const educationContent = getEducationContent(projectId, candidateName)
  const workHistory = getWorkHistory(projectId, candidateName)
  const analysisContent = getAnalysisContent(projectId, candidateName)

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200" onClick={onClose} />

      <div className="fixed right-0 top-0 bottom-0 w-[1100px] bg-background z-50 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
                <h2 className="text-2xl font-semibold text-muted-foreground">{projectTitle}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hover:bg-muted bg-transparent">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 hover:from-indigo-100 hover:to-purple-100"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Change Stage
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200 hover:from-red-100 hover:to-rose-100"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-cyan-100"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-purple-200 hover:from-purple-100 hover:to-indigo-100"
                  onClick={() => {
                    router.push(`/candidate-detail/${projectId}/${candidateId}`)
                    onClose()
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Detail
                </Button>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Candidate Info */}
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-2xl font-semibold text-foreground">{candidateName}</h3>
                  {linkedinUrl ? (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-blue-600 hover:bg-blue-50"
                      onClick={() => window.open(linkedinUrl, '_blank')}
                    >
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  )}
                  
                  {/* Compact Info Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs px-2 py-0.5 h-5">
                      <span className="text-muted-foreground text-[10px] mr-1">Application:</span>
                      <span className="font-medium">{candidateRole}</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-0.5 h-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1"></div>
                    <span className="font-medium">Applied/Sourced</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-0.5 h-5">
                      <span className="text-muted-foreground text-[10px] mr-1">Source:</span>
                      <span className="font-medium">LinkedIn, GitHub</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-6 text-base border-b border-border -mb-px">
              <button
                onClick={() => setActiveTab("general")}
                className={`pb-4 px-2 ${
                  activeTab === "general"
                    ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                General Info
              </button>
              <button
                onClick={() => setActiveTab("work")}
                className={`pb-4 px-2 ${
                  activeTab === "work"
                    ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Work History
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`pb-4 px-2 ${
                  activeTab === "education"
                    ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Education History
              </button>
              <button
                onClick={() => setActiveTab("analysis")}
                className={`pb-4 px-2 ${
                  activeTab === "analysis"
                    ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Analysis
              </button>
              <button
                onClick={() => setActiveTab("interviews")}
                className={`pb-4 px-2 ${
                  activeTab === "interviews"
                    ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Interviews
              </button>
              <button
                onClick={() => setActiveTab("ranking")}
                className={`pb-4 px-2 ${
                  activeTab === "ranking"
                    ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Ranking
              </button>
              <div className="ml-auto flex gap-6">
                <button className="pb-4 px-2 border-b-2 border-indigo-600 text-indigo-600 font-semibold">Activity</button>
                <button className="pb-4 px-2 text-muted-foreground hover:text-foreground">Notes</button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6 p-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-6">
            {activeTab === "general" && (
            <Card className="border-border/50 shadow-md">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-4">Application Details</h4>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground mb-3">Candidate</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">First name</label>
                          <div className="mt-1 px-3 py-2 bg-muted/50 rounded-md">{firstName}</div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Last name</label>
                          <div className="mt-1 px-3 py-2 bg-muted/50 rounded-md">{lastName || "-"}</div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Email</label>
                          <div 
                            className={`mt-1 px-3 py-2 bg-muted/50 rounded-md ${(projectId === "4" && candidateName === "Alper Bulut" && !isEmailRevealed) ? 'cursor-pointer hover:bg-muted/70 transition-colors' : ''}`}
                            onClick={() => {
                              if (projectId === "4" && candidateName === "Alper Bulut" && !isEmailRevealed) {
                                setIsEmailRevealed(true)
                              }
                            }}
                          >
                            {emailDisplay}
                          </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Phone number</label>
                        <div className="mt-1 px-3 py-2 bg-muted/50 rounded-md">{phoneDisplay}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground mb-3">Screening Questions</h5>
                    <div>
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        Salary Expectation
                        <span className="text-xs">💰</span>
                      </label>
                      <div className="mt-1 px-3 py-2 bg-muted/50 rounded-md">******</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            )}

            {activeTab === "education" && (
              <Card className="border-border/50 shadow-md bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-semibold text-lg">Education History</h4>
                  </div>

                  <div className="space-y-4">
                    {educationContent.map((edu, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${idx < 2 ? 'from-blue-100 to-indigo-100' : 'from-amber-100 to-orange-100'} flex items-center justify-center flex-shrink-0`}>
                          {idx < 2 ? (
                        <GraduationCap className="w-6 h-6 text-indigo-600" />
                          ) : (
                            <FileText className="w-6 h-6 text-amber-600" />
                          )}
                      </div>
                      <div className="flex-1">
                          <h5 className="font-semibold">{edu.degree}</h5>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {edu.period} {edu.grade && `• ${edu.grade}`}
                          </p>
                          {edu.description && (
                            <p className="text-sm mt-2">{edu.description}</p>
                          )}
                    </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "work" && (
              <Card className="border-border/50 shadow-md bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-semibold text-lg">Work History</h4>
                  </div>

                  <div className="space-y-6">
                    {workHistory.map((work, idx) => {
                      const colors = [
                        "from-emerald-100 to-teal-100",
                        "from-blue-100 to-cyan-100",
                        "from-purple-100 to-pink-100"
                      ]
                      const iconColors = [
                        "text-emerald-600",
                        "text-blue-600",
                        "text-purple-600"
                      ]
                      return (
                        <div key={idx} className="flex gap-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[idx % colors.length]} flex items-center justify-center flex-shrink-0`}>
                            <Briefcase className={`w-6 h-6 ${iconColors[idx % iconColors.length]}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                                <h5 className="font-semibold">{work.title}</h5>
                                <p className="text-sm text-muted-foreground">{work.company}</p>
                                <p className="text-xs text-muted-foreground mt-1">{work.period} • {work.duration}</p>
                          </div>
                              {work.current && (
                          <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200">
                            Current
                          </Badge>
                              )}
                        </div>
                        <ul className="text-sm mt-3 space-y-1 list-disc list-inside text-muted-foreground">
                              {work.bullets.map((bullet, bulletIdx) => (
                                <li key={bulletIdx}>{bullet}</li>
                              ))}
                        </ul>
                      </div>
                    </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "analysis" && (
              <Card className="border-border/50 shadow-md bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-lg">AI Analysis</h4>
                  </div>

                  <div className="space-y-4">
                    {analysisContent.highlights.map((highlight, idx) => {
                      const Icon = highlight.icon
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <Icon className={`w-5 h-5 ${Icon === CheckCircle2 ? 'text-emerald-600' : 'text-amber-600'} mt-0.5 flex-shrink-0`} />
                      <div>
                            <h5 className="font-medium">{highlight.title}</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                              {highlight.description}
                        </p>
                      </div>
                    </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="font-semibold text-emerald-700">
                        Overall Match: {analysisContent.match}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {analysisContent.recommendation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "interviews" && (
              <Card className="border-border/50 shadow-md bg-gradient-to-br from-violet-50/50 to-indigo-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-semibold text-lg">Interview Assessments</h4>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-purple-200 hover:from-purple-100 hover:to-indigo-100"
                      onClick={() => {
                        router.push(`/candidate-detail/${projectId}/${candidateId}`)
                        onClose()
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Detail
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Muffin Interview */}
                    <div className="p-4 rounded-lg border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">M</span>
                          </div>
                          <h5 className="font-semibold">Muffin Interview</h5>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Completed</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-3 mt-4">
                        {muffinScores.map((score, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-white border border-indigo-100">
                            <div className="text-xs text-muted-foreground mb-1">{score.skill}</div>
                            <div className="text-2xl font-bold text-indigo-600">{score.score}%</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-white border border-indigo-100">
                        <div className="text-sm font-medium mb-2">Technical Assessment</div>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Excellent understanding of {projectId === "1" ? "full stack architecture and modern web frameworks" : projectId === "2" ? "mobile app architecture and cross-platform development" : "distributed systems and Spark architecture"}</li>
                          <li>Strong problem-solving approach to complex {projectId === "1" ? "web application" : projectId === "2" ? "mobile app" : "data pipeline"} challenges</li>
                          <li>Deep knowledge of {projectId === "1" ? "React, TypeScript, and Node.js ecosystem" : projectId === "2" ? "Flutter, Dart, and Firebase integration" : "cloud data platforms and ETL optimization"}</li>
                        </ul>
                      </div>
                    </div>

                    {/* Native Interview */}
                    <div className="p-4 rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">N</span>
                          </div>
                          <h5 className="font-semibold">Native Interview</h5>
                          <Badge variant="outline" className="text-xs ml-2">English (2 Accents)</Badge>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Completed</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-3 mt-4">
                        <div className="p-3 rounded-lg bg-white border border-purple-100">
                          <div className="text-xs text-muted-foreground mb-1">Grammar</div>
                          <div className="text-2xl font-bold text-purple-600">{nativeScores.grammar}%</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-purple-100">
                          <div className="text-xs text-muted-foreground mb-1">Fluency</div>
                          <div className="text-2xl font-bold text-purple-600">{nativeScores.fluency}%</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-purple-100">
                          <div className="text-xs text-muted-foreground mb-1">Vocabulary</div>
                          <div className="text-2xl font-bold text-purple-600">{nativeScores.vocabulary}%</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-purple-100">
                          <div className="text-xs text-muted-foreground mb-1">IELTS/PTE Est.</div>
                          <div className="text-2xl font-bold text-purple-600">{nativeScores.ieltsPte}</div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-white border border-purple-100">
                        <div className="text-sm font-medium mb-2">Language Assessment</div>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Strong grammatical accuracy with minimal errors in complex sentences</li>
                          <li>Excellent fluency with natural pauses and rhythm in speech</li>
                          <li>Rich vocabulary demonstrating technical and professional communication skills</li>
                          <li>Estimated IELTS Speaking: 8.5 / PTE Speaking: 88-90</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "ranking" && (
              <Card className="border-border/50 shadow-md bg-gradient-to-br from-amber-50/50 to-orange-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <h4 className="font-semibold text-lg">CV Evaluation & Ranking</h4>
                  </div>

                  <div className="space-y-6">
                    {/* Overall Ranking */}
                    <div className="p-4 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold">Overall Ranking</h5>
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-lg px-3 py-1">#{rankingData.rank}</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="p-3 rounded-lg bg-white border border-amber-100 text-center">
                          <div className="text-xs text-muted-foreground mb-1">Technical Match</div>
                          <div className="text-xl font-bold text-amber-600">{rankingData.technicalMatch}%</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-amber-100 text-center">
                          <div className="text-xs text-muted-foreground mb-1">Experience</div>
                          <div className="text-xl font-bold text-amber-600">{rankingData.experience}%</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-amber-100 text-center">
                          <div className="text-xs text-muted-foreground mb-1">Skills Match</div>
                          <div className="text-xl font-bold text-amber-600">{rankingData.skillsMatch}%</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-amber-100 text-center">
                          <div className="text-xs text-muted-foreground mb-1">Education</div>
                          <div className="text-xl font-bold text-amber-600">{rankingData.education}%</div>
                        </div>
                      </div>
                    </div>

                    {/* CV Sections */}
                    <div className="space-y-4">
                      <h5 className="font-semibold">CV Section Analysis</h5>
                      
                      <div className="p-4 rounded-lg border border-amber-200 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Work Experience</span>
                          <Badge className="bg-emerald-100 text-emerald-700">Excellent</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {projectId === "1" 
                            ? `${3 + Math.floor((candidateName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 3))}+ years of relevant full stack development experience with strong progression. Clear evidence of working with React, TypeScript, and modern web frameworks. Leadership roles demonstrate growth potential.`
                            : projectId === "2"
                            ? `${4 + Math.floor((candidateName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 2))}+ years of relevant Flutter development experience with strong progression. Clear evidence of working with cross-platform mobile technologies and state management. Strong portfolio of published applications.`
                            : `${5 + Math.floor((candidateName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 3))}+ years of relevant data engineering experience with strong progression. Clear evidence of working with Spark, Kafka, and cloud platforms. Leadership roles demonstrate growth potential.`
                          }
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border border-amber-200 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Technical Skills</span>
                          <Badge className="bg-emerald-100 text-emerald-700">Excellent</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {projectId === "1"
                            ? `Comprehensive skill set including React, TypeScript, Node.js, MongoDB, PostgreSQL. Strong understanding of RESTful APIs, Git workflow, and CI/CD practices.`
                            : projectId === "2"
                            ? `Comprehensive skill set including Flutter, Dart, Firebase, Bloc, Riverpod. Strong understanding of mobile app architecture, state management patterns, and native plugin integration.`
                            : `Comprehensive skill set including Python, Spark, Kafka, AWS, GCP, SQL. Certifications demonstrate commitment to professional development.`
                          }
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border border-amber-200 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Education</span>
                          <Badge className="bg-blue-100 text-blue-700">Good</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {projectId === "1"
                            ? `Relevant degree in Computer Science with focus on web development and software engineering. Additional certifications in React and modern frameworks strengthen the profile.`
                            : projectId === "2"
                            ? `Relevant degree in Computer Science with focus on mobile app development. Additional certifications in Flutter and mobile technologies strengthen the profile.`
                            : `Relevant degree in Computer Science with focus on data systems. Additional certifications in cloud platforms strengthen the profile.`
                          }
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border border-amber-200 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Project Portfolio</span>
                          <Badge className="bg-emerald-100 text-emerald-700">Excellent</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {projectId === "1"
                            ? `Strong portfolio showcasing full-stack web applications, React-based projects, and scalable backend systems. Demonstrates ability to build production-ready applications.`
                            : projectId === "2"
                            ? `Strong portfolio showcasing cross-platform mobile applications with significant user bases. Demonstrates expertise in Flutter development and mobile UI/UX design.`
                            : `Strong portfolio showcasing complex data pipeline implementations, real-time streaming solutions, and cloud infrastructure projects.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Activity Feed */}
          <div className="col-span-1">
            <Card className="sticky top-24 border-border/50 shadow-md">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-center mb-2 text-sm">{projectTitle} {"<>"} {candidateName} // {candidateRole}</h4>
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    You have a meeting with {firstName} planned for Wed 20 Jan 2026 09:00.
                  </p>
                  <div className="mb-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-xs text-blue-700 text-center">
                      <span className="font-medium">Available for interviews</span> until <span className="font-semibold">Mar 15, 2026</span>
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-sm py-2">
                    Join now
                    <ChevronRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold">Activity Feed</h5>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                      5
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {/* Preliminary Contract - Most Recent */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Preliminary contract</span> sent to {candidateName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                      </div>
                    </div>

                    {/* Ranking Scores */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Ranking scores</span> calculated: Overall #{rankingData.rank} ({rankingData.match}% match)
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                      </div>
                    </div>

                    {/* Interviews Completed */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                        <Video className="w-4 h-4 text-violet-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Interviews completed</span>: Muffin Interview ({Math.round(muffinScores.reduce((acc, s) => acc + s.score, 0) / muffinScores.length)}%) & Native Interview ({Math.round((nativeScores.grammar + nativeScores.fluency + nativeScores.vocabulary) / 3)}%)
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                      </div>
                    </div>

                    {/* Ideal Profile Match Rate */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                        <Target className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Ideal profile match rate</span> calculated: {analysisContent.match}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 weeks ago</p>
                      </div>
                    </div>

                    {/* Candidate Sourced */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                        <Search className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{candidateName}</span> sourced from LinkedIn, GitHub
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">1 month ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
