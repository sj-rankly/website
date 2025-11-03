"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { RanklyFooter } from "@/components/rankly-footer"
import { LotusLogo } from "@/components/lotus-logo"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { ProductDemoSection } from "@/components/product-demo-section"
import { FAQSection2 } from "@/components/ui/faq-section-2"
 
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResourcesPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Blog data with dates (in descending order - newest first)
  const blogs = [
    {
      id: 1,
      title: "How AI is Transforming Frontend Development",
      description: "Explore how tools like GitHub Copilot, AI design generators, and code assistants are changing the way developers build UIs and ship features faster.",
      href: "#",
      date: new Date("2024-12-15"), // 15 December
    },
    {
      id: 2,
      title: "What is AEO? Why Generative Engine Optimization is the New SEO",
      description: "Understand how Answer Engine Optimization is reshaping digital visibility across AI answer engines.",
      href: "/blogs/what-is-aeo",
      date: new Date("2024-11-20"), // 20 November
    },
    {
      id: 3,
      title: "5 VS Code Extensions That Will Save You Hours",
      description: "Discover must-have extensions to boost your coding efficiency and streamline your workflow.",
      href: "#",
      date: new Date("2024-10-10"), // 10 October
    },
    {
      id: 4,
      title: "Time Management for Developers: What Really Works",
      description: "Learn proven strategies to avoid burnout and stay on top of your tasks without stress.",
      href: "#",
      date: new Date("2024-09-05"), // 5 September
    },
  ]

  // Sort by date descending (newest first) - already sorted but ensuring
  const sortedBlogs = [...blogs].sort((a, b) => b.date.getTime() - a.date.getTime())
  const latestBlog = sortedBlogs[0]
  const otherBlogs = sortedBlogs.slice(1)

  // Format date as "date month"
  const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    return `${day} ${month}`
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section */}
      <section
        className="relative py-24 px-6"
        style={{
          backgroundImage:
            "radial-gradient(var(--tw-prose-muted, rgba(0,0,0,0.08)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Main Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Blogs
              </h1>
              <p className="text-lg text-muted-foreground">
                Data-backed perspectives, written to engage curious minds and decision-makers alike.
              </p>

              {isSubmitted ? (
                <div className="flex items-center gap-2 max-w-xl">
                  <div className="flex-1 flex items-center rounded-full border border-border overflow-hidden bg-background px-4 py-3">
                    <p className="text-sm text-foreground font-normal">
                      Thanks, you will now get regular updates from Rankly!
                    </p>
                  </div>
                  <div className="w-[120px]"></div>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const email = formData.get('email') as string;
                    
                    if (!email || !email.includes('@')) {
                      return;
                    }

                    // Optimistic update - show success immediately
                    setIsSubmitted(true);

                    // Submit in the background
                    try {
                      await fetch('/api/waitlist', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                      });
                    } catch (error) {
                      console.error('Error submitting email:', error);
                      // Optionally revert on error
                      // setIsSubmitted(false);
                    }
                  }}
                  className="flex items-center gap-2 max-w-xl"
                >
                  <div className="flex-1 flex items-center rounded-full border border-border overflow-hidden bg-background">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your work email"
                      className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="rounded-full px-5">
                    Get latest blogs →
                  </Button>
                </form>
              )}
            </div>

            {/* Right Column - Latest Blog Hero */}
            <div className="rounded-xl border border-border bg-card text-card-foreground overflow-hidden">
              {/* Split: top graphic, bottom content */}
              <div className="flex flex-col">
                <div className="relative h-56 flex items-center justify-center overflow-hidden">
                  {/* Full-width Flickering Grid background */}
                  <FlickeringGrid
                    className="absolute inset-0 z-0"
                    squareSize={4}
                    gridGap={6}
                    color="rgb(100, 100, 100)"
                    maxOpacity={0.25}
                    flickerChance={0.2}
                  />
                </div>
                <div className="px-6 py-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {formatDate(latestBlog.date)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    {latestBlog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {latestBlog.description}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={latestBlog.href} className="no-underline">Discover the Future →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Blogs Section */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl relative px-6 md:px-8">
          
          <h2 className="text-3xl font-bold mb-8">All Blogs</h2>
          
          {/* Filters removed per request */}

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherBlogs.map((blog) => (
              <Card key={blog.id} className="group hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader>
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden mb-4 bg-black">
                    <FlickeringGrid
                      className="absolute inset-0"
                      squareSize={4}
                      gridGap={6}
                      color="rgb(100,100,100)"
                      maxOpacity={0.2}
                      flickerChance={0.15}
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {formatDate(blog.date)}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-bold">
                    {blog.title}
                  </CardTitle>
                  <CardDescription>
                    {blog.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2 mt-auto flex justify-end">
                  <Button asChild variant="outline" className="w-auto px-4 bg-transparent hover:bg-transparent">
                    <Link href={blog.href} className="no-underline">Read more →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Product Demo Section */}
      <ProductDemoSection />

      {/* FAQ Section */}
      <FAQSection2 />

      <RanklyFooter />
    </main>
  )
}
