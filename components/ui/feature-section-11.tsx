"use client"

import { cn } from "@/lib/utils"
import { Rocket, BarChart3, Target } from "lucide-react"

interface FeatureSectionAlignedProps {
  className?: string
}

export function FeatureSectionAligned({ className }: FeatureSectionAlignedProps) {
  return (
    <section className={cn("py-16 bg-background border-b border-solid border-border", className)}>
      <div className="max-w-6xl mx-auto px-6">
            
            {/* Header */}
            <div className="text-center mb-12 space-y-3">
              <p className="text-sm text-muted-foreground">Feature section</p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Headline that shows solution's impact on user success
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explain in one or two concise sentences how your solution transforms users' challenges into positive outcomes.
                Focus on the end benefits that matter most to your target audience. Keep it clear and compelling.
              </p>
            </div>

            {/* Central Visual Mockup */}
            <div className="mb-12">
              <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden flex items-center justify-center">
                <div className="w-48 h-48 relative">
                  {/* Multiple concentric circles with varying opacity */}
                  <div className="absolute inset-0 border border-gray-300 rounded-full opacity-80"></div>
                  <div className="absolute inset-4 border border-gray-300 rounded-full opacity-60"></div>
                  <div className="absolute inset-8 border border-gray-300 rounded-full opacity-40"></div>
                  <div className="absolute inset-12 border border-gray-300 rounded-full opacity-30"></div>
                  <div className="absolute inset-16 border border-gray-300 rounded-full opacity-20"></div>
                  <div className="absolute inset-20 border border-gray-300 rounded-full opacity-10"></div>
                  
                  {/* Radar sweep lines - 12 lines at 30-degree intervals */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-px h-24 bg-gray-300 transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                          opacity: 0.3 + (i % 3) * 0.1
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Center square icon with mountain/sun */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-400 rounded-sm flex items-center justify-center">
                    <div className="w-6 h-6 relative">
                      {/* Mountain shape */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-gray-600"></div>
                      </div>
                      {/* Sun circle */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="relative pb-12">
              {/* Grid Ruler Overlay */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* Top horizontal ruler - extends to container edges */}
                <div className="absolute top-0 left-0 right-0 bg-gray-700 opacity-90" style={{height: '1.5px'}}></div>
                
                {/* 3 Internal vertical rulers */}
                <div className="absolute inset-y-0 left-1/4 border-l-2 border-solid border-gray-700 opacity-90" style={{borderLeftWidth: '1.5px'}}></div>
                <div className="absolute inset-y-0 left-1/2 border-l-2 border-solid border-gray-700 opacity-90" style={{borderLeftWidth: '1.5px'}}></div>
                <div className="absolute inset-y-0 left-3/4 border-l-2 border-solid border-gray-700 opacity-90" style={{borderLeftWidth: '1.5px'}}></div>
                
              </div>
              
              {/* 4-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 text-center relative z-20">
                {[
                  { icon: Rocket, title: "Benefit driven feature title" },
                  { icon: BarChart3, title: "Benefit driven feature title" },
                  { icon: Target, title: "Benefit driven feature title" },
                  { icon: Rocket, title: "Benefit driven feature title" },
                ].map(({ icon: Icon, title }, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-start px-6 py-8 space-y-3"
                  >
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      Shortly describe how this feature solves a specific user problem.
                      Focus on benefits not on technical details.
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
    </section>
  )
}