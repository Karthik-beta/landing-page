import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { InfoIcon, LucidePuzzle, Network } from "lucide-react";

/**
 * Renders the Products section of the website.
 *
 * This component provides an overview of the Pivotr Business Operating System,
 * highlighting its key features and benefits. It includes a section with
 * product details and an illustration, as well as a grid of feature cards.
 *
 * @returns {JSX.Element} The rendered Products section.
 */
export const Products = () => {
  return (
    <section id="products" className="container space-y-16 py-20 sm:py-28">
      {/* Section Header */}
      <div className="space-y-6 text-center">
        <h2 className="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
          Empower Your Business with Our{" "}
          <span className="from-primary/60 to-primary bg-gradient-to-r bg-clip-text text-transparent">
            Business Operating System
          </span>
        </h2>
        <p className="text-muted-foreground mx-auto text-lg leading-relaxed md:w-3/4 md:text-xl">
          Pivotr is a modular Business Operating System designed to meet the needs of small to
          mid-sized enterprises (SMEs). It provides a reliable, structured, and scalable solution,
          offering the functionality of an internal operating system without the complexity and cost
          of traditional enterprise software.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        {/* Product Details */}
        <div className="space-y-8 lg:col-span-6">
          <h3 className="text-primary text-3xl font-bold">Why Choose Pivotr Business Suite?</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="border-foreground/10 ring-foreground/10 from-foreground/[0.04] via-foreground/[0.02] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r to-transparent font-bold ring-2 dark:border-white/10 dark:ring-white/[0.06]">
                ✓
              </div>
              <p className="text-muted-foreground flex-1 text-lg">
                <strong>Modular Design:</strong> Tailor the system to meet your unique business
                requirements.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="border-foreground/10 ring-foreground/10 from-foreground/[0.04] via-foreground/[0.02] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r to-transparent font-bold ring-2 dark:border-white/10 dark:ring-white/[0.06]">
                ✓
              </div>
              <p className="text-muted-foreground flex-1 text-lg">
                <strong>Scalable Solutions:</strong> Seamlessly grow with your business as it
                expands.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="border-foreground/10 ring-foreground/10 from-foreground/[0.04] via-foreground/[0.02] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r to-transparent font-bold ring-2 dark:border-white/10 dark:ring-white/[0.06]">
                ✓
              </div>
              <p className="text-muted-foreground flex-1 text-lg">
                <strong>Affordable & Simple:</strong> Avoid bloated, overpriced software with a
                streamlined, cost-effective solution.
              </p>
            </li>
          </ul>
          {/* <div className="mt-8">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary text-white font-medium rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105"
            >
              Learn More
            </a>
          </div> */}
        </div>

        {/* Illustration */}
        <div className="relative lg:col-span-6">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 rounded-lg blur-xl"></div> */}
          <Image
            src="/undraw_bento-grid.svg"
            alt="Business Operating System illustration"
            width={800}
            height={600}
            className="relative z-10 h-auto w-full"
            priority={false}
          />
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="sm:px-8">
        <h3 className="from-primary/60 to-primary mb-12 bg-gradient-to-tr bg-clip-text text-center text-4xl font-bold text-transparent">
          Key Features of Pivotr Business Suite
        </h3>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Feature 1 */}
          <Card className="dark:bg-background rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="p-6 text-center">
              <div className="border-foreground/10 ring-foreground/10 from-foreground/[0.04] via-foreground/[0.02] mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r to-transparent text-2xl font-bold ring-2 dark:border-white/10 dark:ring-white/[0.06]">
                <LucidePuzzle className="h-6 w-6" />
              </div>
              <CardTitle className="text-primary mt-4 text-xl font-semibold">
                Customizable Modules
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-muted-foreground text-center">
                Build a system tailored to your business needs by selecting from a wide range of
                modular components.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="dark:bg-background rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="p-6 text-center">
              <div className="border-foreground/10 ring-foreground/10 from-foreground/[0.04] via-foreground/[0.02] mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r to-transparent text-2xl font-bold ring-2 dark:border-white/10 dark:ring-white/[0.06]">
                <InfoIcon className="h-6 w-6" />
              </div>
              <CardTitle className="text-primary mt-4 text-xl font-semibold">
                Real-Time Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-muted-foreground text-center">
                Access actionable insights with real-time data and analytics to make informed
                decisions quickly.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="dark:bg-background rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="p-6 text-center">
              <div className="border-foreground/10 ring-foreground/10 from-foreground/[0.04] via-foreground/[0.02] mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r to-transparent text-2xl font-bold ring-2 dark:border-white/10 dark:ring-white/[0.06]">
                <Network className="h-6 w-6" />
              </div>
              <CardTitle className="text-primary mt-4 text-xl font-semibold">
                Seamless Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-muted-foreground text-center">
                Effortlessly integrate Pivotr with your existing tools and workflows for a unified
                experience.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
