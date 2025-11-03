"use client"

import type React from "react"
import { useRef, useEffect, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface SeaShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number
  waveHeight?: number
  waveFrequency?: number
  perspective?: number
  atmosphere?: number
}

export const SeaShaders = forwardRef<HTMLDivElement, SeaShadersProps>(
  (
    { className, speed = 0.3, waveHeight = 0.6, waveFrequency = 0.16, perspective = 1.5, atmosphere = 1.0, ...props },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * window.devicePixelRatio
        canvas.height = rect.height * window.devicePixelRatio
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      let time = 0

      // Simple noise function
      const noise = (x: number, y: number) => {
        const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
        return n - Math.floor(n)
      }

      // Smooth noise with interpolation
      const smoothNoise = (x: number, y: number) => {
        const x0 = Math.floor(x)
        const y0 = Math.floor(y)
        const fx = x - x0
        const fy = y - y0

        const n00 = noise(x0, y0)
        const n10 = noise(x0 + 1, y0)
        const n01 = noise(x0, y0 + 1)
        const n11 = noise(x0 + 1, y0 + 1)

        const smoothX = fx * fx * (3 - 2 * fx)
        const smoothY = fy * fy * (3 - 2 * fy)

        const n0 = n00 * (1 - smoothX) + n10 * smoothX
        const n1 = n01 * (1 - smoothX) + n11 * smoothX

        return n0 * (1 - smoothY) + n1 * smoothY
      }

      // Wave calculation
      const getWaveHeight = (x: number, z: number, t: number) => {
        const freq = waveFrequency * 0.02
        const amp = waveHeight * 30

        let height = 0
        height += Math.sin(x * freq + t * speed * 2) * amp
        height += Math.sin(z * freq * 0.7 + t * speed * 1.5) * amp * 0.8
        height += Math.sin(x * freq * 2.3 + t * speed * 3.2) * amp * 0.4
        height += smoothNoise(x * freq * 2 + t * speed, z * freq * 2 + t * speed) * amp * 0.3

        return height
      }

      const animate = () => {
        time += 0.016

        const width = canvas.width
        const height = canvas.height

        // Create gradient background (sky)
        const skyGradient = ctx.createLinearGradient(0, 0, 0, height)
        skyGradient.addColorStop(0, "#a0a0a0") // Medium gray
        skyGradient.addColorStop(0.5, "#d0d0d0") // Light gray
        skyGradient.addColorStop(1, "#f0f0f0") // Almost white

        ctx.fillStyle = skyGradient
        ctx.fillRect(0, 0, width, height)

        // Draw ocean waves
        const horizonY = height * (0.5 - perspective * 0.15)
        const waveLines = 60

        for (let i = 0; i < waveLines; i++) {
          const z = i / waveLines
          const y = horizonY + z * height * 0.6

          // Perspective scaling
          const scale = 1 + z * 2
          const waveDetail = Math.floor(50 * scale)

          ctx.beginPath()

          for (let x = 0; x <= waveDetail; x++) {
            const xPos = (x / waveDetail) * width
            const worldX = (x / waveDetail - 0.5) * 500 * scale
            const worldZ = z * 200 + time * speed * 20

            const waveY = getWaveHeight(worldX, worldZ, time) / (1 + z * 3)

            const screenY = y + waveY * (1 + z)

            if (x === 0) {
              ctx.moveTo(xPos, screenY)
            } else {
              ctx.lineTo(xPos, screenY)
            }
          }

          // Close the wave to bottom
          ctx.lineTo(width, height)
          ctx.lineTo(0, height)
          ctx.closePath()

          // Create gradient for ocean depth - pure grayscale
          const waveGradient = ctx.createLinearGradient(0, y, 0, height)
          
          // Depth-based grayscale colors
          const depthFactor = z
          const lightGray = 190 - depthFactor * 120 // Gets darker with depth
          const darkGray = 60 - depthFactor * 40

          waveGradient.addColorStop(0, `rgb(${lightGray}, ${lightGray}, ${lightGray})`)
          waveGradient.addColorStop(1, `rgb(${darkGray}, ${darkGray}, ${darkGray})`)

          ctx.fillStyle = waveGradient
          ctx.fill()

          // Add white foam/highlights on wave peaks
          if (i % 3 === 0) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - z)})`
            ctx.lineWidth = 1 + z
            ctx.stroke()
          }
        }

        // Add atmospheric fog
        const fogGradient = ctx.createLinearGradient(0, horizonY, 0, height)
        fogGradient.addColorStop(0, `rgba(220, 220, 220, ${0.3 * atmosphere})`)
        fogGradient.addColorStop(1, "rgba(220, 220, 220, 0)")
        ctx.fillStyle = fogGradient
        ctx.fillRect(0, horizonY, width, height - horizonY)

        animationRef.current = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener("resize", resizeCanvas)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [speed, waveHeight, waveFrequency, perspective, atmosphere])

    return (
      <div ref={ref} className={cn("relative w-full h-full overflow-hidden", className)} {...props}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ width: "100%", height: "100%" }} />
      </div>
    )
  },
)

SeaShaders.displayName = "SeaShaders"