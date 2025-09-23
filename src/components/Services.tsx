import type { ReactNode } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MagnifierIcon, WalletIcon, ChartIcon } from "@/components/Icons";
import Image from "next/image";

/**
 * Props for a single service item.
 * @interface ServiceProps
 */
interface ServiceProps {
	/** The title of the service. */
	title: string;
	/** A brief description of the service. */
	description: string;
	/** The icon representing the service. */
	icon: ReactNode;
	/** Optional details about the service, revealed on hover. */
	details?: string;
}

const serviceList: ServiceProps[] = [
	{
		title: "Enterprise Software Solutions",
		description:
			"Transform your business with expert implementation and integration of cutting-edge SaaS, ERP systems, and custom enterprise applications.",
		icon: <ChartIcon />,
		details:
			"Including Salesforce, SAP, Microsoft Dynamics, and custom enterprise solutions with full integration support.",
	},
	{
		title: "Cloud & Infrastructure Services",
		description:
			"Build a scalable and secure foundation for your operations with our cloud, network, computing power, and flexible storage solutions.",
		icon: <WalletIcon />,
		details:
			"AWS, Azure, Google Cloud infrastructure with 99.9% uptime guarantee and 24/7 monitoring.",
	},
	{
		title: "Managed Services & Support",
		description:
			"Ensure peak performance and reliability with 24/7 dedicated support, seamless system management, and continuous optimization for your technology ecosystem.",
		icon: <MagnifierIcon />,
		details:
			"Round-the-clock support with average response time under 15 minutes for critical issues.",
	},
];

/**
 * Renders the Services section of the website.
 *
 * This component displays a list of services offered by the company, each with
 * an icon, title, description, and optional details that are revealed on hover.
 */
export const Services = () => {
	return (
		<section id="services" className="container py-24 sm:py-32">
			<div className="grid lg:grid-cols-[1fr_1fr] gap-8 place-items-center">
				<div>
								<h2 className="text-3xl md:text-4xl font-bold text-center">
									<span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
							Our{" "}
						</span>
						Services
					</h2>

					<p className="text-muted-foreground text-xl mt-4 mb-8 text-center">
						We offer a comprehensive suite of technology services designed to empower your
						enterprise, from strategic implementation to robust infrastructure and ongoing support.
					</p>

					<div className="flex flex-col gap-8">
						{serviceList.map(({ icon, title, description, details }: ServiceProps) => (
							<Card
								key={title}
								className="group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 bg-linear-to-br from-background to-background/50"
						 >
								<CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
									<div className="mt-1 bg-primary/20 p-1 rounded-2xl group-hover:bg-primary/30 transition-colors duration-300 group-hover:scale-110 transform">
										{icon}
									</div>
									<div className="flex-1">
										<CardTitle className="group-hover:text-primary transition-colors duration-300">
											{title}
										</CardTitle>
										<CardDescription className="text-md mt-2 leading-relaxed">
											{description}
										</CardDescription>
										{details && (
											<div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-hover:max-h-20 group-hover:mt-3">
												<div className="pt-2 border-t border-border/40">
													<Badge
														variant="secondary"
														className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
													>
														Details
													</Badge>
													<p className="text-sm text-muted-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
														{details}
													</p>
												</div>
											</div>
										)}
									</div>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>

				<Image
					src="/undraw_bento-grid.svg"
					className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
					alt="About services"
					width={600}
					height={400}
					priority={false}
				/>
			</div>
		</section>
	);
};

