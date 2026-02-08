"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Zap, Users, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

export default function RegisterNewPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Register user with Supabase (email confirmation disabled)
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          // Disable email confirmation - user will be auto-confirmed
          emailRedirectTo: undefined,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setIsLoading(false)
        return
      }

      if (data.user) {
        // Welcome email endpoint is disabled
        // Email functionality temporarily disabled to prevent build issues

        setSuccess(true)
        // Wait a moment to show success message, then redirect
        setTimeout(() => {
          router.push("/add-product")
        }, 1500)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="w-1/2 bg-white p-12 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          {/* Logo */}
          <Image
            src="/catalyst.svg"
            alt="Muffin Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          {/* Login Link */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link href="/new-login">
              <Button className="rounded-lg bg-orange-500 text-white border-orange-500 hover:bg-orange-600 h-9 px-4">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Login Form Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-600">Enter your details to register.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name*</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 rounded-lg border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address*</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-lg border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password*</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-lg border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-green-600">Account created successfully! Redirecting...</p>
                </div>
              )}

              {/* Register Button */}
              <Button
                type="submit"
                disabled={isLoading || success}
                className="w-full h-12 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : success ? "Account Created!" : "Register"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel - Testimonial */}
      <div className="w-1/2 bg-gradient-to-br from-white via-orange-50 to-orange-100 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-32 right-32 w-48 h-48 bg-orange-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-32 w-56 h-56 bg-orange-200/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12">
          {/* Icons */}
          <div className="mb-8 flex items-center gap-4">
            {/* Orange Icon */}
            <div className="w-16 h-16 rounded-xl bg-white/80 backdrop-blur-sm border border-orange-200 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Image
                src="/catalyst.svg"
                alt="Default Mode"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            {/* Red Icon */}
            <div className="w-16 h-16 rounded-xl bg-white/80 backdrop-blur-sm border border-red-200 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_red_icon_reg)">
                  <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#DC2626"/>
                  <path d="M0 36.0001C6.62744 36.0001 12 30.6275 12 24.0002C12 17.3727 6.62744 12.0001 0 12.0001V20.4001C1.98821 20.4001 3.59998 22.0119 3.59998 24.0002C3.59998 25.9883 1.98821 27.6001 0 27.6001V36.0001Z" fill="url(#paint0_linear_red_icon_reg)" fillOpacity="0.72"/>
                  <path d="M40 16.0005C37.9494 15.3509 35.7657 15.0004 33.4999 15.0004C21.6258 15.0004 12 24.6263 12 36.5003C12 37.6922 12.097 38.8614 12.2834 40.0004H25.6421C25.1652 38.9312 24.9001 37.7468 24.9001 36.5003C24.9001 31.7507 28.7503 27.9003 33.4999 27.9003C36.0959 27.9003 38.4231 29.0505 40 30.869V16.0005Z" fill="url(#paint1_linear_red_icon_reg)" fillOpacity="0.88"/>
                  <path d="M2.10986 0.000366211C3.10475 9.00025 10.7349 16.0004 20 16.0004C29.265 16.0004 36.8953 9.00025 37.8901 0.000366211H25.0175C24.2228 1.99258 22.2757 3.40035 20 3.40035C17.7242 3.40035 15.7773 1.99258 14.9825 0.000366211H2.10986Z" fill="url(#paint2_linear_red_icon_reg)" fillOpacity="0.72"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_red_icon_reg" x1="5.99999" y1="12.0001" x2="5.99999" y2="48.3926" gradientUnits="userSpaceOnUse">
                    <stop offset="0.313079" stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_red_icon_reg" x1="26" y1="15.0004" x2="26" y2="52.9092" gradientUnits="userSpaceOnUse">
                    <stop offset="0.313079" stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear_red_icon_reg" x1="20" y1="0.000366211" x2="20" y2="24.2621" gradientUnits="userSpaceOnUse">
                    <stop offset="0.313079" stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <clipPath id="clip0_red_icon_reg">
                    <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            {/* Blue Icon */}
            <div className="w-16 h-16 rounded-xl bg-white/80 backdrop-blur-sm border border-blue-200 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_blue_icon_reg)">
                  <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#2563EB"/>
                  <path d="M0 36.0001C6.62744 36.0001 12 30.6275 12 24.0002C12 17.3727 6.62744 12.0001 0 12.0001V20.4001C1.98821 20.4001 3.59998 22.0119 3.59998 24.0002C3.59998 25.9883 1.98821 27.6001 0 27.6001V36.0001Z" fill="url(#paint0_linear_blue_icon_reg)" fillOpacity="0.72"/>
                  <path d="M40 16.0005C37.9494 15.3509 35.7657 15.0004 33.4999 15.0004C21.6258 15.0004 12 24.6263 12 36.5003C12 37.6922 12.097 38.8614 12.2834 40.0004H25.6421C25.1652 38.9312 24.9001 37.7468 24.9001 36.5003C24.9001 31.7507 28.7503 27.9003 33.4999 27.9003C36.0959 27.9003 38.4231 29.0505 40 30.869V16.0005Z" fill="url(#paint1_linear_blue_icon_reg)" fillOpacity="0.88"/>
                  <path d="M2.10986 0.000366211C3.10475 9.00025 10.7349 16.0004 20 16.0004C29.265 16.0004 36.8953 9.00025 37.8901 0.000366211H25.0175C24.2228 1.99258 22.2757 3.40035 20 3.40035C17.7242 3.40035 15.7773 1.99258 14.9825 0.000366211H2.10986Z" fill="url(#paint2_linear_blue_icon_reg)" fillOpacity="0.72"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_blue_icon_reg" x1="5.99999" y1="12.0001" x2="5.99999" y2="48.3926" gradientUnits="userSpaceOnUse">
                    <stop offset="0.313079" stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_blue_icon_reg" x1="26" y1="15.0004" x2="26" y2="52.9092" gradientUnits="userSpaceOnUse">
                    <stop offset="0.313079" stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear_blue_icon_reg" x1="20" y1="0.000366211" x2="20" y2="24.2621" gradientUnits="userSpaceOnUse">
                    <stop offset="0.313079" stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <clipPath id="clip0_blue_icon_reg">
                    <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          {/* Features */}
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-8 leading-tight text-gray-800">
              Why Choose Muffin?
            </h2>
            <div className="space-y-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-orange-200">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">AI-Powered Matching</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Find the perfect candidates with intelligent AI that analyzes skills, experience, and cultural fit.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-orange-200">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">Streamlined Pipeline</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Manage your entire hiring process from sourcing to onboarding in one unified platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-orange-200">
                  <Zap className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">Time-Saving Automation</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Automate repetitive tasks and focus on what matters most - building great teams.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel dots */}
          <div className="absolute bottom-12 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
            <div className="w-2 h-2 rounded-full bg-orange-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
