"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import Link from "next/link"

export function RegisterForm2() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/ex3"
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Register Form */}
      <div className="w-1/2 bg-white p-12 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
            <div className="w-6 h-6 rounded-lg bg-white/20"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link href="/login2">
              <Button variant="outline" size="sm" className="rounded-lg bg-orange-500 text-white border-orange-500 hover:bg-orange-600">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Register Form */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Profile Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                <User className="w-10 h-10 text-orange-600" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-600">Enter your details to register.</p>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-3 mb-6">
              <Button variant="outline" className="flex-1 h-12 rounded-lg border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#000000">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-1.44-1.56-.65-2.53-1.12-2.12-2.12.47-.91 2.26-1.07 3.34-1.32 1.19-.28 1.9-1.16 2.11-2.12.11-.5.41-.97.41-1.53 0-.84-.28-1.17-.66-1.35-.35-.15-.78-.23-1.23-.23-.45 0-.87.08-1.23.23-.38.18-.66.51-.66 1.35 0 .56.3 1.03.41 1.53.21.96.92 1.84 2.11 2.12 1.08.25 2.87.41 3.34 1.32.41 1-1.56 1.47-2.12 2.12-1.16.48-2.15.94-3.24 1.44-1.03.48-2.1.55-3.08-.4-1.01-1.01-.96-2.07-.4-3.08.65-1.01 1.5-2.12 2.12-3.24.48-.94.96-1.9 1.44-3.24.5-1.09.96-2.08 1.44-3.24.65-1.56 1.12-2.53 2.12-2.12 1.01.47 1.07 2.26 1.32 3.34.28 1.19 1.16 1.9 2.12 2.11.5.11.97.41 1.53.41.84 0 1.17-.28 1.35-.66.15-.35.23-.78.23-1.23 0-.45-.08-.87-.23-1.23-.18-.38-.51-.66-1.35-.66-.56 0-1.03.3-1.53.41-.96.21-1.84.92-2.11 2.12-.25 1.08-.41 2.87-1.32 3.34-1 0-1.47-1.56-2.12-2.12-.48-1.16-.94-2.15-1.44-3.24-.5-1.09-.96-2.08-1.44-3.24-.65-1.56-1.12-2.53-2.12-2.12-1.01.47-1.07 2.26-1.32 3.34-.28 1.19-1.16 1.9-2.12 2.11-.5.11-.97.41-1.53.41-.84 0-1.17-.28-1.35-.66-.15-.35-.23-.78-.23-1.23 0-.45.08-.87.23-1.23.18-.38.51-.66 1.35-.66.56 0 1.03-.3 1.53-.41.96-.21 1.84-.92 2.11-2.12.25-1.08.41-2.87 1.32-3.34 1-.01 1.47 1.56 2.12 2.12.48 1.16.94 2.15 1.44 3.24.5 1.09.96 2.08 1.44 3.24.65 1.56 1.12 2.53 2.12 2.12 1.01-.47 1.07-2.26 1.32-3.34.28-1.19 1.16-1.9 2.12-2.11.5-.11.97-.41 1.53-.41.84 0 1.17.28 1.35.66.15.35.23.78.23 1.23 0 .45-.08.87-.23 1.23-.18.38-.51.66-1.35.66-.56 0-1.03-.3-1.53-.41-.96-.21-1.84-.92-2.11-2.12-.25-1.08-.41-2.87-1.32-3.34-1 .01-1.47-1.56-2.12-2.12-.48-1.16-.94-2.15-1.44-3.24-.5-1.09-.96-2.08-1.44-3.24-.65-1.56-1.12-2.53-2.12-2.12z"/>
                </svg>
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-lg border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-lg border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Button>
            </div>

            {/* OR Separator */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name*</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12 rounded-lg"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address*</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12 rounded-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password*</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 h-12 rounded-lg"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password*</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10 pr-10 h-12 rounded-lg"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 rounded-md border-gray-300 text-orange-500 focus:ring-orange-500"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-orange-500 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-orange-500 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white" size="lg">
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel - Testimonial */}
      <div className="w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-white">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-green-400 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-md text-center">
            <p className="text-2xl font-bold mb-6 leading-relaxed">
              "The Marketing Management app has revolutionized our tasks. It's efficient and user-friendly, streamlining planning to tracking."
            </p>
            <div className="mb-2">
              <p className="text-lg font-semibold">Sophia Williams</p>
            </div>
            <p className="text-sm text-white/80">CEO / Catalyst</p>
          </div>

          {/* Carousel dots */}
          <div className="absolute bottom-12 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

