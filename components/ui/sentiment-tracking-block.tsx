"use client"

import { useState } from "react"
import { motion } from "motion/react"

interface SentimentData {
  label: string
  value: number
  hoverValue: number
  color: string
  glowColor: string
}

const sentimentData: SentimentData[] = [
  { label: "Positive", value: 65, hoverValue: 72, color: "#22C55E", glowColor: "rgba(34,197,94,0.6)" },
  { label: "Neutral", value: 28, hoverValue: 24, color: "#3B82F6", glowColor: "rgba(59,130,246,0.6)" },
  { label: "Negative", value: 7, hoverValue: 4, color: "#EF4444", glowColor: "rgba(239,68,68,0.6)" },
]

export function SentimentTrackingBlock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="h-[300px] w-[555px] mx-auto overflow-hidden group">
      <div className="w-full h-full flex flex-col p-6 pr-6 pb-6 pl-0">
        {/* Chart Bars */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          {sentimentData.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex flex-col gap-2 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Label and Value */}
              <motion.div 
                className="flex items-center justify-between"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0.9,
                  x: hoveredIndex === index ? 2 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <motion.span 
                  className="text-sm opacity-70"
                  animate={{
                    color: hoveredIndex === index ? item.color : 'inherit'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {hoveredIndex === index ? item.hoverValue : item.value}%
                </motion.span>
              </motion.div>
              
              {/* Bar Container */}
              <div className="relative h-8 bg-muted/30 rounded-sm overflow-hidden">
                {/* Bar Fill */}
                <motion.div
                  className="h-full rounded-sm relative"
                  style={{ 
                    backgroundColor: item.color,
                  }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: hoveredIndex === index ? `${item.hoverValue}%` : `${item.value}%`,
                    scale: hoveredIndex === index ? 1.02 : 1,
                    filter: hoveredIndex === index 
                      ? `drop-shadow(0 0 12px ${item.glowColor}) drop-shadow(0 0 24px ${item.glowColor}) drop-shadow(0 0 36px ${item.glowColor}) drop-shadow(0 0 48px ${item.glowColor})`
                      : 'none'
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut" 
                  }}
                >
                  {/* Shimmer effect on hover */}
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ 
                        duration: 1.2, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}
                </motion.div>
                
                {/* Outer glow pulse effect */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}20, ${item.color}40, ${item.color}20)`,
                      filter: `blur(8px)`,
                    }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
