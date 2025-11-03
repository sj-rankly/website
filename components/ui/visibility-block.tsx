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
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { VisibilityAnalyticsBlock } from "./visibility-analytics-block"
import { DepthOfMentionBlock } from "./depth-of-mention-block"
import { PlatformCard } from "./platform-card"

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
      className={cn("bg-muted/30 rounded-lg shadow-sm", className)}
      style={{ height: height || 'auto' }}
    >
      <div className="p-6">
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
  title = "Analytics Dashboard", 
  subtitle = "Feature Blocks",
  description = "Comprehensive analytics to understand and optimize your AI presence across different platforms and contexts.",
  blocks
}: FeatureBlocksProps) {
  
  // Default blocks configuration
  const defaultBlocks: FeatureBlockProps[] = [
    {
      title: "Visibility Analytics Block",
      description: "Measure how often you appears in AI answers with visibility score and share of voice metrics.",
      content: <VisibilityAnalyticsBlock />,
      height: '450px'
    },
    {
      title: "Depth of Mention Block", 
      description: "Measures how extensively your brand is discussed within the answer, adjusted for its position and word importance.",
      content: <DepthOfMentionBlock />,
      height: '600px'
    },
    {
      title: "Sentiment Tracking Block",
      description: "Track and analyze sentiment patterns in AI-generated responses about your brand.",
      content: <div className="h-[600px] bg-background rounded-lg border border-border/30 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Sentiment Tracking Block - Coming Soon</p>
        </div>
      </div>,
      height: '600px'
    },
    {
      title: "Citation Analytics Block",
      description: "Analyze citation patterns and source attribution in AI responses.", 
      content: <div className="h-[600px] bg-background rounded-lg border border-border/30 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Citation Analytics Block - Coming Soon</p>
        </div>
      </div>,
      height: '600px'
    },
    {
      title: "Platform Block",
      description: "Compare your brand's performance across different AI platforms and services.",
      content: <PlatformCard />,
      height: '600px'
    },
    {
      title: "Topics and User Personas Block",
      description: "Understand which topics and user segments drive the most AI mentions.",
      content: <div className="h-[600px] bg-background rounded-lg border border-border/30 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Topics and User Personas Block - Coming Soon</p>
        </div>
      </div>,
      height: '600px'
    }
  ]

  const blocksToRender = blocks || defaultBlocks

  return (
    <section className={cn("py-0 px-0 bg-background", className)}>
      <div className="w-full">
        {/* Header - Feature Blocks Section */}
        <div className="text-center py-12 px-6">
          <div className="inline-block px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground mb-4">
            {subtitle}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Grid - Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-12">
          {blocksToRender.map((block, index) => (
            <FeatureBlock
              key={index}
              title={block.title}
              description={block.description}
              icon={block.icon}
              content={block.content}
              className={block.className}
              height={block.height}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== EXPORTED MODULAR COMPONENTS =====
export { 
  FeatureBlock,
  PlaceholderContent
}
