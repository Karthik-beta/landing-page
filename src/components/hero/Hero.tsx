/**
 * Hero section for Next.js App Router with SSR-first architecture.
 * Interactive parts are split into client components.
 */
import { Button } from "../ui/button";
import { HeroCards } from "./HeroCards";
import { TypewriterText } from "./TypewriterText.client";
import { LiveMetricsTicker } from "./LiveMetricsTicker.client";
import { ScrollToAboutButton } from "./ScrollToAboutButton.client";

/**
 * Hero
 *
 * Renders the landing page hero: headline with gradient emphasis and a
 * typewriter-animated subject, supporting paragraph, primary CTA button that
 * smooth-scrolls to `#about`, and the decorative `HeroCards` visual. A
 * deterministic `LiveMetricsTicker` appears below the hero grid.
 */
export const Hero = () => {
  return (
    <section id="hero" className="container py-10 md:py-32">
      {/* Only the hero content is a grid, like the original */}
      <div className="grid place-items-center gap-10 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6 text-center lg:text-start">
          <main className="text-5xl font-bold md:text-6xl">
            <h1 className="inline">
              <span className="from-accent via-secondary to-primary gradient-shimmer inline bg-gradient-to-r bg-clip-text text-transparent">
                Better
              </span>{" "}
              Solutions
            </h1>{" "}
            for Your{" "}
            <h2 className="inline">
              <TypewriterText
                words={["Business", "Teams", "Growth", "Success", "Future"]}
                className="from-accent via-primary/80 to-primary inline bg-gradient-to-r bg-clip-text text-transparent"
                typeSpeed={120}
                deleteSpeed={80}
                delayBetweenWords={2500}
                loop={true}
                showCursor={true}
                cursorClassName="bg-gradient-to-r from-accent to-primary"
              />{" "}
            </h2>
          </main>

          <p className="text-muted-foreground mx-auto text-xl md:w-10/12 lg:mx-0">
            Transforming Obstacles into Opportunities with Pioneering Technology.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <ScrollToAboutButton>
              <Button className="primary w-full md:w-1/3">Get Started</Button>
            </ScrollToAboutButton>
          </div>
        </div>

        {/* Right column */}
        <div className="z-10">
          <HeroCards />
        </div>

        {/* Shadow effect */}
        <div className="shadow"></div>
      </div>

      {/* Separate row (not part of the grid) */}
      <div className="mt-6">
        <LiveMetricsTicker />
      </div>
    </section>
  );
};
export default Hero;
