"use client"

import { useState, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChevronRight,
  Search,
  Plus,
  Download,
  RefreshCw,
  Mail,
  MessageSquare,
  Video,
  UserPlus,
  X,
  ExternalLink,
  ChevronDown,
  ArrowLeft,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Settings,
  Users,
  TrendingUp,
  Clock,
  Target,
  DollarSign,
  Code,
  Bell,
  Archive,
  Bookmark,
  Shield,
  Globe,
  ThumbsUp,
  ThumbsDown,
  Linkedin,
  MoreVertical,
  CheckSquare,
  Square,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CandidateDetailModal } from "@/components/candidate-detail-modal"
import { EmailTemplateSystem } from "@/components/email-template-system"

// Project data configurations
const projectConfigs: Record<string, {
  title: string
  description: string
  pipelineStages: Array<{ id: number; name: string; count: number; active: boolean }>
  keyFeatures: string[]
  requiredSkills: string[]
  competitors: string[]
  marketSalary: string
  offeringSalary: string
  emailSubject: string
  emailBody: string
  candidateName: string
  candidateLocation: string
  candidateSummary: string
  candidateBadges: string[]
  candidateAbout: string
  flutterCandidates?: Array<{ name: string; role: string; location: string }>
  flutterSkills?: string[]
  dataEngineerCandidates?: Array<{ name: string; role: string; location: string }>
  dataEngineerSkills?: string[]
}> = {
  "1": {
    title: "Sahibinden - Full Stack Web Dev",
    description: "We are a Tech company based in Berlin with 50+ employes. We are hiring a Full Stack Web Developer with 3+ years experience who is skilled in React, TypeScript, Figma.",
    pipelineStages: [
      { id: 1, name: "Total Sourced", count: 500, active: true },
      { id: 2, name: "Interview", count: 46, active: false },
      { id: 3, name: "ATS", count: 19, active: false },
      { id: 4, name: "Salary", count: 11, active: false },
      { id: 5, name: "Shortlist", count: 7, active: false },
      { id: 6, name: "Goal for hire", count: 1, active: false },
    ],
    keyFeatures: [
      "React & TypeScript development",
      "Full stack web application expertise",
      "Modern UI/UX design with Figma",
      "API development and integration",
      "Database design and optimization",
      "Agile development methodologies"
    ],
    requiredSkills: [
      "React & TypeScript expertise",
      "Node.js backend development",
      "MongoDB & PostgreSQL databases",
      "RESTful API design",
      "Git workflow proficiency",
      "Docker & CI/CD knowledge"
    ],
    competitors: ["TechVenture", "StartupHub", "CodeCraft", "WebFlow"],
    marketSalary: "$75,000",
    offeringSalary: "$70K - $85K",
    emailSubject: "Opportunity at Atlas Studio",
    emailBody: `Hi Tommy,

I hope you're doing well. My name is Sarah Whitman, and I'm a recruiter at Atlas Studio. We're looking for a talented Sales Representative to join our team, and your work stood out to us, particularly your experience in B2B sales, CRM, and enterprise client management.

Looking forward to connecting!`,
    candidateName: "Tommy T.",
    candidateLocation: "New York, USA",
    candidateSummary: "✨ Senior Sales Representative with leadership experience. Worked several years in B2B enterprise sales, at high-growth SaaS companies.",
    candidateBadges: ["Award winner", "B2B Sales", "Enterprise", "CRM Expert"],
    candidateAbout: "I'm a player-coach sales generalist with a marketing and business background. I've built strong client relationships and consistently exceeded sales targets at enterprise technology companies.",
  },
  "2": {
    title: "Flutter Developer - Mobile Applications",
    description: "We are a fast-growing mobile technology company based in San Francisco with 100+ employees. We are hiring a Flutter Developer with 3+ years of experience in cross-platform mobile app development, skilled in Dart, Flutter framework, Firebase, and mobile UI/UX design.",
    pipelineStages: [
      { id: 1, name: "Total Sourced", count: 320, active: true },
      { id: 2, name: "Interview", count: 28, active: false },
      { id: 3, name: "ATS", count: 15, active: false },
      { id: 4, name: "Salary", count: 9, active: false },
      { id: 5, name: "Shortlist", count: 5, active: false },
      { id: 6, name: "Goal for hire", count: 1, active: false },
    ],
    keyFeatures: [
      "Flutter & Dart development",
      "Cross-platform mobile app expertise",
      "Firebase backend integration",
      "Native plugin development",
      "State management (Bloc/Riverpod)",
      "Mobile UI/UX design patterns"
    ],
    requiredSkills: [
      "Flutter & Dart expertise",
      "Firebase & backend integration",
      "State management (Bloc/Riverpod)",
      "RESTful API integration",
      "Git workflow proficiency",
      "Mobile app architecture"
    ],
    competitors: ["MobileStart", "AppVenture", "DevMobile", "FlutterLab"],
    marketSalary: "$85,000",
    offeringSalary: "$80K - $95K",
    emailSubject: "Flutter Developer Opportunity",
    emailBody: `Hi Sarah,

I hope you're doing well. My name is Michael Chen, and I'm a recruiter at TechMobile Inc. We're looking for a talented Flutter Developer to join our team, and your mobile app development experience caught our attention, particularly your expertise in Flutter, Dart, and cross-platform development.

Looking forward to connecting!`,
    candidateName: "Sarah Johnson",
    candidateLocation: "San Francisco, CA",
    candidateSummary: "✨ Senior Flutter Developer with 5+ years of experience. Expert in building cross-platform mobile applications for iOS and Android with excellent UI/UX skills.",
    candidateBadges: ["Flutter Expert", "Cross-platform", "Firebase", "Mobile UI/UX"],
    candidateAbout: "I'm a passionate mobile developer with a strong background in Flutter and Dart. I've built and launched multiple successful apps on both iOS and Android platforms, with expertise in state management, Firebase integration, and beautiful UI design.",
    flutterCandidates: [
      { name: "Sarah Johnson", role: "Senior Flutter Developer", location: "Vienna, Austria" },
      { name: "Michael Chen", role: "Principal Mobile Engineer", location: "Vienna, Austria" },
      { name: "Emily Davis", role: "Lead Flutter Developer", location: "Vienna, Austria" },
      { name: "James Wilson", role: "Senior Mobile Developer", location: "Vienna, Austria" },
      { name: "Lisa Martinez", role: "Flutter Architect", location: "Vienna, Austria" },
      { name: "Robert Brown", role: "Cross-platform Developer", location: "Vienna, Austria" },
      { name: "Jennifer Lee", role: "Mobile App Developer", location: "Vienna, Austria" },
      { name: "David Garcia", role: "Flutter Specialist", location: "Vienna, Austria" },
      { name: "Amanda Taylor", role: "Senior Mobile Engineer", location: "Vienna, Austria" },
      { name: "Christopher White", role: "Flutter Developer", location: "Vienna, Austria" },
      { name: "Jessica Anderson", role: "Mobile Developer", location: "Vienna, Austria" },
      { name: "Daniel Harris", role: "Flutter Engineer", location: "Vienna, Austria" },
      { name: "Nicole Clark", role: "Senior Flutter Dev", location: "Vienna, Austria" },
      { name: "Kevin Lewis", role: "Mobile Architect", location: "Vienna, Austria" },
      { name: "Rachel Walker", role: "Lead Mobile Developer", location: "Vienna, Austria" },
      { name: "Matthew Hall", role: "Flutter Developer", location: "Vienna, Austria" },
      { name: "Stephanie Young", role: "Mobile App Specialist", location: "Vienna, Austria" },
      { name: "Andrew King", role: "Cross-platform Engineer", location: "Vienna, Austria" },
      { name: "Lauren Wright", role: "Flutter Developer", location: "Vienna, Austria" },
      { name: "Ryan Green", role: "Mobile Developer", location: "Vienna, Austria" },
    ],
    flutterSkills: ["Flutter", "Dart", "Firebase", "Bloc", "Riverpod"],
  },
  "3": {
    title: "Data Engineer - Big Data & Analytics",
    description: "We are an innovative data technology company based in London with 150+ employees. We are hiring a Data Engineer with 4+ years of experience in big data processing, ETL pipelines, cloud data platforms, and data infrastructure, skilled in Python, Spark, Kafka, and AWS/GCP.",
    pipelineStages: [
      { id: 1, name: "Total Sourced", count: 280, active: true },
      { id: 2, name: "Interview", count: 35, active: false },
      { id: 3, name: "ATS", count: 22, active: false },
      { id: 4, name: "Salary", count: 14, active: false },
      { id: 5, name: "Shortlist", count: 8, active: false },
      { id: 6, name: "Goal for hire", count: 1, active: false },
    ],
    keyFeatures: [
      "Big data processing & ETL pipelines",
      "Cloud data platform expertise (AWS/GCP/Azure)",
      "Real-time streaming with Kafka",
      "Data warehouse & lake architecture",
      "Python & Spark development",
      "Data infrastructure & automation"
    ],
    requiredSkills: [
      "Python & SQL expertise",
      "Apache Spark & distributed computing",
      "ETL/ELT pipeline development",
      "Cloud platforms (AWS/GCP/Azure)",
      "Kafka & real-time streaming",
      "Data modeling & warehousing"
    ],
    competitors: ["DataStart", "AnalyticsHub", "CloudVenture", "StreamTech"],
    marketSalary: "$95,000",
    offeringSalary: "$90K - $110K",
    emailSubject: "Data Engineer Opportunity",
    emailBody: `Hi Mark,

I hope you're doing well. My name is Jennifer Martinez, and I'm a recruiter at DataTech Solutions. We're looking for a talented Data Engineer to join our team, and your experience in big data processing, ETL pipelines, and cloud data platforms impressed us, particularly your expertise in Spark, Kafka, and Python.

Looking forward to connecting!`,
    candidateName: "Mark Thompson",
    candidateLocation: "London, UK",
    candidateSummary: "✨ Senior Data Engineer with 6+ years of experience. Expert in building scalable data pipelines, ETL processes, and data infrastructure on cloud platforms.",
    candidateBadges: ["Big Data", "ETL Expert", "Cloud Platforms", "Python"],
    candidateAbout: "I'm a data engineering specialist with extensive experience in designing and implementing large-scale data processing systems. I've built robust ETL pipelines, optimized data warehouses, and implemented real-time streaming solutions using Spark, Kafka, and cloud-native technologies.",
    dataEngineerCandidates: [
      { name: "Mark Thompson", role: "Senior Data Engineer", location: "Berlin, Germany" },
      { name: "Julia Anderson", role: "Principal Data Architect", location: "Berlin, Germany" },
      { name: "Robert Chen", role: "Lead Data Engineer", location: "Berlin, Germany" },
      { name: "Sarah Williams", role: "Senior Big Data Engineer", location: "Berlin, Germany" },
      { name: "Michael Brown", role: "Data Infrastructure Engineer", location: "Berlin, Germany" },
      { name: "Emily Davis", role: "ETL Pipeline Developer", location: "Berlin, Germany" },
      { name: "David Garcia", role: "Data Platform Engineer", location: "Berlin, Germany" },
      { name: "Lisa Martinez", role: "Spark Specialist", location: "Berlin, Germany" },
      { name: "James Wilson", role: "Cloud Data Engineer", location: "Berlin, Germany" },
      { name: "Amanda Taylor", role: "Senior Data Pipeline Engineer", location: "Berlin, Germany" },
      { name: "Christopher Lee", role: "Big Data Developer", location: "Berlin, Germany" },
      { name: "Nicole Harris", role: "Data Warehouse Engineer", location: "Berlin, Germany" },
      { name: "Kevin Clark", role: "Real-time Data Engineer", location: "Berlin, Germany" },
      { name: "Rachel Lewis", role: "Data Infrastructure Architect", location: "Berlin, Germany" },
      { name: "Matthew Walker", role: "Senior ETL Developer", location: "Berlin, Germany" },
      { name: "Stephanie Hall", role: "Data Platform Specialist", location: "Berlin, Germany" },
      { name: "Andrew Young", role: "Streaming Data Engineer", location: "Berlin, Germany" },
      { name: "Lauren King", role: "Cloud Data Architect", location: "Berlin, Germany" },
      { name: "Ryan Wright", role: "Data Engineering Lead", location: "Berlin, Germany" },
      { name: "Jessica Green", role: "Big Data Infrastructure Engineer", location: "Berlin, Germany" },
    ],
    dataEngineerSkills: ["Python", "Spark", "Kafka", "AWS", "SQL"],
  },
  "4": {
    title: "Marketing Manager",
    description: "5 years deneyim, Türkiye",
    pipelineStages: [
      { id: 1, name: "Total Sourced", count: 124, active: true },
      { id: 2, name: "Interview", count: 37, active: false },
      { id: 3, name: "ATS", count: 24, active: false },
      { id: 4, name: "Salary", count: 12, active: false },
      { id: 5, name: "Shortlist", count: 10, active: false },
      { id: 6, name: "Goal for hire", count: 1, active: false },
    ],
    keyFeatures: [
      "Marketing strategy & planning",
      "Digital marketing expertise",
      "Brand management",
      "Campaign development",
      "Market analysis",
      "Team leadership"
    ],
    requiredSkills: [
      "Marketing strategy",
      "Digital marketing",
      "Brand management",
      "Campaign development",
      "Analytics & reporting",
      "Team leadership"
    ],
    competitors: ["MarketingPro", "BrandHub", "CampaignLab", "MarketVenture"],
    marketSalary: "$70,000",
    offeringSalary: "$65K - $80K",
    emailSubject: "Marketing Manager Opportunity",
    emailBody: `Hi,

I hope you're doing well. We're looking for a talented Marketing Manager to join our team, and your experience in marketing strategy and digital marketing caught our attention.

Looking forward to connecting!`,
    candidateName: "Alper Bulut",
    candidateLocation: "Istanbul, Türkiye",
    candidateSummary: "✨ Marketing Manager with 5+ years of experience. Expert in digital marketing, brand management, and campaign development.",
    candidateBadges: ["Digital Marketing", "Brand Management", "Campaign Development", "Analytics"],
    candidateAbout: "I'm a marketing professional with extensive experience in developing and executing marketing strategies, managing brands, and leading marketing teams.",
    flutterCandidates: [
      { name: "Alper Bulut", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Ceyhun Çakanel", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Emin İNCI", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Svetoslav Vodenicharov", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Yıldıray Yildirim", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Burcu Uygur", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Emre Dursun", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Mehmet Hüdai", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Özge Ergelen", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Sinem Yılmaz", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Burcu Diptas", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Hilal Altintas", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Ahmet Bayram", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Aysenur Kurt", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Beyza Selcuk", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Beyza Yenal", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Birben Aytemir", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Burcu Ceylanoğlu", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Burcu Gökmen", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Burçin Akkaya", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Burçin Çelik", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Burçin Kızıltepe", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Büşra Çeliktaş", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Büşra Güney", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Cana Acar", role: "Marketing Manager", location: "Istanbul, Türkiye" },
      { name: "Caner Kandemir", role: "Marketing Manager", location: "Istanbul, Türkiye" },
    ],
    flutterSkills: ["Marketing Strategy", "Digital Marketing", "Brand Management", "Analytics"],
  },
}

const candidates = [
  {
    id: 1,
    name: "Tommy T.",
    email: "tommy@example.com",
    applied: "Oct. 1, 2024",
    atStage: "Oct. 1, 2024",
    assignee: "-",
    score: 3,
  },
  {
    id: 2,
    name: "Michael O.",
    email: "michael@example.com",
    applied: "March 26, 2024",
    atStage: "July 31, 2024",
    assignee: "Susan Hayden",
    score: 5,
  },
  {
    id: 3,
    name: "Olivia C.",
    email: "olivia@example.com",
    applied: "March 9, 2024",
    atStage: "March 9, 2024",
    assignee: "Ron Weasley and 1 more",
    score: 1,
  },
  {
    id: 4,
    name: "Ryan P.",
    email: "ryan@example.com",
    applied: "Jan. 16, 2024",
    atStage: "Jan. 17, 2024",
    assignee: "-",
    score: 4,
  },
  {
    id: 5,
    name: "Sophia M.",
    email: "sophia@example.com",
    applied: "Jan. 2, 2024",
    atStage: "Jan. 17, 2024",
    assignee: "-",
    score: 3,
  },
  {
    id: 6,
    name: "Grace B.",
    email: "grace@example.com",
    applied: "Dec. 26, 2023",
    atStage: "Jan. 17, 2024",
    assignee: "-",
    score: 1,
  },
  {
    id: 7,
    name: "Arthur Murray",
    email: "arthur@murray.com",
    applied: "Dec. 24, 2023",
    atStage: "Jan. 17, 2024",
    assignee: "-",
    score: 3,
  },
]

const StarRating = memo(({ count }: { count: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-lg ${i < count ? "text-yellow-400" : "text-gray-300"}`}>
          ★
        </span>
      ))}
      {count === 5 && <span className="text-xs text-muted-foreground ml-1">(+1)</span>}
    </div>
  )
})
StarRating.displayName = "StarRating"

const PipelineStage = ({ stage, isLast, onClick }: { stage: { id: number; name: string; count: number; active: boolean }; isLast: boolean; onClick: () => void }) => {
    const getStageColor = (id: number, active: boolean) => {
      if (active) return "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-105"
      const colors = [
        "bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200",
        "bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-amber-200",
        "bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-emerald-200",
        "bg-gradient-to-br from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 border-violet-200",
        "bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 border-pink-200",
        "bg-gradient-to-br from-cyan-50 to-sky-50 hover:from-cyan-100 hover:to-sky-100 border-cyan-200",
      ]
      return colors[(id - 1) % colors.length]
    }

    return (
      <>
        <button
        onClick={onClick}
          className={`
            px-6 py-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
            ${getStageColor(stage.id, stage.active)}
            ${stage.active ? "font-semibold" : "font-medium"}
          `}
        >
          <div className="flex items-center gap-3">
            <span className={`text-2xl font-bold ${stage.active ? "text-white" : "text-foreground"}`}>
              {stage.count}
            </span>
            <span className={`text-sm ${stage.active ? "text-white" : "text-muted-foreground"}`}>{stage.name}</span>
          </div>
        </button>
        {!isLast && <ChevronRight className="w-6 h-6 mx-2 text-muted-foreground" />}
      </>
    )
}

// LinkedIn link mapping for specific candidates
const linkedInLinks: Record<string, string> = {
  "Alper Bulut": "https://www.linkedin.com/search/results/people/?keywords=alper%20bulut%20binance",
  "Ceyhun Çakanel": "https://www.linkedin.com/search/results/people/?keywords=ceyhun%20%C3%A7akanel%20vodafone%20elektronik%20para%20ve%20%C3%B6deme%20hizmetleri%20a.%C5%9F.",
  "Emin İNCI": "https://www.linkedin.com/search/results/people/?keywords=emin%20i%CC%87nci%20hepsiburada%20(nasdaq%3A%20heps)",
  "Emin İNCİ": "https://www.linkedin.com/search/results/people/?keywords=emin%20i%CC%87nci%20hepsiburada%20(nasdaq%3A%20heps)"
}

export function ProjectDetailPage({ projectId }: { projectId: string }) {
  const router = useRouter()
  const projectConfig = projectConfigs[projectId] || projectConfigs["1"]
  const pipelineStages = projectConfig.pipelineStages
  
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("")
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [projectStatus, setProjectStatus] = useState<"open" | "closed" | "paused" | "draft">("open")
  const [sortField, setSortField] = useState<"name" | "email" | "applied" | "atStage" | "score">("score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState<
    "overview" | "applications" | "analysis" | "settings" | "email"
  >("applications")
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState("in-stage")
  const [tableSortField, setTableSortField] = useState<string | null>(null)
  const [tableSortDirection, setTableSortDirection] = useState<"asc" | "desc">("asc")
  const [isAnalysisGuideOpen, setIsAnalysisGuideOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState<number>(1)
  const [activeSettingsTab, setActiveSettingsTab] = useState<'general' | 'hiring' | 'integrations' | 'security'>('general')
  const [selectedEmailSegment, setSelectedEmailSegment] = useState<string>("interview")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  // Email templates based on selected segment
  const getEmailTemplate = (segment: string) => {
    const templates = {
      interview: {
        subject: `Interview Invitation - ${projectConfig.title}`,
        body: `Hi there,

Thank you for your interest in the ${projectConfig.title} position. We were impressed with your background and experience.

We would like to invite you for an interview to discuss this opportunity further. Please let us know your availability, and we'll coordinate a suitable time.

Looking forward to speaking with you!

Best regards,
The Hiring Team`
      },
      offer: {
        subject: `Job Offer - ${projectConfig.title}`,
        body: `Congratulations!

We are pleased to offer you the ${projectConfig.title} position. After careful consideration, we believe you would be a great addition to our team.

Please review the attached offer letter and let us know if you have any questions. We hope you will accept this offer and join us.

We look forward to welcoming you to the team!

Best regards,
The Hiring Team`
      },
      rejection: {
        subject: `Update on Your Application - ${projectConfig.title}`,
        body: `Thank you for your interest in the ${projectConfig.title} position and for taking the time to interview with us.

After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

We appreciate your interest in our company and wish you the best in your job search.

Best regards,
The Hiring Team`
      },
      "follow-up": {
        subject: `Follow-up - ${projectConfig.title}`,
        body: `Hi there,

Just following up on your application for the ${projectConfig.title} position. We wanted to check in and see if you have any questions about the role or our company.

Please feel free to reach out if you'd like to discuss this opportunity further.

Best regards,
The Hiring Team`
      },
      "thank-you": {
        subject: `Thank You for Your Application - ${projectConfig.title}`,
        body: `Thank you for applying to the ${projectConfig.title} position.

We have received your application and are currently reviewing it. We appreciate your interest in joining our team.

We will be in touch soon with next steps.

Best regards,
The Hiring Team`
      },
      feedback: {
        subject: `Request for Feedback - ${projectConfig.title}`,
        body: `Hi there,

Thank you for taking the time to interview with us for the ${projectConfig.title} position.

We would greatly appreciate your feedback on the interview process. Your insights help us improve our hiring experience.

Please take a moment to share your thoughts if you have any.

Best regards,
The Hiring Team`
      }
    }
    return templates[segment as keyof typeof templates] || templates.interview
  }
  
  // Generate different candidates for each stage
  const getCandidatesForStage = (stageId: number) => {
    // Use Data Engineer candidates if available
    if (projectConfig.dataEngineerCandidates) {
      const startIndex = (stageId - 1) * 10 % projectConfig.dataEngineerCandidates.length
      return [...projectConfig.dataEngineerCandidates.slice(startIndex), ...projectConfig.dataEngineerCandidates.slice(0, startIndex)]
    }
    // Use Flutter candidates if available
    if (projectConfig.flutterCandidates) {
      const startIndex = (stageId - 1) * 10 % projectConfig.flutterCandidates.length
      return [...projectConfig.flutterCandidates.slice(startIndex), ...projectConfig.flutterCandidates.slice(0, startIndex)]
    }
    
    // Set location based on project
    const projectLocation = projectId === "1" ? "London, UK" : projectId === "2" ? "Vienna, Austria" : "Berlin, Germany"
    
    const allCandidates = [
      { name: "Alex Chen", role: "Senior Full Stack Developer", location: projectLocation },
      { name: "Maria Rodriguez", role: "Principal Frontend Engineer", location: projectLocation },
      { name: "David Kim", role: "Lead Backend Developer", location: projectLocation },
      { name: "Emma Wilson", role: "Senior React Developer", location: projectLocation },
      { name: "James Taylor", role: "Full Stack Engineer", location: projectLocation },
      { name: "Sophie Martin", role: "Frontend Architect", location: projectLocation },
      { name: "Noah Anderson", role: "Software Engineer", location: projectLocation },
      { name: "Olivia Brown", role: "Tech Lead", location: projectLocation },
      { name: "Liam Garcia", role: "Senior Software Developer", location: projectLocation },
      { name: "Ava Martinez", role: "Full Stack Developer", location: projectLocation },
      { name: "Mason Lee", role: "Frontend Developer", location: projectLocation },
      { name: "Isabella White", role: "Backend Engineer", location: projectLocation },
      { name: "Ethan Harris", role: "Senior Full Stack Dev", location: projectLocation },
      { name: "Mia Clark", role: "Software Architect", location: projectLocation },
      { name: "Aiden Lewis", role: "Principal Engineer", location: projectLocation },
      { name: "Harper Walker", role: "Lead Full Stack Dev", location: projectLocation },
      { name: "Lucas Hall", role: "Senior Developer", location: projectLocation },
      { name: "Amelia Young", role: "React Specialist", location: projectLocation },
      { name: "Henry King", role: "Full Stack Engineer", location: projectLocation },
      { name: "Charlotte Wright", role: "Software Developer", location: projectLocation },
    ]
    
    // Rotate candidates based on stage
    const startIndex = (stageId - 1) * 10 % allCandidates.length
    const rotated = [...allCandidates.slice(startIndex), ...allCandidates.slice(0, startIndex)]
    
    return rotated
  }
  
  // Table candidates data - dynamic based on selected stage
  const baseSkills = projectConfig.dataEngineerSkills || projectConfig.flutterSkills || ["React", "TypeScript", "Node.js"]
  const tableCandidates = getCandidatesForStage(selectedStage).map((candidate, index) => {
    // Generate email from candidate name (e.g., "Mark Thompson" -> "mark.thompson@dataengineer.com")
    const nameParts = candidate.name.toLowerCase().split(" ")
    const emailDomain = projectId === "3" ? "dataengineer" : projectId === "2" ? "flutter" : "fullstack"
    const email = nameParts.length > 1 
      ? `${nameParts[0]}.${nameParts[nameParts.length - 1]}@${emailDomain}.com`
      : `${nameParts[0]}@${emailDomain}.com`
    
    return {
      id: index + 1,
      name: candidate.name,
      role: candidate.role,
      email: email,
      experience: `${3 + (index % 4)} years`,
      location: candidate.location,
      skills: baseSkills.slice(0, 2 + (index % 2)),
      match: 85 + (index % 15),
      status: ["Available", "In Progress", "Interviewing"][index % 3],
      avatar: "/placeholder-user.jpg",
    }
  })
  
  // Filter and sort candidates based on selected stage
  const selectedStageCount = pipelineStages.find(s => s.id === selectedStage)?.count || 20
  const filteredCandidates = tableCandidates.slice(0, selectedStageCount)
  
  const sortedTableCandidates = [...filteredCandidates].sort((a, b) => {
    if (!tableSortField) return 0
    
    let aValue: any = a[tableSortField as keyof typeof a]
    let bValue: any = b[tableSortField as keyof typeof b]
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return tableSortDirection === "asc" ? aValue - bValue : bValue - aValue
    }
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return tableSortDirection === "asc" 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue)
    }
    
    return 0
  })

  const toggleCandidateSelection = useCallback((candidateId: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId],
    )
  }, [])

  const handleCandidateClick = useCallback((candidateId: number) => {
    setSelectedCandidate(candidateId)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleTableSort = (field: string) => {
    if (tableSortField === field) {
      setTableSortDirection(tableSortDirection === "asc" ? "desc" : "asc")
    } else {
      setTableSortField(field)
      setTableSortDirection("asc")
    }
  }

  const handleSort = (field: "name" | "email" | "applied" | "atStage" | "score") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedCandidates = [...candidates].sort((a, b) => {
    let aValue: any = a[sortField]
    let bValue: any = b[sortField]

    if (sortField === "score") {
      aValue = a.score
      bValue = b.score
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const SortIcon = ({ field }: { field: "name" | "email" | "applied" | "atStage" | "score" }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 text-primary" />
    ) : (
      <ArrowDown className="w-4 h-4 text-primary" />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/ex3")}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-foreground">{projectConfig.title}</h1>
              <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsInviteModalOpen(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite
              </Button>
              <div className="relative">
                <button
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    projectStatus === "open" ? "bg-green-500" :
                    projectStatus === "closed" ? "bg-red-500" :
                    projectStatus === "paused" ? "bg-yellow-500" :
                    "bg-gray-500"
                  }`}></div>
                  <span className="text-sm font-medium capitalize">{projectStatus}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {/* Status Dropdown */}
                {isStatusDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsStatusDropdownOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900">Change Status</h3>
                        <button 
                          onClick={() => setIsStatusDropdownOpen(false)}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
              </div>

                      {/* Status Options */}
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setProjectStatus("open")
                            setIsStatusDropdownOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            projectStatus === "open" 
                              ? "bg-green-50 border-2 border-green-500" 
                              : "hover:bg-gray-50 border-2 border-transparent"
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-semibold text-gray-900">Open</div>
                            <div className="text-xs text-gray-500 mt-0.5">Project is active and accepting applications</div>
            </div>
                          {projectStatus === "open" && (
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
          </div>
                          )}
                        </button>

            <button
                          onClick={() => {
                            setProjectStatus("paused")
                            setIsStatusDropdownOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mt-2 ${
                            projectStatus === "paused" 
                              ? "bg-yellow-50 border-2 border-yellow-500" 
                              : "hover:bg-gray-50 border-2 border-transparent"
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-semibold text-gray-900">Paused</div>
                            <div className="text-xs text-gray-500 mt-0.5">Temporarily stopped accepting applications</div>
                          </div>
                          {projectStatus === "paused" && (
                            <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
            </button>

            <button
                          onClick={() => {
                            setProjectStatus("closed")
                            setIsStatusDropdownOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mt-2 ${
                            projectStatus === "closed" 
                              ? "bg-red-50 border-2 border-red-500" 
                              : "hover:bg-gray-50 border-2 border-transparent"
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-semibold text-gray-900">Closed</div>
                            <div className="text-xs text-gray-500 mt-0.5">No longer accepting new applications</div>
                          </div>
                          {projectStatus === "closed" && (
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
            </button>

            <button
                          onClick={() => {
                            setProjectStatus("draft")
                            setIsStatusDropdownOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mt-2 ${
                            projectStatus === "draft" 
                              ? "bg-gray-50 border-2 border-gray-500" 
                              : "hover:bg-gray-50 border-2 border-transparent"
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-semibold text-gray-900">Draft</div>
                            <div className="text-xs text-gray-500 mt-0.5">Not published yet</div>
                          </div>
                          {projectStatus === "draft" && (
                            <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
            </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="border-b border-border/50 -mb-6">
            <div className="flex items-center gap-0">
            <button
              onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-200 border-b-2 ${
                activeTab === "overview"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>General Info</span>
            </button>
            <button
              onClick={() => setActiveTab("applications")}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-200 border-b-2 ${
                activeTab === "applications"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Applications</span>
            </button>
            <button
                onClick={() => setActiveTab("analysis")}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-200 border-b-2 ${
                  activeTab === "analysis"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Analysis Criteria</span>
            </button>
            <button
              onClick={() => setActiveTab("email")}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-200 border-b-2 ${
                activeTab === "email"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>E-mail</span>
            </button>
            <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-200 border-b-2 ${
                  activeTab === "settings"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
            </button>
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-8">
                {/* About Section */}
                <h2 className="text-2xl font-bold mb-4">About {projectConfig.title}</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {projectConfig.description}
                </p>

                {/* Project Links - Tüm sayfalar için, yan yana */}
                <div className="mb-8 pb-8 border-b border-border/30">
                  <h3 className="text-lg font-semibold mb-4">Project Links</h3>
                  <div className="flex items-center gap-5 flex-wrap">
                    <div 
                      className="text-sm font-medium h-9 px-4 border border-blue-300 text-blue-700 bg-blue-50 rounded-md flex items-center justify-center cursor-default"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      <span className="underline">Project Link</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60" />
                  </div>
                    <a 
                      href="https://candidate.muffin.team/#/invite/i/$2y$12$s20t1MbAFsZHSynKs6iySuegPRWQy5RqXvEhBPSzJrI1qVJoumFBS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium h-9 px-4 border border-purple-300 text-purple-700 bg-purple-50 rounded-md flex items-center justify-center cursor-pointer hover:bg-purple-100 transition-colors"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      <span className="underline">Muffin Interview</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60" />
                  </a>
                    <a 
                      href="https://candidate.muffin.team/#/invite/i/$2y$12$s20t1MbAFsZHSynKs6iySuegPRWQy5RqXvEhBPSzJrI1qVJoumFBS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium h-9 px-4 border border-green-300 text-green-700 bg-green-50 rounded-md flex items-center justify-center cursor-pointer hover:bg-green-100 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span className="underline">Native Interview</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60" />
                  </a>
                  </div>
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Key Features */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {projectConfig.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                  </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Included Components */}
                    <div>
                    <h3 className="text-xl font-bold mb-4">Included Components</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <Video className="w-4 h-4 text-white" />
                    </div>
                        <span className="font-medium text-sm">Muffin Interview</span>
                      </button>
                      <button className="p-4 rounded-lg bg-green-100 hover:bg-green-200 transition-colors flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                          <Video className="w-4 h-4 text-white" />
                    </div>
                        <span className="font-medium text-sm">Native Interview</span>
                      </button>
                      <button className="p-4 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                  </div>
                        <span className="font-medium text-sm">ATS</span>
                      </button>
                      <button className="p-4 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-white" />
                    </div>
                        <span className="font-medium text-sm">Salary</span>
                      </button>
                      <button className="p-4 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition-colors flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                    </div>
                        <span className="font-medium text-sm">Org Chart</span>
                      </button>
                  </div>
                    </div>
                    </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
                  {pipelineStages.map((stage, idx) => {
                    const colors = [
                      { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", textDark: "text-blue-900", icon: Users },
                      { bg: "bg-green-50", border: "border-green-200", text: "text-green-600", textDark: "text-green-900", icon: Video },
                      { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", textDark: "text-purple-900", icon: Target },
                      { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", textDark: "text-orange-900", icon: DollarSign },
                      { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600", textDark: "text-indigo-900", icon: Bookmark },
                      { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600", textDark: "text-pink-900", icon: TrendingUp },
                    ]
                    const colorConfig = colors[idx % colors.length]
                    const Icon = colorConfig.icon
                    
                    return (
                      <div key={stage.id} className={`${colorConfig.bg} rounded-lg p-4 border ${colorConfig.border}`}>
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${colorConfig.text}`} />
                    <div>
                            <p className={`text-xs ${colorConfig.text} font-medium`}>{stage.name}</p>
                            <p className={`text-xl font-bold ${colorConfig.textDark}`}>{stage.count}</p>
                    </div>
                    </div>
                  </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "applications" && (
        <>
          {/* Pipeline Stages */}
          <div className="border-b border-border bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30">
            <div className="px-8 py-8">
              <div className="flex items-center gap-3 justify-center">
                {pipelineStages.map((stage, index) => (
                  <PipelineStage 
                    key={stage.id} 
                    stage={{ ...stage, active: stage.id === selectedStage }} 
                    isLast={index === pipelineStages.length - 1}
                    onClick={() => setSelectedStage(stage.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="px-8 py-6 bg-background">
            {/* Search and Filter Row */}
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="flex items-center gap-3 flex-wrap flex-1">
                <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stage">In this stage</SelectItem>
                  <SelectItem value="all">All stages</SelectItem>
                </SelectContent>
              </Select>

                <div className="relative flex-1 min-w-[400px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Find email or name..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                <Plus className="w-4 h-4 mr-2" />
                Add Filter
              </Button>

                <Button variant="outline" className="whitespace-nowrap">
                <Download className="w-4 h-4 mr-2" />
                Save Filter
              </Button>
            </div>
            </div>

          </div>

          <div className="px-8 pb-8">
            <Card className="border-border/60 shadow-sm">
              <CardContent>
                <div className="overflow-x-auto">
                  {projectId === "4" ? (
                    <>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase w-12">
                              <div className="flex items-center justify-center">
                                <CheckSquare className="w-4 h-4" />
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Profiles</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Job Title</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Shortlist Status</th>
                            <th 
                              className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-700"
                              onClick={() => handleTableSort("match")}
                            >
                              <div className="flex items-center gap-1">
                                Match
                                {tableSortField === "match" && (tableSortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Marketing</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Management</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Fintech</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Multinational</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase w-12"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedTableCandidates
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((candidate, index) => {
                            const candidateId = candidate.id
                            const isSelected = selectedCandidates.includes(candidateId)
                            const globalIndex = (currentPage - 1) * itemsPerPage + index
                            
                            // Generate random data for evaluation columns
                            const marketingScore = globalIndex < 5 ? "gray" : "green"
                            const managementScore = globalIndex < 3 ? "gray" : globalIndex < 5 ? "green" : globalIndex < 7 ? "yellow" : "green"
                            // Fintech: First is green, others are mostly green with some yellow
                            const fintechScore = globalIndex === 0 
                              ? "green" 
                              : (globalIndex % 4 === 0 || globalIndex % 7 === 0) 
                                ? "yellow" 
                                : "green"
                            const multinationalScore = "green" // All green (thumbs up)
                            
                            // Match percentage - first 5 are 100%, next 5 are 85%, rest are 77%
                            const matchPercentage = globalIndex < 5 ? 100 : globalIndex < 10 ? 85 : 77
                            
                            // Job titles from images
                            const jobTitles = [
                              "Marketing Manager, Binance",
                              "Marketing & Growth Senior Manager",
                              "Manager of Marketing",
                              "Marketing Assistant Manager",
                              "Mobile Marketing Manager",
                              "Digital Marketing Manager",
                              "Senior Manager | Marketing | S",
                              "Portfolio Marketing Manager",
                              "Marketing and Business Develc",
                              "BMW Digital Marketing & Custc",
                            ]
                            const jobTitle = jobTitles[globalIndex % jobTitles.length] || "Marketing Manager"
                            
                            return (
                              <tr 
                                key={candidate.id} 
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                  setSelectedCandidate(candidateId)
                                  setIsModalOpen(true)
                                }}
                              >
                                <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                                  <div className="flex items-center justify-center">
                                    <button
                                      onClick={() => toggleCandidateSelection(candidateId)}
                                      className="cursor-pointer"
                                    >
                                      {isSelected ? (
                                        <CheckSquare className="w-5 h-5 text-purple-600" />
                                      ) : (
                                        <Square className="w-5 h-5 text-gray-400" />
                                      )}
                                    </button>
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <span className="text-sm font-medium text-gray-900">{candidate.name}</span>
                                </td>
                                <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                                  <div className="flex items-center gap-2">
                                    {linkedInLinks[candidate.name] ? (
                                      <a
                                        href={linkedInLinks[candidate.name]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                                      >
                                        <Linkedin className="w-4 h-4" />
                                      </a>
                                    ) : (
                                      <Linkedin className="w-4 h-4 text-blue-600" />
                                    )}
                                    {(globalIndex === 1 || globalIndex === 2 || globalIndex === 7) && (
                                      <X className="w-4 h-4 text-gray-600" />
                                    )}
                                    {globalIndex === 12 && (
                                      <>
                                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                                          <span className="text-white text-[8px] font-bold">Q</span>
                                        </div>
                                        <X className="w-4 h-4 text-gray-600" />
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <p className="text-sm text-gray-700">{jobTitle}</p>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-2">
                                    <Bookmark className={`w-4 h-4 ${globalIndex === 0 ? 'text-gray-400' : 'text-purple-600'}`} />
                                    <span className={`text-sm ${globalIndex === 0 ? 'text-gray-500' : 'text-purple-600'}`}>
                                      {globalIndex === 0 ? 'Unshortlist' : 'Shortlist'}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <span className="text-sm font-medium text-gray-900">{matchPercentage}%</span>
                                </td>
                                <td className="py-4 px-4">
                                  {marketingScore === "green" ? (
                                    <ThumbsUp className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <ThumbsUp className="w-4 h-4 text-gray-300" />
                                  )}
                                </td>
                                <td className="py-4 px-4">
                                  {managementScore === "green" ? (
                                    <ThumbsUp className="w-4 h-4 text-green-500" />
                                  ) : managementScore === "yellow" ? (
                                    <ThumbsUp className="w-4 h-4 text-orange-500" />
                                  ) : (
                                    <ThumbsUp className="w-4 h-4 text-gray-300" />
                                  )}
                                </td>
                                <td className="py-4 px-4">
                                  {fintechScore === "green" ? (
                                    <ThumbsUp className="w-4 h-4 text-green-500" />
                                  ) : fintechScore === "yellow" ? (
                                    <ThumbsUp className="w-4 h-4 text-orange-500" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                                      <span className="text-white text-[8px]">✕</span>
                                    </div>
                                  )}
                                </td>
                                <td className="py-4 px-4">
                                  <ThumbsUp className="w-4 h-4 text-green-500" />
                                </td>
                                <td className="py-4 px-4">
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                      {/* Pagination */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </Button>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3].map((page) => (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="w-8 h-8 p-0"
                              >
                                {page}
                              </Button>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
                            disabled={currentPage === 3}
                          >
                            Next
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="sm" className="border-purple-500 text-purple-600">
                            Unshortlist ({selectedCandidates.length})
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                            <ChevronRight className="w-4 h-4 mr-2" />
                            Add to Sequence
                          </Button>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <Download className="w-4 h-4 text-gray-400" />
                            <Archive className="w-4 h-4 text-gray-400" />
                            <X className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/40">
                          <th 
                            className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={() => handleTableSort("name")}
                          >
                            <div className="flex items-center gap-1">
                              Name
                              {tableSortField === "name" && (tableSortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />)}
                </div>
                          </th>
                          <th 
                            className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={() => handleTableSort("role")}
                          >
                            <div className="flex items-center gap-1">
                              Role
                              {tableSortField === "role" && (tableSortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />)}
                            </div>
                          </th>
                          <th 
                            className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={() => handleTableSort("experience")}
                          >
                            <div className="flex items-center gap-1">
                              Experience
                              {tableSortField === "experience" && (tableSortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />)}
                            </div>
                          </th>
                          <th 
                            className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={() => handleTableSort("location")}
                          >
                            <div className="flex items-center gap-1">
                              Location
                              {tableSortField === "location" && (tableSortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />)}
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Skills</th>
                          <th 
                            className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={() => handleTableSort("match")}
                          >
                            <div className="flex items-center gap-1">
                              Match
                              {tableSortField === "match" && (tableSortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />)}
                            </div>
                          </th>
                          <th 
                            className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={() => handleTableSort("status")}
                          >
                            <div className="flex items-center gap-1">
                              Status
                              {tableSortField === "status" && (tableSortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />)}
              </div>
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedTableCandidates.map((candidate, index) => {
                          const candidateId = candidate.id
                    const showMuffinLabel = index < 3

                    return (
                            <tr 
                              key={candidate.id} 
                              className="border-b border-border/20 hover:bg-accent/20 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedCandidate(candidateId)
                        setIsModalOpen(true)
                        if (showMuffinLabel) {
                                handleCandidateClick(candidateId)
                              }
                            }}
                          >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  <Users className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{candidate.name}</p>
                                {linkedInLinks[candidate.name] && (
                                  <a
                                    href={linkedInLinks[candidate.name]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    <Linkedin className="w-4 h-4" />
                                  </a>
                                )}
                        </div>
                      </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-muted-foreground">{candidate.role}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm">{candidate.experience}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm">{candidate.location}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.map((skill, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  <Code className="w-3 h-3 mr-1" />
                                  {skill}
                            </Badge>
                              ))}
                      </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {candidate.match}%
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge 
                              variant="secondary" 
                              className={
                                candidate.status === "Available" 
                                  ? "bg-green-100 text-green-800" 
                                  : candidate.status === "Interviewing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : candidate.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }
                            >
                              {candidate.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                            e.stopPropagation()
                                router.push(`/candidate-detail/${projectId}/${candidateId}`)
                              }}
                            >
                              View
              </Button>
                          </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  )}
                      </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === "analysis" && (
        <div className="px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Workflow Section */}
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-12 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 min-h-[500px] relative">
                <div className="space-y-8">
                  {/* Top Row */}
                  <div className="flex items-center gap-8 justify-center flex-wrap relative">
                    {/* 1. Candidate Sourcing */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-green-500 p-4 w-48 relative">
                      <h3 className="font-bold text-base mb-1">Candidate Sourcing</h3>
                      <p className="text-xs text-gray-500 mb-3">Completed Apr 20, 2024</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-green-100 text-green-700 text-xs">AI</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">Requester Ron</span>
                        </div>
                      <Button variant="outline" className="w-full border-green-500 bg-green-500 text-white hover:bg-green-600 text-xs h-8">
                        ✓ Completed
              </Button>
                      
                      {/* Connection line to next */}
                      <div className="absolute right-[-32px] top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-400"></div>
                      </div>

                    {/* 2. Initial Screening */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-blue-500 p-4 w-48 relative">
                      <h3 className="font-bold text-base mb-1">Initial Screening</h3>
                      <p className="text-xs text-gray-500 mb-3">Awaiting approval</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">AP</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">Approver April</span>
                      </div>
                      <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 text-xs h-8">
                        🕐 Ready
              </Button>
                      
                      {/* Connection line down */}
                      <div className="absolute left-1/2 top-full transform -translate-x-1/2 w-0.5 h-8 bg-gray-400"></div>
                      </div>
                      </div>

                  {/* Bottom Row */}
                  <div className="flex items-center gap-4 justify-center">
                    {/* 3. Experience Verification */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-300 p-4 w-48 relative">
                      <h3 className="font-bold text-base mb-1">Experience Verification</h3>
                      <p className="text-xs text-gray-500 mb-3">All steps prior must be completed first</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">BC</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">Background Check</span>
                    </div>
                      <Button variant="outline" className="w-full border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed text-xs h-8">
                        🔒 Blocked
              </Button>
                      
                      {/* Connection line to next */}
                      <div className="absolute right-[-16px] top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-400"></div>
              </div>

                    {/* 4. Technical Assessment */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-300 p-4 w-48 relative">
                      <h3 className="font-bold text-base mb-1">Technical Assessment</h3>
                      <p className="text-xs text-gray-500 mb-3">All steps prior must be completed first</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">TT</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">Tech Team</span>
            </div>
                      <Button variant="outline" className="w-full border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed text-xs h-8">
                        🔒 Blocked
              </Button>
                      
                      {/* Connection line to next */}
                      <div className="absolute right-[-16px] top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-400"></div>
          </div>

                    {/* 5. Final Review */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-300 p-4 w-48 relative">
                      <h3 className="font-bold text-base mb-1">Final Review</h3>
                      <p className="text-xs text-gray-500 mb-3">All steps prior must be completed first</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">HM</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">Hiring Manager</span>
        </div>
                      <Button variant="outline" className="w-full border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed text-xs h-8">
                        🔒 Blocked
              </Button>
                      
                      {/* Connection line to next */}
                      <div className="absolute right-[-16px] top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-400"></div>
                    </div>

                    {/* 6. Save & Archive */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-300 p-4 w-48">
                      <h3 className="font-bold text-base mb-1">Save & Archive</h3>
                      <p className="text-xs text-gray-500 mb-3">All steps prior must be completed first</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">AP</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">Approver April</span>
                      </div>
                      <Button variant="outline" className="w-full border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed text-xs h-8">
                        🔒 Blocked
              </Button>
            </div>
          </div>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Section - Combined Card */}
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left - Ideal Candidate Profile */}
                  <div>
                    <h2 className="text-base font-bold mb-3">Ideal Candidate Profile</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Define the perfect candidate characteristics for this role.
                    </p>

                    <div className="space-y-4">
                      {/* Required Skills */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3">Required Skills</h3>
                        <ul className="space-y-2">
                          {projectConfig.requiredSkills.map((skill, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs">✓</span>
                </div>
                              <span className="text-sm text-muted-foreground">{skill}</span>
                            </li>
                          ))}
                        </ul>
                </div>

                      {/* Experience & Education */}
                  <div>
                        <h3 className="text-sm font-semibold mb-3">Experience Requirements</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
                            <div className="text-lg font-bold text-blue-700">3-5</div>
                            <div className="text-xs text-blue-600">Years Experience</div>
                          </div>
                          <div className="p-3 rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
                            <div className="text-lg font-bold text-green-700">CS</div>
                            <div className="text-xs text-green-600">Degree Required</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Benchmarks */}
                  <div>
                    <h2 className="text-base font-bold mb-3">Benchmarks</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Compare with industry competitors and market standards.
                    </p>

                    <div className="space-y-4">
                      {/* Competitors */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3">Top Competitors</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {projectConfig.competitors.map((company, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-muted/50 flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{company[0]}</span>
                              </div>
                              <span className="font-medium text-xs">{company}</span>
                            </div>
                          ))}
                        </div>
                  </div>

                      {/* Market Salary */}
                  <div>
                        <h3 className="text-sm font-semibold mb-3">Market Salary Range</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                            <span className="text-sm font-medium">Market Average</span>
                            <span className="text-base font-bold text-primary">{projectConfig.marketSalary}</span>
                  </div>
                          <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                            <span className="text-sm font-medium">Your Offering</span>
                            <span className="text-base font-bold text-green-600">{projectConfig.offeringSalary}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "email" && (
        <div className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <Card className="border-border/50 shadow-lg overflow-hidden">
              {/* Close button */}
              <div className="absolute top-4 right-4 z-10">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex">
                {/* Left Panel - Email Segments (40%) */}
                <div className="w-2/5 border-r border-border p-6 bg-white">
                  <h3 className="text-lg font-bold mb-5 text-gray-900">Email Segments</h3>
                  <div className="space-y-3">
                    {/* Segment 1: Interview */}
                <button
                      onClick={() => setSelectedEmailSegment("interview")}
                      className={`w-full text-left p-4 rounded-xl border transition-all shadow-sm hover:shadow-md ${
                        selectedEmailSegment === "interview"
                          ? "border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100/50 shadow-blue-100"
                          : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm font-semibold ${
                          selectedEmailSegment === "interview" ? "text-blue-900" : "text-gray-900"
                        }`}>
                          Send Interview Invitation
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          selectedEmailSegment === "interview"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          12
                        </span>
                      </div>
                      {selectedEmailSegment === "interview" && (
                        <p className="text-xs text-blue-700/80 mt-2 leading-relaxed">
                          Candidates to receive first interview invitation
                        </p>
                      )}
                </button>

                    {/* Segment 2: Offer */}
                <button
                      onClick={() => setSelectedEmailSegment("offer")}
                      className={`w-full text-left p-4 rounded-xl border transition-all shadow-sm hover:shadow-md ${
                        selectedEmailSegment === "offer"
                          ? "border-green-400 bg-gradient-to-r from-green-50 to-green-100/50 shadow-green-100"
                          : "border-gray-200 hover:border-green-200 hover:bg-green-50/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm font-semibold ${
                          selectedEmailSegment === "offer" ? "text-green-900" : "text-gray-900"
                        }`}>
                          Send Job Offer
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          selectedEmailSegment === "offer"
                            ? "bg-green-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          5
                        </span>
                      </div>
                      {selectedEmailSegment === "offer" && (
                        <p className="text-xs text-green-700/80 mt-2 leading-relaxed">
                          Candidates to receive job offer
                        </p>
                      )}
                </button>

                    {/* Segment 3: Rejection */}
                <button
                      onClick={() => setSelectedEmailSegment("rejection")}
                      className={`w-full text-left p-4 rounded-xl border transition-all shadow-sm hover:shadow-md ${
                        selectedEmailSegment === "rejection"
                          ? "border-red-400 bg-gradient-to-r from-red-50 to-red-100/50 shadow-red-100"
                          : "border-gray-200 hover:border-red-200 hover:bg-red-50/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm font-semibold ${
                          selectedEmailSegment === "rejection" ? "text-red-900" : "text-gray-900"
                        }`}>
                          Send Rejection
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          selectedEmailSegment === "rejection"
                            ? "bg-red-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          8
                        </span>
                      </div>
                      {selectedEmailSegment === "rejection" && (
                        <p className="text-xs text-red-700/80 mt-2 leading-relaxed">
                          Candidates to receive rejection letter
                        </p>
                      )}
                </button>

                    {/* Segment 4: Follow-up */}
                <button
                      onClick={() => setSelectedEmailSegment("follow-up")}
                      className={`w-full text-left p-4 rounded-xl border transition-all shadow-sm hover:shadow-md ${
                        selectedEmailSegment === "follow-up"
                          ? "border-purple-400 bg-gradient-to-r from-purple-50 to-purple-100/50 shadow-purple-100"
                          : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm font-semibold ${
                          selectedEmailSegment === "follow-up" ? "text-purple-900" : "text-gray-900"
                        }`}>
                          Send Follow-up
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          selectedEmailSegment === "follow-up"
                            ? "bg-purple-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          15
                        </span>
                      </div>
                      {selectedEmailSegment === "follow-up" && (
                        <p className="text-xs text-purple-700/80 mt-2 leading-relaxed">
                          Candidates to receive follow-up email
                        </p>
                      )}
                </button>

                    {/* Segment 5: Thank You */}
                <button
                      onClick={() => setSelectedEmailSegment("thank-you")}
                      className={`w-full text-left p-4 rounded-xl border transition-all shadow-sm hover:shadow-md ${
                        selectedEmailSegment === "thank-you"
                          ? "border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100/50 shadow-yellow-100"
                          : "border-gray-200 hover:border-yellow-200 hover:bg-yellow-50/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm font-semibold ${
                          selectedEmailSegment === "thank-you" ? "text-yellow-900" : "text-gray-900"
                        }`}>
                          Send Thank You
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          selectedEmailSegment === "thank-you"
                            ? "bg-yellow-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          3
                        </span>
                      </div>
                      {selectedEmailSegment === "thank-you" && (
                        <p className="text-xs text-yellow-700/80 mt-2 leading-relaxed">
                          Candidates to receive thank you email for application
                        </p>
                      )}
                </button>

                    {/* Segment 6: Feedback */}
                    <button
                      onClick={() => setSelectedEmailSegment("feedback")}
                      className={`w-full text-left p-4 rounded-xl border transition-all shadow-sm hover:shadow-md ${
                        selectedEmailSegment === "feedback"
                          ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-indigo-100/50 shadow-indigo-100"
                          : "border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm font-semibold ${
                          selectedEmailSegment === "feedback" ? "text-indigo-900" : "text-gray-900"
                        }`}>
                          Request Feedback
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          selectedEmailSegment === "feedback"
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          7
                        </span>
                      </div>
                      {selectedEmailSegment === "feedback" && (
                        <p className="text-xs text-indigo-700/80 mt-2 leading-relaxed">
                          Candidates to request post-interview feedback
                        </p>
                      )}
                    </button>
                  </div>
              </div>

                {/* Right Panel - Email Composition (60%) */}
                <div className="w-3/5 p-8 bg-gray-50/30 space-y-6">
                  {/* Template */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Template</label>
                      <Select defaultValue="contact">
                        <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="contact">Contact</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="rejection">Rejection</SelectItem>
                      </SelectContent>
                    </Select>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <X className="w-4 h-4" />
                      </Button>
                      <div className="ml-auto flex gap-2">
                        <Button variant="outline" size="sm" className="bg-amber-50 hover:bg-amber-100 border-amber-200">✉️ Email</Button>
                        <Button variant="outline" size="sm" className="bg-gray-100 hover:bg-gray-200">in Linkedin</Button>
                      </div>
                    </div>
                  </div>

                  {/* Email Address */}
              <div>
                    <Input 
                      value={`✉️ ${projectConfig.candidateName.split(' ')[0].toLowerCase()}@example.com`}
                      readOnly
                      className="bg-white font-medium text-sm"
                    />
                    </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Subject</label>
                    <Input 
                      value={getEmailTemplate(selectedEmailSegment).subject}
                      className="bg-white"
                      readOnly
                        />
                      </div>

                  {/* Body */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Body</label>
                    <textarea 
                      className="w-full min-h-[250px] px-3 py-3 border border-border rounded-lg resize-none bg-white text-sm"
                      value={getEmailTemplate(selectedEmailSegment).body}
                      readOnly
                    />
                  </div>

                  {/* Bottom Navigation */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Button variant="outline" className="flex-1 bg-gray-100 hover:bg-gray-200">
                      ▷| Skip
                    </Button>
                    <Button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
                      Send & next →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="px-8 py-8 h-[calc(100vh-200px)]">
          <div className="flex h-full border border-border/50 rounded-lg overflow-hidden bg-background">
            {/* Left Sidebar */}
            <div className="w-64 bg-muted/30 border-r border-border/50 p-4 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">PROJECT SETTINGS</h4>
                  <div className="space-y-1">
                    <div 
                      onClick={() => setActiveSettingsTab('general')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSettingsTab === 'general' ? 'bg-card border border-border' : 'hover:bg-muted'}`}
                    >
                      <Settings className={`w-5 h-5 ${activeSettingsTab === 'general' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${activeSettingsTab === 'general' ? 'font-medium' : 'text-muted-foreground'}`}>General</span>
                        </div>
                    <div 
                      onClick={() => setActiveSettingsTab('hiring')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSettingsTab === 'hiring' ? 'bg-card border border-border' : 'hover:bg-muted'}`}
                    >
                      <Users className={`w-5 h-5 ${activeSettingsTab === 'hiring' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${activeSettingsTab === 'hiring' ? 'font-medium' : 'text-muted-foreground'}`}>Hiring Process</span>
                      </div>
                    <div 
                      onClick={() => setActiveSettingsTab('integrations')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSettingsTab === 'integrations' ? 'bg-card border border-border' : 'hover:bg-muted'}`}
                    >
                      <div className={`w-5 h-5 flex items-center justify-center ${activeSettingsTab === 'integrations' ? 'text-primary' : 'text-muted-foreground'}`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 3L4 14v7h16V3zm-2 16H6v-2h5zm0-4H6v-2h5zm4 4h-3v-6h3zm0-8h-3V7h3z"/>
                        </svg>
                      </div>
                      <span className={`text-sm ${activeSettingsTab === 'integrations' ? 'font-medium' : 'text-muted-foreground'}`}>Integrations</span>
                      </div>
                    <div 
                      onClick={() => setActiveSettingsTab('security')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSettingsTab === 'security' ? 'bg-card border border-border' : 'hover:bg-muted'}`}
                    >
                      <Shield className={`w-5 h-5 ${activeSettingsTab === 'security' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${activeSettingsTab === 'security' ? 'font-medium' : 'text-muted-foreground'}`}>Security & Privacy</span>
                      </div>
                    </div>
              </div>
            </div>
          </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-6">
                  <div>
                  <h1 className="text-3xl font-bold mb-4">Project Settings</h1>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                    Manage your project settings and configuration here.
        </div>
                </div>

                {/* General Tab */}
                {activeSettingsTab === 'general' && (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Settings className="w-5 h-5" />
                        <h3 className="text-xl font-semibold">General Project Settings</h3>
                </div>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Project Name</label>
                          <Input placeholder={projectConfig.title} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Project Description</label>
                          <textarea 
                            className="w-full px-3 py-2 border border-input rounded-lg bg-background min-h-[100px] resize-none"
                            placeholder={projectConfig.description}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Project Owner</label>
                          <Input placeholder={
                            projectId === "1" ? "Tech Team Lead" :
                            projectId === "2" ? "Mobile Team Lead" :
                            projectId === "3" ? "Data Team Lead" :
                            "Enter project owner name"
                          } />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Timezone</label>
                          <select className="w-full px-3 py-2 border border-input rounded-lg bg-background h-10">
                            <option>Europe/Istanbul (UTC+3)</option>
                            <option>America/New_York (UTC-5)</option>
                            <option>Asia/Tokyo (UTC+9)</option>
                            <option>Europe/London (UTC+0)</option>
                            <option>America/Los_Angeles (UTC-8)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Project Status</label>
                          <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="paused">Paused</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hiring Process Tab */}
                {activeSettingsTab === 'hiring' && (
                  <div className="space-y-8">
                  <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Users className="w-5 h-5" />
                        <h3 className="text-xl font-semibold">Hiring Process Settings</h3>
                  </div>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Target Hiring Date</label>
                          <Input type="date" className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Number of Openings</label>
                          <Input 
                            type="number" 
                            placeholder={
                              projectId === "1" ? "1" :
                              projectId === "2" ? "2" :
                              projectId === "3" ? "1" :
                              "1"
                            }
                            min="1" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Hiring Manager</label>
                          <Input placeholder={
                            projectId === "1" ? "Tech Team Lead" :
                            projectId === "2" ? "Mobile Team Lead" :
                            projectId === "3" ? "Data Team Lead" :
                            "Enter hiring manager name"
                          } />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Interview Process</label>
                          <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                              <SelectItem value="standard">Standard (2 rounds)</SelectItem>
                              <SelectItem value="comprehensive">Comprehensive (3-4 rounds)</SelectItem>
                              <SelectItem value="quick">Quick (1 round)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Auto-advance Candidates</label>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Automatically move candidates to next stage</p>
                              <p className="text-xs text-muted-foreground">When minimum requirements are met</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Email Notifications</label>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">New Applications</p>
                                <p className="text-xs text-muted-foreground">Notify when candidates apply</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Interview Reminders</p>
                                <p className="text-xs text-muted-foreground">Remind before scheduled interviews</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Stage Updates</p>
                                <p className="text-xs text-muted-foreground">Notify on pipeline stage changes</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Integrations Tab */}
                {activeSettingsTab === 'integrations' && (
                  <div className="space-y-8">
                  <div>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 3L4 14v7h16V3zm-2 16H6v-2h5zm0-4H6v-2h5zm4 4h-3v-6h3zm0-8h-3V7h3z"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold">Integrations</h3>
                      </div>
                      <div className="space-y-5">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div>
                              <p className="text-sm font-semibold">LinkedIn</p>
                              <p className="text-xs text-muted-foreground">Source candidates from LinkedIn</p>
                            </div>
                            <Button size="sm" variant="outline">Connect</Button>
                  </div>

                          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                              <p className="text-sm font-semibold">GitHub</p>
                              <p className="text-xs text-muted-foreground">Import developer profiles</p>
                            </div>
                            <Button size="sm" variant="outline">Connect</Button>
                  </div>

                          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                              <p className="text-sm font-semibold">Zoom</p>
                              <p className="text-xs text-muted-foreground">Schedule video interviews</p>
                            </div>
                            <Button size="sm" variant="outline">Connect</Button>
                          </div>

                          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div>
                              <p className="text-sm font-semibold">Google Calendar</p>
                              <p className="text-xs text-muted-foreground">Sync interview schedules</p>
                            </div>
                            <Button size="sm" variant="outline">Connect</Button>
                          </div>

                          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                            <div>
                              <p className="text-sm font-semibold">Slack</p>
                              <p className="text-xs text-muted-foreground">Team notifications and updates</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">Connected</Badge>
                              <Button size="sm" variant="outline">Disconnect</Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                            <div>
                              <p className="text-sm font-semibold">ATS Systems</p>
                              <p className="text-xs text-muted-foreground">Greenhouse, Lever, Workday</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">Connected</Badge>
                              <Button size="sm" variant="outline">Manage</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security & Privacy Tab */}
                {activeSettingsTab === 'security' && (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Shield className="w-5 h-5" />
                        <h3 className="text-xl font-semibold">Security & Privacy</h3>
                      </div>
                      
                      <div className="space-y-6">
                        {/* GDPR Compliance */}
                        <div className="border border-border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold mb-1">GDPR Compliance</h4>
                              <p className="text-sm text-muted-foreground">European Union General Data Protection Regulation</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Active</Badge>
                          </div>
                          <div className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Data Processing Agreement</p>
                                <p className="text-xs text-muted-foreground">EU Standard Contractual Clauses (SCC)</p>
                              </div>
                              <Button size="sm" variant="outline">View Agreement</Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Data Retention Policy</p>
                                <p className="text-xs text-muted-foreground">Candidate data retention: 2 years</p>
                              </div>
                              <Button size="sm" variant="outline">Configure</Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Right to Erasure</p>
                                <p className="text-xs text-muted-foreground">Allow candidates to request data deletion</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Data Export</p>
                                <p className="text-xs text-muted-foreground">Enable candidates to export their data</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                          </div>
                        </div>

                        {/* Candidate Notifications */}
                        <div className="border border-border rounded-lg p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Mail className="w-5 h-5" />
                            <h4 className="text-lg font-semibold">Candidate Notifications</h4>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Application Received</p>
                                <p className="text-xs text-muted-foreground">Send email when candidate applies</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Status Updates</p>
                                <p className="text-xs text-muted-foreground">Notify candidates on pipeline stage changes</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Interview Invitations</p>
                                <p className="text-xs text-muted-foreground">Automatically send interview invitations</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Rejection Notifications</p>
                                <p className="text-xs text-muted-foreground">Send polite rejection emails</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" />
                            </div>
                            <div className="space-y-2 mt-4 pt-4 border-t border-border">
                              <label className="text-sm font-semibold">Default Email Template</label>
                              <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                                  <SelectItem value="standard">Standard Template</SelectItem>
                                  <SelectItem value="professional">Professional Template</SelectItem>
                                  <SelectItem value="friendly">Friendly Template</SelectItem>
                      </SelectContent>
                    </Select>
                            </div>
                          </div>
                  </div>

                        {/* Data Security */}
                        <div className="border border-border rounded-lg p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-5 h-5" />
                            <h4 className="text-lg font-semibold">Data Security</h4>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                    <div>
                                <p className="text-sm font-medium">Encryption at Rest</p>
                                <p className="text-xs text-muted-foreground">AES-256 encryption for stored data</p>
                    </div>
                              <Badge variant="outline" className="text-xs">Enabled</Badge>
                  </div>
                            <div className="flex items-center justify-between">
                    <div>
                                <p className="text-sm font-medium">Encryption in Transit</p>
                                <p className="text-xs text-muted-foreground">TLS 1.3 for all data transfers</p>
                    </div>
                              <Badge variant="outline" className="text-xs">Enabled</Badge>
                  </div>
                            <div className="flex items-center justify-between">
                    <div>
                                <p className="text-sm font-medium">Access Logging</p>
                                <p className="text-xs text-muted-foreground">Track all access to candidate data</p>
                    </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Regular Security Audits</p>
                                <p className="text-xs text-muted-foreground">Last audit: 2 months ago</p>
                              </div>
                              <Button size="sm" variant="outline">View Report</Button>
                            </div>
                          </div>
                  </div>

                        {/* Privacy Policy */}
                        <div className="border border-border rounded-lg p-6">
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold mb-1">Privacy Policy & Terms</h4>
                            <p className="text-sm text-muted-foreground">Manage privacy policy and terms of service</p>
                  </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                                <p className="text-sm font-medium">Privacy Policy</p>
                                <p className="text-xs text-muted-foreground">Last updated: January 2025</p>
                    </div>
                              <Button size="sm" variant="outline">Edit</Button>
                  </div>
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <p className="text-sm font-medium">Terms of Service</p>
                                <p className="text-xs text-muted-foreground">Last updated: January 2025</p>
                              </div>
                              <Button size="sm" variant="outline">Edit</Button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <p className="text-sm font-medium">Data Processing Agreement</p>
                                <p className="text-xs text-muted-foreground">GDPR compliant DPA template</p>
                              </div>
                              <Button size="sm" variant="outline">View</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <CandidateDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        candidateId={selectedCandidate}
        projectTitle={projectConfig.title}
        candidateName={selectedCandidate ? tableCandidates.find(c => c.id === selectedCandidate)?.name || "Unknown" : undefined}
        candidateEmail={selectedCandidate ? tableCandidates.find(c => c.id === selectedCandidate)?.email || "" : undefined}
        candidateRole={selectedCandidate ? tableCandidates.find(c => c.id === selectedCandidate)?.role || projectConfig.title : undefined}
        projectId={projectId}
      />

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsInviteModalOpen(false)}
          />
          {/* Modal */}
          <div className="fixed top-20 right-6 w-[450px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-[500px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                    <div>
                  <h3 className="text-lg font-bold text-gray-900">Invite Team Member</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Add someone to this project</p>
                    </div>
              </div>
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
                  </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full"
                  />
                  </div>

                {/* Role Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                      <SelectItem value="interviewer">Interviewer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    placeholder="Add a personal message..."
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background min-h-[80px] resize-none text-sm"
                  />
          </div>
        </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50">
              <Button 
                variant="outline"
                onClick={() => setIsInviteModalOpen(false)}
                className="px-4"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  // Handle invite logic here
                  console.log("Inviting:", { email: inviteEmail, role: inviteRole })
                  setIsInviteModalOpen(false)
                  setInviteEmail("")
                  setInviteRole("")
                }}
                className="px-4 bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!inviteEmail || !inviteRole}
              >
                Send Invite
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
