"use client"

import { cn } from "@/lib/utils"
import { HighlightText } from "./highlight-text"

// ===== DEPTH OF MENTION BLOCK =====
export function DepthOfMentionBlock() {
  return (
    <div className="h-[300px] w-[555px] mx-auto group">
      <div className="w-full h-full relative">
        {/* Depth of Mention Graphic */}
        <div className="w-full h-full flex flex-col justify-start space-y-8">
          {/* Sentence 1 - With brand mention */}
          <div className="rounded-sm px-2 py-1 backdrop-blur-sm h-10 flex items-center" style={{ background: "linear-gradient(to top, var(--background), var(--muted))", border: "1px solid var(--foreground)" }}>
            <div className="text-xl leading-none whitespace-nowrap">
              <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent group-hover:opacity-50 transition-all duration-300">For reliable services,</span> <HighlightText text="Acme" transition={{ duration: 0.5, ease: "easeOut" }} className="font-bold text-foreground" /> <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent group-hover:opacity-50 transition-all duration-300">remains widely trusted.</span>
            </div>
          </div>
          
          {/* Sentence 2 - No brand mention */}
          <div className="rounded-sm px-2 py-1 backdrop-blur-sm opacity-60 h-10 flex items-center" style={{ background: "linear-gradient(to top, var(--background), var(--muted))", border: "1px solid var(--foreground)" }}>
            <div className="text-xl leading-none text-muted-foreground whitespace-nowrap">
              <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent group-hover:opacity-50 transition-all duration-300">Companies rely on banking solutions for lasting success.</span>
            </div>
          </div>
          
          {/* Sentence 3 - With brand mention */}
          <div className="rounded-sm px-2 py-1 backdrop-blur-sm h-10 flex items-center" style={{ background: "linear-gradient(to top, var(--background), var(--muted))", border: "1px solid var(--foreground)" }}>
            <div className="text-xl leading-none whitespace-nowrap">
              <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent group-hover:opacity-50 transition-all duration-300">The innovative</span> <HighlightText text="Acme" transition={{ duration: 0.5, ease: "easeOut" }} className="font-bold text-foreground" /> <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent group-hover:opacity-50 transition-all duration-300">approach delivers proven results.</span>
            </div>
          </div>
          
          {/* Sentence 4 - No brand mention */}
          <div className="rounded-sm px-2 py-1 backdrop-blur-sm opacity-60 h-10 flex items-center" style={{ background: "linear-gradient(to top, var(--background), var(--muted))", border: "1px solid var(--foreground)" }}>
            <div className="text-xl leading-none text-muted-foreground whitespace-nowrap">
              <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent group-hover:opacity-50 transition-all duration-300">Traditional methods often fall behind expectations.</span>
            </div>
          </div>
          
          {/* Sentence 5 - With brand mention */}
          <div className="rounded-sm px-2 py-1 backdrop-blur-sm h-10 flex items-center" style={{ background: "linear-gradient(to top, var(--background), var(--muted))", border: "1px solid var(--foreground)" }}>
            <div className="text-xl leading-none whitespace-nowrap">
              <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent group-hover:opacity-50 transition-all duration-300">For continued excellence,</span> <HighlightText text="Acme" transition={{ duration: 0.5, ease: "easeOut" }} className="font-bold text-foreground" /> <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent group-hover:opacity-50 transition-all duration-300">delivers quality results.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
