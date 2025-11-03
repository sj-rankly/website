"use client"

import { cn } from "@/lib/utils"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
} from "@/components/ui/chart"
import { useState, useRef } from "react"
import { useTheme } from "next-themes"

// ===== INTERFACES =====
interface ChartData {
  week: string
  yourBrand: number
  competitorA: number
  competitorB: number
}

interface InteractiveChartProps {
  data: ChartData[]
  isAnimating: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  className?: string
}

// ===== INTERACTIVE VISIBILITY CHART =====
function InteractiveVisibilityChart({ data, isAnimating, onMouseEnter, onMouseLeave, className }: InteractiveChartProps) {
  const { theme } = useTheme()
  const [animationKey, setAnimationKey] = useState(0)
  const chartRef = useRef<HTMLDivElement>(null)

  // Determine Your Brand color based on theme
  const yourBrandColor = theme === 'dark' ? '#FFFFFF' : '#000000'
  const yourBrandShadowColor = theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'

  const handleMouseEnter = () => {
    setAnimationKey(prev => prev + 1)
    onMouseEnter()
  }

  return (
    <div 
      ref={chartRef}
      className={cn("w-full h-full", className)}
    >
      <ChartContainer 
        key={animationKey}
        config={{
          yourBrand: {
            label: "Your Brand",
            color: yourBrandColor,
          },
          competitorA: {
            label: "Competitor A", 
            color: "#3B82F6",
          },
          competitorB: {
            label: "Competitor B",
            color: "#22C55E",
          },
        }}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: -20,
            right: 10,
            top: 10,
            bottom: 60,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 80]}
          />
          {/* Base lines - always visible with colors */}
          <Line
            dataKey="yourBrand"
            type="monotone"
            stroke={yourBrandColor}
            strokeWidth={3}
            dot={false}
            animationDuration={isAnimating ? 800 : 0}
            opacity={isAnimating ? 0.3 : 0.6}
            className="transition-opacity duration-300"
          />
          <Line
            dataKey="competitorA"
            type="monotone"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            animationDuration={isAnimating ? 800 : 0}
            opacity={isAnimating ? 0.3 : 0.6}
            className="transition-opacity duration-300"
          />
          <Line
            dataKey="competitorB"
            type="monotone"
            stroke="#22C55E"
            strokeWidth={2}
            dot={false}
            animationDuration={isAnimating ? 800 : 0}
            opacity={isAnimating ? 0.3 : 0.6}
            className="transition-opacity duration-300"
          />
          
          {/* Glow effect lines - animate from bottom to top on hover */}
          <Line
            dataKey="yourBrand"
            type="monotone"
            stroke={yourBrandColor}
            strokeWidth={3}
            dot={false}
            animationDuration={isAnimating ? 800 : 0}
            animationEasing="ease-out"
            animationBegin={0}
            opacity={isAnimating ? 1 : 0}
            className="transition-opacity duration-300"
            style={{
              filter: isAnimating ? `drop-shadow(0 0 12px ${yourBrandShadowColor}) drop-shadow(0 0 24px ${yourBrandShadowColor}) drop-shadow(0 0 36px ${yourBrandShadowColor}) drop-shadow(0 0 48px ${yourBrandShadowColor})` : 'none',
              transition: 'all 0.5s ease-in-out'
            }}
          />
          <Line
            dataKey="competitorA"
            type="monotone"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            animationDuration={isAnimating ? 800 : 0}
            animationEasing="ease-out"
            animationBegin={150}
            opacity={isAnimating ? 1 : 0}
            className="transition-opacity duration-300"
            style={{
              filter: isAnimating ? 'drop-shadow(0 0 12px rgba(59,130,246,0.9)) drop-shadow(0 0 24px rgba(59,130,246,0.7)) drop-shadow(0 0 36px rgba(59,130,246,0.5)) drop-shadow(0 0 48px rgba(59,130,246,0.3))' : 'none',
              transition: 'all 0.5s ease-in-out'
            }}
          />
          <Line
            dataKey="competitorB"
            type="monotone"
            stroke="#22C55E"
            strokeWidth={2}
            dot={false}
            animationDuration={isAnimating ? 800 : 0}
            animationEasing="ease-out"
            animationBegin={300}
            opacity={isAnimating ? 1 : 0}
            className="transition-opacity duration-300"
            style={{
              filter: isAnimating ? 'drop-shadow(0 0 12px rgba(34,197,94,0.9)) drop-shadow(0 0 24px rgba(34,197,94,0.7)) drop-shadow(0 0 36px rgba(34,197,94,0.5)) drop-shadow(0 0 48px rgba(34,197,94,0.3))' : 'none',
              transition: 'all 0.5s ease-in-out'
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

// ===== VISIBILITY ANALYTICS BLOCK =====
export function VisibilityAnalyticsBlock() {
  const [isAnimating, setIsAnimating] = useState(false)
  
  const baseData = [
    { week: "Week 1", yourBrand: 5, competitorA: 3, competitorB: 2 },
    { week: "Week 2", yourBrand: 18, competitorA: 10, competitorB: 7 },
    { week: "Week 3", yourBrand: 42, competitorA: 25, competitorB: 18 },
    { week: "Week 4", yourBrand: 68, competitorA: 38, competitorB: 28 },
  ]
  
  const hoverData = [
    { week: "Week 1", yourBrand: 8, competitorA: 5, competitorB: 3 },
    { week: "Week 2", yourBrand: 22, competitorA: 12, competitorB: 9 },
    { week: "Week 3", yourBrand: 48, competitorA: 28, competitorB: 22 },
    { week: "Week 4", yourBrand: 75, competitorA: 42, competitorB: 32 },
  ]
  
  const chartData = isAnimating ? hoverData : baseData

  return (
    <div className="h-[300px] w-[555px] mx-auto overflow-hidden">
      <div className="w-full h-full relative flex flex-col p-6 pr-6 pb-6 pl-0">
        {/* Color Labels on Top */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-black dark:bg-white rounded"></div>
            <span className="text-sm font-medium">Your Brand</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-blue-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Competitor A</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-green-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Competitor B</span>
          </div>
        </div>
        
        <div
          onMouseEnter={() => setIsAnimating(true)}
          onMouseLeave={() => setIsAnimating(false)}
          className="flex-1 flex flex-col cursor-pointer"
        >
          <InteractiveVisibilityChart 
            data={chartData}
            isAnimating={isAnimating}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  )
}
