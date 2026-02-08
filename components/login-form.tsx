"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/ex3"
  }

  const handleDemoLogin = () => {
    setEmail("demo@muffin.team")
    setPassword("12345")
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white p-16 flex flex-col relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
            <div className="w-7 h-7 rounded-lg bg-white"></div>
          </div>
          <h1 className="text-4xl font-semibold mb-4 leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Welcome back to
            <br />
            Muffin
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-md mb-10" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            AI-powered recruitment platform
          </p>
          
          {/* Feature Cards */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  AI-Powered Sourcing
                </h3>
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Find top talent faster with intelligent candidate discovery and matching.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Real-time Analytics
                </h3>
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Track your hiring metrics and make data-driven decisions every step of the way.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Automated Outreach
                </h3>
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Automate candidate communication and follow-ups to save time and improve response rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content - Form */}
      <div className="w-1/2 p-12 flex items-center justify-center bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-2">Sign in to your account</h2>
            <p className="text-muted-foreground">Enter your credentials to access your dashboard</p>
            
            <button
              type="button"
              onClick={handleDemoLogin}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 group"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-indigo-700">Use demo credentials</span>
              <span className="text-xs text-indigo-500 opacity-70">demo@muffin.team</span>
            </button>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign in
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>

              <div className="mt-6">
                <Separator className="my-4" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {"Don't have an account? "}
                    <Link href="/signup" className="text-primary hover:underline font-medium">
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
