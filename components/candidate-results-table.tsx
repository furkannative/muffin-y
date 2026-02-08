"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  BookmarkPlus,
  Mail,
  MessageSquare,
  MoreHorizontal,
  X,
  Users,
  TrendingUp,
  Clock,
  Target,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearch } from "@/lib/search-context"

const candidates = [
  {
    id: 1,
    name: "Jamile Musa",
    title: "Fullstack engineer",
    location: "Brussels, Belgium",
    flag: "🇧🇪",
    companies: ["ELIXIR", "FINTECH", "REMOTE"],
    aiSummary: "Experienced fullstack developer with 8+ years in fintech. Strong React and Node.js skills.",
    avatar: "/professional-woman-developer.png",
    matchScore: 95,
    experience: "8 years",
    availability: "2 weeks",
    salary: "$120k",
    lastActive: "2 days ago",
  },
  {
    id: 2,
    name: "Jack Craig",
    title: "Backend engineer",
    location: "London, United Kingdom",
    flag: "🇬🇧",
    companies: ["ELIXIR", "PHOENIX", "APPLE"],
    aiSummary: "Senior backend engineer specializing in distributed systems and microservices architecture.",
    avatar: "/professional-man-developer.png",
    matchScore: 92,
    experience: "10 years",
    availability: "1 month",
    salary: "$140k",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Grace Clark",
    title: "Fullstack engineer",
    location: "Amsterdam, Netherlands",
    flag: "🇳🇱",
    companies: ["ELIXIR", "FINTECH"],
    aiSummary: "Full-stack developer with expertise in modern web technologies and agile methodologies.",
    avatar: "/professional-woman-engineer.png",
    matchScore: 89,
    experience: "6 years",
    availability: "Immediate",
    salary: "$110k",
    lastActive: "5 hours ago",
  },
  {
    id: 4,
    name: "Aadi Chopra",
    title: "Senior engineer",
    location: "Helsinki, Finland",
    flag: "🇫🇮",
    companies: ["ELIXIR", "GAME DESIGN", "APPLE"],
    aiSummary: "Senior software engineer with game development background and mobile app expertise.",
    avatar: "/professional-engineer.png",
    matchScore: 87,
    experience: "12 years",
    availability: "3 weeks",
    salary: "$130k",
    lastActive: "1 week ago",
  },
  {
    id: 5,
    name: "Sofia Martinez",
    title: "Frontend Developer",
    location: "Barcelona, Spain",
    flag: "🇪🇸",
    companies: ["REACT", "FINTECH"],
    aiSummary: "Creative frontend developer with strong UX sensibilities.",
    avatar: "/placeholder.svg",
    matchScore: 91,
    experience: "7 years",
    availability: "1 week",
    salary: "$105k",
    lastActive: "3 hours ago",
  },
  {
    id: 6,
    name: "Lucas Weber",
    title: "Full Stack Developer",
    location: "Berlin, Germany",
    flag: "🇩🇪",
    companies: ["TYPESCRIPT", "NODE"],
    aiSummary: "Versatile full-stack developer with DevOps experience.",
    avatar: "/placeholder.svg",
    matchScore: 88,
    experience: "9 years",
    availability: "2 weeks",
    salary: "$125k",
    lastActive: "1 day ago",
  },
  {
    id: 7,
    name: "Emma Johnson",
    title: "Senior Frontend Engineer",
    location: "Stockholm, Sweden",
    flag: "🇸🇪",
    companies: ["REACT", "VUE"],
    aiSummary: "Expert in modern JavaScript frameworks and performance optimization.",
    avatar: "/placeholder.svg",
    matchScore: 93,
    experience: "11 years",
    availability: "Immediate",
    salary: "$135k",
    lastActive: "6 hours ago",
  },
  {
    id: 8,
    name: "Oliver Brown",
    title: "Backend Developer",
    location: "Dublin, Ireland",
    flag: "🇮🇪",
    companies: ["NODE", "PYTHON"],
    aiSummary: "Backend specialist with cloud architecture expertise.",
    avatar: "/placeholder.svg",
    matchScore: 86,
    experience: "8 years",
    availability: "3 weeks",
    salary: "$115k",
    lastActive: "2 days ago",
  },
  {
    id: 9,
    name: "Isabella Rossi",
    title: "Full Stack Engineer",
    location: "Milan, Italy",
    flag: "🇮🇹",
    companies: ["REACT", "FINTECH"],
    aiSummary: "Passionate full-stack engineer with e-commerce background.",
    avatar: "/placeholder.svg",
    matchScore: 90,
    experience: "7 years",
    availability: "1 week",
    salary: "$108k",
    lastActive: "4 hours ago",
  },
  {
    id: 10,
    name: "Noah Anderson",
    title: "Software Engineer",
    location: "Copenhagen, Denmark",
    flag: "🇩🇰",
    companies: ["TYPESCRIPT", "REACT"],
    aiSummary: "Detail-oriented engineer with strong testing practices.",
    avatar: "/placeholder.svg",
    matchScore: 85,
    experience: "6 years",
    availability: "2 weeks",
    salary: "$112k",
    lastActive: "1 day ago",
  },
  {
    id: 11,
    name: "Mia Schmidt",
    title: "Frontend Specialist",
    location: "Vienna, Austria",
    flag: "🇦🇹",
    companies: ["VUE", "ANGULAR"],
    aiSummary: "Frontend specialist with accessibility expertise.",
    avatar: "/placeholder.svg",
    matchScore: 84,
    experience: "8 years",
    availability: "3 weeks",
    salary: "$118k",
    lastActive: "5 hours ago",
  },
  {
    id: 12,
    name: "Liam O'Connor",
    title: "Senior Developer",
    location: "Cork, Ireland",
    flag: "🇮🇪",
    companies: ["NODE", "REACT"],
    aiSummary: "Senior developer with team leadership experience.",
    avatar: "/placeholder.svg",
    matchScore: 89,
    experience: "10 years",
    availability: "1 month",
    salary: "$128k",
    lastActive: "2 days ago",
  },
  {
    id: 13,
    name: "Charlotte Dubois",
    title: "Full Stack Developer",
    location: "Paris, France",
    flag: "🇫🇷",
    companies: ["REACT", "PYTHON"],
    aiSummary: "Bilingual developer with international project experience.",
    avatar: "/placeholder.svg",
    matchScore: 87,
    experience: "7 years",
    availability: "2 weeks",
    salary: "$122k",
    lastActive: "1 day ago",
  },
  {
    id: 14,
    name: "William van der Berg",
    title: "Backend Engineer",
    location: "Rotterdam, Netherlands",
    flag: "🇳🇱",
    companies: ["NODE", "MICROSERVICES"],
    aiSummary: "Backend engineer specializing in scalable architectures.",
    avatar: "/placeholder.svg",
    matchScore: 88,
    experience: "9 years",
    availability: "3 weeks",
    salary: "$126k",
    lastActive: "3 days ago",
  },
  {
    id: 15,
    name: "Amelia Kowalski",
    title: "Software Developer",
    location: "Warsaw, Poland",
    flag: "🇵🇱",
    companies: ["REACT", "TYPESCRIPT"],
    aiSummary: "Talented developer with strong problem-solving skills.",
    avatar: "/placeholder.svg",
    matchScore: 86,
    experience: "6 years",
    availability: "1 week",
    salary: "$95k",
    lastActive: "8 hours ago",
  },
  {
    id: 16,
    name: "James Murphy",
    title: "Frontend Developer",
    location: "Edinburgh, UK",
    flag: "🇬🇧",
    companies: ["VUE", "NUXT"],
    aiSummary: "Frontend developer with design system experience.",
    avatar: "/placeholder.svg",
    matchScore: 83,
    experience: "5 years",
    availability: "2 weeks",
    salary: "$102k",
    lastActive: "1 day ago",
  },
  {
    id: 17,
    name: "Sophie Laurent",
    title: "Full Stack Engineer",
    location: "Lyon, France",
    flag: "🇫🇷",
    companies: ["NODE", "REACT"],
    aiSummary: "Full-stack engineer with startup experience.",
    avatar: "/placeholder.svg",
    matchScore: 82,
    experience: "7 years",
    availability: "3 weeks",
    salary: "$110k",
    lastActive: "2 days ago",
  },
  {
    id: 18,
    name: "Alexander Petrov",
    title: "Senior Backend Developer",
    location: "Prague, Czech Republic",
    flag: "🇨🇿",
    companies: ["PYTHON", "DJANGO"],
    aiSummary: "Senior backend developer with database optimization skills.",
    avatar: "/placeholder.svg",
    matchScore: 85,
    experience: "11 years",
    availability: "1 month",
    salary: "$115k",
    lastActive: "4 days ago",
  },
]

type SortField = "name" | "matchScore" | "experience" | "availability" | "salary"
type SortDirection = "asc" | "desc"

export function CandidateResultsTable() {
  const { getPromptText } = useSearch()
  const [searchQuery] = useState(getPromptText())
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
  const [sortField, setSortField] = useState<SortField>("matchScore")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [experienceFilter, setExperienceFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const toggleCandidateSelection = (candidateId: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId],
    )
  }

  const handleViewCandidate = (candidateId: number) => {
    window.location.href = `/candidate/${candidateId}`
  }

  const handleInviteToInterview = () => {
    window.location.href = "/email"
  }

  const handleSort = (field: SortField) => {
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

    if (sortField === "experience") {
      aValue = Number.parseInt(a.experience)
      bValue = Number.parseInt(b.experience)
    } else if (sortField === "salary") {
      aValue = Number.parseInt(a.salary.replace(/\D/g, ""))
      bValue = Number.parseInt(b.salary.replace(/\D/g, ""))
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const filteredCandidates = sortedCandidates.filter((candidate) => {
    if (locationFilter !== "all" && !candidate.location.includes(locationFilter)) {
      return false
    }
    if (experienceFilter !== "all") {
      const years = Number.parseInt(candidate.experience)
      if (experienceFilter === "5-7" && (years < 5 || years > 7)) return false
      if (experienceFilter === "8-10" && (years < 8 || years > 10)) return false
      if (experienceFilter === "10+" && years < 10) return false
    }
    return true
  })

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCandidates = filteredCandidates.slice(startIndex, endIndex)

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 text-primary" />
    ) : (
      <ArrowDown className="w-4 h-4 text-primary" />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <div className="w-4 h-4 rounded bg-primary-foreground"></div>
                </div>
                <h1 className="text-xl font-semibold text-foreground">Sourcing</h1>
              </div>
              <Star className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Bookmarked candidates
              </Button>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/dashboard")}>
                New search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search Query Display */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Find great candidates, wherever they are.</p>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-2xl">
              <Badge
                variant="secondary"
                className="absolute -top-2 left-4 bg-primary text-primary-foreground px-2 py-1 text-xs z-10"
              >
                {searchQuery}
              </Badge>
              <div className="bg-primary/10 rounded-lg p-4 pt-6 border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">{searchQuery}</span>
                  <Button variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/dashboard")}>
              New search
            </Button>
          </div>
        </div>

        {/* Project stats section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Candidates</p>
                  <p className="text-3xl font-bold text-foreground">1,250</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last search
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">High Match</p>
                  <p className="text-3xl font-bold text-foreground">342</p>
                  <p className="text-xs text-muted-foreground mt-1">90%+ match score</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Response Time</p>
                  <p className="text-3xl font-bold text-foreground">2.4d</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on history</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contacted</p>
                  <p className="text-3xl font-bold text-foreground">87</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Candidates</h2>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              1-{paginatedCandidates.length} of {filteredCandidates.length} records
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Brussels">Brussels</SelectItem>
                <SelectItem value="London">London</SelectItem>
                <SelectItem value="Amsterdam">Amsterdam</SelectItem>
                <SelectItem value="Helsinki">Helsinki</SelectItem>
                <SelectItem value="Barcelona">Barcelona</SelectItem>
                <SelectItem value="Berlin">Berlin</SelectItem>
                <SelectItem value="Stockholm">Stockholm</SelectItem>
                <SelectItem value="Dublin">Dublin</SelectItem>
                <SelectItem value="Milan">Milan</SelectItem>
                <SelectItem value="Copenhagen">Copenhagen</SelectItem>
                <SelectItem value="Vienna">Vienna</SelectItem>
                <SelectItem value="Cork">Cork</SelectItem>
                <SelectItem value="Paris">Paris</SelectItem>
                <SelectItem value="Rotterdam">Rotterdam</SelectItem>
                <SelectItem value="Warsaw">Warsaw</SelectItem>
                <SelectItem value="Edinburgh">Edinburgh</SelectItem>
                <SelectItem value="Lyon">Lyon</SelectItem>
                <SelectItem value="Prague">Prague</SelectItem>
              </SelectContent>
            </Select>
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                <SelectItem value="5-7">5-7 years</SelectItem>
                <SelectItem value="8-10">8-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
            {selectedCandidates.length > 0 && (
              <Button onClick={handleInviteToInterview} size="sm">
                Invite to Interview ({selectedCandidates.length})
              </Button>
            )}
          </div>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="pb-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <button
                onClick={() => handleSort("name")}
                className="col-span-3 flex items-center space-x-1 hover:text-foreground transition-colors"
              >
                <span>NAME</span>
                <SortIcon field="name" />
              </button>
              <div className="col-span-2">LOCATION</div>
              <button
                onClick={() => handleSort("experience")}
                className="col-span-2 flex items-center space-x-1 hover:text-foreground transition-colors"
              >
                <span>EXPERIENCE</span>
                <SortIcon field="experience" />
              </button>
              <button
                onClick={() => handleSort("availability")}
                className="col-span-2 flex items-center space-x-1 hover:text-foreground transition-colors"
              >
                <span>AVAILABILITY</span>
                <SortIcon field="availability" />
              </button>
              <button
                onClick={() => handleSort("salary")}
                className="col-span-2 flex items-center space-x-1 hover:text-foreground transition-colors"
              >
                <span>SALARY</span>
                <SortIcon field="salary" />
              </button>
              <button
                onClick={() => handleSort("matchScore")}
                className="col-span-1 flex items-center space-x-1 hover:text-foreground transition-colors"
              >
                <span>MATCH</span>
                <SortIcon field="matchScore" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {paginatedCandidates.map((candidate, index) => {
                const globalIndex = startIndex + index
                const showMuffinLabel = globalIndex < 15

                return (
                  <div
                    key={candidate.id}
                    className={`
                      grid grid-cols-12 gap-4 p-6 hover:bg-accent/20 transition-all cursor-pointer
                      ${index !== paginatedCandidates.length - 1 ? "border-b border-border/30" : ""}
                      ${selectedCandidates.includes(candidate.id) ? "bg-primary/5 border-primary/20" : ""}
                    `}
                    onClick={() => handleViewCandidate(candidate.id)}
                  >
                    <div className="col-span-3 flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={(e) => {
                          e.stopPropagation()
                          toggleCandidateSelection(candidate.id)
                        }}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{candidate.name}</span>
                          {showMuffinLabel && (
                            <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200 text-xs px-2 py-0.5">
                              <span className="mr-1">🧁</span>
                              AI Ready
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{candidate.title}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {candidate.companies.slice(0, 2).map((company) => (
                            <Badge key={company} variant="secondary" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center space-x-2">
                      <span className="text-lg">{candidate.flag}</span>
                      <div>
                        <div className="text-foreground text-sm">{candidate.location.split(",")[0]}</div>
                        <div className="text-xs text-muted-foreground">{candidate.location.split(",")[1]}</div>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center">
                      <div>
                        <div className="text-foreground font-medium">{candidate.experience}</div>
                        <div className="text-xs text-muted-foreground">Professional exp.</div>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center">
                      <div>
                        <div className="text-foreground font-medium">{candidate.availability}</div>
                        <div className="text-xs text-muted-foreground">Last active: {candidate.lastActive}</div>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center">
                      <div>
                        <div className="text-foreground font-medium">{candidate.salary}</div>
                        <div className="text-xs text-muted-foreground">Expected salary</div>
                      </div>
                    </div>

                    <div className="col-span-1 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-bold text-green-600">{candidate.matchScore}%</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            {startIndex + 1}-{Math.min(endIndex, filteredCandidates.length)} of {filteredCandidates.length} records
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Action Panel */}
        {selectedCandidates.length > 0 && (
          <Card className="fixed bottom-6 left-1/2 transform -translate-x-1/2 border-border/50 shadow-xl bg-card/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  {selectedCandidates.length} candidate{selectedCandidates.length > 1 ? "s" : ""} selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <BookmarkPlus className="w-4 h-4 mr-2" />
                    Save to list
                  </Button>
                  <Button onClick={handleInviteToInterview} size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Invite to Interview
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
