"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  CheckCircle2, 
  AlertCircle, 
  UserPlus, 
  MessageSquare,
  Mic,
  MessageCircle,
  BookOpen,
  BookMarked,
  Target,
  Globe,
  ArrowUp,
  Info,
  Briefcase,
  BarChart3,
  ChevronsRight,
  X,
  ChevronLeft,
  RefreshCw,
  XCircle,
  Calendar,
  MoreHorizontal,
  Edit,
  Linkedin,
  FileCheck,
  Award,
  Video,
  Search,
  Target as TargetIcon
} from "lucide-react"

// Project configurations - same as project-detail-page
const projectConfigs: Record<string, {
  title: string
  dataEngineerCandidates?: Array<{ name: string; role: string; location: string }>
  flutterCandidates?: Array<{ name: string; role: string; location: string }>
}> = {
  "1": {
    title: "Sahibinden - Full Stack Web Dev",
  },
  "2": {
    title: "Flutter Developer - Mobile Applications",
    flutterCandidates: [
      { name: "Sarah Johnson", role: "Senior Flutter Developer", location: "Vienna, Austria" },
      { name: "Michael Chen", role: "Principal Mobile Engineer", location: "Vienna, Austria" },
      { name: "Emily Davis", role: "Lead Flutter Developer", location: "Vienna, Austria" },
    ],
  },
  "3": {
    title: "Data Engineer - Big Data & Analytics",
    dataEngineerCandidates: [
      { name: "Mark Thompson", role: "Senior Data Engineer", location: "Berlin, Germany" },
      { name: "Sarah Williams", role: "Principal Data Engineer", location: "Berlin, Germany" },
      { name: "David Martinez", role: "Lead Data Engineer", location: "Berlin, Germany" },
    ],
  },
  "4": {
    title: "Marketing Manager",
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
  },
}

export default function CandidateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string
  const candidateId = parseInt(params.candidateId as string)
  
  const [activeTab, setActiveTab] = useState<"interview-scores" | "muffin-analysis">("interview-scores")
  const [language, setLanguage] = useState("english-us")
  const [showFullEmail, setShowFullEmail] = useState(false)

  const projectConfig = projectConfigs[projectId] || projectConfigs["1"]
  
  // Get candidate data based on project and candidate ID
  const candidateData = useMemo(() => {
    let candidates: Array<{ name: string; role: string; location: string }> = []
    
    if (projectConfig.dataEngineerCandidates) {
      candidates = projectConfig.dataEngineerCandidates
    } else if (projectConfig.flutterCandidates) {
      candidates = projectConfig.flutterCandidates
    } else {
      candidates = [
        { name: "Alex Chen", role: "Senior Full Stack Developer", location: "London, UK" },
        { name: "Maria Rodriguez", role: "Principal Frontend Engineer", location: "London, UK" },
      ]
    }
    
    const candidate = candidates[(candidateId - 1) % candidates.length] || candidates[0]
    const nameParts = candidate.name.toLowerCase().split(" ")
    const emailDomain = projectId === "3" ? "dataengineer" : projectId === "2" ? "flutter" : projectId === "4" ? "marketing" : "fullstack"
    
    // Format email with masked characters (show first 2 chars, mask the rest)
    let email = ""
    let emailDisplay = ""
    let phone = ""
    let phoneDisplay = ""
    let linkedin = ""
    let experience = ""
    let highlights: string[] = []
    let summary = ""
    let workExperience: Array<{ company: string; role: string; period: string; description: string }> = []
    
    // Special handling for project 4 candidates
    if (projectId === "4") {
      if (candidate.name === "Alper Bulut") {
        email = "alper.bulut@binance.com"
        emailDisplay = "al******@binance.com"
        phone = "+905551234567"
        phoneDisplay = "***********"
        linkedin = "https://linkedin.com/in/alper-bulut-83511737"
        experience = "17 yrs 7 mos"
        highlights = ["Early Stage", "High Avg. Tenure", "International Exp."]
        summary = "Alper Bulut's current role at Binance as a Marketing Manager involves growth marketing, campaign management, affiliate marketing, community building, social media management, and content creation, all of which are key components of digital marketing strategies."
        workExperience = [
          {
            company: "Binance",
            role: "Senior Marketing Manager, Binance Turkey",
            period: "Mar 2020 - Present",
            description: "Key Competencies: Growth Marketing, Campaign Management, Business Development, Affiliate Marketing, Community Building, Social Media Management, Life Cycle Management, Content Creation, Public Relations (PR), Localization."
          },
          {
            company: "Siemens",
            role: "Project Manager",
            period: "Jun 2013 - Mar 2020",
            description: "Certified Project Manager with full Profit & Loss Responsibility. Managing complex domestic and international Energy Automation / SCADA projects. Overall responsibility of project results based on strategic priorities and set goals."
          }
        ]
      } else if (candidate.name === "Ceyhun Çakanel") {
        email = "ceyhun.cakanel@marketing.com"
        emailDisplay = "ce******@marketing.com"
        phone = "not found"
        phoneDisplay = "not found"
        linkedin = "https://linkedin.com/in/ceyhuncakanel"
        experience = "14 yrs 10 mos"
        highlights = ["Promoted Twice"]
        summary = "The candidate has extensive experience designing and executing digital marketing strategies, including data-driven acquisition, engagement strategies, and multi-channel marketing campaigns at Vodafone and Vodafone Pay."
        workExperience = [
          {
            company: "Vodafone Elektronik Para VE Ödeme Hizmetleri A.ş.",
            role: "Marketing & Growth Senior Manager",
            period: "Apr 2023 - Present",
            description: "Reporting directly to the GM, leading a 14-person Growth, Business Development, and Analytics team. Designed and executed data-driven acquisition & engagement strategies that drove user growth and increase in revenue."
          },
          {
            company: "Vodafone",
            role: "Marketing Manager",
            period: "Apr 2020 - Apr 2023",
            description: "Product Owner of Mobile Acquisition Squad accountable for key performance indicators of prepaid and postpaid gross add, inflow revenue, digital share, Net Promoter Score, Vodafone Brand KPI's."
          }
        ]
      } else if (candidate.name === "Emin İNCI") {
        email = "emin.inci@marketing.com"
        emailDisplay = "em******@marketing.com"
        phone = "+905559876543"
        phoneDisplay = "***********"
        linkedin = "https://linkedin.com/in/eminserhaninci"
        experience = "13 yrs 2 mos"
        highlights = ["International Exp."]
        summary = "Emin has extensive experience in digital marketing strategies, including managing social media platforms, executing integrated marketing activations across digital channels, and applying digital marketing strategies in multiple roles such as at Mastercard, Hepsiburada, and BNP Paribas Cardif."
        workExperience = [
          {
            company: "Hepsiburada (Nasdaq: Heps)",
            role: "Marketing Manager, Hepsipay",
            period: "May 2024 - Present",
            description: "Leading a high-performing team of 2, driving collaboration and achieving results. Developing impactful go-to-market strategies that aligns with company objectives. Executing integrated marketing activations across ATL, BTL, web site, CRM, influencers and social media."
          },
          {
            company: "Mastercard",
            role: "Marketing Manager",
            period: "Nov 2022 - May 2024",
            description: "Was responsible for strategy, planning, execution of Mastercard Turkey's brand and campaign communications in line with global guidelines. Led full-funnel marketing plans and brand partnerships across key merchants."
          }
        ]
      } else {
        // Default for other candidates
        email = nameParts.length > 1 
          ? `${nameParts[0]}.${nameParts[nameParts.length - 1]}@${emailDomain}.com`
          : `${nameParts[0]}@${emailDomain}.com`
        const emailParts = email.split("@")
        const emailLocal = emailParts[0]
        emailDisplay = emailLocal.length > 2 
          ? `${emailLocal.substring(0, 2)}${"*".repeat(emailLocal.length - 2)}@${emailParts[1]}`
          : `${emailLocal.substring(0, 1)}*@${emailParts[1]}`
        phone = candidateId % 2 === 0 ? "+90555*******" : "not found"
        phoneDisplay = phone === "not found" ? "not found" : "***********"
        linkedin = ""
        experience = "5+ years"
        highlights = []
        summary = ""
        workExperience = []
      }
    } else {
      // Default for other projects
      email = nameParts.length > 1 
        ? `${nameParts[0]}.${nameParts[nameParts.length - 1]}@${emailDomain}.com`
        : `${nameParts[0]}@${emailDomain}.com`
      const emailParts = email.split("@")
      const emailLocal = emailParts[0]
      emailDisplay = emailLocal.length > 2 
        ? `${emailLocal.substring(0, 2)}${"*".repeat(emailLocal.length - 2)}@${emailParts[1]}`
        : `${emailLocal.substring(0, 1)}*@${emailParts[1]}`
      phone = "+2099627003"
      phoneDisplay = "***********"
      linkedin = ""
      experience = "5+ years"
      highlights = []
      summary = ""
      workExperience = []
    }
    
    return {
      ...candidate,
      email,
      emailDisplay,
      phone,
      phoneDisplay,
      linkedin,
      experience,
      highlights,
      summary,
      workExperience,
      firstName: candidate.name.split(" ")[0],
      lastName: candidate.name.split(" ").slice(1).join(" ") || "",
    }
  }, [projectId, candidateId, projectConfig])

  // Generate scores based on candidate name hash for consistency
  const nameHash = candidateData.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  const nativeScores = {
    overall: 85 + (nameHash % 10),
    pronunciation: 87 + (nameHash % 8),
    fluency: 82 + (nameHash % 10),
    grammar: 90 + (nameHash % 5),
    vocabulary: 85 + (nameHash % 8),
    relevance: true,
  }

  const interviewQuestions = [
    {
      id: 1,
      question: projectId === "3" 
        ? "Can you explain the applications of blockchain technology in the finance sector?"
        : projectId === "2"
        ? "How do you handle state management in Flutter applications?"
        : "Can you explain the difference between React hooks and class components?",
      score: 95 - (nameHash % 5),
      status: "passed",
      details: projectId === "3"
        ? "The candidate explained the applications of blockchain technology in the finance sector in detail and provided real-world examples."
        : projectId === "2"
        ? "Well explained state management patterns including Bloc and Riverpod with practical examples."
        : "Excellent explanation of React hooks with clear examples of useState and useEffect.",
    },
    {
      id: 2,
      question: projectId === "3"
        ? "How do you ensure security in payment systems?"
        : projectId === "2"
        ? "What are the best practices for Flutter app performance optimization?"
        : "How do you handle API integration in React applications?",
      score: 88 - (nameHash % 3),
      status: "passed",
      details: projectId === "3"
        ? "Well explained security protocols and encryption methods, but did not mention some current security standards."
        : projectId === "2"
        ? "Good knowledge of performance optimization techniques including widget optimization and image caching."
        : "Solid understanding of API integration with proper error handling and loading states.",
    },
    {
      id: 3,
      question: projectId === "3"
        ? "What are the best practices for API design in fintech applications?"
        : projectId === "2"
        ? "How do you implement authentication in Flutter apps?"
        : "What is your approach to component reusability in React?",
      score: 85 - (nameHash % 4),
      status: "passed",
      details: projectId === "3"
        ? "Has good knowledge of API design, explained RESTful API principles and security measures."
        : projectId === "2"
        ? "Explained Firebase authentication and custom authentication flows clearly."
        : "Demonstrated good understanding of component composition and prop patterns.",
    },
    {
      id: 4,
      question: projectId === "3"
        ? "Which database technologies would you use to process large-scale financial data?"
        : projectId === "2"
        ? "How do you handle offline data synchronization in mobile apps?"
        : "How do you manage complex state in large React applications?",
      score: 75 + (nameHash % 5),
      status: "partially-passed",
      details: projectId === "3"
        ? "Knowledgeable about relational databases, but needs more information about NoSQL and time-series databases."
        : projectId === "2"
        ? "Basic understanding of offline sync, but needs more experience with conflict resolution strategies."
        : "Familiar with state management, but could benefit from more experience with Redux or Zustand.",
    },
    {
      id: 5,
      question: projectId === "3"
        ? "How is microservice architecture implemented in financial applications?"
        : projectId === "2"
        ? "What testing strategies do you use for Flutter applications?"
        : "How do you optimize React application performance?",
      score: 80 + (nameHash % 5),
      status: "passed",
      details: projectId === "3"
        ? "Demonstrated understanding of the basic principles of microservice architecture, but needs more experience with challenges in distributed systems."
        : projectId === "2"
        ? "Good knowledge of unit and widget testing, but needs more experience with integration testing."
        : "Solid understanding of performance optimization including memoization and code splitting.",
    },
  ]

  const strengths = projectId === "3" ? [
    "Deep knowledge of blockchain technology",
    "Strong understanding of security protocols and standards",
    "Practical experience in API design and integration",
    "Up-to-date knowledge of fintech regulations",
  ] : projectId === "2" ? [
    "Expert in Flutter and Dart development",
    "Strong mobile UI/UX design skills",
    "Experience with Firebase and backend integration",
    "Knowledge of state management patterns",
  ] : [
    "Strong React and TypeScript skills",
    "Experience with modern web development",
    "Good understanding of API integration",
    "Familiar with modern development tools",
  ]

  const areasForImprovement = projectId === "3" ? [
    "Should gain more experience with NoSQL databases",
    "Should deepen knowledge of distributed systems and scalability",
    "Should keep up with the latest trends in fintech",
  ] : projectId === "2" ? [
    "Should improve knowledge of native platform integration",
    "Should gain more experience with advanced Flutter features",
    "Should learn more about mobile app architecture patterns",
  ] : [
    "Should gain more experience with backend development",
    "Should improve knowledge of testing strategies",
    "Should learn more about advanced React patterns",
  ]

  const muffinScores = {
    technicalCompetency: 85 + (nameHash % 10),
    communication: 92 - (nameHash % 5),
    roleFit: 88 + (nameHash % 7),
    overallScore: 87 + (nameHash % 8),
  }

  const muffinScoreIcons = {
    technicalCompetency: ChevronsRight,
    communication: MessageCircle,
    roleFit: Briefcase,
    overallScore: BarChart3,
  }

  const muffinAnalysis = {
    technicalCompetency: projectId === "3"
      ? "The candidate demonstrates a strong understanding of backend development, particularly with Node.js and database design. They provided clear explanations of their technical approach and showed familiarity with modern development practices. However, there are some gaps in advanced PostgreSQL optimization techniques."
      : projectId === "2"
      ? "The candidate shows excellent Flutter development skills with strong knowledge of Dart and mobile app architecture. They demonstrated good understanding of state management and UI/UX design. Some areas for improvement in advanced native integrations."
      : "The candidate has solid React and TypeScript skills with good understanding of modern web development practices. They showed familiarity with component architecture and API integration. Could benefit from more backend experience.",
    communicationClarity: "Excellent verbal communication skills. The candidate was able to explain complex technical concepts in a clear and concise manner. They used appropriate terminology and were able to break down complex ideas into understandable parts. The candidate was also attentive to questions and provided thoughtful responses.",
    roleFit: projectId === "3"
      ? "The candidate's experience aligns well with the requirements for a mid-level backend engineer role in fintech. They have relevant experience with payment processing and financial data handling. However, they may benefit from more exposure to high-scale transaction processing systems."
      : projectId === "2"
      ? "The candidate's Flutter experience matches well with the mobile developer role. They have relevant experience with cross-platform development and mobile UI/UX. Could benefit from more experience with complex mobile app architectures."
      : "The candidate's React experience aligns with the frontend developer role. They have relevant experience with modern web development. Could benefit from more full-stack experience.",
    overallAssessment: projectId === "3"
      ? "Overall, this is a strong candidate with excellent technical and communication abilities. They would be a valuable addition to the team, bringing relevant experience and a collaborative approach. Recommended for further consideration with additional training in advanced database optimization."
      : projectId === "2"
      ? "Overall, this is a strong candidate with excellent Flutter skills and good communication. They would be a valuable addition to the mobile team. Recommended for further consideration with focus on advanced mobile features."
      : "Overall, this is a solid candidate with good React skills and communication abilities. They would be a good addition to the frontend team. Recommended for further consideration with additional backend training.",
  }

  const muffinStrengths = projectId === "3" ? [
    "Strong blockchain/smart contract skills",
    "Extensive experience with payment processing/financial API integration",
    "Comprehensive knowledge of modern web development technologies",
    "Solid foundation in database design/optimization",
  ] : projectId === "2" ? [
    "Expert Flutter and Dart development skills",
    "Strong mobile UI/UX design capabilities",
    "Experience with Firebase and backend services",
    "Good knowledge of state management patterns",
  ] : [
    "Strong React and TypeScript expertise",
    "Good understanding of modern web development",
    "Experience with API integration",
    "Familiar with development best practices",
  ]

  const muffinDevelopmentAreas = projectId === "3" ? [
    "Gain more experience with cloud technologies (especially AWS)",
    "Improve knowledge of Kubernetes/container orchestration",
    "Stay current with data security/encryption standards",
    "Expand knowledge of NoSQL databases",
  ] : projectId === "2" ? [
    "Gain more experience with native platform features",
    "Improve knowledge of advanced Flutter architecture",
    "Learn more about mobile app testing strategies",
    "Expand knowledge of CI/CD for mobile apps",
  ] : [
    "Gain more experience with backend development",
    "Improve knowledge of testing frameworks",
    "Learn more about advanced React patterns",
    "Expand knowledge of performance optimization",
  ]

  const getStatusIcon = (status: string) => {
    if (status === "passed") {
      return <CheckCircle2 className="w-4 h-4 text-green-600" />
    } else if (status === "partially-passed") {
      return <ArrowUp className="w-4 h-4 text-amber-500" />
    }
    return <AlertCircle className="w-4 h-4 text-red-600" />
  }

  const getScoreColor = (score: number, status: string) => {
    if (status === "partially-passed") {
      return "text-amber-600"
    }
    return "text-green-600"
  }

  const getStatusColor = (status: string) => {
    if (status === "partially-passed") {
      return "text-amber-600"
    }
    return "text-green-600"
  }

  const scoreIcons = {
    overall: Target,
    pronunciation: Mic,
    fluency: MessageCircle,
    grammar: BookOpen,
    vocabulary: BookMarked,
    relevance: Globe,
  }

  const handleBack = () => {
    router.push(`/project-detail/${projectId}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
                <h2 className="text-lg font-semibold text-gray-900">{projectConfig.title}</h2>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{candidateData.name}</h1>
                {candidateData.linkedin && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(candidateData.linkedin, '_blank')}
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                )}
                <Badge variant="outline" className="text-xs px-2 py-0.5 h-5">
                  <span className="text-gray-500 text-[10px] mr-1">Application:</span>
                  <span className="font-medium">{candidateData.role}</span>
                </Badge>
                <Badge variant="outline" className="text-xs px-2 py-0.5 h-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1"></div>
                  <span className="font-medium">Applied/Sourced</span>
                </Badge>
                <span className="text-xs text-gray-500">
                  <span className="text-gray-500 text-[10px] mr-1">Source:</span>
                  <span className="font-medium">LinkedIn, GitHub</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs font-medium h-8 px-3">
                <ChevronLeft className="w-3.5 h-3.5 mr-1.5" />
                Next
              </Button>
              <Button variant="outline" size="sm" className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 hover:from-indigo-100 hover:to-purple-100 text-xs font-medium h-8 px-3">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Change Stage
              </Button>
              <Button variant="outline" size="sm" className="bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200 hover:from-red-100 hover:to-rose-100 text-xs font-medium h-8 px-3">
                <XCircle className="w-3.5 h-3.5 mr-1.5" />
                Reject
              </Button>
              <Button variant="outline" size="sm" className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-cyan-100 text-xs font-medium h-8 px-3">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Schedule
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-xs font-medium h-8 px-3">
                <Edit className="w-3.5 h-3.5 mr-1.5" />
                Edit
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-6 border-b border-gray-200 -mb-px">
            <button
              onClick={() => setActiveTab("interview-scores")}
              className={`pb-3.5 px-1 text-sm font-medium transition-all duration-200 ${
                activeTab === "interview-scores"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Interview Scores
            </button>
            <button
              onClick={() => setActiveTab("muffin-analysis")}
              className={`pb-3.5 px-1 text-sm font-medium transition-all duration-200 ${
                activeTab === "muffin-analysis"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Muffin Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-6">

            {activeTab === "interview-scores" && (
              <div className="space-y-6">
                {/* Native Score Section */}
                <Card className="border border-gray-200 shadow-none bg-white">
                  <CardContent className="p-8">
                    <h2 className="text-base font-semibold text-gray-900 mb-7 tracking-tight">Native Score</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Overall Score */}
                      <div className="col-span-1 md:col-span-1 lg:col-span-1">
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = scoreIcons.overall
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Overall Score</div>
                          </div>
                          <div className="mb-2 leading-none">
                            <span className="text-4xl font-bold text-gray-900">{nativeScores.overall}</span>
                            <span className="text-2xl font-bold text-green-600">/100</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Combined assessment of all language metrics.
                          </div>
                        </div>
                      </div>

                      {/* Pronunciation */}
                      <div>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = scoreIcons.pronunciation
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Pronunciation</div>
                          </div>
                          <div className="mb-2 leading-none">
                            <span className="text-4xl font-bold text-gray-900">{nativeScores.pronunciation}</span>
                            <span className="text-2xl font-bold text-green-600">/100</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Adayın kelimeleri ne kadar doğru ve net telaffuz ettiğini ölçer
                          </div>
                        </div>
                      </div>

                      {/* Fluency */}
                      <div>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = scoreIcons.fluency
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Fluency</div>
                          </div>
                          <div className="mb-2 leading-none">
                            <span className="text-4xl font-bold text-gray-900">{nativeScores.fluency}</span>
                            <span className="text-2xl font-bold text-green-600">/100</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Konuşmanın doğal akışı, duraksama oranı, konuşma hızı gibi etkenleri kapsar
                          </div>
                        </div>
                      </div>

                      {/* Grammar */}
                      <div>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = scoreIcons.grammar
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Grammar</div>
                          </div>
                          <div className="mb-2 leading-none">
                            <span className="text-4xl font-bold text-gray-900">{nativeScores.grammar}</span>
                            <span className="text-2xl font-bold text-green-600">/100</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Zamanlar, cümle yapıları, dilbilgisi kurallarının doğru kullanımı
                          </div>
                        </div>
                      </div>

                      {/* Vocabulary */}
                      <div>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = scoreIcons.vocabulary
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Vocabulary</div>
                          </div>
                          <div className="mb-2 leading-none">
                            <span className="text-4xl font-bold text-gray-900">{nativeScores.vocabulary}</span>
                            <span className="text-2xl font-bold text-green-600">/100</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Adayın kelime çeşitliliği, doğru ve bağlama uygun kelime seçimi
                          </div>
                        </div>
                      </div>

                      {/* Relevance */}
                      <div>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = scoreIcons.relevance
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Relevance</div>
                          </div>
                          <div className="text-4xl font-bold text-green-600 mb-2 leading-none">
                            {nativeScores.relevance ? "TRUE" : "FALSE"}
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Cevap Uygunluğu - Adayın verdiği cevabın soruyla ne kadar alakalı olduğu
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interview Questions and Evaluations */}
                <Card className="border border-gray-200 shadow-none bg-white">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
                      <h2 className="text-base font-semibold text-gray-900 tracking-tight">Interview Questions and Evaluations</h2>
                      <p className="text-xs text-gray-500 max-w-md md:text-right">
                        Questions answered by the candidate during the interview and performance evaluation
                      </p>
                    </div>
                    
                    <div className="overflow-x-auto -mx-2">
                      <div className="inline-block min-w-full align-middle px-2">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-gray-200 hover:bg-transparent">
                              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Question</TableHead>
                              <TableHead className="w-[90px] text-xs font-semibold text-gray-500 uppercase tracking-wider text-center pb-3">Score</TableHead>
                              <TableHead className="w-[130px] text-xs font-semibold text-gray-500 uppercase tracking-wider text-center pb-3">Status</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Details</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {interviewQuestions.map((item, index) => (
                              <TableRow key={item.id} className="border-gray-200 hover:bg-gray-50 transition-colors">
                                <TableCell className="font-medium text-gray-900 text-sm py-4 leading-relaxed">{item.question}</TableCell>
                                <TableCell className="text-center py-4">
                                  <span className={`text-base font-semibold ${getScoreColor(item.score, item.status)}`}>
                                    {item.score}/100
                                  </span>
                                </TableCell>
                                <TableCell className="text-center py-4">
                                  <div className="flex items-center justify-center gap-1.5">
                                    {getStatusIcon(item.status)}
                                    <span className={`text-xs font-medium capitalize ${getStatusColor(item.status)}`}>
                                      {item.status === "partially-passed" ? "Partially Passed" : item.status}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600 py-4 leading-relaxed">
                                  <div className="flex items-start gap-2">
                                    <Info className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                                    <span>{item.details}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary Sections - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths Section */}
                  <Card className="border border-gray-200 shadow-none bg-white">
                    <CardContent className="p-8">
                      <div className="mb-5">
                        <h2 className="text-base font-semibold text-gray-900 mb-1 tracking-tight">Strengths</h2>
                        <p className="text-xs text-gray-500">Candidate's strengths highlighted in the interview</p>
                      </div>
                      <ul className="space-y-3">
                        {strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700 group">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover:text-green-700 transition-colors" />
                            <span className="text-sm leading-relaxed">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Areas for Improvement Section */}
                  <Card className="border border-gray-200 shadow-none bg-white">
                    <CardContent className="p-8">
                      <div className="mb-5">
                        <h2 className="text-base font-semibold text-gray-900 mb-1 tracking-tight">Areas for Improvement</h2>
                        <p className="text-xs text-gray-500">Areas where the candidate can improve</p>
                      </div>
                      <ul className="space-y-3">
                        {areasForImprovement.map((area, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700 group">
                            <ArrowUp className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0 group-hover:text-amber-600 transition-colors" />
                            <span className="text-sm leading-relaxed">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "muffin-analysis" && (
              <div className="space-y-6">
                {/* Muffin Score Section */}
                <Card className="border border-gray-200 shadow-none bg-white">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-7">
                      <h2 className="text-base font-semibold text-gray-900 tracking-tight">Muffin Score</h2>
                      <p className="text-xs text-gray-500 max-w-md md:text-right">
                        Technical skills assessment based on the candidate's responses during the interview
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Technical Competency */}
                      <div>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = muffinScoreIcons.technicalCompetency
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Technical Competency</div>
                          </div>
                          <div className="mb-2 leading-none">
                            <span className="text-4xl font-bold text-gray-900">{muffinScores.technicalCompetency}</span>
                            <span className="text-2xl font-bold text-green-600">/100</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Excellent technical skills
                          </div>
                        </div>
                      </div>

                      {/* Communication */}
                      <div>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = muffinScoreIcons.communication
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Communication</div>
                          </div>
                          <div className="mb-2 leading-none">
                            <span className="text-4xl font-bold text-gray-900">{muffinScores.communication}</span>
                            <span className="text-2xl font-bold text-green-600">/100</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Exceptional communicator
                          </div>
                        </div>
                      </div>

                      {/* Role Fit */}
                      <div>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = muffinScoreIcons.roleFit
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Role Fit</div>
                          </div>
                          <div className="mb-2 leading-none">
                            <span className="text-4xl font-bold text-gray-900">{muffinScores.roleFit}</span>
                            <span className="text-2xl font-bold text-green-600">/100</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Excellent match for role
                          </div>
                        </div>
                      </div>

                      {/* Overall Score */}
                      <div>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            {(() => {
                              const Icon = muffinScoreIcons.overallScore
                              return <Icon className="w-4 h-4 text-gray-600" />
                            })()}
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Overall Score</div>
                          </div>
                          <div className="mb-2 leading-none">
                            <span className="text-4xl font-bold text-gray-900">{muffinScores.overallScore}</span>
                            <span className="text-2xl font-bold text-green-600">/100</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-2">
                            Strong candidate
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Muffin AI Analysis Section */}
                <Card className="border border-gray-200 shadow-none bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <h2 className="text-base font-semibold text-gray-900 tracking-tight">Muffin AI Analysis</h2>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-0.5">
                        AI POWERED
                      </Badge>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Technical Competency */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Technical Competency</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {muffinAnalysis.technicalCompetency}
                        </p>
                      </div>

                      {/* Communication Clarity */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Communication Clarity</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {muffinAnalysis.communicationClarity}
                        </p>
                      </div>

                      {/* Role Fit */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Role Fit</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {muffinAnalysis.roleFit}
                        </p>
                      </div>

                      {/* Overall Assessment */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Overall Assessment</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {muffinAnalysis.overallAssessment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary Sections - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Strengths Section */}
                  <Card className="border border-gray-200 shadow-none bg-white">
                    <CardContent className="p-8">
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-base font-semibold text-gray-900 tracking-tight">Key Strengths</h2>
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-0.5">
                            CANDIDATE SKILLS
                          </Badge>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {muffinStrengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700 group">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover:text-green-700 transition-colors" />
                            <span className="text-sm leading-relaxed">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Development Areas Section */}
                  <Card className="border border-gray-200 shadow-none bg-white">
                    <CardContent className="p-8">
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-base font-semibold text-gray-900 tracking-tight">Development Areas</h2>
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs px-2 py-0.5">
                            GROWTH OPPORTUNITIES
                          </Badge>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {muffinDevelopmentAreas.map((area, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700 group">
                            <ArrowUp className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0 group-hover:text-amber-600 transition-colors" />
                            <span className="text-sm leading-relaxed">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

          </div>

          {/* Right Column - Meeting & Activity Feed */}
          <div className="col-span-1">
            <Card className="border border-gray-200 shadow-none bg-white">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-center mb-2 text-sm">{projectConfig.title} {"<>"} {candidateData.name} // {candidateData.role}</h4>
                  <p className="text-xs text-gray-500 text-center mb-3">
                    You have a meeting with {candidateData.firstName} planned for Wed 20 Jan 2026 09:00.
                  </p>
                  <div className="mb-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-xs text-blue-700 text-center">
                      <span className="font-medium">Available for interviews</span> until <span className="font-semibold">Mar 15, 2026</span>
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-sm py-2">
                    Join now
                    <ChevronLeft className="w-3 h-3 ml-2 rotate-180" />
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold">Activity Feed</h5>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                      5
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <FileCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Preliminary contract</span> sent to {candidateData.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

