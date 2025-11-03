"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag, User, Calendar, BookOpen, TrendingUp, Target } from "lucide-react";
import { LotusLogo } from "@/components/lotus-logo";
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import Link from "next/link"

export default function GridResourcesPage() {
  const resources = [
    {
      id: 1,
      title: "What is AEO? Why Generative Engine Optimization is the New SEO",
      description: "The complete guide to understanding and implementing AEO strategies for AI search dominance.",
      author: "Rankly Team",
      date: "September 30, 2025",
      readTime: "6 min",
      category: "Insights",
      featured: true,
      image: "/images/rankly-dashboard-final.png"
    },
    {
      id: 2,
      title: "The Future of Search: From Keywords to Conversations",
      description: "How AI-powered search is changing the way users discover information and make decisions.",
      author: "Sarah Chen",
      date: "September 25, 2025",
      readTime: "4 min",
      category: "Strategy",
      featured: false,
      image: "/images/dashboard-analytics.jpg"
    },
    {
      id: 3,
      title: "Building Authority in the Age of AI Search",
      description: "Learn how to establish your brand as a trusted source that AI engines consistently cite.",
      author: "Michael Rodriguez",
      date: "September 20, 2025",
      readTime: "5 min",
      category: "Authority",
      featured: false,
      image: "/images/workflow-interface.png"
    },
    {
      id: 4,
      title: "Case Study: How TechCorp Increased AI Visibility by 300%",
      description: "A detailed breakdown of the strategies that led to dramatic improvements in AI search presence.",
      author: "Jennifer Liu",
      date: "September 15, 2025",
      readTime: "7 min",
      category: "Case Study",
      featured: false,
      image: "/images/profound-dashboard.png"
    },
    {
      id: 5,
      title: "The Psychology of AI Search: Understanding User Intent",
      description: "Deep dive into how AI engines interpret and respond to user queries differently than traditional search.",
      author: "David Park",
      date: "September 10, 2025",
      readTime: "6 min",
      category: "Research",
      featured: false,
      image: "/images/parallel-hero.png"
    },
    {
      id: 6,
      title: "AEO vs SEO: The Fundamental Differences",
      description: "Why traditional SEO tactics fail in AI search and what you need to do instead.",
      author: "Alex Thompson",
      date: "September 5, 2025",
      readTime: "5 min",
      category: "Education",
      featured: false,
      image: "/images/rankly-dashboard-clean.png"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Logo - 2 columns */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center space-x-3">
                <LotusLogo className="w-8 h-8" />
                <span className="text-xl font-bold">Rankly</span>
              </Link>
            </div>

            {/* Navigation - 6 columns */}
            <div className="col-span-6 hidden md:grid grid-cols-6 gap-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors text-center">Home</Link>
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors text-center">Features</Link>
              <Link href="#analytics" className="text-gray-300 hover:text-white transition-colors text-center">Analytics</Link>
              <Link href="/grid-resources" className="text-white font-semibold text-center">Resources</Link>
              <Link href="#about" className="text-gray-300 hover:text-white transition-colors text-center">About</Link>
              <Link href="#contact" className="text-gray-300 hover:text-white transition-colors text-center">Contact</Link>
            </div>

            {/* CTA - 4 columns */}
            <div className="col-span-4 md:col-span-4 flex justify-end">
              <button className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Grid Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left Content - 7 columns */}
            <div className="col-span-12 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  AEO
                  <br />
                  <span className="text-gray-400">Resources</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl">
                  Master the art of AI search optimization with our comprehensive guides, case studies, and insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-400">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span>Expert Guides</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span>Case Studies</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Target className="w-5 h-5 mr-2" />
                    <span>Strategy Tips</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Visual - 5 columns */}
            <div className="col-span-12 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden">
                  <FlickeringGrid />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Featured
              <br />
              <span className="text-gray-400">Resource</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <LotusLogo className="w-6 h-6" />
                  <span className="text-sm font-medium">by Rankly</span>
                </div>
                <div className="text-sm text-gray-400">September 30, 2025</div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                What is AEO? Why Generative Engine Optimization is the New SEO
              </h3>
              
              <p className="text-lg text-gray-400 mb-6">
                The complete guide to understanding and implementing AEO strategies for AI search dominance. Learn why traditional SEO is dead and how to optimize for ChatGPT, Perplexity, and Claude.
              </p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center text-sm text-gray-400">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium uppercase tracking-wider">Insights</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>6 min read</span>
                </div>
              </div>
              
              <Link 
                href="/resources/what-is-aeo"
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Read Full Article
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-800 rounded-2xl overflow-hidden">
                <FlickeringGrid />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Latest
              <br />
              <span className="text-gray-400">Resources</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Stay ahead of the curve with our latest insights, case studies, and strategic guides.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.slice(1).map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-colors group"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium uppercase tracking-wider">
                      {resource.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{resource.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="w-4 h-4 mr-2" />
                      <span>{resource.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{resource.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Get the latest AEO insights, case studies, and strategies delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
              <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Footer */}
      <footer className="py-16 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <LotusLogo className="w-8 h-8" />
                <span className="text-xl font-bold">Rankly</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                The only AEO platform that guarantees visibility in AI search engines.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Analytics</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">API</a>
              </div>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Blog</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Case Studies</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Support</a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm">
                © 2025 Rankly. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
