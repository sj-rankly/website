"use client";

import React, { useState, useEffect, useRef } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountingNumber } from "@/components/ui/counting-number";

const Waitlist1 = () => {
  const [isInView, setIsInView] = useState(false);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubmitStatus("error");
      return;
    }

    // Immediately show success message (optimistic update)
    const emailToSubmit = email;
    setSubmitStatus("success");
    setEmail("");

    // Submit in the background
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToSubmit }),
      });

      if (!response.ok) {
        // If submission fails, revert to error state
        setSubmitStatus("error");
        setEmail(emailToSubmit);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      // If submission fails, revert to error state
      setSubmitStatus("error");
      setEmail(emailToSubmit);
    }
  };

  return (
    <section id="waitlist" ref={sectionRef} className="relative w-full">
      <div className="mx-auto max-w-7xl relative">
        {/* Content aligned with container rulers */}
        <div className="px-6 md:px-8 pt-24 pb-40">
          <div className="flex w-full flex-col items-center justify-center">
            <h2 className="relative z-20 py-2 text-center font-sans text-5xl font-semibold tracking-tighter md:py-10 lg:text-8xl">
              Join the Waitlist
            </h2>
            <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
              Secure your spot to explore Rankly before public release — the complete Answer Engine Analytics suite.
            </p>
            
            {/* Email section - changes on success */}
            {submitStatus === "success" ? (
              // Success state - show thank you message in place of the email form
              <div className="w-full max-w-md mx-auto mt-10">
                <div className="relative z-20 flex w-full items-center justify-center rounded-full p-1">
                  <div className="flex-1 px-4 py-3 text-center">
                    <p className="text-sm font-medium">Thanks for submitting your email</p>
                    <p className="text-xs text-muted-foreground mt-1">We will get back to you soon!</p>
                  </div>
                </div>
              </div>
            ) : (
              // Default state - show email form
              <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                <div className="relative z-20 mt-10 flex w-full items-center rounded-full border border-border bg-background p-1">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent h-10 flex-1 rounded-xl border-0 shadow-none ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-0 active:ring-0"
                    placeholder="Enter your email"
                    required
                  />
                  <Button 
                    type="submit"
                    className="h-10 rounded-xl bg-white text-black hover:bg-white/90 ml-2"
                  >
                    Join the Waitlist
                  </Button>
                </div>
                {submitStatus === "error" && (
                  <p className="mt-4 text-center text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
            
            <div className="mt-10 flex items-center justify-center space-x-3">
              {/* Avatar group */}
              <div className="flex -space-x-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Avatar
                    key={index}
                    className="size-8 ring-2 ring-background"
                  >
                    <AvatarImage
                      src={`https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar${index + 1}.png`}
                      alt="placeholder"
                    />
                  </Avatar>
                ))}
              </div>

              {/* Text */}
              <div className="flex items-center text-sm text-muted-foreground/80 tracking-tight">
                <CountingNumber 
                  value={isInView ? 350 : 1000} 
                  duration={2} 
                  startFrom={isInView ? 1 : undefined}
                />
                <span className="ml-1">people already joined</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom horizontal ruler - aligned exactly with container rulers (left: 0, right: 0 of max-w-7xl) */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
        
      </div>
    </section>
  );
};

export { Waitlist1 as WaitlistSection };
