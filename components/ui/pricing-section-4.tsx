"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check } from "lucide-react";

export function PricingSection4() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      description: "Answer Engine Analytics only",
      monthlyPrice: 99,
      annualPrice: Math.round(99 * 12 * 0.9), // 10% discount
      features: [
        "Answer Engine Analytics",
        "Track 5 Answer Engines",
        "Track 100 Prompts",
        "Weekly tracking",
        "Up to 1 account",
        "Email Support"
      ],
      isPopular: false
    },
    {
      name: "Standard", 
      description: "AEO + Traffic + Actionables",
      monthlyPrice: 499,
      annualPrice: Math.round(499 * 12 * 0.9), // 10% discount
      features: [
        "Answer Engine Analytics",
        "Traffic Analytics",
        "Actionables",
        "Track 10 Answer Engines",
        "Track 200 Prompts",
        "Up to 2 accounts",
        "Daily tracking",
        "Slack support"
      ],
      isPopular: false
    },
    {
      name: "Enterprise",
      description: "Full suite with dedicated success",
      monthlyPrice: null,
      annualPrice: null,
      features: [
        "Answer Engine Analytics",
        "Traffic Analytics",
        "Actionables",
        "Track 10 Answer Engines",
        "Track 400 Prompts",
        "Up to 2 accounts",
        "Daily tracking",
        "24*7 Dedicated CS Manager"
      ],
      isPopular: true,
      custom: true
    }
  ];

  return (
    <section id="pricing" className="relative px-6 bg-background">
      <div className="max-w-7xl mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 text-sm font-medium text-brand/70 bg-muted border border-white/30 rounded-full mb-4" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)' }}>
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 border-b-0 pb-0">
            Flexible pricing for every brand to scale AI Visibility and Analytics
          </h2>
          <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto mb-8 font-light">
            From startups to global enterprises, Rankly provides complete Answer Engine Analytics to monitor, benchmark, and accelerate your brand's performance across LLMs.
          </p>
          
          {/* Toggle */}
          <ToggleGroup 
            type="single" 
            value={isAnnual ? "annual" : "monthly"}
            onValueChange={(value) => {
              if (value) setIsAnnual(value === "annual");
            }}
            variant="outline"
            className="inline-flex bg-muted/30 border border-border rounded-lg p-1"
          >
            <ToggleGroupItem value="monthly" aria-label="Monthly billing" className="data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=off]:text-muted-foreground">
              Monthly
            </ToggleGroupItem>
            <ToggleGroupItem value="annual" aria-label="Annual billing" className="data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=off]:text-muted-foreground">
              Annually
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Pricing Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 pt-8">
          {/* Grid rulers overlay - only for the 3-column section */}
          <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
            {/* Top & Bottom horizontal rulers */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
            {/* Vertical rulers */}
            <div className="absolute inset-y-0 left-0 w-[1.5px] bg-border opacity-90"></div>
            <div className="absolute inset-y-0 right-0 w-[1.5px] bg-border opacity-90"></div>
            <div className="absolute inset-y-0 w-[1.5px] bg-border opacity-90" style={{ left: "33.333%" }}></div>
            <div className="absolute inset-y-0 w-[1.5px] bg-border opacity-90" style={{ left: "66.666%" }}></div>
          </div>
          
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className="relative p-6"
            >
              <div className="text-center pb-4">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground/80 font-light">
                  {plan.description}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-6">
                  { (plan as any).custom ? (
                    <span className="text-4xl font-semibold">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold">
                        ${isAnnual ? (plan as any).annualPrice : (plan as any).monthlyPrice}
                      </span>
                      <span className="text-muted-foreground/80 font-light">/{isAnnual ? 'year' : 'month'}</span>
                      {isAnnual && (
                        <div className="mt-2 text-sm text-brand/70 font-light">
                          Save 10% with annual billing
                        </div>
                      )}
                    </>
                  ) }
                </div>
                
                <Button 
                  className="w-[200px] mx-auto mb-6 h-8 text-xs bg-white text-black hover:bg-white/90 border border-border font-normal"
                >
                  Purchase plan
                </Button>
                
                <div className="space-y-3 text-left inline-block mx-auto">
                  <h4 className="font-medium text-sm text-muted-foreground/80">
                    What's included:
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-brand/60 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-light text-muted-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
