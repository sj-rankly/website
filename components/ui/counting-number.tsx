"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

interface CountingNumberProps {
  value: number
  duration?: number
  className?: string
  startFrom?: number
}

export function CountingNumber({ 
  value, 
  duration = 2, 
  className,
  startFrom = 0
}: CountingNumberProps) {
  const [count, setCount] = useState(startFrom)

  useEffect(() => {
    setCount(startFrom)
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const range = value - startFrom
      const currentCount = Math.floor(startFrom + (easeOutQuart * range))
      
      setCount(currentCount)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration, startFrom])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count.toLocaleString()}
    </motion.span>
  )
}
