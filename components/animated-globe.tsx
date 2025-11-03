"use client"

import { useEffect, useRef } from "react"

export function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Globe parameters
    const centerX = canvas.offsetWidth / 2
    const centerY = canvas.offsetHeight / 2
    const radius = Math.min(centerX, centerY) * 0.6
    let rotation = 0

    // Stars background
    const stars: { x: number; y: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 2,
        opacity: Math.random() * 0.8 + 0.2,
      })
    }

    // Globe grid lines
    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.6})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Globe base circle
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Longitude lines
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 + rotation
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + Math.sin(angle) * 0.1})`
        ctx.beginPath()

        for (let j = 0; j <= 100; j++) {
          const lat = (j / 100) * Math.PI - Math.PI / 2
          const x = centerX + radius * Math.cos(lat) * Math.sin(angle)
          const y = centerY + radius * Math.sin(lat)
          const z = radius * Math.cos(lat) * Math.cos(angle)

          if (z > 0) {
            const opacity = (z / radius) * 0.8 + 0.2
            ctx.globalAlpha = opacity
            if (j === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // Latitude lines
      for (let i = 0; i < 8; i++) {
        const lat = ((i - 4) * Math.PI) / 8
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
        ctx.beginPath()

        for (let j = 0; j <= 100; j++) {
          const lon = (j / 100) * Math.PI * 2 + rotation
          const x = centerX + radius * Math.cos(lat) * Math.sin(lon)
          const y = centerY + radius * Math.sin(lat)
          const z = radius * Math.cos(lat) * Math.cos(lon)

          if (z > 0) {
            const opacity = (z / radius) * 0.6 + 0.2
            ctx.globalAlpha = opacity
            if (j === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // Glowing dots on intersections
      for (let i = 0; i < 50; i++) {
        const lat = (Math.random() - 0.5) * Math.PI
        const lon = Math.random() * Math.PI * 2 + rotation
        const x = centerX + radius * Math.cos(lat) * Math.sin(lon)
        const y = centerY + radius * Math.sin(lat)
        const z = radius * Math.cos(lat) * Math.cos(lon)

        if (z > 0) {
          const opacity = (z / radius) * 0.8
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 3)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const animate = () => {
      rotation += 0.005
      drawGlobe()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <canvas ref={canvasRef} className="h-full w-full" style={{ background: "transparent" }} />

      {/* Center search bar overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-background/90 px-6 py-3 backdrop-blur-sm border border-border/50">
          <span className="text-sm text-muted-foreground">A Rankly Web for AIs</span>
        </div>
      </div>
    </div>
  )
}
