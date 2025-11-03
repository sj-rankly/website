"use client"

import type React from "react"
import { forwardRef, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface MatrixShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Digital rain speed
   * @default 1.0
   */
  speed?: number
  /**
   * Rain density and column count
   * @default 1.0
   */
  density?: number
  /**
   * Character brightness and contrast
   * @default 1.0
   */
  brightness?: number
  /**
   * Character variation and randomness
   * @default 1.0
   */
  variation?: number
}

const MatrixShaders = forwardRef<HTMLDivElement, MatrixShadersProps>(
  ({ className, speed = 1.0, density = 1.0, brightness = 1.0, variation = 1.0, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationFrameRef = useRef<number>()
    const glRef = useRef<WebGLRenderingContext | null>(null)
    const programRef = useRef<WebGLProgram | null>(null)
    const startTimeRef = useRef<number>(Date.now())

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      // Initialize WebGL
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        console.error("[v0] WebGL not supported")
        return
      }
      glRef.current = gl as WebGLRenderingContext

      // Vertex shader - simple pass-through
      const vertexShaderSource = `
        attribute vec2 a_position;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `

      // Fragment shader - Matrix digital rain effect
      const fragmentShaderSource = `
        precision mediump float;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform float u_speed;
        uniform float u_density;
        uniform float u_brightness;
        uniform float u_variation;

        // Hash function for pseudo-random values
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        // Generate pseudo-random character patterns
        float character(vec2 p, float seed) {
          p = floor(p);
          float h = hash(p + seed);
          
          // Create blocky character patterns
          vec2 charGrid = fract(p * 0.5);
          float char = 0.0;
          
          // Generate different character shapes based on hash
          if(h < 0.2) {
            char = step(0.3, charGrid.x) * step(charGrid.x, 0.7);
          } else if(h < 0.4) {
            char = step(0.3, charGrid.y) * step(charGrid.y, 0.7);
          } else if(h < 0.6) {
            char = (step(0.4, charGrid.x) * step(charGrid.x, 0.6)) + 
                   (step(0.4, charGrid.y) * step(charGrid.y, 0.6));
          } else if(h < 0.8) {
            char = step(0.6, charGrid.x + charGrid.y);
          } else {
            char = step(0.1, abs(charGrid.x - charGrid.y));
          }
          
          return clamp(char, 0.0, 1.0);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          
          // Create column grid based on density
          float columnWidth = 20.0 / u_density;
          vec2 grid = vec2(floor(uv.x * columnWidth), uv.y);
          
          // Time with speed control
          float time = u_time * u_speed;
          
          // Create vertical scrolling effect
          float scrollSpeed = 3.0;
          float scrollY = time * scrollSpeed;
          
          // Calculate character position in grid
          vec2 charPos = vec2(grid.x, floor((uv.y * u_resolution.y / 15.0) + scrollY));
          
          // Create staggered column starts
          float columnOffset = hash(vec2(grid.x, 0.0)) * 10.0;
          charPos.y += columnOffset;
          
          // Generate character at this position
          float charSeed = hash(charPos) + floor(time * 2.0) * u_variation;
          float char = character(charPos * 3.0, charSeed);
          
          // Create trail effect - characters fade as they fall
          float trailLength = 15.0;
          float distFromHead = mod(charPos.y - scrollY, trailLength);
          float trailFade = 1.0 - smoothstep(0.0, trailLength, distFromHead);
          
          // Leading character is brightest (white)
          float leadBrightness = smoothstep(2.0, 0.0, distFromHead);
          
          // Create random column heights and gaps
          float columnHash = hash(vec2(grid.x, floor(scrollY / 30.0)));
          float columnActive = step(0.1, columnHash);
          
          // Combine character visibility
          float visibility = char * trailFade * columnActive * u_brightness;
          
          // Lead characters are bright white, trail fades to dark gray
          vec3 brightWhite = vec3(1.0, 1.0, 1.0);
          vec3 darkGray = vec3(0.1, 0.1, 0.1);
          vec3 trailGray = vec3(0.5, 0.5, 0.5);
          
          // Mix colors based on position in trail
          vec3 charColor = mix(darkGray, trailGray, trailFade);
          charColor = mix(charColor, brightWhite, leadBrightness);
          
          // Apply visibility
          vec3 color = charColor * visibility;
          
          // Black background
          vec3 backgroundColor = vec3(0.0, 0.0, 0.0);
          color = mix(backgroundColor, color, visibility);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `

      // Compile shader
      function compileShader(source: string, type: number): WebGLShader | null {
        const shader = gl.createShader(type)
        if (!shader) return null

        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error("[v0] Shader compile error:", gl.getShaderInfoLog(shader))
          gl.deleteShader(shader)
          return null
        }

        return shader
      }

      // Create program
      const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
      const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

      if (!vertexShader || !fragmentShader) {
        console.error("[v0] Failed to compile shaders")
        return
      }

      const program = gl.createProgram()
      if (!program) {
        console.error("[v0] Failed to create program")
        return
      }

      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("[v0] Program link error:", gl.getProgramInfoLog(program))
        return
      }

      programRef.current = program

      // Set up geometry (full-screen quad)
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

      const positionLocation = gl.getAttribLocation(program, "a_position")
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      // Get uniform locations
      const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
      const timeLocation = gl.getUniformLocation(program, "u_time")
      const speedLocation = gl.getUniformLocation(program, "u_speed")
      const densityLocation = gl.getUniformLocation(program, "u_density")
      const brightnessLocation = gl.getUniformLocation(program, "u_brightness")
      const variationLocation = gl.getUniformLocation(program, "u_variation")

      // Resize canvas to match display size
      function resize() {
        if (!canvas) return
        const displayWidth = canvas.clientWidth
        const displayHeight = canvas.clientHeight

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth
          canvas.height = displayHeight
          gl.viewport(0, 0, canvas.width, canvas.height)
        }
      }

      // Animation loop
      function render() {
        if (!gl || !program) return

        resize()

        // biome-ignore lint/correctness/useHookAtTopLevel: gl.useProgram is a WebGL API method, not a React hook
        gl.useProgram(program)

        // Update uniforms
        const currentTime = (Date.now() - startTimeRef.current) / 1000
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
        gl.uniform1f(timeLocation, currentTime)
        gl.uniform1f(speedLocation, speed)
        gl.uniform1f(densityLocation, density)
        gl.uniform1f(brightnessLocation, brightness)
        gl.uniform1f(variationLocation, variation)

        // Draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

        animationFrameRef.current = requestAnimationFrame(render)
      }

      // Start animation
      resize()
      render()

      // Cleanup
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }, [speed, density, brightness, variation])

    return (
      <div ref={ref} className={cn("relative w-full h-full", className)} {...props}>
        <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
      </div>
    )
  },
)

MatrixShaders.displayName = "MatrixShaders"

export { MatrixShaders }
