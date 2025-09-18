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
    <section id="products" className="container py-20 sm:py-28 space-y-16">
      {/* Section Header */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Empower Your Business with Our{" "}
          <span className="bg-gradient-to-r from-primary/60 to-primary text-transparent bg-clip-text">
            Business Operating System
          </span>
        </h2>
        <p className="md:w-3/4 mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
          Pivotr is a modular Business Operating System designed to meet the needs of small to
          mid-sized enterprises (SMEs). It provides a reliable, structured, and scalable solution,
          offering the functionality of an internal operating system without the complexity and cost
          of traditional enterprise software.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Product Details */}
        <div className="lg:col-span-6 space-y-8">
          <h3 className="text-3xl font-bold text-primary">Why Choose Pivotr Business Suite?</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold border-foreground/10 ring-2 ring-foreground/10 bg-gradient-to-r from-foreground/[0.04] via-foreground/[0.02] to-transparent dark:border-white/10 dark:ring-white/[0.06]">
                ✓
              </div>
              <p className="text-lg text-muted-foreground flex-1">
                <strong>Modular Design:</strong> Tailor the system to meet your unique business
                requirements.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold border-foreground/10 ring-2 ring-foreground/10 bg-gradient-to-r from-foreground/[0.04] via-foreground/[0.02] to-transparent dark:border-white/10 dark:ring-white/[0.06]">
                ✓
              </div>
              <p className="text-lg text-muted-foreground flex-1">
                <strong>Scalable Solutions:</strong> Seamlessly grow with your business as it
                expands.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold border-foreground/10 ring-2 ring-foreground/10 bg-gradient-to-r from-foreground/[0.04] via-foreground/[0.02] to-transparent dark:border-white/10 dark:ring-white/[0.06]">
                ✓
              </div>
              <p className="text-lg text-muted-foreground flex-1">
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
        <div className="lg:col-span-6 relative">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 rounded-lg blur-xl"></div> */}
          <Image
            src="/undraw_bento-grid.svg"
            alt="Business Operating System illustration"
            width={800}
            height={600}
            className="relative z-10 w-full h-auto"
            priority={false}
          />
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="sm:px-8">
        <h3 className="text-4xl font-bold text-center mb-12  bg-gradient-to-tr from-primary/60 to-primary text-transparent bg-clip-text">
          Key Features of Pivotr Business Suite
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-background">
            <CardHeader className="p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl font-bold border-foreground/10 ring-2 ring-foreground/10 bg-gradient-to-r from-foreground/[0.04] via-foreground/[0.02] to-transparent dark:border-white/10 dark:ring-white/[0.06]">
                <LucidePuzzle className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary mt-4">
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
          <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-background">
            <CardHeader className="p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl font-bold border-foreground/10 ring-2 ring-foreground/10 bg-gradient-to-r from-foreground/[0.04] via-foreground/[0.02] to-transparent dark:border-white/10 dark:ring-white/[0.06]">
                <InfoIcon className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary mt-4">
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
          <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-background">
            <CardHeader className="p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl font-bold border-foreground/10 ring-2 ring-foreground/10 bg-gradient-to-r from-foreground/[0.04] via-foreground/[0.02] to-transparent dark:border-white/10 dark:ring-white/[0.06]">
                <Network className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-semibold text-primary mt-4">
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
