import Image from "next/image";
import { Statistics } from "@/components/about/Statistics";
import { AboutParagraph } from "@/components/about/AboutParagraph.client";

/**
 * Renders the About Us section of the website.
 *
 * This component displays information about the company, including a descriptive
 * paragraph with a typewriter animation effect. The animation is triggered
 * when the component becomes visible in the viewport.
 *
 * @returns {JSX.Element} The rendered About Us section.
 */
export const About = () => {
  const paragraphText = `At Pivotr, we are a software-first company dedicated to delivering integrated solutions built in-house. When a deployment calls for specific devices, we source them from trusted partners and bring everything together to ensure seamless performance. Our emphasis is on the complete solution—hardware is included only when needed to support our software, rather than as a standalone offering.`;

  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="border-foreground/10 ring-foreground/10 from-foreground/[0.04] via-foreground/[0.02] rounded-lg border bg-gradient-to-r to-transparent py-12 ring-1 dark:border-white/10 dark:ring-white/[0.06]">
        <div className="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
          <Image
            src="/undraw_teamwork_8val.svg"
            alt="Team working together illustration"
            width={300}
            height={300}
            className="mx-auto h-auto w-[300px] rounded-lg object-contain md:mx-0"
            priority
          />
          <div className="flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl font-bold md:text-4xl">
                <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                  About {""}
                </span>
                Us
              </h2>
              <AboutParagraph text={paragraphText} className="text-muted-foreground mt-4 text-xl" />
            </div>
          </div>
        </div>
        <div className="mt-8 px-6">
          <Statistics />
        </div>
      </div>
    </section>
  );
};
