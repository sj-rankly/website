"use client"

import { cn } from "@/lib/utils"

interface HeroGraphicProps {
  className?: string
}

export function HeroGraphic({ className }: HeroGraphicProps) {
  return (
    <div className={cn("mb-12", className)}>
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
  )
}
