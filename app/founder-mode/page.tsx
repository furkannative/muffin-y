"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Search, Bell, Calendar, MessageCircle, User, ChevronDown, Archive, Rocket, Bookmark, Video, Hash, ArrowUp, Paperclip, Plus, Users, X, ZoomIn, ZoomOut, Maximize, HelpCircle, Settings, TrendingUp, LogOut, Mail, ThumbsUp, ThumbsDown, Linkedin, CheckSquare, Square, ArrowUp as ArrowUpIcon, ArrowDown, Download } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

// Stripe Employees Startups Data
const stripeStartupsData = [
  {
    url: "https://sdsa.ai",
    title: "/dev/agents",
    description: "AI software startup founded in 2024; secured $56M seed funding; led by ex-Stripe CTO David Singleton; developing a next-gen OS for AI agents with innovative UI, privacy, and developer platform; based in San Francisco, CA; 14 employees; global web presence with 4,700 monthly visits.",
    isStartup: "Yes",
    isStartupRefs: "10 ref.",
    hasStripeFounder: "Yes",
    hasStripeFounderRefs: "22 ref.",
    foundedWithin2Years: "Yes",
    foundedWithin2YearsRefs: "1 ref.",
    founderName: "David Singleton"
  },
  {
    url: "https://taxwire.com",
    title: "Taxwire.com",
    description: "Taxwire.com is a financial services startup founded in 2023, with $12.9M in seed funding as of July 2025; specializes in automating global sales tax compliance for finance and commerce teams. The founding team includes Graham Martin, a former Stripe employee, meeting criteria for a startup with Stripe alumni founders.",
    isStartup: "Yes",
    isStartupRefs: "1 ref.",
    hasStripeFounder: "Yes",
    hasStripeFounderRefs: "1 ref.",
    foundedWithin2Years: "Yes",
    foundedWithin2YearsRefs: "1 ref.",
    founderName: "Graham Martin"
  },
  {
    url: "https://payable.id",
    title: "Payable (YC S22)",
    description: "Financial services startup founded in 2022 with 2 employees and $500K seed funding led by Y Combinator; early-stage company with a founding team including a former Stripe employee, specializing in simple, secure online payments for Indonesian social media sellers.",
    isStartup: "Yes",
    isStartupRefs: "1 ref.",
    hasStripeFounder: "Yes",
    hasStripeFounderRefs: "1 ref.",
    foundedWithin2Years: "Yes",
    foundedWithin2YearsRefs: "1 ref.",
    founderName: "Daniel Yubi"
  },
  {
    url: "https://borderless.xyz",
    title: "Borderless.xyz",
    description: "Borderless.xyz is a fintech startup founded in 2024, focusing on global stablecoin orchestration and liquidity networks. It provides an API for real-time FX rates, transaction routing, and connectivity with stablecoin providers worldwide; approximately 10 employees; raised $3M in pre-seed funding led by Amity Ventures; founded by ex-Stripe executive Joe Kinvi, emphasizing its innovative approach to cross-border payments.",
    isStartup: "Yes",
    isStartupRefs: "1 ref.",
    hasStripeFounder: "Yes",
    hasStripeFounderRefs: "1 ref.",
    foundedWithin2Years: "Yes",
    foundedWithin2YearsRefs: "1 ref.",
    founderName: "Joe Kinvi"
  },
  {
    url: "https://circuitandchisel.com",
    title: "Circuit and Chisel",
    description: "AI startup founded in 2025 by former Stripe employees Louis Amira and David Noel-Romas; secured $19.2M seed funding in 2025; aims to develop infrastructure enabling AI agents to navigate web and perform commerce-related tasks, making agentic workflows accessible and reliable for developers.",
    isStartup: "Yes",
    isStartupRefs: "1 ref.",
    hasStripeFounder: "Yes",
    hasStripeFounderRefs: "1 ref.",
    foundedWithin2Years: "Yes",
    foundedWithin2YearsRefs: "1 ref.",
    founderName: "Louis Amira"
  },
  {
    url: "https://operatorsandfriends.com",
    title: "Operators & Friends",
    description: "Venture Capital and Private Equity Principals firm founded in 2024; supports early-stage companies and startup growth; 3 employees; founded in 2024; United Kingdom; founder Sam Bernstein is a former Stripe employee.",
    isStartup: "Yes",
    isStartupRefs: "1 ref.",
    hasStripeFounder: "Yes",
    hasStripeFounderRefs: "1 ref.",
    foundedWithin2Years: "Yes",
    foundedWithin2YearsRefs: "1 ref.",
    founderName: "Sam Bernstein"
  },
  {
    url: "https://goldenbasis.com",
    title: "GoldenBasis",
    description: "GoldenBasis is a fintech startup founded in 2024 with 0-10 employees, specializing in automating asset transfer processes to improve operational efficiency and client onboarding. Co-founder Andrew Wang previously worked at Stripe, adding industry expertise. The company raised a Pre‑Seed round in January 2024, confirming its early-stage status.",
    isStartup: "Yes",
    isStartupRefs: "1 ref.",
    hasStripeFounder: "Yes",
    hasStripeFounderRefs: "1 ref.",
    foundedWithin2Years: "Yes",
    foundedWithin2YearsRefs: "1 ref.",
    founderName: "Andrew Wang"
  },
  {
    url: "https://outlit.ai",
    title: "Outlit",
    description: "AI startup founded in 2024; 3 employees; Pre‑Seed funding in March 2025; Y Combinator-backed; focuses on AI workspace solutions for deal strategy, enabling rapid insight capture and deal management.",
    isStartup: "Yes",
    isStartupRefs: "1 ref.",
    hasStripeFounder: "Yes",
    hasStripeFounderRefs: "1 ref.",
    foundedWithin2Years: "Yes",
    foundedWithin2YearsRefs: "1 ref.",
    founderName: "Josh Earle"
  },
  {
    url: "https://seapoint.co",
    title: "Seapoint",
    description: "Early-stage startup founded in 2024; provides a financial management platform for startups, integrating invoice payments, expenses, payroll, and reporting; led by CEO Sean Mullaney, a former Stripe European CIO; small team of 8 employees; recently raised pre-seed funding.",
    isStartup: "Yes",
    isStartupRefs: "1 ref.",
    hasStripeFounder: "Yes",
    hasStripeFounderRefs: "1 ref.",
    foundedWithin2Years: "Yes",
    foundedWithin2YearsRefs: "1 ref.",
    founderName: "Sean Mullaney"
  }
]

// Bay Area Software Engineers Data
const bayAreaData = [
  {
    url: "https://x.com/tonilopezmr/status/1980316231212363913",
    author: "tonilopezmr",
    content: "Toni Lopez is seeking new opportunities after departing from AWS as a Site Reliability Engineer on the East Coast. They are now available for work and open to exploring new roles.",
    likes: 0,
    followers: "1.605",
    publishedDate: "2025-10-20",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/mikhlin/status/1985377687624634495",
    author: "mikhlin",
    content: "Artem Mikhlin is facilitating connections for a Director of IT and Security role, offering introductions to interested candidates. The position is open to remote workers or those located in the Bay Area.",
    likes: 0,
    followers: "2.751",
    publishedDate: "2025-11-03",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "5 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "5г"
  },
  {
    url: "https://x.com/darthur/status/1988721675224093001",
    author: "darthur",
    content: "Darthur is currently seeking new job opportunities that involve travel. They've linked a profile showcasing their skills and experience.",
    likes: 0,
    followers: "65.074",
    publishedDate: "2025-11-12",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/aycasels/status/1993286802304905576",
    author: "aycasels",
    content: "The job search can be incredibly frustrating when you find a seemingly ideal position, only to discover it requires relocation to a specific, often inconvenient, location. It's a cycle of hope and disappointment for remote workers with location restrictions.",
    likes: 0,
    followers: "-",
    publishedDate: "2025-11-25",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/typeclonghouse/status/1988422430302650389",
    author: "typeclonghouse",
    content: "This individual, who works as a Federal Special Agent specializing in metaverse trends, is actively seeking a challenging tech role in the San Francisco Bay Area. They're presenting themselves as a capable candidate ready for a new opportunity.",
    likes: 0,
    followers: "-",
    publishedDate: "2025-11-12",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/AkritiKeswani/status/1981547487979852145",
    author: "AkritiKeswani",
    content: "Akriti is seeking DevRel (Developer Relations) roles for individuals located in the San Francisco Bay Area or New York City. She's encouraging interested candidates to reach out directly.",
    likes: 0,
    followers: "-",
    publishedDate: "2025-10-24",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/Adib_Hanna/status/1978587876234260718",
    author: "Adib_Hanna",
    content: "Adib Hanna is seeking new senior engineering roles starting in January, specifically focusing on backend technologies like Go, Node, and Laravel (excluding Web3/crypto). He encourages sharing his post to help broaden his search.",
    likes: 0,
    followers: "-",
    publishedDate: "2025-10-15",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/IbrahimS15/status/1983799555243307284",
    author: "IbrahimS15",
    content: "The image displays a LeetCode progress tracker showing he's attempted 3730 problems with 181 solved, highlighting his struggles with the platform. He's expressing frustration that his engineering value shouldn't be determined by his LeetCode performance and is shifting his focus towards creating tangible projects to seek a better career opportunity.",
    likes: 0,
    followers: "-",
    publishedDate: "2025-10-30",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/vasuman/status/1994094520867410349",
    author: "vasuman",
    content: "After a relentless 12-year journey involving overcoming educational hurdles and navigating the competitive tech landscape, this individual finally secured a founding engineer interview at an AI company. Their story highlights the perseverance required to break into the AI field, even amidst layoffs and intense preparation.",
    likes: 0,
    followers: "-",
    publishedDate: "2025-11-27",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/DesireeCachette/status/1984336139218714717",
    author: "DesireeCachette",
    content: "The image shows Désirée introducing herself as a technical marketing professional seeking collaborations with Open Source Software startups in the San Francisco area. She's presenting a casual, approachable image of herself while highlighting her background and skills to attract potential partners.",
    likes: 0,
    followers: "-",
    publishedDate: "2025-10-31",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/Mochak123/status/1995189030565376195",
    author: "Mochak123",
    content: "Mocha is actively seeking employment in Palo Alto and is highlighting her extensive qualifications, including multiple degrees and fluency in five languages. She's essentially putting out a direct request for job opportunities.",
    likes: 9,
    followers: "-",
    publishedDate: "2025-11-30",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  },
  {
    url: "https://x.com/waynesutton/status/1993403346938745057",
    author: "waynesutton",
    content: "The tweet highlights a need for a skilled full-stack developer proficient in technologies like TypeScript and various JavaScript frameworks, as evidenced by the extensive skill set displayed in the accompanying graphic. Wayne Sutton is actively seeking qualified candidates for contract work and has connections to potentially suitable individuals.",
    likes: 0,
    followers: "-",
    publishedDate: "2025-11-25",
    bayAreaCriterion: "Yes",
    bayAreaReasoning: "1 ref.",
    seekingCriterion: "Yes",
    seekingReasoning: "1г"
  }
]

// CSV Data - Parsed from the CSV file
const csvData = [
  { url: "https://abc.xyz", title: "Alphabet Inc.", description: "Alphabet Inc. is a publicly traded holding company in the technology sector with 331 employees (+46.0% YoY growth), $371.4B annual revenue, and a market cap of $1723B; it operates in software, AI, cloud services, and cybersecurity. The company has offices in San Francisco at 121 and 345 Spear St, confirmed by recent expansion activities. In 2025, Alphabet announced layoffs across its subsidiaries, including Google and Verily, supported by credible public reports. Founded in 2015 and headquartered in Mountain View, California, Alphabet is a major player in the global tech industry.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 10, sfOffice: "Yes", sfOfficeRefs: 46, employeesAffected: 20000 },
  { url: "https://ubisoft.com", title: "Ubisoft Montréal", description: "Ubisoft Montréal is a private computer games company with 2,077 employees, founded in 1997 and based in Canada; it is the world's largest video game development studio, known for franchises like Assassin's Creed and Rainbow Six. The company has offices in San Francisco at 300 Mission Street and 625 3rd Street. Ubisoft Montréal publicly announced layoffs in 2025, including site closures and staff redundancies. It operates in the technology sector, leveraging advanced tech stacks such as TensorFlow and Kubernetes for innovative game development and technological progress.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 28, sfOffice: "Yes", sfOfficeRefs: 63, employeesAffected: 779 },
  { url: "https://gupshup.io", title: "Webaroo", description: "Private IT & Services company with 73 employees and $100M-$200M revenue; based in Fremont, CA, with a San Francisco office at 415 Jackson Street; announced layoffs in 2025 affecting 200-300 staff; specializes in enterprise messaging, SMS, voice, USSD, AI, and developer APIs; serves over 500 brands and 25,000 businesses, supporting 2.1 billion mobile interactions monthly.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 5, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 300 },
  { url: "https://onsemi.com", title: "onsemi", description: "onsemi is a private semiconductor manufacturing company headquartered in Scottsdale, Arizona, with 7,081 employees (+4.8% YoY growth), $6.4B annual revenue, and a $31.8B market cap. It has a San Francisco office as evidenced by SEC filings and publicly announced workforce reductions of approximately 2,400 employees in 2025. The company focuses on automotive and industrial markets, driving innovations in vehicle electrification, safety, sustainable energy, industrial automation, and 5G infrastructure.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 2400 },
  { url: "https://about.google", title: "Google AI for Developers", description: "Google AI for Developers is a private technology, information, and internet company with $10B+ annual revenue and no listed employees; it operates in the tech sector with confirmed offices in San Francisco and announced layoffs in 2025 involving thousands of roles. The company focuses on AI, developer tools, and internet services, emphasizing its role in advancing technology and software development.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 12000 },
  { url: "https://gupshup.ai", title: "Gupshup", description: "Private IT services and consulting company specializing in conversational AI and chatbot solutions; 1,158 employees, $300M revenue, headquartered in San Francisco, founded in 2004; publicly announced layoffs in April 2025 involving 300 employees; operates in AI, software, and IT services with a focus on conversational tools, AI-powered chatbots, and voice AI.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 100 },
  { url: "https://hpe.com", title: "Hewlett Packard Enterprise", description: "Hewlett Packard Enterprise is a global IT services and consulting company providing edge-to-cloud, enterprise compute, data, and security solutions; 83,457 employees, $30.1B revenue, $25.8B market cap, headquartered in Houston, TX, with a San Francisco office. In 2025, announced layoffs of approximately 2,500 jobs.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 2500 },
  { url: "https://stem.com", title: "Stem, Inc.", description: "Publicly traded software development company specializing in AI-enabled clean energy solutions; has a San Francisco office and publicly announced layoffs in 2025; focuses on energy asset optimization, renewable energy, and AI-driven energy management.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 112 },
  { url: "https://squareup.com", title: "Square", description: "Square is a private software development company providing business solutions to diversify revenue streams, streamline operations, and manage staff; 4,123 employees (-0.3% YoY), $6.0B revenue, headquartered in San Francisco, CA, with confirmed San Francisco office, and 42M monthly website visits. Recent layoffs in 2025 confirmed by public reports.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 954 },
  { url: "https://zendesk.com", title: "Local Measure", description: "Local Measure is a private software development company specializing in contact center and customer engagement software; with 17 employees (-46.6% YoY growth), $2.0B-$5.0B revenue, founded in 2014, headquartered in Australia, and has raised $3.4M in funding. It serves industries such as retail, financial services, travel, and public sector, and is now part of Zendesk, which maintains a San Francisco office at 181 Fremont St. Zendesk publicly announced layoffs in 2025, with credible reports citing 51 job cuts at SF HQ supported by official filings. The company operates in the technology sector, offering cloud-based SaaS solutions for customer service and engagement.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 51 },
  { url: "https://sonos.com", title: "Sonos, Inc.", description: "Wireless home sound system and smart speaker company; $1.4B annual revenue, 1,816 employees, and a $1.7B market cap; publicly announced 12% layoffs in early 2025; operates in the technology sector with a focus on hardware and software integration for home entertainment.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 200 },
  { url: "https://turo.com", title: "Turo", description: "Turo is a private technology company operating a peer-to-peer car rental marketplace; it has a San Francisco headquarters, publicly announced layoffs in 2025, and a tech-driven business model. Key attributes include 1,186 employees (+6.9% YoY growth), $879.6M annual revenue, and recent acquisition of Kyte Systems Inc. The company is active in the transportation and automotive software sectors, with a global presence and significant market position (#3564 worldwide).", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 150 },
  { url: "https://tidal.com", title: "TIDAL", description: "TIDAL is a private music streaming platform founded in 1998 and headquartered in New York, NY; employs 120 staff with a 15.2% YoY decline; generates $200M annual revenue; has received $8.8M in funding; maintains an office in San Francisco; publicly announced layoffs in 2025; operates in the technology sector as a high-fidelity audio/video streaming service available in over 60 countries.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 86 },
  { url: "https://huggingface.co", title: "Hugging Face", description: "AI community platform and software development company specializing in machine learning, natural language processing, and deep learning; 267 employees (+41.3% YoY growth), $50M revenue, $395.2M funding, founded 2016; publicly announced 4% layoffs in 2025; has an office in San Francisco at Salesforce Tower; known for fostering collaboration on models, datasets, and applications.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 10 },
  { url: "https://illumina.com", title: "Illumina", description: "Biotechnology research company specializing in next-generation sequencing technology, hardware, reagents, and software; 6,684 employees (+1.1% YoY growth), $4.3B annual revenue, $23.3B market cap; has offices in San Diego and San Francisco, with recent layoffs in 2025 as part of cost reduction; founded in 1998, publicly traded, and a leader in genetic analysis solutions.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 396 },
  { url: "https://mozilla.org", title: "Mozilla", description: "Private software development company specializing in internet and browser technologies; 1,253 employees (-2.2% YoY), $620M annual revenue, founded 2005, headquartered in San Francisco, CA. Has $2.3M in funding, publicly announced layoffs in 2025, and operates in the technology sector with a global web rank of #1,685 and 37.3M monthly visits.", techSector: "Yes", techSectorRefs: 1, layoffs2025: "Yes", layoffs2025Refs: 1, sfOffice: "Yes", sfOfficeRefs: 1, employeesAffected: 527 }
]

export default function FounderModePage() {
  const router = useRouter()
  const [companyType, setCompanyType] = useState("Tech")
  const [location, setLocation] = useState("Berlin")
  const [companySize, setCompanySize] = useState("50+")
  const [jobTitle, setJobTitle] = useState("Frontend Developer")
  const [experience, setExperience] = useState("3+")
  const [skills, setSkills] = useState("React, TypeScript, Figma")
  const [isOrgChartOpen, setIsOrgChartOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isUsageOpen, setIsUsageOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("Current")
  const [activeTab, setActiveTab] = useState("ats")
  const [activeModules, setActiveModules] = useState({
    ats: true,
    salary: true,
    interview: true,
    orgChart: false
  })
  const [draggedPerson, setDraggedPerson] = useState<{ name: string; role: string } | null>(null)
  const [showSimilarSearch, setShowSimilarSearch] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeUsageTab, setActiveUsageTab] = useState('plans')
  const [activeSettingsTab, setActiveSettingsTab] = useState('general')
  const [activeNotificationTab, setActiveNotificationTab] = useState('all')
  const [showPromptView, setShowPromptView] = useState(false)
  const [activeViewTab, setActiveViewTab] = useState('sets') // sets, monitor, list
  const [isCatalystMenuOpen, setIsCatalystMenuOpen] = useState(false)
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [tableSortField, setTableSortField] = useState<string | null>(null)
  const [tableSortDirection, setTableSortDirection] = useState<"asc" | "desc">("desc")
  const itemsPerPage = 10
  const [activeSets, setActiveSets] = useState<{[key: string]: boolean}>({})
  const catalystMenuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (catalystMenuRef.current && !catalystMenuRef.current.contains(event.target as Node)) {
        setIsCatalystMenuOpen(false)
      }
    }

    if (isCatalystMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCatalystMenuOpen])

  return (
    <div className="relative" style={{ minHeight: '100vh' }}>
      {/* Background with nature image effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-200 via-green-100 to-yellow-100" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5f3e5' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        {/* Additional blur effect */}
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>

      {/* Top Section */}
      <div className="relative pt-8 px-6" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-12">
          {/* Left - Logo */}
          <div className="flex items-center gap-3 relative" ref={catalystMenuRef}>
            <div className="flex items-center gap-3">
              {/* Blue Icon - Selected on this page */}
              <button
                onClick={() => router.push('/founder-mode')}
                className="flex items-center"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_founder_selected)">
                    <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#2563EB"/>
                    <path d="M0 36.0001C6.62744 36.0001 12 30.6275 12 24.0002C12 17.3727 6.62744 12.0001 0 12.0001V20.4001C1.98821 20.4001 3.59998 22.0119 3.59998 24.0002C3.59998 25.9883 1.98821 27.6001 0 27.6001V36.0001Z" fill="url(#paint0_linear_founder_selected)" fillOpacity="0.72"/>
                    <path d="M40 16.0005C37.9494 15.3509 35.7657 15.0004 33.4999 15.0004C21.6258 15.0004 12 24.6263 12 36.5003C12 37.6922 12.097 38.8614 12.2834 40.0004H25.6421C25.1652 38.9312 24.9001 37.7468 24.9001 36.5003C24.9001 31.7507 28.7503 27.9003 33.4999 27.9003C36.0959 27.9003 38.4231 29.0505 40 30.869V16.0005Z" fill="url(#paint1_linear_founder_selected)" fillOpacity="0.88"/>
                    <path d="M2.10986 0.000366211C3.10475 9.00025 10.7349 16.0004 20 16.0004C29.265 16.0004 36.8953 9.00025 37.8901 0.000366211H25.0175C24.2228 1.99258 22.2757 3.40035 20 3.40035C17.7242 3.40035 15.7773 1.99258 14.9825 0.000366211H2.10986Z" fill="url(#paint2_linear_founder_selected)" fillOpacity="0.72"/>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_founder_selected" x1="5.99999" y1="12.0001" x2="5.99999" y2="48.3926" gradientUnits="userSpaceOnUse">
                      <stop offset="0.313079" stopColor="white"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_founder_selected" x1="26" y1="15.0004" x2="26" y2="52.9092" gradientUnits="userSpaceOnUse">
                      <stop offset="0.313079" stopColor="white"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_founder_selected" x1="20" y1="0.000366211" x2="20" y2="24.2621" gradientUnits="userSpaceOnUse">
                      <stop offset="0.313079" stopColor="white"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    <clipPath id="clip0_founder_selected">
                      <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              {/* Catalyst Expand Button */}
              <button
                onClick={() => setIsCatalystMenuOpen(!isCatalystMenuOpen)}
                className="flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCatalystMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Right Panel - Opens when clicked */}
            {isCatalystMenuOpen && (
              <div 
                className="absolute left-full top-0 ml-4 bg-white rounded-lg shadow-xl border border-gray-200 py-3 min-w-[240px] z-50 transition-all duration-200"
              >
                <div className="overflow-y-auto max-h-[400px]">
                  {/* Orange/Default Mode */}
                  <button
                    onClick={() => {
                      setIsCatalystMenuOpen(false)
                      router.push('/ex3')
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/catalyst.svg"
                        alt="Default Mode"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">Default Mode</div>
                      <div className="text-xs text-gray-500 mt-0.5">Marketing & Sales</div>
                    </div>
                  </button>
                  
                  {/* Founder Mode - Selected */}
                  <button
                    onClick={() => {
                      setIsCatalystMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left bg-blue-50"
                  >
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_founder)">
                          <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#2563EB"/>
                          <path d="M0 36.0001C6.62744 36.0001 12 30.6275 12 24.0002C12 17.3727 6.62744 12.0001 0 12.0001V20.4001C1.98821 20.4001 3.59998 22.0119 3.59998 24.0002C3.59998 25.9883 1.98821 27.6001 0 27.6001V36.0001Z" fill="url(#paint0_linear_founder)" fillOpacity="0.72"/>
                          <path d="M40 16.0005C37.9494 15.3509 35.7657 15.0004 33.4999 15.0004C21.6258 15.0004 12 24.6263 12 36.5003C12 37.6922 12.097 38.8614 12.2834 40.0004H25.6421C25.1652 38.9312 24.9001 37.7468 24.9001 36.5003C24.9001 31.7507 28.7503 27.9003 33.4999 27.9003C36.0959 27.9003 38.4231 29.0505 40 30.869V16.0005Z" fill="url(#paint1_linear_founder)" fillOpacity="0.88"/>
                          <path d="M2.10986 0.000366211C3.10475 9.00025 10.7349 16.0004 20 16.0004C29.265 16.0004 36.8953 9.00025 37.8901 0.000366211H25.0175C24.2228 1.99258 22.2757 3.40035 20 3.40035C17.7242 3.40035 15.7773 1.99258 14.9825 0.000366211H2.10986Z" fill="url(#paint2_linear_founder)" fillOpacity="0.72"/>
                        </g>
                        <defs>
                          <linearGradient id="paint0_linear_founder" x1="5.99999" y1="12.0001" x2="5.99999" y2="48.3926" gradientUnits="userSpaceOnUse">
                            <stop offset="0.313079" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                          </linearGradient>
                          <linearGradient id="paint1_linear_founder" x1="26" y1="15.0004" x2="26" y2="52.9092" gradientUnits="userSpaceOnUse">
                            <stop offset="0.313079" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                          </linearGradient>
                          <linearGradient id="paint2_linear_founder" x1="20" y1="0.000366211" x2="20" y2="24.2621" gradientUnits="userSpaceOnUse">
                            <stop offset="0.313079" stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                          </linearGradient>
                          <clipPath id="clip0_founder">
                            <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">Founder Mode</div>
                      <div className="text-xs text-gray-500 mt-0.5">Startup Growth</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={() => setIsUsageOpen(true)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gray-600" />
              </button>
              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
              >
                <User className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="relative px-6 pb-8" style={{ position: 'relative', zIndex: 1 }}>
        <Card className="bg-white shadow-xl rounded-2xl border-0">
          <CardContent className="p-8">
            {/* Jobs Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Jobs</h2>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveViewTab('sets')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeViewTab === 'sets'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sets
              </button>
              <button
                onClick={() => setActiveViewTab('monitor')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeViewTab === 'monitor'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monitor
              </button>
              <button
                onClick={() => setActiveViewTab('list')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeViewTab === 'list'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 ml-auto">
                <span className="text-sm text-gray-700">View</span>
                <Switch 
                  checked={showPromptView}
                  onCheckedChange={setShowPromptView}
                />
              </div>
            </div>

            {/* Content based on active tab */}
            {activeViewTab === 'sets' && (
              <div className="space-y-8">
                {/* Category 1: Similar Career Paths */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Similar Career Paths</h3>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5">Coming Soon</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        company: "Oracle",
                        layoffDate: "01/15/2025",
                        totalAffected: 500,
                        teams: ["Engineering", "Product", "Sales"],
                        availableRoles: ["Senior Software Engineer", "Product Manager", "Sales Director"],
                        talentCount: 124,
                        status: "Published",
                        color: "green",
                        location: "San Francisco",
                        field: "Tech"
                      },
                      {
                        company: "Unity",
                        layoffDate: "01/20/2025",
                        totalAffected: 1800,
                        teams: ["Engineering", "Design", "Marketing"],
                        availableRoles: ["Full Stack Developer", "UX Designer", "Marketing Manager"],
                        talentCount: 342,
                        status: "In Progress",
                        color: "blue",
                        location: "Berlin",
                        field: "Gaming"
                      },
                      {
                        company: "Bumble",
                        layoffDate: "01/10/2025",
                        totalAffected: 350,
                        teams: ["Engineering", "Data", "Operations"],
                        availableRoles: ["Backend Engineer", "Data Scientist", "Operations Lead"],
                        talentCount: 89,
                        status: "Published",
                        color: "pink",
                        location: "Austin",
                        field: "Social Tech"
                      }
                    ].map((job, index) => {
                const colorClasses = {
                  green: 'bg-green-50 border-green-200',
                  blue: 'bg-blue-50 border-blue-200',
                  pink: 'bg-pink-50 border-pink-200',
                  yellow: 'bg-yellow-50 border-yellow-200',
                  purple: 'bg-purple-50 border-purple-200',
                  indigo: 'bg-indigo-50 border-indigo-200',
                  orange: 'bg-orange-50 border-orange-200',
                  teal: 'bg-teal-50 border-teal-200',
                  red: 'bg-red-50 border-red-200'
                }
                const borderClasses = {
                  green: 'border-green-200',
                  blue: 'border-blue-200',
                  pink: 'border-pink-200',
                  yellow: 'border-yellow-200',
                  purple: 'border-purple-200',
                  indigo: 'border-indigo-200',
                  orange: 'border-orange-200',
                  teal: 'border-teal-200',
                  red: 'border-red-200'
                }
                return (
                  <Card key={index} className={`${colorClasses[job.color as keyof typeof colorClasses]} shadow-sm hover:shadow-md transition-shadow border-gray-100`}>
                    <CardContent className="px-6 pt-4 pb-6">
                      {/* Header */}
                      <div className="px-4 py-2.5 rounded-lg mb-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-normal text-gray-900">Similar Profiles in {job.location} - {job.field}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">Active</span>
                            <Switch 
                              checked={activeSets[`similar-${index}`] ?? false}
                              onCheckedChange={(checked) => setActiveSets(prev => ({ ...prev, [`similar-${index}`]: checked }))}
                            />
                          </div>
                        </div>
                        <div className={`mt-3 border-b ${borderClasses[job.color as keyof typeof borderClasses]}`}></div>
                      </div>

                      <div className="bg-white rounded-lg p-4 -mx-2">
                      {!showPromptView ? (
                        /* Prompt Format - Similar Career Paths için özel format */
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2 items-center text-sm text-gray-700">
                            <span>In</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md cursor-default pointer-events-none">
                              {job.location}
                            </Badge>
                            <span>in</span>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-md cursor-default pointer-events-none">
                              {job.field}
                            </Badge>
                            <span>field can start a startup with</span>
                            {job.availableRoles.map((role, i) => (
                              <Badge key={i} variant="secondary" className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-md cursor-default pointer-events-none">
                                {role}
                              </Badge>
                            ))}
                            <span>skills, similar profiles.</span>
                          </div>
                        </div>
                      ) : (
                        /* Normal Format */
                        <>
                          {/* Layoff Date and Total Affected */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <label className="text-xs text-gray-500">Layoff Date</label>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-900">{job.layoffDate}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs text-gray-500">Total Affected</label>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-900">{job.totalAffected.toLocaleString()} people</span>
                              </div>
                            </div>
                          </div>

                          {/* Related Teams */}
                          <div className="space-y-2 mb-4">
                            <label className="text-xs text-gray-500">Related Teams</label>
                            <div className="flex flex-wrap gap-2">
                              {job.teams.map((team, i) => {
                                const teamColorClasses: {[key: string]: string} = {
                                  green: 'bg-green-100 text-green-800',
                                  blue: 'bg-blue-100 text-blue-800',
                                  pink: 'bg-pink-100 text-pink-800',
                                  yellow: 'bg-yellow-100 text-yellow-800',
                                  purple: 'bg-purple-100 text-purple-800',
                                  indigo: 'bg-indigo-100 text-indigo-800',
                                  orange: 'bg-orange-100 text-orange-800',
                                  teal: 'bg-teal-100 text-teal-800',
                                  red: 'bg-red-100 text-red-800'
                                }
                                return (
                                  <Badge key={i} variant="secondary" className={`${teamColorClasses[job.color]} text-xs`}>
                                    {team}
                                  </Badge>
                                )
                              })}
                            </div>
                          </div>

                          {/* Available Roles */}
                          <div className="space-y-2 mb-4">
                            <label className="text-xs text-gray-500">Available Roles</label>
                            <div className="space-y-1">
                              {job.availableRoles.map((role, i) => {
                                const iconColorClasses: {[key: string]: string} = {
                                  green: 'text-green-500',
                                  blue: 'text-blue-500',
                                  pink: 'text-pink-500',
                                  yellow: 'text-yellow-500',
                                  purple: 'text-purple-500',
                                  indigo: 'text-indigo-500',
                                  orange: 'text-orange-500',
                                  teal: 'text-teal-500',
                                  red: 'text-red-500'
                                }
                                return (
                                  <div key={i} className="flex items-center gap-2 text-sm text-gray-900">
                                    <Rocket className={`w-3 h-3 ${iconColorClasses[job.color]}`} />
                                    <span>{role}</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </>
                      )}
                      </div>
                    </CardContent>
                  </Card>
                    )
                  })}
                  </div>
                </div>

                {/* Category 2: Left to Start Business */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Left to Start Business</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        company: "Fiverr",
                        layoffDate: "12/20/2024",
                        totalAffected: 200,
                        teams: ["Marketing", "Sales", "Support"],
                        availableRoles: ["Marketing Manager", "Sales Executive", "Customer Success"],
                        talentCount: 65,
                        status: "Published",
                        color: "yellow",
                        startups: [
                          { name: "TaskRabbit", founded: "2020", focus: "Marketplace" },
                          { name: "Upwork", founded: "2019", focus: "Freelance Platform" }
                        ]
                      },
                      {
                        company: "Meta",
                        layoffDate: "01/05/2025",
                        totalAffected: 1200,
                        teams: ["Data Science", "AI", "Research"],
                        availableRoles: ["Data Scientist", "ML Engineer", "Research Scientist"],
                        talentCount: 280,
                        status: "Published",
                        color: "purple",
                        startups: [
                          { name: "Anthropic", founded: "2021", focus: "AI Safety" },
                          { name: "Cohere", founded: "2022", focus: "NLP Platform" }
                        ]
                      },
                      {
                        company: "Google",
                        layoffDate: "12/15/2024",
                        totalAffected: 800,
                        teams: ["Operations", "Finance", "HR"],
                        availableRoles: ["Operations Manager", "Financial Analyst", "HR Business Partner"],
                        talentCount: 195,
                        status: "Published",
                        color: "indigo",
                        startups: [
                          { name: "Vercel", founded: "2016", focus: "Web Infrastructure" },
                          { name: "Linear", founded: "2019", focus: "Productivity Tools" }
                        ]
                      }
                    ].map((job, index) => {
                      const colorClasses = {
                        green: 'bg-green-50 border-green-200',
                        blue: 'bg-blue-50 border-blue-200',
                        pink: 'bg-pink-50 border-pink-200',
                        yellow: 'bg-yellow-50 border-yellow-200',
                        purple: 'bg-purple-50 border-purple-200',
                        indigo: 'bg-indigo-50 border-indigo-200',
                        orange: 'bg-orange-50 border-orange-200',
                        teal: 'bg-teal-50 border-teal-200',
                        red: 'bg-red-50 border-red-200'
                      }
                      const borderClasses = {
                        green: 'border-green-200',
                        blue: 'border-blue-200',
                        pink: 'border-pink-200',
                        yellow: 'border-yellow-200',
                        purple: 'border-purple-200',
                        indigo: 'border-indigo-200',
                        orange: 'border-orange-200',
                        teal: 'border-teal-200',
                        red: 'border-red-200'
                      }
                      return (
                        <Card key={index} className={`${colorClasses[job.color as keyof typeof colorClasses]} shadow-sm hover:shadow-md transition-shadow border-gray-100`}>
                          <CardContent className="px-6 pt-4 pb-6">
                            {/* Header */}
                            <div className="px-4 py-2.5 rounded-lg mb-6">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-normal text-gray-900">Startups Founded by {job.company} Employees</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-600">Active</span>
                                  <Switch 
                                    checked={activeSets[`startup-${index}`] ?? false}
                                    onCheckedChange={(checked) => setActiveSets(prev => ({ ...prev, [`startup-${index}`]: checked }))}
                                  />
                                </div>
                              </div>
                              <div className={`mt-3 border-b ${borderClasses[job.color as keyof typeof borderClasses]}`}></div>
                            </div>

                            <div className="bg-white rounded-lg p-4 -mx-2">
                            {!showPromptView ? (
                              /* Prompt Format - Left to Start Business için özel format */
                              <div className="space-y-3">
                                <div className="text-sm text-gray-700">
                                  <span className="font-medium">Companies:</span>
                                  <span className="ml-1">startups founded by</span>
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md cursor-default pointer-events-none mx-1">
                                    {job.company}
                                  </Badge>
                                  <span>employees</span>
                                </div>
                                <div className="space-y-2 mt-3">
                                  {job.startups?.map((startup, i) => (
                                    <div key={i} className="flex flex-wrap gap-2 items-center text-xs text-gray-600">
                                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-md cursor-default pointer-events-none">
                                        {startup.name}
                                      </Badge>
                                      <span className="text-gray-500">({startup.founded})</span>
                                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-md cursor-default pointer-events-none">
                                        {startup.focus}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              /* Normal Format */
                              <>
                                {/* Layoff Date and Total Affected */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-2">
                                    <label className="text-xs text-gray-500">Layoff Date</label>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-gray-500" />
                                      <span className="text-sm text-gray-900">{job.layoffDate}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xs text-gray-500">Total Affected</label>
                                    <div className="flex items-center gap-2">
                                      <Users className="w-4 h-4 text-gray-500" />
                                      <span className="text-sm text-gray-900">{job.totalAffected.toLocaleString()} people</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Related Teams */}
                                <div className="space-y-2 mb-4">
                                  <label className="text-xs text-gray-500">Related Teams</label>
                                  <div className="flex flex-wrap gap-2">
                                    {job.teams.map((team, i) => {
                                      const teamColorClasses: {[key: string]: string} = {
                                        green: 'bg-green-100 text-green-800',
                                        blue: 'bg-blue-100 text-blue-800',
                                        pink: 'bg-pink-100 text-pink-800',
                                        yellow: 'bg-yellow-100 text-yellow-800',
                                        purple: 'bg-purple-100 text-purple-800',
                                        indigo: 'bg-indigo-100 text-indigo-800',
                                        orange: 'bg-orange-100 text-orange-800',
                                        teal: 'bg-teal-100 text-teal-800',
                                        red: 'bg-red-100 text-red-800'
                                      }
                                      return (
                                        <Badge key={i} variant="secondary" className={`${teamColorClasses[job.color]} text-xs`}>
                                          {team}
                                        </Badge>
                                      )
                                    })}
                                  </div>
                                </div>

                                {/* Available Roles */}
                                <div className="space-y-2 mb-4">
                                  <label className="text-xs text-gray-500">Available Roles</label>
                                  <div className="space-y-1">
                                    {job.availableRoles.map((role, i) => {
                                      const iconColorClasses: {[key: string]: string} = {
                                        green: 'text-green-500',
                                        blue: 'text-blue-500',
                                        pink: 'text-pink-500',
                                        yellow: 'text-yellow-500',
                                        purple: 'text-purple-500',
                                        indigo: 'text-indigo-500',
                                        orange: 'text-orange-500',
                                        teal: 'text-teal-500',
                                        red: 'text-red-500'
                                      }
                                      return (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-900">
                                          <Rocket className={`w-3 h-3 ${iconColorClasses[job.color]}`} />
                                          <span>{role}</span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              </>
                            )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* Category 3: Seeking New Opportunities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Seeking New Opportunities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        company: "Amazon",
                        layoffDate: "01/12/2025",
                        totalAffected: 600,
                        teams: ["Design", "Product", "Engineering"],
                        availableRoles: ["UI Designer", "Product Manager", "Software Engineer"],
                        talentCount: 150,
                        status: "Published",
                        color: "orange",
                        postCount: 342,
                        location: "Bay Area",
                        roleType: "software engineers",
                        timeframe: "past 3 months",
                        details: "open to work"
                      },
                      {
                        company: "Microsoft",
                        layoffDate: "12/28/2024",
                        totalAffected: 450,
                        teams: ["Engineering", "Cloud", "Security"],
                        availableRoles: ["Cloud Engineer", "Security Engineer", "DevOps Engineer"],
                        talentCount: 112,
                        status: "Published",
                        color: "teal",
                        postCount: 218,
                        location: "Seattle",
                        roleType: "cloud engineers",
                        timeframe: "past 2 months",
                        details: "actively seeking"
                      },
                      {
                        company: "Apple",
                        layoffDate: "01/08/2025",
                        totalAffected: 300,
                        teams: ["Product", "Design", "Hardware"],
                        availableRoles: ["Product Manager", "Industrial Designer", "Hardware Engineer"],
                        talentCount: 75,
                        status: "Published",
                        color: "red",
                        postCount: 156,
                        location: "Cupertino",
                        roleType: "product managers",
                        timeframe: "past 4 months",
                        details: "open to opportunities"
                      }
                    ].map((job, index) => {
                      const colorClasses = {
                        green: 'bg-green-50 border-green-200',
                        blue: 'bg-blue-50 border-blue-200',
                        pink: 'bg-pink-50 border-pink-200',
                        yellow: 'bg-yellow-50 border-yellow-200',
                        purple: 'bg-purple-50 border-purple-200',
                        indigo: 'bg-indigo-50 border-indigo-200',
                        orange: 'bg-orange-50 border-orange-200',
                        teal: 'bg-teal-50 border-teal-200',
                        red: 'bg-red-50 border-red-200'
                      }
                      const borderClasses = {
                        green: 'border-green-200',
                        blue: 'border-blue-200',
                        pink: 'border-pink-200',
                        yellow: 'border-yellow-200',
                        purple: 'border-purple-200',
                        indigo: 'border-indigo-200',
                        orange: 'border-orange-200',
                        teal: 'border-teal-200',
                        red: 'border-red-200'
                      }
                      return (
                        <Card key={index} className={`${colorClasses[job.color as keyof typeof colorClasses]} shadow-sm hover:shadow-md transition-shadow border-gray-100`}>
                          <CardContent className="px-6 pt-4 pb-6">
                            {/* Header */}
                            <div className="px-4 py-2.5 rounded-lg mb-6">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-normal text-gray-900">{job.location} {job.roleType} - {job.timeframe}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-600">Active</span>
                                  <Switch 
                                    checked={activeSets[`opportunity-${index}`] ?? false}
                                    onCheckedChange={(checked) => setActiveSets(prev => ({ ...prev, [`opportunity-${index}`]: checked }))}
                                  />
                                </div>
                              </div>
                              <div className={`mt-3 border-b ${borderClasses[job.color as keyof typeof borderClasses]}`}></div>
                            </div>

                            <div className="bg-white rounded-lg p-4 -mx-2">
                            {!showPromptView ? (
                              /* Prompt Format - Seeking New Opportunities için özel format */
                              <div className="space-y-3">
                                <div className="text-sm text-gray-700">
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md cursor-default pointer-events-none mr-1">
                                    {job.postCount} Posts
                                  </Badge>
                                  <span>:</span>
                                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-md cursor-default pointer-events-none mx-1">
                                    {job.location}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md cursor-default pointer-events-none mx-1">
                                    {job.roleType}
                                  </Badge>
                                  <span>seeking new roles</span>
                                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-md cursor-default pointer-events-none mx-1">
                                    {job.timeframe}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-2 items-center text-xs text-gray-600 mt-2">
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-md cursor-default pointer-events-none">
                                    {job.details}
                                  </Badge>
                                </div>
                              </div>
                            ) : (
                              /* Normal Format */
                              <>
                                {/* Layoff Date and Total Affected */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-2">
                                    <label className="text-xs text-gray-500">Layoff Date</label>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-gray-500" />
                                      <span className="text-sm text-gray-900">{job.layoffDate}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xs text-gray-500">Total Affected</label>
                                    <div className="flex items-center gap-2">
                                      <Users className="w-4 h-4 text-gray-500" />
                                      <span className="text-sm text-gray-900">{job.totalAffected.toLocaleString()} people</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Related Teams */}
                                <div className="space-y-2 mb-4">
                                  <label className="text-xs text-gray-500">Related Teams</label>
                                  <div className="flex flex-wrap gap-2">
                                    {job.teams.map((team, i) => {
                                      const teamColorClasses: {[key: string]: string} = {
                                        green: 'bg-green-100 text-green-800',
                                        blue: 'bg-blue-100 text-blue-800',
                                        pink: 'bg-pink-100 text-pink-800',
                                        yellow: 'bg-yellow-100 text-yellow-800',
                                        purple: 'bg-purple-100 text-purple-800',
                                        indigo: 'bg-indigo-100 text-indigo-800',
                                        orange: 'bg-orange-100 text-orange-800',
                                        teal: 'bg-teal-100 text-teal-800',
                                        red: 'bg-red-100 text-red-800'
                                      }
                                      return (
                                        <Badge key={i} variant="secondary" className={`${teamColorClasses[job.color]} text-xs`}>
                                          {team}
                                        </Badge>
                                      )
                                    })}
                                  </div>
                                </div>

                                {/* Available Roles */}
                                <div className="space-y-2 mb-4">
                                  <label className="text-xs text-gray-500">Available Roles</label>
                                  <div className="space-y-1">
                                    {job.availableRoles.map((role, i) => {
                                      const iconColorClasses: {[key: string]: string} = {
                                        green: 'text-green-500',
                                        blue: 'text-blue-500',
                                        pink: 'text-pink-500',
                                        yellow: 'text-yellow-500',
                                        purple: 'text-purple-500',
                                        indigo: 'text-indigo-500',
                                        orange: 'text-orange-500',
                                        teal: 'text-teal-500',
                                        red: 'text-red-500'
                                      }
                                      return (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-900">
                                          <Rocket className={`w-3 h-3 ${iconColorClasses[job.color]}`} />
                                          <span>{role}</span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              </>
                            )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeViewTab === 'monitor' && (
              <div className="space-y-4">
                {/* Header with filters */}
                <div className="flex items-center justify-between mb-6">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="In this stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      <SelectItem value="sourced">Sourced</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="shortlist">Shortlist</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-1 max-w-md mx-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Find email or name..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="default" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Save Filter
                    </Button>
                  </div>
                </div>

                {/* Table */}
                <div className="border rounded-lg overflow-hidden">
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
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th 
                          className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-700"
                          onClick={() => {
                            if (tableSortField === "match") {
                              setTableSortDirection(tableSortDirection === "asc" ? "desc" : "asc")
                            } else {
                              setTableSortField("match")
                              setTableSortDirection("desc")
                            }
                          }}
                        >
                          <div className="flex items-center gap-1">
                            Match
                            {tableSortField === "match" && (tableSortDirection === "asc" ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
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
                      {[
                        { id: 1, name: "Sarah Johnson", jobTitle: "Product Manager, TechCorp" },
                        { id: 2, name: "Michael Chen", jobTitle: "Senior Product Manager" },
                        { id: 3, name: "Emily Davis", jobTitle: "Product Lead" },
                        { id: 4, name: "David Wilson", jobTitle: "Associate Product Manager" },
                        { id: 5, name: "Jessica Brown", jobTitle: "Product Manager, Startup" },
                        { id: 6, name: "Robert Taylor", jobTitle: "Digital Product Manager" },
                        { id: 7, name: "Amanda Martinez", jobTitle: "Senior PM | Product | Tech" },
                        { id: 8, name: "Christopher Lee", jobTitle: "Portfolio Product Manager" },
                        { id: 9, name: "Nicole Anderson", jobTitle: "Product and Business Dev" },
                        { id: 10, name: "Kevin Garcia", jobTitle: "BMW Digital Product & Cust" },
                      ]
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((candidate, index) => {
                          const candidateId = candidate.id
                          const isSelected = selectedCandidates.includes(candidateId)
                          const globalIndex = (currentPage - 1) * itemsPerPage + index
                          
                          // Generate random data for evaluation columns
                          const marketingScore = globalIndex < 5 ? "gray" : "green"
                          const managementScore = globalIndex < 3 ? "gray" : globalIndex < 5 ? "green" : globalIndex < 7 ? "yellow" : "green"
                          const fintechScore = globalIndex === 0 
                            ? "green" 
                            : (globalIndex % 4 === 0 || globalIndex % 7 === 0) 
                              ? "yellow" 
                              : "green"
                          const multinationalScore = "green"
                          
                          // Match percentage - first 5 are 100%, next 5 are 85%, rest are 77%
                          const matchPercentage = globalIndex < 5 ? 100 : globalIndex < 10 ? 85 : 77
                          
                          return (
                            <tr 
                              key={candidate.id} 
                              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-center">
                                  <button
                                    onClick={() => {
                                      setSelectedCandidates(prev => 
                                        prev.includes(candidateId) 
                                          ? prev.filter(id => id !== candidateId)
                                          : [...prev, candidateId]
                                      )
                                    }}
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
                                  <Linkedin className="w-4 h-4 text-blue-600" />
                                  {(globalIndex === 1 || globalIndex === 2 || globalIndex === 7) && (
                                    <X className="w-4 h-4 text-gray-600" />
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <p className="text-sm text-gray-700">{candidate.jobTitle}</p>
                              </td>
                              <td className="py-4 px-4">
                                {(() => {
                                  const statusType = globalIndex % 3
                                  if (statusType === 0) {
                                    return (
                                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                        Open to work
                                      </Badge>
                                    )
                                  } else if (statusType === 1) {
                                    return (
                                      <Badge className="bg-gray-100 text-gray-600 border-gray-200 text-xs">
                                        Bildirim yok
                                      </Badge>
                                    )
                                  } else {
                                    return (
                                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                                        New company
                                      </Badge>
                                    )
                                  }
                                })()}
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
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 px-4 pb-4">
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
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === 3}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeViewTab === 'list' && (
              <div className="space-y-8">
                {/* Bay Area Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bay Area software engineers - past 3 months</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">#</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Handle</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">URL</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Likes</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Followers</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">X Post Is Auth...</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">X Post Indicat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bayAreaData.map((post, index) => {
                        const handle = post.author || ''
                        const isMatchAuth = post.bayAreaCriterion === 'Yes'
                        const isMatchSeeking = post.seekingCriterion === 'Yes'
                        const refCountAuth = post.bayAreaReasoning?.match(/\d+ ref/i)?.[0] || '1 ref.'
                        const refCountSeeking = post.seekingReasoning?.match(/\d+г/i)?.[0] || '1г'
                        
                        return (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                                  <span className="text-white text-[10px] font-bold">X</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">@{handle}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-sm text-gray-600 line-clamp-2 max-w-md">{post.content || ''}</p>
                            </td>
                            <td className="py-4 px-4">
                              <a 
                                href={post.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {post.url}
                              </a>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">
                              {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">
                              {post.likes || '-'}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">
                              {post.followers || '-'}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded ${isMatchAuth ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                  {isMatchAuth ? 'Match' : 'Unclear'}
                                </span>
                                <span className="text-xs text-gray-500">{refCountAuth}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded ${isMatchSeeking ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                  {isMatchSeeking ? 'Match' : 'Unclear'}
                                </span>
                                <span className="text-xs text-gray-500">{refCountSeeking}</span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                </div>

                {/* Stripe Startups Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Companies: startups founded by Stripe employees</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="w-4 h-4" />
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">#</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                            <div className="flex items-center gap-2">
                              <span>Name</span>
                              <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-3 h-3 border border-gray-400"></div>
                              </div>
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                            <div className="flex items-center gap-2">
                              <span>Description</span>
                              <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-3 h-3 border border-gray-400"></div>
                              </div>
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                            <div className="flex items-center gap-2">
                              <span>URL</span>
                              <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-3 h-3 border border-gray-400"></div>
                              </div>
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-purple-500 rounded"></div>
                              <span>Company Is A...</span>
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-orange-500 rounded"></div>
                              <span>At Least One ...</span>
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-blue-500 rounded"></div>
                              <span>Must Be Foun...</span>
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                            <div className="flex items-center gap-2">
                              <span>Founder Name</span>
                              <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-3 h-3 border border-gray-400"></div>
                              </div>
                              <span className="text-gray-400">+</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stripeStartupsData.map((company, index) => {
                          const firstLetter = company.title.charAt(0).toUpperCase()
                          const domain = company.url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
                          const logoUrl = `https://logo.clearbit.com/${domain}?size=128`
                          const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
                          const simpleFaviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`
                          
                          return (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4">
                                <div className="flex items-center justify-center">
                                  <input type="checkbox" className="w-4 h-4" />
                                </div>
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-6 h-6 flex-shrink-0">
                                    <img
                                      src={logoUrl}
                                      alt={`${company.title} logo`}
                                      className="w-6 h-6 rounded object-cover border border-gray-200"
                                      loading="lazy"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        if (target.src.includes('clearbit.com')) {
                                          target.src = faviconUrl
                                        } else if (target.src.includes('google.com')) {
                                          target.src = simpleFaviconUrl
                                        } else {
                                          target.style.display = 'none'
                                          const fallback = target.nextElementSibling as HTMLElement
                                          if (fallback) fallback.style.display = 'flex'
                                        }
                                      }}
                                    />
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold absolute inset-0 hidden">
                                      {firstLetter}
                                    </div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">{company.title}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <p className="text-sm text-gray-600 line-clamp-2 max-w-md">{company.description}</p>
                              </td>
                              <td className="py-4 px-4">
                                <a 
                                  href={company.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {domain}
                                </a>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 text-xs rounded ${company.isStartup === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                    {company.isStartup === 'Yes' ? 'Match' : 'Unclear'}
                                  </span>
                                  <span className="text-xs text-gray-500">{company.isStartupRefs}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 text-xs rounded ${company.hasStripeFounder === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                    {company.hasStripeFounder === 'Yes' ? 'Match' : 'Unclear'}
                                  </span>
                                  <span className="text-xs text-gray-500">{company.hasStripeFounderRefs}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 text-xs rounded ${company.foundedWithin2Years === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                    {company.foundedWithin2Years === 'Yes' ? 'Match' : 'Unclear'}
                                  </span>
                                  <span className="text-xs text-gray-500">{company.foundedWithin2YearsRefs}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                {company.founderName === 'Josh Earle' ? (
                                  <a 
                                    href="https://linkedin.com/in/joshearle" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-900 hover:text-gray-700"
                                  >
                                    {company.founderName}
                                  </a>
                                ) : (
                                  <span className="text-sm text-gray-900">{company.founderName || '-'}</span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Org Chart Modal */}
      <Dialog open={isOrgChartOpen} onOpenChange={setIsOrgChartOpen}>
        <DialogContent 
          className="w-[95vw] h-[100vh] max-w-none p-0 fixed right-0 top-0 translate-x-0 translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right rounded-l-2xl border-l border-gray-200" 
          style={{ 
            right: 0, 
            left: 'auto',
            margin: 0,
            transform: 'none',
            width: '50vw',
            maxWidth: 'none',
            minWidth: '50vw'
          }}
        >
          <DialogHeader className="p-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOrgChartOpen(false)}
                  className="w-8 h-8 p-0 rounded-full hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-800">FinTech Growth Planner</DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">Plan and visualize your organization's growth</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Growth Projection */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm font-medium text-gray-700">Growth Projection:</span>
              <div className="flex gap-2">
                {["Current", "6 Months", "1 Year", "3 Years"].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={selectedTimeframe === timeframe ? "bg-gray-800 text-white" : ""}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
          </DialogHeader>

          {/* Org Chart Content */}
          <div className="flex-1 p-4 pt-4 overflow-auto">
            <div className="relative min-h-[400px] bg-gray-50 rounded-lg p-4">
              {/* Interactive Org Chart Nodes */}
              <div className="relative w-full h-full min-h-[500px]">
                {/* CEO Node */}
                <div 
                  className="absolute bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg cursor-move select-none hover:bg-blue-700 transition-colors"
                  style={{ left: '50%', top: '20px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM CEO');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'ceo');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Patricia Holm', role: 'CEO' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="text-lg font-bold">Patricia Holm</div>
                  <div className="text-sm opacity-90">CEO</div>
                </div>

                {/* C-Level Nodes */}
                <div 
                  className="absolute bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg cursor-move select-none hover:bg-blue-700 transition-colors"
                  style={{ left: '25%', top: '150px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM CTO');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'cto');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Samantha Creek', role: 'CTO' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="text-lg font-bold">Samantha Creek</div>
                  <div className="text-sm opacity-90">CTO</div>
                </div>

                <div 
                  className="absolute bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg cursor-move select-none hover:bg-blue-700 transition-colors"
                  style={{ left: '75%', top: '150px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM CFO');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'cfo');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Daniel Louis', role: 'CFO' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="text-lg font-bold">Daniel Louis</div>
                  <div className="text-sm opacity-90">CFO</div>
                </div>

                {/* Samantha's Team Nodes */}
                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '15%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM DEVELOPER');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'dev1');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Edward Scott', role: 'Developer' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Edward Scott</div>
                  <div className="text-sm text-gray-600">Developer</div>
                </div>

                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '35%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM DESIGNER');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'designer');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Jane Frida', role: 'Designer' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Jane Frida</div>
                  <div className="text-sm text-gray-600">Designer</div>
                </div>

                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '55%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM MANAGER');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'manager');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Tia Freeman', role: 'Manager' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Tia Freeman</div>
                  <div className="text-sm text-gray-600">Manager</div>
                </div>

                {/* Daniel's Team Nodes */}
                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '65%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM ANALYST');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'analyst');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Hugh Tran', role: 'Analyst' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Hugh Tran</div>
                  <div className="text-sm text-gray-600">Analyst</div>
                </div>

                <div 
                  className="absolute bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg cursor-move select-none hover:bg-gray-50 transition-colors"
                  style={{ left: '85%', top: '280px', transform: 'translateX(-50%)' }}
                  draggable
                  onDragStart={(e) => {
                    console.log('🚀 DRAG STARTED FROM SPECIALIST');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', 'specialist');
                  }}
                  onClick={() => {
                    setDraggedPerson({ name: 'Richard Johansson', role: 'Specialist' });
                    setShowSimilarSearch(true);
                    setIsOrgChartOpen(false);
                  }}
                >
                  <div className="font-bold">Richard Johansson</div>
                  <div className="text-sm text-gray-600">Specialist</div>
                </div>
              </div>

              {/* Dynamic Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                {/* CEO to C-Level */}
                <line x1="50%" y1="100" x2="50%" y2="140" stroke="#3B82F6" strokeWidth="4" />
                <line x1="25%" y1="140" x2="75%" y2="140" stroke="#3B82F6" strokeWidth="4" />
                <line x1="25%" y1="140" x2="25%" y2="180" stroke="#3B82F6" strokeWidth="4" />
                <line x1="75%" y1="140" x2="75%" y2="180" stroke="#3B82F6" strokeWidth="4" />
                
                {/* C-Level to Teams */}
                <line x1="25%" y1="220" x2="25%" y2="260" stroke="#3B82F6" strokeWidth="4" />
                <line x1="15%" y1="260" x2="55%" y2="260" stroke="#3B82F6" strokeWidth="4" />
                <line x1="15%" y1="260" x2="15%" y2="300" stroke="#3B82F6" strokeWidth="4" />
                <line x1="35%" y1="260" x2="35%" y2="300" stroke="#3B82F6" strokeWidth="4" />
                <line x1="55%" y1="260" x2="55%" y2="300" stroke="#3B82F6" strokeWidth="4" />
                
                <line x1="75%" y1="220" x2="75%" y2="260" stroke="#3B82F6" strokeWidth="4" />
                <line x1="65%" y1="260" x2="85%" y2="260" stroke="#3B82F6" strokeWidth="4" />
                <line x1="65%" y1="260" x2="65%" y2="300" stroke="#3B82F6" strokeWidth="4" />
                <line x1="85%" y1="260" x2="85%" y2="300" stroke="#3B82F6" strokeWidth="4" />
              </svg>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Departments</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">9 departments</Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="w-[92vw] max-w-[92vw] h-[85vh] overflow-hidden p-0" style={{ maxWidth: '92vw', height: '85vh' }}>
          <div className="flex h-full max-h-[85vh]">
            {/* Left Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">SETTINGS</h4>
                  <div className="space-y-1">
                    <div 
                      onClick={() => setActiveSettingsTab('general')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSettingsTab === 'general' ? 'bg-white border border-gray-300' : 'hover:bg-gray-100'}`}
                    >
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className={`text-sm ${activeSettingsTab === 'general' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>General</span>
                    </div>
                    <div 
                      onClick={() => setActiveSettingsTab('notifications')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeSettingsTab === 'notifications' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    >
                      <Bell className="w-5 h-5 text-gray-600" />
                      <span className={`text-sm ${activeSettingsTab === 'notifications' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>Notifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto p-8" style={{ maxHeight: '85vh' }}>
              <div className="space-y-6">
                {activeSettingsTab === 'general' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">General Settings</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        Manage your workspace settings and preferences here.
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Workspace Settings */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Workspace Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Workspace Name</label>
                            <Input placeholder="My Muffin" className="mt-1" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Timezone</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                              <option>Europe/Istanbul</option>
                              <option>America/New_York</option>
                              <option>Asia/Tokyo</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Workspace URL</label>
                            <Input placeholder="muffin-workspace" className="mt-1" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Privacy & Security */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                            </svg>
                            Privacy & Security
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Button variant="outline" className="w-full">Change Password</Button>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                              <p className="text-xs text-gray-500">Add an extra layer of security</p>
                            </div>
                            <Button size="sm" variant="outline">Enable</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Session Management</p>
                              <p className="text-xs text-gray-500">Manage active sessions</p>
                            </div>
                            <Button size="sm" variant="outline">Manage</Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Appearance */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                              </svg>
                            </div>
                            Appearance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Theme</p>
                              <p className="text-xs text-gray-500">Light mode</p>
                            </div>
                            <Button size="sm" variant="outline">Change</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Language</p>
                              <p className="text-xs text-gray-500">English</p>
                            </div>
                            <Button size="sm" variant="outline">Change</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Additional spacing for scroll */}
                    <div className="pb-20"></div>
                  </>
                )}

                {activeSettingsTab === 'notifications' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Notification Settings</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        Configure how and when you receive notifications.
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Email Notifications */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Email Notifications
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                              <p className="text-xs text-gray-500">Receive email updates</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Candidate Matches</p>
                              <p className="text-xs text-gray-500">Get notified when new candidates match</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Search Complete</p>
                              <p className="text-xs text-gray-500">Notifications when searches finish</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Weekly Summary</p>
                              <p className="text-xs text-gray-500">Weekly activity report</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Push Notifications */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Push Notifications
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Browser Notifications</p>
                              <p className="text-xs text-gray-500">Receive browser push notifications</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Desktop Notifications</p>
                              <p className="text-xs text-gray-500">Desktop app notifications</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Notification Preferences */}
                      <Card className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Notification Preferences
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Quiet Hours</label>
                            <div className="flex items-center gap-4">
                              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                                <option>9:00 PM</option>
                                <option>10:00 PM</option>
                                <option>11:00 PM</option>
                              </select>
                              <span className="text-sm text-gray-600">to</span>
                              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                                <option>8:00 AM</option>
                                <option>9:00 AM</option>
                                <option>10:00 AM</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Mute All Notifications</p>
                              <p className="text-xs text-gray-500">Temporarily disable all notifications</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Additional spacing for scroll */}
                    <div className="pb-20"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Usage Modal */}
      <Dialog open={isUsageOpen} onOpenChange={setIsUsageOpen}>
        <DialogContent className="w-[92vw] max-w-[92vw] h-[85vh] overflow-hidden p-0" style={{ maxWidth: '92vw', height: '85vh' }}>
          <div className="flex h-full max-h-[85vh]">
            {/* Left Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">WORKSPACE</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-100 cursor-pointer">
                      <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">My Muffin</span>
                    </div>
                    <div 
                      onClick={() => setActiveUsageTab('people')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeUsageTab === 'people' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    >
                      <Users className="w-5 h-5 text-gray-600" />
                      <span className={`text-sm ${activeUsageTab === 'people' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>People</span>
                    </div>
                    <div 
                      onClick={() => setActiveUsageTab('plans')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeUsageTab === 'plans' ? 'bg-white border border-gray-300' : 'hover:bg-gray-100'}`}
                    >
                      <Bookmark className="w-5 h-5 text-gray-600" />
                      <span className={`text-sm ${activeUsageTab === 'plans' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>Plans & credits</span>
                    </div>
                    <div 
                      onClick={() => setActiveUsageTab('status')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeUsageTab === 'status' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                      </div>
                      <span className={`text-sm ${activeUsageTab === 'status' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>Status</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto p-8" style={{ maxHeight: '85vh' }}>
              <div className="space-y-6">
                {activeUsageTab === 'plans' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Plans & credits</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        You're currently on plan: <strong>Free</strong>. <span className="underline cursor-pointer">Manage your payment preferences</span> and <span className="underline cursor-pointer">view past invoices</span>, or change your plan below.
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                  {/* Pro Plan */}
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                      <p className="text-sm text-gray-600 mb-4">Designed for fast-moving teams building together in real time.</p>
                      <div className="text-5xl font-bold text-gray-900 mb-4">$25</div>
                      <p className="text-sm text-gray-500 mb-4">per month</p>
                      <p className="text-xs text-gray-500 mb-6">shared across unlimited users</p>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-sm text-gray-600">Monthly</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 w-12 relative">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-sm text-gray-600">Annual</span>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">Upgrade</Button>
                      <div className="border border-gray-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-700">
                          <span>100 credits / month</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mb-3">All features in Free, plus:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <div className="flex-1">
                            <span>100 monthly credits</span>
                            <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>5 daily credits (up to 150/month)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Business Plan */}
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
                      <p className="text-sm text-gray-600 mb-4">Advanced controls and power features for growing departments</p>
                      <div className="text-5xl font-bold text-gray-900 mb-4">$50</div>
                      <p className="text-sm text-gray-500 mb-4">per month</p>
                      <p className="text-xs text-gray-500 mb-6">shared across unlimited users</p>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-sm text-gray-600">Monthly</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 w-12 relative">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-sm text-gray-600">Annual</span>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">Upgrade</Button>
                      <div className="border border-gray-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-700">
                          <span>100 credits / month</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mb-3">All features in Pro, plus:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <div className="flex-1">
                            <span>100 monthly credits</span>
                            <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>SSO</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Enterprise Plan */}
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                      <p className="text-sm text-gray-600 mb-4">Built for large orgs needing flexibility, scale, and governance.</p>
                      <div className="mb-4">
                        <div className="text-sm text-gray-700 mb-2">Flexible billing</div>
                        <div className="text-sm text-gray-700 mb-4">Custom plans</div>
                      </div>
                      <Button variant="outline" className="w-full mb-4">Book a demo</Button>
                      <div className="text-xs text-gray-600 mb-3">All features in Business, plus:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>Dedicated support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>Onboarding services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>Custom connections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600">✓</span>
                          <span>Group-based access control</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                    </div>
                  </>
                )}

                {activeUsageTab === 'status' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Status</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        Track your current usage and monitor your account status. <strong>Free plan</strong> includes 100 monthly credits.
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Monthly Usage */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Usage</h3>
                          <p className="text-sm text-gray-600 mb-4">Your monthly credit consumption and remaining balance.</p>
                          <div className="text-5xl font-bold text-gray-900 mb-4">73</div>
                          <p className="text-sm text-gray-500 mb-4">of 100 credits used</p>
                          <p className="text-xs text-gray-500 mb-6">27 credits remaining this month</p>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Used</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-blue-600 rounded-full" style={{ width: '73%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">100</span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">View Details</Button>
                          <div className="border border-gray-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-700">
                              <span>Next reset: Dec 1, 2025</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Current usage includes:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <div className="flex-1">
                                <span>51 candidate searches</span>
                                <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>22 AI analysis requests</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Daily Usage */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Daily Usage</h3>
                          <p className="text-sm text-gray-600 mb-4">Track your daily credit consumption and limits.</p>
                          <div className="text-5xl font-bold text-gray-900 mb-4">3</div>
                          <p className="text-sm text-gray-500 mb-4">of 5 credits used today</p>
                          <p className="text-xs text-gray-500 mb-6">2 credits remaining today</p>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Used</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-purple-600 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">5</span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">View Details</Button>
                          <div className="border border-gray-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-700">
                              <span>Resets in: 14h 32m</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Today's activity:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <div className="flex-1">
                                <span>3 searches performed</span>
                                <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>2 candidates found</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* AI Requests */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Requests</h3>
                          <p className="text-sm text-gray-600 mb-4">Monthly AI analysis and processing requests.</p>
                          <div className="mb-4">
                            <div className="text-sm text-gray-700 mb-2">1,247 requests</div>
                            <div className="text-sm text-gray-700 mb-4">this month</div>
                          </div>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Used</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-green-600 rounded-full" style={{ width: '83%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">83%</span>
                          </div>
                          <Button variant="outline" className="w-full mb-4">View Analytics</Button>
                          <div className="text-xs text-gray-600 mb-3">Request summary:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Avg: 42 requests/day</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Peak: 68 requests/day</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Candidate analysis: 892</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Search queries: 355</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                {activeUsageTab === 'people' && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">People</h1>
                      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                        Manage your team members and their permissions. <strong>You have 8 active members</strong> in your workspace.
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Team Members */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Team Members</h3>
                          <p className="text-sm text-gray-600 mb-4">Active team members and their roles in your workspace.</p>
                          <div className="text-5xl font-bold text-gray-900 mb-4">8</div>
                          <p className="text-sm text-gray-500 mb-4">active members</p>
                          <p className="text-xs text-gray-500 mb-6">2 pending invitations</p>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Active</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">10</span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">Invite Member</Button>
                          <div className="border border-gray-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-700">
                              <span>Last active: 2 hours ago</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Member roles include:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <div className="flex-1">
                                <span>3 Admins</span>
                                <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>5 Members</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Permissions */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Permissions</h3>
                          <p className="text-sm text-gray-600 mb-4">Access levels and permission settings for your team.</p>
                          <div className="text-5xl font-bold text-gray-900 mb-4">12</div>
                          <p className="text-sm text-gray-500 mb-4">active permissions</p>
                          <p className="text-xs text-gray-500 mb-6">across 3 role types</p>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Configured</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-purple-600 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">16</span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">Manage Permissions</Button>
                          <div className="border border-gray-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-700">
                              <span>Last updated: 1 day ago</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Permission types:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <div className="flex-1">
                                <span>Full access: 3 users</span>
                                <HelpCircle className="w-3 h-3 inline ml-1 text-gray-400" />
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Limited access: 5 users</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Workspace Access */}
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Workspace Access</h3>
                          <p className="text-sm text-gray-600 mb-4">Members with access to different workspace areas.</p>
                          <div className="mb-4">
                            <div className="text-sm text-gray-700 mb-2">8 members</div>
                            <div className="text-sm text-gray-700 mb-4">have workspace access</div>
                          </div>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm text-gray-600">Active</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                              <div className="absolute left-0 top-0 h-2 bg-green-600 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">90%</span>
                          </div>
                          <Button variant="outline" className="w-full mb-4">View Members</Button>
                          <div className="text-xs text-gray-600 mb-3">Access summary:</div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Projects: 8 members</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Candidates: 6 members</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Analytics: 3 members</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-600">✓</span>
                              <span>Settings: 3 members</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Overlays */}
      {(isNotificationOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsNotificationOpen(false)
            setIsProfileOpen(false)
          }}
        />
      )}

      {/* Notification Panel */}
      {isNotificationOpen && (
        <div className="fixed top-20 right-6 w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-[600px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                Mark all as read
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center px-4 border-b border-gray-200">
            <button 
              onClick={() => setActiveNotificationTab('all')}
              className={`px-4 py-3 text-sm font-medium relative ${activeNotificationTab === 'all' ? 'border-b-2 border-purple-600 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveNotificationTab('applications')}
              className={`px-4 py-3 text-sm relative ${activeNotificationTab === 'applications' ? 'border-b-2 border-purple-600 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Applications
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">3</span>
              </span>
            </button>
            <button 
              onClick={() => setActiveNotificationTab('interviews')}
              className={`px-4 py-3 text-sm ${activeNotificationTab === 'interviews' ? 'border-b-2 border-purple-600 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Interviews
            </button>
            <button 
              onClick={() => setActiveNotificationTab('analysis')}
              className={`px-4 py-3 text-sm ${activeNotificationTab === 'analysis' ? 'border-b-2 border-purple-600 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Analysis
            </button>
            <div className="ml-auto">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Notifications Content */}
          <div className="overflow-y-auto flex-1">
            <div className="p-4 space-y-4">
              {/* All Tab - Show all notifications */}
              {activeNotificationTab === 'all' && (
                <>
                  {/* Notification 1 - Application */}
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          New candidate applied for <span className="font-semibold">Full Stack Web Dev</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">8 min ago</span>
                          <span className="text-purple-500 text-xs">📋</span>
                          <span className="text-xs text-purple-600">Sahibinden Project</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                            Shortlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification 2 - Interview */}
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Interview scheduled with <span className="font-semibold">Sarah Johnson</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">2 hours ago</span>
                          <span className="text-orange-500 text-xs">📅</span>
                          <span className="text-xs text-orange-600">Tomorrow, 2:00 PM</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Details
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                            Join Meeting
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification 3 - Analysis */}
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <Search className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Analysis completed for <span className="font-semibold">Flutter Developer</span> search
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">3 hours ago</span>
                          <span className="text-blue-500 text-xs">✅</span>
                          <span className="text-xs text-blue-600">224 candidates found</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <Search className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">View Results</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification 4 - Email */}
                  <div className="relative pb-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Email sent to <span className="font-semibold">Michael Chen</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">2 days ago</span>
                          <span className="text-green-500 text-xs">✉️</span>
                          <span className="text-xs text-green-600">Data Engineer Role</span>
                        </div>
                        <div className="mt-3 px-3 py-2 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">Subject: Interview Invitation - Data Engineer Position</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Applications Tab */}
              {activeNotificationTab === 'applications' && (
                <>
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          New candidate applied for <span className="font-semibold">Full Stack Web Dev</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">8 min ago</span>
                          <span className="text-purple-500 text-xs">📋</span>
                          <span className="text-xs text-purple-600">Sahibinden Project</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                            Shortlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">Alex Martinez</span> applied for <span className="font-semibold">Flutter Developer</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">1 hour ago</span>
                          <span className="text-blue-500 text-xs">📋</span>
                          <span className="text-xs text-blue-600">Mobile Team Project</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View Profile
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">Emily Rodriguez</span> submitted application for <span className="font-semibold">Data Engineer</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">3 hours ago</span>
                          <span className="text-pink-500 text-xs">📋</span>
                          <span className="text-xs text-pink-600">Big Data & Analytics</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View CV
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-pink-600 rounded-lg hover:bg-pink-700">
                            Schedule Interview
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Interviews Tab */}
              {activeNotificationTab === 'interviews' && (
                <>
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Interview scheduled with <span className="font-semibold">Sarah Johnson</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">2 hours ago</span>
                          <span className="text-orange-500 text-xs">📅</span>
                          <span className="text-xs text-orange-600">Tomorrow, 2:00 PM</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Details
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                            Join Meeting
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Interview reminder: <span className="font-semibold">David Kim</span> in 30 minutes
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">5 hours ago</span>
                          <span className="text-red-500 text-xs">⏰</span>
                          <span className="text-xs text-red-600">Today, 3:30 PM</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Reschedule
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">
                            Prepare
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">Lisa Anderson</span> completed technical interview
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">1 day ago</span>
                          <span className="text-green-500 text-xs">✅</span>
                          <span className="text-xs text-green-600">Frontend Developer Role</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            View Feedback
                          </button>
                          <button className="px-3 py-1.5 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700">
                            Next Step
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Analysis Tab */}
              {activeNotificationTab === 'analysis' && (
                <>
                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <Search className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Analysis completed for <span className="font-semibold">Flutter Developer</span> search
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">3 hours ago</span>
                          <span className="text-blue-500 text-xs">✅</span>
                          <span className="text-xs text-blue-600">224 candidates found</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <Search className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">View Results</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <Search className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Candidate search in progress for <span className="font-semibold">Full Stack Web Dev</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">1 day ago</span>
                          <span className="text-purple-500 text-xs">🔄</span>
                          <span className="text-xs text-purple-600">Scanning 3,200 profiles...</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">65%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pb-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                          <Search className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">Data Engineer</span> analysis found <span className="font-semibold">156 top matches</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">2 days ago</span>
                          <span className="text-teal-500 text-xs">✨</span>
                          <span className="text-xs text-teal-600">Big Data & Analytics Project</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <Search className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">View Best Matches</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
            <span className="text-xs text-gray-500">Use →I to navigate</span>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Manage Notification</span>
            </button>
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="fixed top-20 right-6 w-[240px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
          <div className="p-2">
            <button
              onClick={() => {
                window.location.href = "/signup"
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 text-gray-600" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
