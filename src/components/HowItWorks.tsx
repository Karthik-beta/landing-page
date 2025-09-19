import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";

/**
 * Props for a single feature in the "How It Works" section.
 * @interface FeatureProps
 */
interface FeatureProps {
  /** A unique key for the feature. */
  key: string;
  /** The icon representing the feature. */
  icon: React.JSX.Element;
  /** The title of the feature. */
  title: string;
  /** A brief description of the feature. */
  description: string;
}

const features: FeatureProps[] = [
  {
    key: "consult",
    icon: <MedalIcon />,
    title: "Consult",
    description: "Understand your unique needs",
  },
  {
    key: "design",
    icon: <MapIcon />,
    title: "Design",
    description: "Craft tailored solutions",
  },
  {
    key: "implement",
    icon: <PlaneIcon />,
    title: "Implement",
    description: "Seamless integration",
  },
  {
    key: "support",
    icon: <GiftIcon />,
    title: "Support",
    description: "Ongoing assistance and optimization",
  },
];

/**
 * Renders the "How It Works" section of the website.
 *
 * This component displays a four-step guide to the company's process, with
 * each step presented in a card containing an icon, title, and description.
 *
 * @returns {JSX.Element} The rendered "How It Works" section.
 */
export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container py-24 text-center sm:py-32">
      <h2 className="text-3xl font-bold md:text-4xl">
        How It{" "}
        <span className="from-primary/60 to-primary bg-linear-to-b bg-clip-text text-transparent">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="text-muted-foreground mx-auto mt-4 mb-8 text-xl md:w-3/4">
        We follow a clear, four-step process to transform your business, ensuring solutions are
        tailored to your unique requirements from planning to ongoing support.
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ key, icon, title, description }: FeatureProps) => (
          <Card key={key} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid place-items-center gap-4">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
