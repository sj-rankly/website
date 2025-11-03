"use client"

import { cn } from "@/lib/utils"
import { Calendar, Globe, Languages, Monitor, Diamond, Code } from "lucide-react"

interface DashboardBlocksProps {
  className?: string
}

export function DashboardBlocks({ className }: DashboardBlocksProps) {
  return (
    <section className={cn("py-0 px-0 bg-background", className)}>
      <div className="w-full">
            {/* Header - Full width within vertical rulers */}
            <div className="text-center py-6 px-6 border-t border-b border-solid border-border">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Understand and control your AI Presence
              </h2>
            </div>

        {/* Top Row - Two Large Graphics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 px-6">
          {/* Left: Visibility Scores */}
          <div className="bg-muted/30 rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Visibility Scores</h3>
                  <p className="text-muted-foreground text-sm">
                    Measure how often you appears in AI answers with visibility score and share of voice metrics.
                  </p>
                </div>
            {/* Multi-line Chart - You vs Competitors */}
            <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center relative">
              <div className="w-full h-full relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <span>50%</span>
                  <span>40%</span>
                  <span>30%</span>
                  <span>20%</span>
                  <span>10%</span>
                </div>
                {/* Chart lines */}
                <div className="absolute inset-4">
                  <svg className="w-full h-full" viewBox="0 0 200 120">
                    {/* You - Blue line */}
                    <path
                      d="M20 100 Q60 60 100 40 T180 20"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle cx="100" cy="40" r="4" fill="#3b82f6" />
                    <text x="100" y="35" className="text-xs fill-current text-foreground">You 43.8%</text>
                    
                    {/* Competitor 1 - Red line */}
                    <path
                      d="M20 110 Q50 80 90 50 T160 30"
                      stroke="#ef4444"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="90" cy="50" r="3" fill="#ef4444" />
                    <text x="90" y="45" className="text-xs fill-current text-foreground">Comp A 35.2%</text>
                    
                    {/* Competitor 2 - Green line */}
                    <path
                      d="M20 105 Q40 75 80 45 T140 25"
                      stroke="#10b981"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="80" cy="45" r="3" fill="#10b981" />
                    <text x="80" y="40" className="text-xs fill-current text-foreground">Comp B 28.7%</text>
                    
                    {/* Competitor 3 - Purple line */}
                    <path
                      d="M20 115 Q45 85 85 55 T145 35"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="85" cy="55" r="3" fill="#8b5cf6" />
                    <text x="85" y="50" className="text-xs fill-current text-foreground">Comp C 22.1%</text>
                  </svg>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-0.5 bg-blue-500"></div>
                    <span className="text-muted-foreground">You</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-0.5 bg-red-500"></div>
                    <span className="text-muted-foreground">Comp A</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-0.5 bg-green-500"></div>
                    <span className="text-muted-foreground">Comp B</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-0.5 bg-purple-500"></div>
                    <span className="text-muted-foreground">Comp C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sentiment & Keyword Insights */}
          <div className="bg-muted/30 rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Sentiment & Keyword Insights</h3>
                  <p className="text-muted-foreground text-sm">
                    Analyze how AI describes your brand. Identify key themes, topics, and recurring narratives.
                  </p>
                </div>
            {/* Radar Chart Placeholder */}
            <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="w-32 h-32 relative">
                {/* Radar chart circles */}
                <div className="absolute inset-0 border border-gray-300 rounded-full opacity-60"></div>
                <div className="absolute inset-4 border border-gray-300 rounded-full opacity-40"></div>
                <div className="absolute inset-8 border border-gray-300 rounded-full opacity-30"></div>
                
                {/* Radar lines */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-1/2 w-px h-16 bg-gray-300 transform -translate-x-1/2 -translate-y-1/2 rotate-0"></div>
                  <div className="absolute top-1/2 left-1/2 w-px h-16 bg-gray-300 transform -translate-x-1/2 -translate-y-1/2 rotate-60"></div>
                  <div className="absolute top-1/2 left-1/2 w-px h-16 bg-gray-300 transform -translate-x-1/2 -translate-y-1/2 rotate-120"></div>
                </div>
                
                {/* Labels */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">Accounts Payable</div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">Business Banking</div>
                <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-xs text-muted-foreground">Treasury</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row - Filter Bar */}
        <div className="mb-8 px-6">
          <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Date</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Region</span>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Language</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Diamond className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Brand</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm">
              <Code className="h-4 w-4" />
              Prompts
            </button>
          </div>
        </div>

        {/* Bottom Row - Two Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">
          {/* Left: Citation Authority */}
          <div className="bg-muted/30 rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Citation Authority</h3>
                  <p className="text-muted-foreground text-sm">
                    See which websites influence AI-generated answers about your brand and track their authority.
                  </p>
                </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">rho.co</span>
                <span className="text-sm text-muted-foreground">1577 Mentions</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">example.com</span>
                <span className="text-sm text-muted-foreground">892 Mentions</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">site.org</span>
                <span className="text-sm text-muted-foreground">456 Mentions</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">R</div>
              <span className="font-medium">Rho</span>
              <span className="text-sm text-muted-foreground">61.2%</span>
            </div>
          </div>

          {/* Right: Trends & Insights Over Time */}
          <div className="bg-muted/30 rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Trends & Insights Over Time</h3>
                  <p className="text-muted-foreground text-sm">
                    Analyze changes in your presence across time, regions, topics, and languages.
                  </p>
                </div>
            {/* Bar Chart Placeholder */}
            <div className="h-48 bg-muted/50 rounded-lg flex items-end justify-center gap-2 p-4">
              <div className="w-8 bg-primary h-16 rounded-t"></div>
              <div className="w-8 bg-primary h-24 rounded-t"></div>
              <div className="w-8 bg-primary h-12 rounded-t"></div>
              <div className="w-8 bg-primary h-32 rounded-t"></div>
              <div className="w-8 bg-primary h-20 rounded-t"></div>
              <div className="w-8 bg-primary h-28 rounded-t"></div>
              <div className="w-8 bg-primary h-18 rounded-t"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}