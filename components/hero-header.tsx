"use client"

import { cn } from "@/lib/utils"

interface HeroHeaderProps {
  className?: string
}

export function HeroHeader({ className }: HeroHeaderProps) {
  return (
    <div className={cn("text-center mb-12 space-y-3", className)}>
      <div className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-muted border border-white/30 rounded-full mb-4" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)' }}>
        Answer Engine Analytics
      </div>
      <h2 className="text-3xl md:text-4xl font-bold">
        See how your brand performs inside AI answers
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Turn AI-generated answers into measurable insights
        Understand which models surface your brand, how often, and in what context
      </p>
    </div>
  )
}
