import { LotusLogo } from "@/components/lotus-logo"
import { Linkedin } from "lucide-react"

export function RanklyFooter() {
  return (
    <footer className="relative bg-background">
      {/* Horizontal ruler at top - aligned with container width */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1.5px] bg-border opacity-90 pointer-events-none z-[20]"></div>
      
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Column 1: Logo */}
          <div className="p-8 md:p-12 border-r-[1.5px] border-border/90 flex flex-col justify-between">
            <LotusLogo className="w-12 h-12" />
            <div className="text-sm text-muted-foreground font-mono mt-auto">Rankly Inc. 2025</div>
          </div>

          {/* Column 2: Contact */}
          <div className="p-8 md:p-12 border-r-[1.5px] border-border/90">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-foreground">CONTACT</h3>
            <a
              href="mailto:contact@tryrankly.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono no-underline hover:no-underline"
            >
              contact@tryrankly.com
            </a>
          </div>

          {/* Column 3: Resources */}
          <div className="p-8 md:p-12 border-r-[1.5px] border-border/90">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-foreground">RESOURCES</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline hover:no-underline">
                  About
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline hover:no-underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline hover:no-underline">
                  Docs
                </a>
              </li>
              <li>
                <a href="/blogs" className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline hover:no-underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline hover:no-underline">
                  Changelog
                </a>
              </li>
              <li>
                <a href="mailto:contact@tryrankly.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline hover:no-underline">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div className="p-8 md:p-12">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-foreground">SOCIALS</h3>
            <div className="flex flex-col items-start gap-4">
              <a href="https://www.linkedin.com/company/tryrankly" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/tryrankly" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
