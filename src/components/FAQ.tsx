"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Props for a single FAQ item.
 * @interface FAQProps
 */
interface FAQProps {
  /** The question for the FAQ item. */
  question: string;
  /** The answer to the question. */
  answer: string;
  /** A unique value for the accordion item. */
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is Pivotr's core approach to technology solutions?",
    answer:
      "We utilize an integrated three-layer approach combining Enterprise Solutions, Infrastructure Services, and Hardware Solutions to deliver comprehensive business transformation.",
    value: "item-1",
  },
  {
    question: "What types of enterprise software solutions do you offer?",
    answer:
      "Our Enterprise Solutions include cutting-edge SaaS Products, comprehensive ERP Systems, and advanced IoT Integrations designed to optimize operations and drive digital innovation.",
    value: "item-2",
  },
  {
    question: "What kind of infrastructure services does Pivotr provide?",
    answer:
      "We offer scalable cloud and network solutions, robust computing power, flexible storage solutions, and enterprise-level security measures for your infrastructure needs.",
    value: "item-3",
  },
  {
    question: "How do you ensure the security of the solutions?",
    answer:
      "Security is built-in. We protect your business with military-grade security embedded across all platforms and provide advanced security measures for your infrastructure.",
    value: "item-4",
  },
  {
    // Based on Page 7: Scalable Solutions and Page 5: Scalable Storage
    question: "Are your technology solutions scalable?",
    answer:
      "Yes, our solutions are designed to be highly scalable, offering flexible technology that adapts to your business growth and includes scalable cloud storage options.",
    value: "item-5",
  },
  {
    // Based on Page 11: Transform Your Business Today (Process)
    question: "What is the typical process when implementing a new solution?",
    answer:
      "We follow a four-step process: Consult (understand needs), Design (craft tailored solutions), Implement (seamless integration), and Support (ongoing assistance and optimization).",
    value: "item-6", // Added a new item
  },
  {
    // Based on Page 10: 24/7 Support
    question: "What kind of support is available?",
    answer:
      "We provide 24/7 dedicated technical support with round-the-clock expertise ready to assist you anytime, anywhere.",
    value: "item-7", // Added a new item
  },
  {
    // Based on Page 10: Global Reach
    question: "Do you provide services globally?",
    answer:
      "Yes, we support enterprises across 50+ countries with localized solutions and support.",
    value: "item-8", // Added a new item
  },
];

/**
 * Renders the Frequently Asked Questions (FAQ) section.
 *
 * This component displays a list of questions and answers in an accordion,
 * allowing users to expand each question to see the answer. It also includes
 * a link to the contact section for further inquiries.
 *
 * @returns {JSX.Element} The rendered FAQ section.
 */
export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#contact"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
