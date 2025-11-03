"use client"

import { useEffect, useRef } from "react"

export function ElegantHeroVisual() {
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

    // Animation variables
    let time = 0
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      opacity: number
      size: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: (Math.random() * canvas.width) / window.devicePixelRatio,
        y: (Math.random() * canvas.height) / window.devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        size: Math.random() * 2 + 1,
      })
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      time += 0.01

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        rect.width / 2,
        rect.height / 2,
        0,
        rect.width / 2,
        rect.height / 2,
        rect.width / 2,
      )
      gradient.addColorStop(0, "rgba(28, 28, 28, 0.8)")
      gradient.addColorStop(1, "rgba(10, 10, 10, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = rect.width
        if (particle.x > rect.width) particle.x = 0
        if (particle.y < 0) particle.y = rect.height
        if (particle.y > rect.height) particle.y = 0

        // Pulsing opacity
        const pulseOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(time * 2 + index))

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`
        ctx.fill()
      })

      // Draw connecting lines
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

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
    <div className="relative h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ background: "transparent" }} />

      {/* Overlay content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-border/30 bg-card/50 px-4 py-2 text-sm backdrop-blur-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>A Parallel Web for AIs
          </div>

          <div className="mt-8 space-y-2 text-sm text-muted-foreground">
            <div className="animate-pulse">Generative Engine Optimization</div>
            <div className="animate-pulse delay-100">AI Search Visibility</div>
            <div className="animate-pulse delay-200">Future of Search</div>
          </div>
        </div>
      </div>
    </div>
  )
}
