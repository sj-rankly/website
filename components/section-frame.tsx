import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
  noRulers?: boolean
}

export function SectionFrame({ children, className, noRulers = false }: Props) {
  return (
    <div
      className={cn(
        // container
        "relative mx-auto max-w-5xl",
        noRulers
          ? undefined
          : "sm:before:content-[''] sm:after:content-[''] sm:before:absolute sm:after:absolute sm:before:inset-y-0 sm:after:inset-y-0 sm:before:left-0 sm:after:right-0 sm:before:w-px sm:after:w-px sm:before:border-l sm:after:border-r sm:before:border-dashed sm:after:border-dashed sm:before:border-border/60 sm:after:border-border/60",
        className,
      )}
    >
      <div className="px-1">{children}</div>
    </div>
  )
}
