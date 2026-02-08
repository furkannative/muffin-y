"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface SearchPrompt {
  companyType: string
  location: string
  teamSize: string
  role: string
  experience: string
  skills: string[]
}

interface SearchContextType {
  searchPrompt: SearchPrompt
  setSearchPrompt: (prompt: SearchPrompt) => void
  getPromptText: () => string
}

const defaultPrompt: SearchPrompt = {
  companyType: "Tech company",
  location: "Europe",
  teamSize: "50+ employees",
  role: "Frontend Developer",
  experience: "7+ years",
  skills: ["React", "TypeScript", "Figma"],
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchPrompt, setSearchPromptState] = useState<SearchPrompt>(defaultPrompt)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("searchPrompt")
    if (saved) {
      try {
        setSearchPromptState(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse saved search prompt", e)
      }
    }
  }, [])

  const setSearchPrompt = (prompt: SearchPrompt) => {
    setSearchPromptState(prompt)
    localStorage.setItem("searchPrompt", JSON.stringify(prompt))
  }

  const getPromptText = () => {
    return `${searchPrompt.role} in ${searchPrompt.location} with ${searchPrompt.experience}`
  }

  return (
    <SearchContext.Provider value={{ searchPrompt, setSearchPrompt, getPromptText }}>{children}</SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
