"use client"

import { useState } from "react"
import { motion } from "motion/react"

interface TrendPoint {
  label: string
  value: number
}

const trendData: Record<string, TrendPoint[]> = {
  Brand: [
    { label: "Jan", value: 42 },
    { label: "Feb", value: 48 },
    { label: "Mar", value: 45 },
    { label: "Apr", value: 58 },
    { label: "May", value: 55 },
    { label: "Jun", value: 68 },
    { label: "Jul", value: 72 },
  ],
  Earned: [
    { label: "Jan", value: 45 },
    { label: "Feb", value: 38 },
    { label: "Mar", value: 52 },
    { label: "Apr", value: 48 },
    { label: "May", value: 62 },
    { label: "Jun", value: 58 },
    { label: "Jul", value: 68 },
  ],
  Social: [
    { label: "Jan", value: 35 },
    { label: "Feb", value: 42 },
    { label: "Mar", value: 58 },
    { label: "Apr", value: 52 },
    { label: "May", value: 65 },
    { label: "Jun", value: 58 },
    { label: "Jul", value: 72 },
  ],
}

export function CitationAnalyticsBlock() {
  const [activeCategory, setActiveCategory] = useState<string>("Brand")
  const [activePoint, setActivePoint] = useState<number | null>(null)

  // Get current trend data based on active category
  const currentTrendData = trendData[activeCategory]

  // Calculate path for line chart
  const maxValue = Math.max(...currentTrendData.map(d => d.value))
  const minValue = Math.min(...currentTrendData.map(d => d.value))
  const range = maxValue - minValue || 1
  
  const points = currentTrendData.map((point, index) => {
    const x = (index / (currentTrendData.length - 1)) * 100
    const y = 100 - ((point.value - minValue) / range) * 80
    return { x, y, value: point.value, label: point.label }
  })

  // Create smooth curved path using cubic Bezier curves
  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return ''
    
    let path = `M ${points[0].x} ${points[0].y}`
    
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i]
      const next = points[i + 1]
      
      // Calculate control points for smooth curves
      const cp1x = curr.x + (next.x - curr.x) / 3
      const cp1y = curr.y
      const cp2x = curr.x + (next.x - curr.x) * 2 / 3
      const cp2y = next.y
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`
    }
    
    return path
  }
  
  const pathD = createSmoothPath(points)

  return (
    <div className="h-[300px] w-[555px] mx-auto">
      <div className="relative w-full h-full overflow-hidden p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-3">
            {Object.keys(trendData).map((category) => (
              <motion.button
                key={category}
                className="text-xs font-medium opacity-70 cursor-pointer px-2 py-1 rounded transition-all"
                onMouseEnter={() => setActiveCategory(category)}
                animate={{
                  color: activeCategory === category ? "hsl(var(--primary))" : "inherit",
                  opacity: activeCategory === category ? 1 : 0.7,
                  fontWeight: activeCategory === category ? "600" : "400"
                }}
                transition={{ duration: 0.3 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="relative h-[220px] w-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Gradient definition */}
            <defs>
              <linearGradient id={`lineGradient-${activeCategory}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.4" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id={`glow-${activeCategory}`}>
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Area fill */}
            <motion.path
              d={`${pathD} L 100 100 L 0 100 Z`}
              fill={`url(#lineGradient-${activeCategory})`}
              animate={{ d: `${pathD} L 100 100 L 0 100 Z` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {/* Glowing line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="0.5"
              filter={`url(#glow-${activeCategory})`}
              animate={{ d: pathD }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                filter: "drop-shadow(0 0 4px var(--foreground)) drop-shadow(0 0 8px var(--foreground))"
              }}
            />
            
            {/* Data points */}
            {points.map((point, index) => (
              <motion.circle
                key={`${activeCategory}-${index}`}
                cx={point.x}
                cy={point.y}
                r="1.5"
                fill="var(--foreground)"
                animate={{ 
                  cx: point.x,
                  cy: point.y,
                  scale: activePoint === index ? 2 : 1
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                whileHover={{ scale: 2 }}
                onMouseEnter={() => setActivePoint(index)}
                onMouseLeave={() => setActivePoint(null)}
                style={{
                  filter: activePoint === index ? "drop-shadow(0 0 15px var(--foreground))" : "none"
                }}
              />
            ))}
          </svg>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className="text-xs opacity-70"
                animate={{
                  color: activePoint === index ? "hsl(var(--primary))" : "inherit",
                  fontWeight: activePoint === index ? "600" : "400"
                }}
                transition={{ duration: 0.2 }}
              >
                {point.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
