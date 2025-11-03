"use client";
import React, { forwardRef, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface SingularityShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  intensity?: number;
  size?: number;
  waveStrength?: number;
  colorShift?: number;
}

export const SingularityShaders = forwardRef<HTMLDivElement, SingularityShadersProps>(({
  className,
  speed = 1.0,
  intensity = 1.0,
  size = 1.0,
  waveStrength = 1.0,
  colorShift = 1.0,
  ...props
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      console.error("[SingularityShaders] WebGL not supported");
      return;
    }
    glRef.current = gl;

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Converted Shadertoy shader to standard GLSL
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_speed;
      uniform float u_intensity;
      uniform float u_size;
      uniform float u_waveStrength;
      uniform float u_colorShift;

      void main() {
        float i = 0.2 * u_speed;
        float a;
        vec2 r = u_resolution;
        vec2 F = gl_FragCoord.xy;
        vec2 p = (F + F - r) / r.y / (0.7 * u_size);
        vec2 d = vec2(-1.0, 1.0);
        vec2 b = p - i * d;
        vec2 c = p * mat2(1.0, 1.0, d / (0.1 + i / dot(b, b)));
        float angle = 0.5 * log(a = dot(c, c)) + u_time * i * u_speed;
        vec2 v = c * mat2(
          cos(angle + 0.0), cos(angle + 33.0),
          cos(angle + 11.0), cos(angle + 0.0)
        ) / i;
        vec2 w = vec2(0.0);
        
        for(float j = 0.0; j < 9.0; j++) {
          i += 1.0;
          w += 1.0 + sin(v * u_waveStrength);
          v += 0.7 * sin(v.yx * i + u_time * u_speed) / i + 0.5;
        }
        
        i = length(sin(v / 0.3) * 0.4 + c * (3.0 + d));
        vec4 colorGrad = vec4(0.6, -0.4, -1.0, 0.0) * u_colorShift;
        
        vec4 O = 1.0 - exp(-exp(c.x * colorGrad)
                          / vec4(w.x, w.y, w.y, w.x)
                          / (2.0 + i * i / 4.0 - i)
                          / (0.5 + 1.0 / a)
                          / (0.03 + abs(length(p) - 0.7))
                          * u_intensity);
        
        gl_FragColor = O;
      }
    `;

    const webgl = gl as WebGLRenderingContext;

    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = webgl.createShader(type);
      if (!shader) return null;

      webgl.shaderSource(shader, source);
      webgl.compileShader(shader);

      if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
        console.error("[SingularityShaders] Shader compile error:", webgl.getShaderInfoLog(shader));
        webgl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    const vertexShader = compileShader(vertexShaderSource, webgl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, webgl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      console.error("[SingularityShaders] Failed to compile shaders");
      return;
    }

    const program = webgl.createProgram();
    if (!program) {
      console.error("[SingularityShaders] Failed to create program");
      return;
    }

    webgl.attachShader(program, vertexShader);
    webgl.attachShader(program, fragmentShader);
    webgl.linkProgram(program);

    if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
      console.error("[SingularityShaders] Program link error:", webgl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;

    // Set up geometry (full-screen quad)
    const positionBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), webgl.STATIC_DRAW);

    const positionLocation = webgl.getAttribLocation(program, "a_position");
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = webgl.getUniformLocation(program, "u_resolution");
    const timeLocation = webgl.getUniformLocation(program, "u_time");
    const speedLocation = webgl.getUniformLocation(program, "u_speed");
    const intensityLocation = webgl.getUniformLocation(program, "u_intensity");
    const sizeLocation = webgl.getUniformLocation(program, "u_size");
    const waveStrengthLocation = webgl.getUniformLocation(program, "u_waveStrength");
    const colorShiftLocation = webgl.getUniformLocation(program, "u_colorShift");

    function resize() {
      if (!canvas || !webgl) return;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        webgl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    function render() {
      if (!webgl || !program || !canvas) return;

      resize();

      webgl.useProgram(program);

      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      if (resolutionLocation) webgl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      if (timeLocation) webgl.uniform1f(timeLocation, currentTime);
      if (speedLocation) webgl.uniform1f(speedLocation, speed);
      if (intensityLocation) webgl.uniform1f(intensityLocation, intensity);
      if (sizeLocation) webgl.uniform1f(sizeLocation, size);
      if (waveStrengthLocation) webgl.uniform1f(waveStrengthLocation, waveStrength);
      if (colorShiftLocation) webgl.uniform1f(colorShiftLocation, colorShift);

      webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);

      animationFrameRef.current = requestAnimationFrame(render);
    }

    resize();
    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, intensity, size, waveStrength, colorShift]);

  return (
    <div ref={ref} className={cn("relative w-full h-full overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block", margin: "0 auto" }} />
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-40 md:h-48 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-[4]" />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-48 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-[4]" />
    </div>
  );
});

SingularityShaders.displayName = "SingularityShaders";
