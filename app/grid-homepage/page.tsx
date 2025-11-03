"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Target, Shield, TrendingUp, Users, Globe, BarChart3 } from "lucide-react";
import { LotusLogo } from "@/components/lotus-logo";
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import CardStack from "@/components/ui/card-stack"

export default function GridHomepage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Logo - 2 columns */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3">
                <LotusLogo className="w-8 h-8" />
                <span className="text-xl font-bold">Rankly</span>
              </div>
            </div>

            {/* Navigation - 6 columns */}
            <div className="col-span-6 hidden md:grid grid-cols-6 gap-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors text-center">Features</a>
              <a href="#analytics" className="text-gray-300 hover:text-white transition-colors text-center">Analytics</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-center">Pricing</a>
              <a href="#resources" className="text-gray-300 hover:text-white transition-colors text-center">Resources</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors text-center">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-center">Contact</a>
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
          <div className="grid grid-cols-12 gap-8 items-center min-h-[80vh]">
            {/* Left Content - 7 columns */}
            <div className="col-span-12 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Dominate
                  <br />
                  <span className="text-gray-400">AI Search</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl">
                  The only AEO platform that guarantees visibility in ChatGPT, Perplexity, and Claude
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 border border-gray-600 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Watch Demo
                  </button>
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

      {/* Grid Stats Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">780M</div>
              <p className="text-gray-400">Monthly AI Queries</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">26%</div>
              <p className="text-gray-400">Zero-Click Searches</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">50%</div>
              <p className="text-gray-400">Click Reduction</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <p className="text-gray-400">Success Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive CardStack Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Why Choose Rankly?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The only platform built specifically for Generative Engine Optimization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: CardStack */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <CardStack
                images={[
                  {
                    src: "/images/rankly-dashboard-final.png",
                    alt: "AI-First Optimization",
                    title: "AI-First Optimization",
                    description: "Engineered specifically for ChatGPT, Perplexity, and Claude"
                  },
                  {
                    src: "/images/dashboard-analytics.jpg", 
                    alt: "Earned Media Focus",
                    title: "Earned Media Focus",
                    description: "Build authority through third-party sources"
                  },
                  {
                    src: "/images/workflow-interface.png",
                    alt: "Defensive Strategy", 
                    title: "Defensive Strategy",
                    description: "Continuous monitoring and rapid response"
                  },
                  {
                    src: "/images/profound-dashboard.png",
                    alt: "Real-Time Analytics",
                    title: "Real-Time Analytics", 
                    description: "Track performance across all major AI engines"
                  },
                  {
                    src: "/images/parallel-hero.png",
                    alt: "Expert Team",
                    title: "Expert Team",
                    description: "Led by former Google and OpenAI engineers"
                  }
                ]}
                offset={8}
                scaleStep={0.05}
                dimStep={0.12}
                borderRadius={12}
                ratio="4 / 3"
                className="w-full max-w-md"
              />
            </motion.div>

            {/* Right: Feature List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI-First Optimization</h3>
                  <p className="text-gray-400">Engineered specifically for ChatGPT, Perplexity, and Claude. Not adapted from old SEO tactics.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Earned Media Focus</h3>
                  <p className="text-gray-400">Build authority through third-party sources that AI engines trust and cite.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Defensive Strategy</h3>
                  <p className="text-gray-400">Continuous monitoring and rapid response to maintain your AI visibility.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
                  <p className="text-gray-400">Track your performance across all major AI engines with detailed insights.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                  <p className="text-gray-400">Led by former Google and OpenAI engineers who understand AI search algorithms.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid Analytics Section */}
      <section id="analytics" className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Real-Time
                <br />
                <span className="text-gray-400">Performance</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Track your AI visibility across all major engines with our comprehensive analytics dashboard.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl font-bold text-white mb-2">94%</div>
                  <p className="text-gray-400">ChatGPT Visibility</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl font-bold text-white mb-2">87%</div>
                  <p className="text-gray-400">Perplexity Ranking</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl font-bold text-white mb-2">91%</div>
                  <p className="text-gray-400">Claude Citations</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl font-bold text-white mb-2">78%</div>
                  <p className="text-gray-400">Gemini Presence</p>
                </div>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gray-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">AI Engine Performance</h3>
                  <BarChart3 className="w-6 h-6 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">ChatGPT</span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <span className="text-white font-semibold">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Perplexity</span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                    <span className="text-white font-semibold">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Claude</span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <span className="text-white font-semibold">91%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Gemini</span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-white font-semibold">78%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Dominate
                <br />
                <span className="text-gray-400">AI Search?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join the AEO revolution with Rankly's proven methodology. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Free Trial
                </button>
                <a href="https://cal.com/sj-rankly/30min" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-gray-600 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block text-center">
                  Schedule Demo
                </a>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-muted"></div>
              </div>
            </motion.div>
          </div>
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
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
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
