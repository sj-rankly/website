import { SiteHeader } from "@/components/site-header";
import { RanklyFooter } from "@/components/rankly-footer";
import { FramerExample } from "@/components/ui/framer-example";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function FramerDemoPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto max-w-7xl relative">
        {/* Hero Section with Scroll Reveal */}
        <ScrollReveal direction="up" className="py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-4">
              Framer Motion Demo
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Smooth animations and interactions for your Rankly landing page
            </p>
          </div>
        </ScrollReveal>

        {/* Animated Counters Section */}
        <ScrollReveal direction="up" delay={0.2} className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-black mb-2">
                <AnimatedCounter end={780} suffix="M" />
              </div>
              <p className="text-gray-600">Queries per month</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-black mb-2">
                <AnimatedCounter end={26} suffix="%" />
              </div>
              <p className="text-gray-600">Zero-click searches</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-black mb-2">
                <AnimatedCounter end={50} suffix="%" />
              </div>
              <p className="text-gray-600">Click reduction with AI</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Framer Examples */}
        <ScrollReveal direction="up" delay={0.4} className="py-16">
          <FramerExample />
        </ScrollReveal>

        {/* Staggered Content */}
        <div className="py-16">
          <ScrollReveal direction="up" className="mb-12">
            <h2 className="text-3xl font-bold text-black text-center mb-8">
              Staggered Animations
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI Search Optimization", desc: "Master the new paradigm" },
              { title: "Earned Media Strategy", desc: "Build authority through third-party sources" },
              { title: "Content Engineering", desc: "Create machine-scannable assets" },
              { title: "Citation Network Mapping", desc: "Identify key sources in your vertical" },
              { title: "Authority Building", desc: "Systematic earned media pipeline" },
              { title: "Ranking Defense", desc: "Continuous monitoring and response" }
            ].map((item, index) => (
              <ScrollReveal 
                key={index} 
                direction="up" 
                delay={index * 0.1}
                className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Call to Action with Animation */}
        <ScrollReveal direction="up" className="py-16 text-center">
          <div className="bg-black text-white p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Dominate AI Search?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the AEO revolution with Rankly's proven methodology
            </p>
            <button className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
          </div>
        </ScrollReveal>
      </div>

      <RanklyFooter />
    </main>
  );
}
