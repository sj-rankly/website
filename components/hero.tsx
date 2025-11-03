import { RotatingText } from "@/components/ui/rotating-text"

export function Hero() {
  return (
    <section className="px-0 py-16 md:py-20 text-center">
      <h1 className="text-pretty text-3xl font-semibold tracking-tight md:text-5xl">
        Get more <RotatingText words={["traffic", "citations"]} className="!text-brand" />{" "}
        <RotatingText words={["from", "on"]} /> LLMs
      </h1>

      <p className="mt-3 text-muted-foreground md:text-lg">
        The Internet's most <RotatingText words={["reliable", "adopted"]} className="!text-brand font-medium" /> AEO
        platform
      </p>
    </section>
  )
}
