"use client"

import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"

interface SmartRulersProps {
  children: React.ReactNode
  className?: string
}

export function SmartRulers({ children, className }: SmartRulersProps) {
  return (
    <div className={cn("relative", className)}>
          {/* Static Rulers - Always visible, non-interactive */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Container edges - solid lines */}
            <div className="absolute left-0 w-px h-full bg-gray-300 opacity-60"></div>
            <div className="absolute right-0 w-px h-full bg-gray-300 opacity-60"></div>
            
            {/* Horizontal rulers - span full width between container boundaries */}
            <div className="absolute top-0 w-full h-px bg-gray-300 opacity-60"></div>
            <div className="absolute bottom-0 w-full h-px bg-gray-300 opacity-60"></div>
            
            {/* Horizontal guides - span full width between container boundaries */}
            <div className="absolute top-1/3 w-full h-px bg-gray-300 opacity-40 border-dashed border-b border-gray-300"></div>
            <div className="absolute top-2/3 w-full h-px bg-gray-300 opacity-40 border-dashed border-b border-gray-300"></div>
          </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Container detection hook
export function useContainerDetection() {
  const [containers, setContainers] = useState<Array<{
    element: HTMLElement
    type: 'container' | 'card' | 'section'
    bounds: DOMRect
  }>>([])

  useEffect(() => {
    const detectContainers = () => {
      const elements = document.querySelectorAll('[data-container]')
      const detected: Array<{
        element: HTMLElement
        type: 'container' | 'card' | 'section'
        bounds: DOMRect
      }> = []

      elements.forEach((el) => {
        const htmlEl = el as HTMLElement
        const rect = htmlEl.getBoundingClientRect()
        const type = htmlEl.dataset.container as 'container' | 'card' | 'section'
        
        detected.push({
          element: htmlEl,
          type: type || 'container',
          bounds: rect
        })
      })

      setContainers(detected)
    }

    detectContainers()
    window.addEventListener('resize', detectContainers)
    
    return () => window.removeEventListener('resize', detectContainers)
  }, [])

  return containers
}

// Smart grid component
export function SmartGrid({ 
  children, 
  columns = 4, 
  className 
}: { 
  children: React.ReactNode
  columns?: number
  className?: string 
}) {
  return (
    <div 
      className={cn("grid gap-6", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`
      }}
      data-container="grid"
    >
      {children}
    </div>
  )
}

// Smart section component
export function SmartSection({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <section 
      className={cn("py-16 px-6", className)}
      data-container="section"
    >
      {children}
    </section>
  )
}
