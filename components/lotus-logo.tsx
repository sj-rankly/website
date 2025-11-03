import type * as React from "react"

type LotusLogoProps = React.SVGProps<SVGSVGElement> & {
  size?: number
  strokeWidth?: number
}

/**
 * LotusLogo
 * - Solid by default (fill = currentColor) with crisp stroke outlines
 * - On hover of a parent with `group`, the fill fades out to show just the border
 * - Uses currentColor so `text-foreground` (or any text color) controls the logo color
 */
export function LotusLogo({ size = 24, strokeWidth = 2, className, ...props }: LotusLogoProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      width={size}
      height={(size * 80) / 120}
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {/* Center petal */}
      <path
        d="M60 6 C55 20, 55 42, 60 56 C65 42, 65 20, 60 6 Z"
        className="fill-current stroke-current transition-colors duration-200 group-hover:fill-transparent"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Inner left petal */}
      <path
        d="M44 12 C34 22, 33 41, 47 54 C49 39, 47 23, 44 12 Z"
        className="fill-current stroke-current transition-colors duration-200 group-hover:fill-transparent"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Inner right petal */}
      <path
        d="M76 12 C73 23, 71 39, 73 54 C87 41, 86 22, 76 12 Z"
        className="fill-current stroke-current transition-colors duration-200 group-hover:fill-transparent"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Outer left petal */}
      <path
        d="M30 20 C16 30, 18 52, 45 58 C39 43, 34 29, 30 20 Z"
        className="fill-current stroke-current transition-colors duration-200 group-hover:fill-transparent"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Outer right petal */}
      <path
        d="M90 20 C86 29, 81 43, 75 58 C102 52, 104 30, 90 20 Z"
        className="fill-current stroke-current transition-colors duration-200 group-hover:fill-transparent"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Outer far left */}
      <path
        d="M18 28 C4 40, 8 62, 40 64 C32 50, 24 35, 18 28 Z"
        className="fill-current stroke-current transition-colors duration-200 group-hover:fill-transparent"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Outer far right */}
      <path
        d="M102 28 C96 35, 88 50, 80 64 C112 62, 116 40, 102 28 Z"
        className="fill-current stroke-current transition-colors duration-200 group-hover:fill-transparent"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Bottom lobes */}
      <path
        d="M60 56 C48 62, 46 72, 60 74 C74 72, 72 62, 60 56 Z"
        className="fill-current stroke-current transition-colors duration-200 group-hover:fill-transparent"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default LotusLogo
