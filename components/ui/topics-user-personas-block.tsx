"use client"

import { motion } from "motion/react"
import { useState } from "react"

type PromptItem = {
  type: 'topic' | 'persona'
  name: string
  prompt: string
}

// Sample data with prompts
const promptsData: PromptItem[] = [
  { type: 'topic', name: 'Credit Cards', prompt: 'Best travel credit cards for frequent flyers' },
  { type: 'persona', name: 'Tech Professional', prompt: 'Personal finance and investing basics' },
  { type: 'topic', name: 'Shopping', prompt: 'Why prefer direct-to-consumer brands?' },
  { type: 'persona', name: 'First-time Buyer', prompt: 'How to verify online product reviews' },
  { type: 'topic', name: 'Travel', prompt: 'Find hidden local experiences over tourist spots' },
]

export function TopicsUserPersonasBlock() {
  const [hoveredType, setHoveredType] = useState<'topic' | 'persona' | null>(null)

  return (
    <div className="h-[300px] w-full max-w-full">
      <div className="w-full h-full relative">
        <div className="w-full h-full flex flex-col justify-start space-y-8">
          {promptsData.map((item, index) => {
            const isHighlighted = hoveredType === item.type
            const isDimmed = hoveredType !== null && hoveredType !== item.type
            
            return (
              <motion.div
                key={`${item.type}-${index}`}
                className="relative flex items-center gap-3 cursor-pointer h-10 w-full max-w-full overflow-hidden"
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: isHighlighted ? 1 : isDimmed ? 0.2 : 0.7,
                  scale: isHighlighted ? 1.02 : 1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onMouseEnter={() => setHoveredType(item.type)}
                onMouseLeave={() => setHoveredType(null)}
              >
                {/* Topic/Persona Name - Compact box */}
                <motion.div 
                  className="rounded-sm px-2 py-1 backdrop-blur-sm flex-shrink-0 min-w-[100px]"
                  style={{
                    background: isHighlighted ? "var(--muted)" : "linear-gradient(to top, var(--background), var(--muted))",
                    border: isHighlighted ? "1px solid var(--foreground)" : "1px solid var(--foreground)",
                    boxShadow: isHighlighted ? "0 0 15px var(--foreground)" : "none",
                  }}
                  animate={{
                    background: isHighlighted ? "var(--muted)" : "linear-gradient(to top, var(--background), var(--muted))",
                    border: isHighlighted ? "1px solid var(--foreground)" : "1px solid var(--foreground)",
                    boxShadow: isHighlighted ? "0 0 15px var(--foreground)" : "none",
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="font-semibold text-xl leading-none whitespace-nowrap"
                    style={{
                      color: isHighlighted ? "hsl(var(--primary))" : "inherit",
                    }}
                    animate={{
                      color: isHighlighted ? "hsl(var(--primary))" : "inherit",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.name}
                  </motion.div>
                </motion.div>
                
                {/* Prompt - Larger box */}
                <motion.div 
                  className="rounded-sm px-2 py-1 backdrop-blur-sm flex-1 max-w-[98%] overflow-hidden"
                  style={{
                    background: isHighlighted ? "var(--muted)" : "linear-gradient(to top, var(--background), var(--muted))",
                    border: isHighlighted ? "1px solid var(--foreground)" : "1px solid var(--foreground)",
                    boxShadow: isHighlighted ? "0 0 15px var(--foreground)" : "none",
                  }}
                  animate={{
                    background: isHighlighted ? "var(--muted)" : "linear-gradient(to top, var(--background), var(--muted))",
                    border: isHighlighted ? "1px solid var(--foreground)" : "1px solid var(--foreground)",
                    boxShadow: isHighlighted ? "0 0 15px var(--foreground)" : "none",
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="text-xl leading-none truncate"
                    style={{
                      color: isHighlighted ? "hsl(var(--primary))" : "inherit",
                    }}
                    animate={{
                      color: isHighlighted ? "hsl(var(--primary))" : "inherit",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.prompt}
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
