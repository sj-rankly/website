"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProductDemoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section id="demo" ref={sectionRef} className="relative w-full">
      <div className="mx-auto max-w-7xl relative">
        {/* Content aligned with container rulers */}
        <div className="px-6 md:px-8 pt-16 pb-20">
          <div className="flex w-full flex-col items-center justify-center">
            <h2 className="relative z-20 py-2 text-center font-sans text-3xl font-semibold tracking-tight md:text-4xl md:py-4 lg:text-5xl">
              See Rankly in Action
            </h2>
            <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg mt-4">
              Experience how Rankly connects AI visibility to real website performance. Schedule a personalized demo to explore the platform.
            </p>
            
            {/* CTA Button */}
            <div className="mt-6">
              <Link href="https://cal.com/sj-rankly/30min" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="sm"
                  className="h-9 rounded-full bg-white text-black hover:bg-white/90 px-6 text-sm font-medium"
                >
                  Book a Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom horizontal ruler - aligned exactly with container rulers (left: 0, right: 0 of max-w-7xl) */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
        
      </div>
    </section>
  );
}
