"use client"

import { cn } from "@/lib/utils"
import { Calendar, Globe, Languages, Monitor, Diamond, Code, TrendingUp, BarChart3, Target, Users, Zap, Shield } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { useTheme } from "next-themes"
import { VisibilityAnalyticsBlock } from "./visibility-analytics-block"
import { DepthOfMentionBlock } from "./depth-of-mention-block"
import { PlatformCard } from "./platform-card"
import { SentimentTrackingBlock } from "./sentiment-tracking-block"
import { CitationAnalyticsBlock } from "./citation-analytics-block"
import { TopicsUserPersonasBlock } from "./topics-user-personas-block"

// ===== MODULAR COMPONENT INTERFACES =====
interface FeatureBlockProps {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  content: React.ReactNode
  className?: string
  height?: string | number
}

interface FeatureBlocksProps {
  className?: string
  title?: string
  subtitle?: string
  description?: string
  blocks?: FeatureBlockProps[]
}

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

// ===== MODULAR CHART COMPONENTS =====
// Interactive Visibility Chart Component
function InteractiveVisibilityChart({ data, isAnimating, onMouseEnter, onMouseLeave, className }: InteractiveChartProps) {
  const { theme } = useTheme()
  const [animationKey, setAnimationKey] = useState(0)
  const chartRef = useRef<HTMLDivElement>(null)

  // Determine Your Brand color based on theme
  const yourBrandColor = theme === 'dark' ? '#FFFFFF' : '#000000'
  const yourBrandShadowColor = theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'

  const handleMouseEnter = () => {
    setAnimationKey(prev => prev + 1)
    onMouseEnter()
  }

  return (
    <div 
      ref={chartRef}
      className={cn("w-full h-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
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
            bottom: 50,
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
          {/* Base lines - always visible in light shades */}
          <Line
            dataKey="yourBrand"
            type="monotone"
            stroke={theme === 'dark' ? '#666666' : '#CCCCCC'}
            strokeWidth={3}
            dot={false}
            animationDuration={0}
          />
          <Line
            dataKey="competitorA"
            type="monotone"
            stroke="#9999CC"
            strokeWidth={2}
            dot={false}
            animationDuration={0}
          />
          <Line
            dataKey="competitorB"
            type="monotone"
            stroke="#99CC99"
            strokeWidth={2}
            dot={false}
            animationDuration={0}
          />
          
          {/* Glow effect lines - animate from bottom to top on hover */}
          <Line
            dataKey="yourBrand"
            type="monotone"
            stroke={yourBrandColor}
            strokeWidth={3}
            dot={false}
            animationDuration={isAnimating ? 1000 : 0}
            animationEasing="ease-in-out"
            animationBegin={0}
            opacity={isAnimating ? 1 : 0}
            className="transition-opacity duration-300"
            style={{
              filter: isAnimating ? `drop-shadow(0 0 20px ${yourBrandShadowColor}) drop-shadow(0 0 40px ${yourBrandShadowColor}) drop-shadow(0 0 60px ${yourBrandShadowColor})` : 'none',
              transition: 'all 0.5s ease-in-out'
            }}
          />
          <Line
            dataKey="competitorA"
            type="monotone"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            animationDuration={isAnimating ? 1000 : 0}
            animationEasing="ease-in-out"
            animationBegin={200}
            opacity={isAnimating ? 1 : 0}
            className="transition-opacity duration-300"
            style={{
              filter: isAnimating ? 'drop-shadow(0 0 20px rgba(59,130,246,0.6)) drop-shadow(0 0 40px rgba(59,130,246,0.4)) drop-shadow(0 0 60px rgba(59,130,246,0.2))' : 'none',
              transition: 'all 0.5s ease-in-out'
            }}
          />
          <Line
            dataKey="competitorB"
            type="monotone"
            stroke="#22C55E"
            strokeWidth={2}
            dot={false}
            animationDuration={isAnimating ? 1000 : 0}
            animationEasing="ease-in-out"
            animationBegin={400}
            opacity={isAnimating ? 1 : 0}
            className="transition-opacity duration-300"
            style={{
              filter: isAnimating ? 'drop-shadow(0 0 20px rgba(34,197,94,0.6)) drop-shadow(0 0 40px rgba(34,197,94,0.4)) drop-shadow(0 0 60px rgba(34,197,94,0.2))' : 'none',
              transition: 'all 0.5s ease-in-out'
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

// ===== MODULAR FEATURE BLOCK COMPONENT =====
function FeatureBlock({ title, description, icon: Icon, content, className, height }: FeatureBlockProps) {
  return (
    <div 
      className={cn("", className)}
      style={{ height: height || 'auto' }}
    >
      <div className="px-6 pt-10 pb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-0 whitespace-nowrap overflow-hidden text-ellipsis" title={description}>{description}</p>
      </div>
      {content}
    </div>
  )
}

// ===== MODULAR CONTENT COMPONENTS =====


// ===== MODULAR MAIN COMPONENT =====

// ===== MODULAR MAIN COMPONENT =====
export function FeatureBlocks({ 
  className, 
  title = "", 
  subtitle = "Feature Blocks",
  description = "Track visibility, sentiment, and citations across leading LLMs",
  blocks
}: FeatureBlocksProps) {
  
  // Default blocks configuration
  const defaultBlocks: FeatureBlockProps[] = [
    {
      title: "Visibility",
      description: "See how often your brand appears in AI-generated answers",
      content: <VisibilityAnalyticsBlock />,
      height: '450px'
    },
    {
      title: "Depth of Mention", 
      description: "Analyze how prominence changes across models",
      content: <DepthOfMentionBlock />,
      height: '450px'
    },
    {
      title: "Sentiment",
      description: "Identify shifts in tone and sentiment across models, markets, and time.",
      content: <SentimentTrackingBlock />,
      height: '450px'
    },
    {
      title: "Citations",
      description: "Track where your URLs and brand sources are cited in AI responses.", 
      content: <CitationAnalyticsBlock />,
      height: '450px'
    },
    {
      title: "Platform",
      description: "Compare your brand's performance across ChatGPT, Gemini, Claude, Perplexity, and others.",
      content: <PlatformCard />,
      height: '450px'
    },
    {
      title: "Topics and User Personas",
      description: "Analyze which topics, intents, and user personas trigger the most mentions.",
      content: <TopicsUserPersonasBlock />,
      height: '450px'
    }
  ]

  const blocksToRender = blocks || defaultBlocks

  const topRowRef = useRef<HTMLDivElement | null>(null)
  const [dividerY, setDividerY] = useState<number | null>(null)
  const [dividerY2, setDividerY2] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (topRowRef.current) {
      // The first two blocks make up the top row
      const firstRowBlocks = topRowRef.current.querySelectorAll(':scope > div:nth-child(-n+2)')
      
      if (firstRowBlocks.length === 2) {
        const block1 = firstRowBlocks[0].getBoundingClientRect()
        const block2 = firstRowBlocks[1].getBoundingClientRect()
        
        // Determine the lower of the two (they may not be perfectly equal)
        const rowBottom = Math.max(block1.bottom, block2.bottom)
        
        // Find the grid container offset
        const containerRect = topRowRef.current.getBoundingClientRect()
        
        // Gap (10 = gap-10 = 2.5rem = 40px)
        const rowGap = 40
        
        // Divider sits below first row with extra spacing (moved down a bit more)
        setDividerY(rowBottom - containerRect.top + rowGap / 2 + 50)
      }

      // Blocks 3 and 4 make up the second row (3rd and 4th child)
      const secondRowBlocks = topRowRef.current.querySelectorAll(':scope > div:nth-child(3), :scope > div:nth-child(4)')
      
      if (secondRowBlocks.length === 2) {
        const block3 = secondRowBlocks[0].getBoundingClientRect()
        const block4 = secondRowBlocks[1].getBoundingClientRect()
        
        // Determine the lower of the two
        const rowBottom = Math.max(block3.bottom, block4.bottom)
        
        // Find the grid container offset
        const containerRect = topRowRef.current.getBoundingClientRect()
        
        // Gap (10 = gap-10 = 2.5rem = 40px)
        const rowGap = 40
        
        // Divider sits below second row with extra spacing
        setDividerY2(rowBottom - containerRect.top + rowGap / 2 + 50)
      }
    }
  }, [blocksToRender])

  return (
    <section className={cn("py-0 px-0 bg-background", className)}>
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center py-12 px-6">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* 2x2 Grid Section */}
        <div className="relative px-6 pt-12 pb-12">
          {/* === Top Horizontal Ruler (placed above blocks section) === */}
          <div className="absolute -top-[1.5px] left-0 right-0 h-[1.5px] bg-border opacity-90 z-20"></div>

          {/* === Grid Rulers (on top of blocks, between rows) === */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* Vertical Divider (middle column) */}
            <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-border opacity-90 -translate-x-1/2"></div>

            {/* Middle horizontal divider - dynamic position based on row 1 */}
            {dividerY !== null && (
              <div
                className="absolute left-0 right-0 h-[1.5px] bg-border opacity-90 transition-all duration-300"
                style={{ top: `${dividerY}px` }}
              ></div>
            )}

            {/* Second horizontal divider - between blocks 3,4 and blocks 5,6 */}
            {dividerY2 !== null && (
              <div
                className="absolute left-0 right-0 h-[1.5px] bg-border opacity-90 transition-all duration-300"
                style={{ top: `${dividerY2}px` }}
              ></div>
            )}

            {/* Top + Bottom rulers */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-border opacity-90"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border opacity-90"></div>
          </div>

          {/* === Content Grid (below rulers) === */}
          <div
            ref={topRowRef}
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 justify-center"
          >
            {blocksToRender.map((block, index) => (
              <div
                key={index}
                className="relative"
              >
                {/* Header */}
                <div className="relative px-6 pt-10 pb-3 z-10">
                  <h3 className="text-xl font-bold mb-1">{block.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {block.description}
                  </p>
                </div>

                {/* Content */}
                <div className="relative px-6 pb-8 z-10">
                  {block.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== EXPORTED MODULAR COMPONENTS =====
export { 
  FeatureBlock
}

