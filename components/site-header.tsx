"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import LotusLogo from "@/components/lotus-logo"
import { ChevronDown, Sparkles, Activity, Rocket } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function SiteHeader() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFeaturesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="pointer-events-none sticky top-4 z-50 w-full px-4">
      <div className="pointer-events-auto mx-auto relative flex h-14 max-w-7xl items-center rounded-full border border-border/50 bg-background/95 px-6 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        {/* Left: Logo */}
        <Link href="/" className="group flex items-center gap-2 text-foreground no-underline hover:no-underline">
          <LotusLogo className="h-5 w-6 text-foreground transition-colors" aria-hidden="true" />
          <span className="text-2xl font-logo font-normal tracking-tight text-foreground">Rankly</span>
        </Link>

        {/* Middle: Navigation Links - Centered */}
        <nav aria-label="Primary" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
          <Link href="/about" className="text-sm font-normal text-foreground no-underline hover:no-underline">
            About Us
          </Link>
          
          {/* Features Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              className="flex items-center gap-1 text-sm font-normal text-foreground no-underline hover:no-underline"
            >
              Features
              <ChevronDown className="h-3 w-3" />
            </button>
            
            {isFeaturesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <Link
                    href="/features/answer-engine-analytics"
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors no-underline hover:no-underline"
                    onClick={() => setIsFeaturesOpen(false)}
                  >
                    <Sparkles className="h-5 w-5 text-foreground" />
                    <div>
                      <div className="font-medium text-sm">Answer Engine Analytics</div>
                      <div className="text-xs text-muted-foreground">Track visibility across AI search engines</div>
                    </div>
                  </Link>
                  
                  <Link
                    href="/features/traffic-analytics"
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors no-underline hover:no-underline"
                    onClick={() => setIsFeaturesOpen(false)}
                  >
                    <Activity className="h-5 w-5 text-foreground" />
                    <div>
                      <div className="font-medium text-sm">Traffic Analytics</div>
                      <div className="text-xs text-muted-foreground">Monitor traffic patterns and sources</div>
                    </div>
                  </Link>
                  
                  <Link
                    href="/features/actionables"
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors no-underline hover:no-underline"
                    onClick={() => setIsFeaturesOpen(false)}
                  >
                    <Rocket className="h-5 w-5 text-foreground" />
                    <div>
                      <div className="font-medium text-sm">Actionables</div>
                      <div className="text-xs text-muted-foreground">Get actionable insights and recommendations</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link href="/blogs" className="text-sm font-normal text-foreground no-underline hover:no-underline">
            Blogs
          </Link>
          <Link href="/#pricing" className="text-sm font-normal text-foreground no-underline hover:no-underline">
            Pricing
          </Link>
        </nav>

        {/* Right: CTAs */}
        <div className="ml-auto flex items-center gap-3">
          <Link href="https://cal.com/sj-rankly/30min" target="_blank" rel="noopener noreferrer" className="text-sm font-normal text-foreground no-underline hover:no-underline">
            Book a demo
          </Link>
          <Link href="https://app.tryrankly.com/" target="_blank" rel="noopener noreferrer">
            <Button 
              size="sm" 
              className="h-8 px-4 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-medium text-sm"
            >
              Get started →
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
