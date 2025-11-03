import { SiteHeader } from "@/components/site-header"
import { RanklyFooter } from "@/components/rankly-footer"
import { ManifestoDocument } from "@/components/manifesto-document"
import { ProductDemoSection } from "@/components/product-demo-section"
import { FAQSection2 } from "@/components/ui/faq-section-2"

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-4 py-16">
        <ManifestoDocument />
      </div>

      {/* Product Demo Section */}
      <ProductDemoSection />

      {/* FAQ Section */}
      <FAQSection2 />

      <RanklyFooter />
    </main>
  )
}
