"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  MousePointer, 
  Users, 
  Globe, 
  BarChart3, 
  PieChart,
  Activity,
  Target,
  Zap,
  Shield,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { LotusLogo } from "@/components/lotus-logo"

export default function GridDashboard() {
  const metrics = [
    {
      title: "Total AI Queries",
      value: "2.4M",
      change: "+12.5%",
      trend: "up",
      icon: Globe,
      color: "blue"
    },
    {
      title: "ChatGPT Visibility",
      value: "94.2%",
      change: "+3.1%",
      trend: "up",
      icon: Target,
      color: "green"
    },
    {
      title: "Perplexity Ranking",
      value: "87.8%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "purple"
    },
    {
      title: "Claude Citations",
      value: "91.5%",
      change: "+2.8%",
      trend: "up",
      icon: Zap,
      color: "orange"
    },
    {
      title: "Zero-Click Rate",
      value: "26.3%",
      change: "-1.2%",
      trend: "down",
      icon: Eye,
      color: "red"
    },
    {
      title: "Click-Through Rate",
      value: "73.7%",
      change: "+1.2%",
      trend: "up",
      icon: MousePointer,
      color: "cyan"
    }
  ];

  const aiEngines = [
    { name: "ChatGPT", percentage: 94, color: "bg-blue-500" },
    { name: "Perplexity", percentage: 87, color: "bg-green-500" },
    { name: "Claude", percentage: 91, color: "bg-purple-500" },
    { name: "Gemini", percentage: 78, color: "bg-orange-500" },
    { name: "Copilot", percentage: 82, color: "bg-cyan-500" }
  ];

  const recentQueries = [
    { query: "best AI tools for content creation", engine: "ChatGPT", position: 1, clicks: 1247 },
    { query: "how to optimize for AI search", engine: "Perplexity", position: 2, clicks: 892 },
    { query: "AEO vs SEO differences", engine: "Claude", position: 1, clicks: 1156 },
    { query: "generative engine optimization", engine: "ChatGPT", position: 3, clicks: 634 },
    { query: "AI search ranking factors", engine: "Gemini", position: 2, clicks: 445 }
  ];

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
              <a href="/" className="text-gray-300 hover:text-white transition-colors text-center">Home</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors text-center">Features</a>
              <a href="/grid-dashboard" className="text-white font-semibold text-center">Analytics</a>
              <a href="/grid-resources" className="text-gray-300 hover:text-white transition-colors text-center">Resources</a>
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

      {/* Grid Header */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              AI Search
              <br />
              <span className="text-gray-400">Analytics</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Track your performance across all major AI engines with real-time insights and detailed analytics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    metric.color === 'blue' ? 'bg-blue-500' :
                    metric.color === 'green' ? 'bg-green-500' :
                    metric.color === 'purple' ? 'bg-purple-500' :
                    metric.color === 'orange' ? 'bg-orange-500' :
                    metric.color === 'red' ? 'bg-red-500' :
                    'bg-cyan-500'
                  }`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center text-sm font-semibold ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-gray-400">{metric.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Engine Performance - 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-gray-900 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">AI Engine Performance</h2>
                <BarChart3 className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                {aiEngines.map((engine, index) => (
                  <div key={engine.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{engine.name}</span>
                      <span className="text-white font-semibold">{engine.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${engine.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-3 rounded-full ${engine.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity - 1 column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Activity</h2>
                <Activity className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">ChatGPT visibility increased</div>
                    <div className="text-xs text-gray-400">2 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">New query detected</div>
                    <div className="text-xs text-gray-400">5 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Claude ranking updated</div>
                    <div className="text-xs text-gray-400">8 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Perplexity optimization</div>
                    <div className="text-xs text-gray-400">12 minutes ago</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Queries Grid */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Performing Queries</h2>
              <PieChart className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentQueries.map((query, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">{query.engine}</span>
                    <span className="text-sm font-semibold text-white">#{query.position}</span>
                  </div>
                  <h3 className="text-white font-medium mb-2 line-clamp-2">{query.query}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{query.clicks} clicks</span>
                    <div className="flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>+12%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Analytics */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Performance Trends</h2>
                <BarChart3 className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-400">Interactive Performance Chart</p>
                  <p className="text-sm text-gray-500 mt-2">Real-time analytics visualization</p>
                </div>
              </div>
            </motion.div>

            {/* AI Engine Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Engine Distribution</h2>
                <PieChart className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🥧</div>
                  <p className="text-gray-400">AI Engine Distribution</p>
                  <p className="text-sm text-gray-500 mt-2">Query source breakdown</p>
                </div>
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
