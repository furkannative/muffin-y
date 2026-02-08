"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Linkedin, Calendar, ChevronRight, User } from "lucide-react"

interface CandidateNewDetailPageProps {
  candidateId: string
}

const candidateData = {
  1: {
    name: "Grace Frederick",
    title: "QA Engineer",
    location: "Colorado State",
    avatar: "/professional-woman-engineer.png",
    email: "grace.f@colostate.edu",
    phone: "+2099627003",
    linkedin: "linkedin.com/in/gracefrederick",
    source: "app.gethirex.com",
    assignee: "Susan Hayden",
    appliedDate: "Oct. 1, 2024",
    stageDate: "Oct. 1, 2024",
    status: "Applied/Sourced",
    firstName: "Grace",
    lastName: "Frederick",
    salaryExpectation: "10,000",
    summary:
      "Experienced QA Engineer with 5+ years in software testing and quality assurance. Strong background in automated testing frameworks and agile methodologies.",
    experience: [
      {
        company: "Tech Solutions Inc",
        role: "Senior QA Engineer",
        duration: "2021 - Present",
        description:
          "Leading QA team for enterprise software products. Implemented automated testing reducing bugs by 60%.",
      },
      {
        company: "Digital Innovations",
        role: "QA Engineer",
        duration: "2019 - 2021",
        description: "Developed comprehensive test plans and executed manual and automated tests for web applications.",
      },
    ],
    education: [
      {
        institution: "Colorado State University",
        degree: "Bachelor of Computer Science",
        year: "2019",
      },
    ],
    skills: ["Selenium", "Jest", "Cypress", "Manual Testing", "Agile", "JIRA", "API Testing"],
    activities: [
      {
        user: "ron@hirex.com",
        action: "updated candidate information",
        time: "2 weeks, 4 days ago",
      },
      {
        user: "Grace Frederick",
        action: "is assigned to susan.hayden@hirex.com",
        time: "2 weeks, 4 days ago",
      },
    ],
  },
}

const pipelineStages = [
  { id: "applied", title: "Applied/Sourced", count: 9, active: true },
  { id: "cv-review", title: "CV Review", count: 6, active: false },
  { id: "phone", title: "Phone Interview", count: 1, active: false },
  { id: "online", title: "Online Interview", count: 3, active: false },
  { id: "offered", title: "Offered", count: 3, active: false },
  { id: "hired", title: "Hired", count: 1, active: false },
]

export function CandidateNewDetailPage({ candidateId }: CandidateNewDetailPageProps) {
  const [currentTab, setCurrentTab] = useState("summary")
  const [currentStage, setCurrentStage] = useState("applied")

  // Convert string candidateId to number for type safety
  const numericCandidateId = Number(candidateId) || 1
  
  const candidate = candidateData[numericCandidateId as keyof typeof candidateData] ?? candidateData[1]

  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
              <h1 className="text-2xl font-semibold">Sales Representative</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="outline" size="sm">
                Change Stage
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                Reject
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button variant="ghost" size="sm">
                More
              </Button>
              <Button size="sm">Edit</Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Application</span>
                <Select value={candidate.title}>
                  <SelectTrigger className="w-[180px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>{candidate.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Source</span>
                <span>{candidate.source}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Assignee</span>
                <span>{candidate.assignee}</span>
              </div>
            </div>
            <Button variant="link" size="sm" className="text-blue-600">
              + Add tag
            </Button>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {pipelineStages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStage(stage.id)}
                  className={`
                    px-4 py-2 rounded-lg border transition-all whitespace-nowrap
                    ${
                      stage.active
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-background border-border hover:bg-accent"
                    }
                  `}
                >
                  <span className="font-medium mr-2">{stage.count}</span>
                  <span className="text-sm">{stage.title}</span>
                </button>
                {index < pipelineStages.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16 bg-purple-200">
                    <AvatarFallback className="bg-purple-200 text-purple-700 text-xl font-semibold">GF</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">{candidate.name}</h2>
                        <p className="text-muted-foreground">{candidate.email}</p>
                      </div>
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="scorecards">Scorecards</TabsTrigger>
                <TabsTrigger value="todos">To-dos</TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Candidate</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground">First name</label>
                          <div className="mt-1 p-2 bg-muted rounded">{candidate.firstName}</div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Last name</label>
                          <div className="mt-1 p-2 bg-muted rounded">{candidate.lastName}</div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Email</label>
                          <div className="mt-1 p-2 bg-muted rounded">{candidate.email}</div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Phone number</label>
                          <div className="mt-1 p-2 bg-muted rounded">{candidate.phone}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Screening Questions</h3>
                      <div>
                        <label className="text-sm text-muted-foreground flex items-center">
                          Salary Expectation
                          <span className="ml-2 text-xs">💰</span>
                        </label>
                        <div className="mt-1 p-2 bg-muted rounded">{candidate.salaryExpectation}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-center py-8">No comments yet</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scorecards">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-center py-8">No scorecards available</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="todos">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-center py-8">No to-dos yet</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="activity">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-4">
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-muted-foreground mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-sm mb-1">
                          Hooli &lt;&gt; {candidate.name} // {candidate.title}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          You have a meeting with {candidate.name.split(" ")[0]} planned for Thu 03 Oct 2024 09:00.
                        </p>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Join now →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center">
                      Activity Feed
                      <Badge variant="secondary" className="ml-2">
                        3
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {candidate.activities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p>
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-center py-8">No notes yet</p>
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
