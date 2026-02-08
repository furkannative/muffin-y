"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Search,
  MapPin,
  Calendar,
  Briefcase,
  Star,
  BookmarkPlus,
  Building2,
  Users,
  Code,
  X,
  Plus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/lib/search-context"

export function AISearchInterface({
  hideRecent = false,
  hideTips = false,
  variant = "default",
}: {
  hideRecent?: boolean
  hideTips?: boolean
  variant?: "default" | "compact"
}) {
  const { searchPrompt: savedPrompt, setSearchPrompt: saveSearchPrompt } = useSearch()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [promptBuilder, setPromptBuilder] = useState(savedPrompt)
  const [isPromptMode, setIsPromptMode] = useState(true)

  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState("")

  const handleSearch = async () => {
    saveSearchPrompt(promptBuilder)
    setIsSearching(true)
    
    // Generate email content
    const promptText = generatePromptText()
    const emailBody = `Search Prompt Details:\n\n${promptText}\n\n` +
      `Company Type: ${promptBuilder.companyType}\n` +
      `Location: ${promptBuilder.location}\n` +
      `Team Size: ${promptBuilder.teamSize}\n` +
      `Role: ${promptBuilder.role}\n` +
      `Experience: ${promptBuilder.experience}\n` +
      `Skills: ${promptBuilder.skills.join(", ")}`
    
    // Format email content similar to previous format
    const emailContent = `Yeni bir prompt gönderildi
Kullanıcı: unknown@example.com

Kullanıcı ID: anonymous

Tarih: ${new Date().toLocaleString('tr-TR', { 
  day: '2-digit', 
  month: '2-digit', 
  year: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit' 
})}

Prompt İçeriği:
${promptText}

${emailBody}`
    
    // Email gönderme şimdilik devre dışı
    // TODO: Email gönderme özelliği daha sonra aktif edilecek
    
    setTimeout(() => {
      window.location.href = "/analysis"
    }, 1000)
  }

  const handleNewSearch = () => {
    setSearchQuery("")
    setPromptBuilder({
      companyType: "Tech company",
      location: "Europe",
      teamSize: "50+ employees",
      role: "Frontend Developer",
      experience: "7+ years",
      skills: ["React", "TypeScript", "Figma"],
    })
    setIsPromptMode(true)
  }

  const startEditing = (field: string, value: string) => {
    setEditingField(field)
    setTempValue(value)
  }

  const saveEdit = (field: keyof typeof promptBuilder) => {
    if (tempValue.trim()) {
      setPromptBuilder((prev) => ({ ...prev, [field]: tempValue }))
    }
    setEditingField(null)
    setTempValue("")
  }

  const cancelEdit = () => {
    setEditingField(null)
    setTempValue("")
  }

  const addSkill = (skill: string) => {
    if (skill && !promptBuilder.skills.includes(skill)) {
      setPromptBuilder((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setPromptBuilder((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const generatePromptText = () => {
    return `We are a ${promptBuilder.companyType} based in ${promptBuilder.location} with ${promptBuilder.teamSize}. We are hiring a ${promptBuilder.role} with ${promptBuilder.experience} experience who is skilled in ${promptBuilder.skills.join(", ")}.`
  }

  const updatePromptField = (field: keyof typeof promptBuilder, value: string) => {
    const newPrompt = { ...promptBuilder, [field]: value }
    setPromptBuilder(newPrompt)
    saveSearchPrompt(newPrompt)
  }

  const EditableBadge = ({
    field,
    value,
    icon: Icon,
    colorClass,
  }: {
    field: keyof typeof promptBuilder
    value: string
    icon: React.ElementType
    colorClass: string
  }) => {
    const isEditing = editingField === field

    if (isEditing) {
      return (
        <div className="inline-flex items-center gap-2">
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit(field)
              if (e.key === "Escape") cancelEdit()
            }}
            className="h-10 w-48 text-base"
            autoFocus
            onBlur={() => saveEdit(field)}
          />
        </div>
      )
    }

    return (
      <Badge
        variant="secondary"
        className={`${colorClass} px-4 py-2 text-base cursor-pointer hover:opacity-80 transition-opacity`}
        onClick={() => startEditing(field, value)}
      >
        <Icon className="w-4 h-4 mr-1.5" />
        {value}
      </Badge>
    )
  }

  const showPageHeader = variant === "default"
  const containerClass =
    variant === "default"
      ? "min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5"
      : "w-full"

  return (
    <div className={containerClass}>
      {/* Header (only default variant) */}
      {showPageHeader && (
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
                <Button variant="outline" size="sm" onClick={handleNewSearch}>
                  New search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={showPageHeader ? "max-w-7xl mx-auto px-6 py-8" : "w-full"}>
        <div className="mb-8">
          {variant === "default" ? (
            <p className="text-muted-foreground mb-6">Find great candidates, wherever they are.</p>
          ) : (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">AI-Powered Candidate Search</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleNewSearch}>
                  New search
                </Button>
              </div>
            </div>
          )}

          {/* Search Interface */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className={variant === "compact" ? "pb-4" : "pb-6"}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <CardTitle className={variant === "compact" ? "text-lg" : "text-2xl"}>
                    AI-Powered Candidate Search
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={isPromptMode ? "default" : "outline"}
                    size={variant === "compact" ? "sm" : "default"}
                    onClick={() => setIsPromptMode(true)}
                  >
                    Prompt Builder
                  </Button>
                  <Button
                    variant={!isPromptMode ? "default" : "outline"}
                    size={variant === "compact" ? "sm" : "default"}
                    onClick={() => setIsPromptMode(false)}
                  >
                    Free Text
                  </Button>
                </div>
              </div>
              <CardDescription className={variant === "compact" ? "mt-1" : "text-base mt-2"}>
                {isPromptMode
                  ? "Build your search using interactive tags and filters."
                  : "Describe your ideal candidate and let our AI find the perfect matches from our global talent pool."}
              </CardDescription>
            </CardHeader>
            <CardContent className={variant === "compact" ? "pb-4" : "pb-8"}>
              {isPromptMode ? (
                <div className="space-y-6">
                  {variant === "compact" ? (
                    <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur p-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Company</div>
                          <EditableBadge
                            field="companyType"
                            value={promptBuilder.companyType}
                            icon={Building2}
                            colorClass="bg-purple-100 text-purple-700 hover:bg-purple-200"
                          />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Location</div>
                          <EditableBadge
                            field="location"
                            value={promptBuilder.location}
                            icon={MapPin}
                            colorClass="bg-pink-100 text-pink-700 hover:bg-pink-200"
                          />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Team size</div>
                          <EditableBadge
                            field="teamSize"
                            value={promptBuilder.teamSize}
                            icon={Users}
                            colorClass="bg-green-100 text-green-700 hover:bg-green-200"
                          />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Role</div>
                          <EditableBadge
                            field="role"
                            value={promptBuilder.role}
                            icon={Briefcase}
                            colorClass="bg-orange-100 text-orange-700 hover:bg-orange-200"
                          />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Experience</div>
                          <EditableBadge
                            field="experience"
                            value={promptBuilder.experience}
                            icon={Calendar}
                            colorClass="bg-blue-100 text-blue-700 hover:bg-blue-200"
                          />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Skills</div>
                          <div className="flex flex-wrap items-center gap-2">
                            {promptBuilder.skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-teal-100 text-teal-700 px-3 py-1.5 text-sm cursor-pointer hover:bg-teal-200 group transition-colors"
                              >
                                <Code className="w-4 h-4 mr-1" />
                                {skill}
                                <X
                                  className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeSkill(skill)
                                  }}
                                />
                              </Badge>
                            ))}
                            <Badge
                              variant="outline"
                              className="px-3 py-1.5 text-sm cursor-pointer hover:bg-muted border-dashed transition-colors"
                              onClick={() => {
                                const newSkill = prompt("Add skill:")
                                if (newSkill) addSkill(newSkill)
                              }}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
                        <div className="text-sm text-muted-foreground">
                          {generatePromptText()}
                        </div>
                        <Button
                          onClick={handleSearch}
                          disabled={isSearching}
                          size="default"
                          className="px-6"
                        >
                          {isSearching ? (
                            <>
                              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                              Searching...
                            </>
                          ) : (
                            <>
                              <Search className="w-5 h-5 mr-2" />
                              Search with AI
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-10 border border-purple-200">
                      <div className="flex flex-wrap items-center gap-3 text-xl leading-relaxed">
                        <span className="font-medium">We are a</span>
                        <EditableBadge
                          field="companyType"
                          value={promptBuilder.companyType}
                          icon={Building2}
                          colorClass="bg-purple-100 text-purple-700 hover:bg-purple-200"
                        />
                        <span className="font-medium">based in</span>
                        <EditableBadge
                          field="location"
                          value={promptBuilder.location}
                          icon={MapPin}
                          colorClass="bg-pink-100 text-pink-700 hover:bg-pink-200"
                        />
                        <span className="font-medium">with</span>
                        <EditableBadge
                          field="teamSize"
                          value={promptBuilder.teamSize}
                          icon={Users}
                          colorClass="bg-green-100 text-green-700 hover:bg-green-200"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xl leading-relaxed mt-6">
                        <span className="font-medium">We are hiring a</span>
                        <EditableBadge
                          field="role"
                          value={promptBuilder.role}
                          icon={Briefcase}
                          colorClass="bg-orange-100 text-orange-700 hover:bg-orange-200"
                        />
                        <span className="font-medium">with</span>
                        <EditableBadge
                          field="experience"
                          value={promptBuilder.experience}
                          icon={Calendar}
                          colorClass="bg-blue-100 text-blue-700 hover:bg-blue-200"
                        />
                        <span className="font-medium">experience who is skilled in</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-6">
                        {promptBuilder.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-teal-100 text-teal-700 px-4 py-2 text-base cursor-pointer hover:bg-teal-200 group transition-colors"
                          >
                            <Code className="w-4 h-4 mr-1.5" />
                            {skill}
                            <X
                              className="w-4 h-4 ml-1.5 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeSkill(skill)
                              }}
                            />
                          </Badge>
                        ))}
                        <Badge
                          variant="outline"
                          className="px-4 py-2 text-base cursor-pointer hover:bg-muted border-dashed transition-colors"
                          onClick={() => {
                            const newSkill = prompt("Add skill:")
                            if (newSkill) addSkill(newSkill)
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1.5" />
                          Add skill
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      value={searchQuery || generatePromptText()}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g., Senior React developer in San Francisco with startup experience"
                      className={variant === "compact" ? "text-sm py-2 pr-28" : "text-base py-3 pr-32"}
                    />
                    <Button
                      onClick={handleSearch}
                      disabled={(!searchQuery.trim() && !isPromptMode) || isSearching}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      size={variant === "compact" ? "sm" : "sm"}
                    >
                      {isSearching ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Search with AI
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Quick Filters */}
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => updatePromptField("location", "Europe")}
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      Europe
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => updatePromptField("experience", "7+ years")}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      7+ years
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => updatePromptField("role", "Software Engineer")}
                    >
                      <Briefcase className="w-3 h-3 mr-1" />
                      Software Engineer
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Searches */}
        {!hideRecent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-border/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Recent
                </Badge>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">Full stack engineer in Europe with 7+ years of experience in fintech</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>24 candidates found</span>
                <Button variant="ghost" size="sm">
                  View results
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Recent
                </Badge>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">Senior Product Manager with B2B SaaS experience</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>18 candidates found</span>
                <Button variant="ghost" size="sm">
                  View results
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Recent
                </Badge>
                <span className="text-xs text-muted-foreground">3 days ago</span>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">DevOps Engineer with Kubernetes and AWS expertise</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>31 candidates found</span>
                <Button variant="ghost" size="sm">
                  View results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        )}

        {/* Tips Section */}
        {!hideTips && (
        <Card className="mt-8 border-border/50 bg-accent/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Sparkles className="w-5 h-5 text-primary mr-2" />
              Search Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Be specific about requirements</h4>
                <p className="text-muted-foreground">
                  Include years of experience, specific technologies, and location preferences for better matches.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Use natural language</h4>
                <p className="text-muted-foreground">
                  Describe your ideal candidate as you would to a recruiter - our AI understands context.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Include company culture fit</h4>
                <p className="text-muted-foreground">
                  Mention startup experience, remote work preferences, or industry background.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Specify soft skills</h4>
                <p className="text-muted-foreground">
                  Leadership experience, communication skills, or team collaboration preferences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  )
}
