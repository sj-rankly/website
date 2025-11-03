"use client"

import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"

interface HeroCardsProps {
  className?: string
}

export function HeroCards({ className }: HeroCardsProps) {
  const items = [
    { 
      icon: "mdi:eye-outline", 
      title: "Understand Visibility",
      description: "See how often your brand appears in AI answers and where it ranks across models."
    },
    { 
      icon: "mdi:console", 
      title: "Manage Prompts",
      description: "Organize, test, and refine LLM prompts to improve response accuracy and control."
    },
    { 
      icon: "mdi:emoticon-happy-outline", 
      title: "Understand Sentiment",
      description: "Track tone and perception across AI responses to measure brand reputation."
    },
    { 
      icon: "mdi:link-variant", 
      title: "Track Citations",
      description: "Monitor where your URLs are cited in AI answers and how they influence visibility."
    },
  ]

  return (
    <div className={cn("relative", className)}>
      {/* Horizontal rulers - positioned at container edges (extend beyond padding to touch vertical rulers) */}
      <div className="absolute top-0 left-[-1.5rem] right-[-1.5rem] md:left-[-2rem] md:right-[-2rem] h-[1.5px] bg-border opacity-90 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-[-1.5rem] right-[-1.5rem] md:left-[-2rem] md:right-[-2rem] h-[1.5px] bg-border opacity-90 pointer-events-none z-0"></div>
      
      <div className="grid gap-0 md:grid-cols-4 relative py-12 -mx-8 md:-mx-10">
        {/* Grid Ruler Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Vertical dividers */}
          <div className="absolute inset-y-0 left-1/4 w-[1.5px] bg-border opacity-90"></div>
          <div className="absolute inset-y-0 left-2/4 w-[1.5px] bg-border opacity-90"></div>
          <div className="absolute inset-y-0 left-3/4 w-[1.5px] bg-border opacity-90"></div>
        </div>

        {/* Feature Cards */}
        {items.map(({ icon, title, description }, i) => (
          <div
            key={i}
            className="px-8 py-6 relative z-10"
          >
            <div className="mb-4">
              <Icon icon={icon} className="w-6 h-6 text-brand/60" />
            </div>
            <h3 className="text-sm font-semibold mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}