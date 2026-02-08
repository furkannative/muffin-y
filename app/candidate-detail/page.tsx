"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Link,
  Shield,
  Code,
  Database,
  Briefcase,
  BarChart3,
  ChevronsRight,
  TrendingUp
} from "lucide-react"

export default function CandidateDetailPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "interview-scores" | "muffin-analysis">("interview-scores")
  const [language, setLanguage] = useState("english-us")

  // Native Score Data
  const nativeScores = {
    overall: 89,
    pronunciation: 87,
    fluency: 82,
    grammar: 90,
    vocabulary: 85,
    relevance: true,
  }

  // Interview Questions Data
  const interviewQuestions = [
    {
      id: 1,
      question: "Can you explain the applications of blockchain technology in the finance sector?",
      score: 95,
      status: "passed",
      details: "The candidate explained the applications of blockchain technology in the finance sector in detail and provided real-world examples.",
    },
    {
      id: 2,
      question: "How do you ensure security in payment systems?",
      score: 88,
      status: "passed",
      details: "Well explained security protocols and encryption methods, but did not mention some current security standards.",
    },
    {
      id: 3,
      question: "What are the best practices for API design in fintech applications?",
      score: 85,
      status: "passed",
      details: "Has good knowledge of API design, explained RESTful API principles and security measures.",
    },
    {
      id: 4,
      question: "Which database technologies would you use to process large-scale financial data?",
      score: 75,
      status: "partially-passed",
      details: "Knowledgeable about relational databases, but needs more information about NoSQL and time-series databases.",
    },
    {
      id: 5,
      question: "How is microservice architecture implemented in financial applications?",
      score: 80,
      status: "passed",
      details: "Demonstrated understanding of the basic principles of microservice architecture, but needs more experience with challenges in distributed systems.",
    },
  ]

  const strengths = [
    "Deep knowledge of blockchain technology",
    "Strong understanding of security protocols and standards",
    "Practical experience in API design and integration",
    "Up-to-date knowledge of fintech regulations",
  ]

  const areasForImprovement = [
    "Should gain more experience with NoSQL databases",
    "Should deepen knowledge of distributed systems and scalability",
    "Should keep up with the latest trends in fintech",
  ]

  // Muffin Score Data
  const muffinScores = {
    technicalCompetency: 85,
    communication: 92,
    roleFit: 88,
    overallScore: 87,
  }

  // Muffin Score card icons mapping
  const muffinScoreIcons = {
    technicalCompetency: ChevronsRight,
    communication: MessageCircle,
    roleFit: Briefcase,
    overallScore: BarChart3,
  }

  // Muffin AI Analysis content
  const muffinAnalysis = {
    technicalCompetency: "The candidate demonstrates a strong understanding of backend development, particularly with Node.js and database design. They provided clear explanations of their technical approach and showed familiarity with modern development practices. However, there are some gaps in advanced PostgreSQL optimization techniques.",
    communicationClarity: "Excellent verbal communication skills. The candidate was able to explain complex technical concepts in a clear and concise manner. They used appropriate terminology and were able to break down complex ideas into understandable parts. The candidate was also attentive to questions and provided thoughtful responses.",
    roleFit: "The candidate's experience aligns well with the requirements for a mid-level backend engineer role in fintech. They have relevant experience with payment processing and financial data handling. However, they may benefit from more exposure to high-scale transaction processing systems.",
    overallAssessment: "Overall, this is a strong candidate with excellent technical and communication abilities. They would be a valuable addition to the team, bringing relevant experience and a collaborative approach. Recommended for further consideration with additional training in advanced database optimization.",
  }

  // Muffin Strengths
  const muffinStrengths = [
    "Strong blockchain/smart contract skills",
    "Extensive experience with payment processing/financial API integration",
    "Comprehensive knowledge of modern web development technologies",
    "Solid foundation in database design/optimization",
  ]

  // Muffin Development Areas
  const muffinDevelopmentAreas = [
    "Gain more experience with cloud technologies (especially AWS)",
    "Improve knowledge of Kubernetes/container orchestration",
    "Stay current with data security/encryption standards",
    "Expand knowledge of NoSQL databases",
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

  // Score card icons mapping
  const scoreIcons = {
    overall: Target,
    pronunciation: Mic,
    fluency: MessageCircle,
    grammar: BookOpen,
    vocabulary: BookMarked,
    relevance: Globe,
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">John Smith</h1>
              <p className="text-xs font-medium text-gray-500 mt-1.5 tracking-wide uppercase">FINTECH SPECIALIST</p>
              <p className="text-sm text-gray-500 mt-2 font-normal">Interview Date: April 17, 2025</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:border-purple-300 text-xs font-medium h-8 px-3"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                + Add Shortlist
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-xs font-medium h-8 px-3"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                Feedback
              </Button>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[165px] border-gray-200 h-8 text-xs font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english-us">ENGLISH (US)</SelectItem>
                  <SelectItem value="turkish">TURKISH</SelectItem>
                  <SelectItem value="english-uk">ENGLISH (UK)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-8 border-b border-gray-200 -mb-px">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3.5 px-1 text-sm font-medium transition-all duration-200 ${
                activeTab === "overview"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
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

        {activeTab === "overview" && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400">Overview content will be displayed here</p>
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
    </div>
  )
}

