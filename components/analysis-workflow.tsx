"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CheckCircle2, Database, Building2, Target, Users } from "lucide-react"
import { useSearch } from "@/lib/search-context"

const analysisSteps = [
  {
    id: 1,
    title: "Talent Pool Creation",
    description: "Building comprehensive candidate database",
    icon: Database,
    detail: "Scanning 2.4M+ profiles across multiple platforms",
  },
  {
    id: 2,
    title: "Competitor Analysis",
    description: "Analyzing competitor companies",
    icon: Building2,
    detail: "Reviewing 150+ companies for similar roles",
  },
  {
    id: 3,
    title: "Ideal Profile Generation",
    description: "Creating ideal candidate profile",
    icon: Target,
    detail: "Matching requirements with market data",
  },
  {
    id: 4,
    title: "Candidate Matching",
    description: "Finding the best matches",
    icon: Users,
    detail: "Ranking candidates by fit score",
  },
]

export function AnalysisWorkflow() {
  const { getPromptText } = useSearch()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (currentStep <= analysisSteps.length && !showSuccess) {
      const timer = setTimeout(() => {
        if (currentStep < analysisSteps.length) {
          setCurrentStep(currentStep + 1)
        } else {
          setShowSuccess(true)
          setTimeout(() => {
            window.location.href = "/results"
          }, 2500)
        }
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [currentStep, showSuccess])

  const renderStepContent = () => {
    if (showSuccess) {
      return (
        <div className="w-full max-w-2xl flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-primary animate-bounce" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-foreground mt-8 animate-fade-in">Analysis Complete!</h2>
          <p className="text-muted-foreground text-lg mt-4 animate-fade-in">
            Found 47 perfect matches for your search...
          </p>
          <div className="flex gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      )
    }

    const step = analysisSteps[currentStep - 1]
    const Icon = step.icon

    return (
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-foreground mb-4">{step.title}</h2>
          <p className="text-muted-foreground text-lg">{step.description}</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
              <p className="text-foreground font-medium text-lg">{step.detail}</p>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Processing...
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-80 bg-primary text-primary-foreground p-8 flex flex-col">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground/10 mb-4">
            <div className="w-5 h-5 rounded bg-primary-foreground"></div>
          </div>
          <h1 className="text-xl font-semibold mb-2">AI Analysis in Progress</h1>
          <p className="text-primary-foreground/80 text-sm">Finding the best candidates for you</p>
        </div>

        <div className="space-y-6 flex-1">
          {analysisSteps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isActive = stepNumber === currentStep

            return (
              <div key={step.id} className="flex items-center space-x-4">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${
                      isCompleted
                        ? "bg-primary-foreground text-primary"
                        : isActive
                          ? "bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground"
                          : "bg-primary-foreground/10 text-primary-foreground/60"
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                <span
                  className={`
                    ${isCompleted || isActive ? "text-primary-foreground" : "text-primary-foreground/60"}
                  `}
                >
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20">
          <p className="text-primary-foreground/80 text-sm">{getPromptText()}</p>
        </div>
      </div>

      <div className="flex-1 p-8 flex items-center justify-center">{renderStepContent()}</div>
    </div>
  )
}
