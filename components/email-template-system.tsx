"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, Mail, User, Building2, MapPin } from "lucide-react"
import Link from "next/link"

export function EmailTemplateSystem() {
  const [emailContent, setEmailContent] = useState(`Hello Clara,

I've been looking for someone with your kind of experience, and your background at Zapier — especially after your time at Microsoft — really stood out.

The work you've done as a Fullstack engineer looks like a great match for what we're building.

We're hiring for a role that could be a strong next step for you, and I'd love to hear what you're currently excited about in your career.

Let me know if you'd be open to a quick, no-strings conversation — I'd really value the chance to connect.

Best,
Julia from Acme`)

  const candidate = {
    name: "Clara Aurora",
    role: "Senior Fullstack Engineer",
    location: "Vienna, Austria",
    avatar: "/professional-woman-developer.png",
    companies: ["Zapier", "Microsoft"],
    skills: ["React", "Node.js", "TypeScript", "Python"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/results">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Send Email</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Candidate Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Send to:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {candidate.location}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Previous Companies:</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.companies.map((company) => (
                      <Badge key={company} variant="secondary" className="bg-blue-100 text-blue-700">
                        <Building2 className="h-3 w-3 mr-1" />
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email Composer */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Email Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject Line</label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-900">Quick chat about your next career move?</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    className="min-h-[300px] resize-none border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Write your message..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>From: julia@acme.com</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      Save Draft
                    </Button>
                    <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                      <Send className="h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Preview */}
            <Card className="mt-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="font-medium">
                        To: {candidate.name.toLowerCase().replace(" ", ".")}@email.com
                      </span>
                      <span className="text-gray-500">Now</span>
                    </div>
                    <div className="font-medium">Subject: Quick chat about your next career move?</div>
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{emailContent}</div>
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
