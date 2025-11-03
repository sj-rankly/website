"use client";

import { cn } from "@/lib/utils";

interface BackgroundLinesProps {
  className?: string;
  children?: React.ReactNode;
}

export const BackgroundLines = ({ className, children }: BackgroundLinesProps) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Lines */}
      <div className="absolute inset-0">
        {/* Vertical Lines */}
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        
        {/* Horizontal Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        {/* Corner Dots */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-border rounded-full" />
        <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-border rounded-full" />
        <div className="absolute top-1/4 left-3/4 w-1 h-1 bg-border rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-border rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-border rounded-full" />
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-border rounded-full" />
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-border rounded-full" />
        <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-border rounded-full" />
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-border rounded-full" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
