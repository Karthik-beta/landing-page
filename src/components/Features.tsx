import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

/**
 * Props for a single feature item.
 * @interface FeatureProps
 */
interface FeatureProps {
  /** The title of the feature. */
  title: string;
  /** A description of the feature. */
  description: string;
  /** The path to the image associated with the feature. */
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "SaaS Solutions",
    description:
      "Enterprise-grade cloud applications for business transformation, including ERP systems, accelerating performance and automating workflows.",
    image: "/undraw_all-the-data_5lil.svg", // Using existing public asset; adjust path if needed
  },
  {
    title: "Infrastructure Services",
    description:
      "Scalable cloud and network solutions building a robust foundation for enterprise operations, encompassing powerful computing, flexible storage, and advanced security measures.",
    image: "/undraw_bento-grid.svg", // Using existing public asset; adjust path if needed
  },
  {
    title: "IoT Integrations",
    description:
      "Smart enterprise networks that harness real-time sensor data to optimize operations, predict maintenance needs, and drive strategic improvements.",
    image: "/undraw_teamwork_8val.svg", // Using existing public asset; adjust path if needed
  },
];

const featureList: string[] = [
  "Enterprise Solutions",
  "SaaS",
  "ERP",
  "IoT Integration",
  "Cloud Solutions",
  "Scalability",
  "Seamless Integration",
  "Built-in Security",
  "Automation",
  "Data Insights",
  "Digital Transformation",
  "Workflow Optimization",
  "Infrastructure",
];

// Using shadcn/ui Badge component installed via generator

/**
 * Renders the Core Capabilities section of the website.
 *
 * This component showcases the main features and solutions offered by the
 * company, such as SaaS, infrastructure services, and IoT integrations. It
 * also displays a list of related keywords as badges.
 *
 * @returns {JSX.Element} The rendered Core Capabilities section.
 */
export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold text-center">
        Our Core{" "}
        <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
          Capabilities
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto text-xl text-muted-foreground text-center">
        Discover the key solutions Pivotr provides to drive efficiency, insight, and growth in your
        enterprise.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {featureList.map((feature: string) => (
          <Badge key={feature} className="bg-muted text-muted-foreground hover:bg-secondary">
            {feature}
          </Badge>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title} className="bg-card border border-border/60 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-2xl leading-none text-foreground font-semibold tracking-tight gap-4">{title}</CardTitle>
            </CardHeader>

            <CardContent className="p-6 pt-0 text-muted-foreground">{description}</CardContent>

            {/* Footer using div with card footer classes */}
            <div className="flex items-center p-6 pt-0">
              <Image
                src={image}
                alt={`${title} illustration`}
                width={300}
                height={200}
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
