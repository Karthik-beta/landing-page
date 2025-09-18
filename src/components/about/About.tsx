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
      <div className="border rounded-lg py-12 border-foreground/10 ring-1 ring-foreground/10 bg-gradient-to-r from-foreground/[0.04] via-foreground/[0.02] to-transparent dark:border-white/10 dark:ring-white/[0.06]">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12 ">
          <Image
            src="/undraw_team-work_i1f3.svg"
            alt="Team working together illustration"
            width={300}
            height={300}
            className="w-[300px] h-auto object-contain rounded-lg mx-auto md:mx-0"
            priority
          />
          <div className="flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About {""}
                </span>
                Us
              </h2>
              <AboutParagraph text={paragraphText} className="text-xl text-muted-foreground mt-4" />
            </div>
          </div>
        </div>
        <div className="px-6 mt-8">
          <Statistics />
        </div>
      </div>
    </section>
  );
};
