"use client"

import { useState } from "react"
import { motion } from "motion/react"

interface PlatformData {
  name: string
  value: number
  icon: string
  color: string
}

const platforms: PlatformData[] = [
  { name: "ChatGPT", value: 67, icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=32", color: "oklch(var(--primary))" },
  { name: "Perplexity", value: 89, icon: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=32", color: "oklch(var(--primary))" },
  { name: "Claude", value: 34, icon: "https://www.google.com/s2/favicons?domain=claude.ai&sz=32", color: "oklch(var(--primary))" },
  { name: "Gemini", value: 92, icon: "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=32", color: "oklch(var(--primary))" },
  { name: "Copilot", value: 45, icon: "https://www.google.com/s2/favicons?domain=copilot.microsoft.com&sz=32", color: "oklch(var(--primary))" },
  { name: "Grok", value: 58, icon: "https://www.google.com/s2/favicons?domain=x.ai&sz=32", color: "oklch(var(--primary))" }
]

export function PlatformCard() {
  const [isHovered, setIsHovered] = useState(false)
  const [activePlatform, setActivePlatform] = useState<number | null>(null)

  // Add intense delta changes to heights on hover
  const sortedPlatforms = platforms.map((platform, index) => ({
    ...platform,
    value: isHovered ? platform.value + (Math.sin(index) * 35) : platform.value
  }))

  return (
    <div className="h-[300px] w-[555px] mx-auto">
      <div 
        className="w-full h-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 bottom-0 left-6 right-6 flex justify-between gap-4 pt-2 pb-2">
            {sortedPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="flex flex-col items-center flex-1 group cursor-pointer justify-end"
                initial={{ scale: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={() => setActivePlatform(index)}
                onMouseLeave={() => setActivePlatform(null)}
              >
                {/* Bar Graph Container */}
                <div className="flex flex-col justify-end w-full mb-3" style={{ height: '240px' }}>
                  <motion.div
                    className="w-8 rounded-t-lg relative mx-auto border-none"
                    style={{
                      background: "linear-gradient(to top, var(--background), var(--muted))",
                      minHeight: "4px",
                      height: `${(platform.value / 100) * 200}px`,
                      boxShadow: "0 0 15px var(--foreground)",
                      border: "1px solid var(--foreground)"
                    }}
                    animate={{
                      height: `${(platform.value / 100) * 200}px`,
                      transition: { 
                        duration: 1.5, 
                        ease: "easeInOut"
                      }
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px var(--foreground)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Empty content - motion effects are in the div itself */}
                  </motion.div>
                </div>

                {/* Platform Icon */}
                <motion.div
                  className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center mb-1"
                  animate={{
                    scale: activePlatform === index ? 1.2 : 1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <img 
                    src={platform.icon} 
                    alt={`${platform.name} favicon`}
                    className="w-5 h-5 rounded-sm"
                    onError={(e) => {
                      // Fallback to emoji if favicon fails to load
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.parentElement?.querySelector('.fallback-emoji') as HTMLElement
                      if (fallback) fallback.style.display = 'block'
                    }}
                  />
                  <span className="fallback-emoji text-lg hidden">
                    {platform.name === "ChatGPT" ? "🤖" : 
                     platform.name === "Perplexity" ? "🔍" : 
                     platform.name === "Claude" ? "🧠" : 
                     platform.name === "Gemini" ? "💎" : 
                     platform.name === "Copilot" ? "🚀" : 
                     platform.name === "Grok" ? "⚡" : "❓"}
                  </span>
                </motion.div>

                {/* Platform Name */}
                <motion.div
                  className="text-xs text-center font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-300 mb-0"
                  animate={{
                    color: activePlatform === index ? "hsl(var(--primary))" : "inherit",
                    transition: { duration: 0.2 }
                  }}
                >
                  {platform.name}
                </motion.div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}
