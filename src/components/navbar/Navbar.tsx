'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "../ui/button";
import dynamic from "next/dynamic";
const ModeToggle = dynamic(() => import("./mode-toggle").then((m) => m.ModeToggle), { ssr: false });
import { ProgressIndicator } from "./ProgressIndicator";
import Link from "next/link";
import MobileMenu from "./Navbar.client";

/**
 * Props for a single route in the navigation bar.
 * @interface RouteProps
 */
interface RouteProps {
  /** The URL of the route. */
  href: string;
  /** The label for the route. */
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "https://blog.pivotr.in",
    label: "Blog",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
  {
    href: "#contact",
    label: "Contact",
  },
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#roi-calculator",
    label: "ROI Calculator",
  },
  {
    href: "https://wellfound.com/company/pivotr",
    label: "Careers",
  },
];

interface CompanionData {
  scrollProgress: number;
  visitedSections: Set<string>;
  currentSection: string;
}

/**
 * Renders the navigation bar for the website.
 *
 * This component includes the logo, navigation links, and a mode toggle. It is
 * responsive and provides a mobile-friendly menu. It can also display a
 * progress indicator based on the user's scroll position.
 *
 * @param {object} props - The component props.
 * @param {CompanionData} [props.companion] - Optional data for the progress indicator.
 * @returns {JSX.Element} The rendered navigation bar.
 */
export const Navbar = ({ companion }: { companion?: CompanionData }) => {
  return (
    <header className="sticky border-b top-0 z-40 w-full bg-white dark:border-b-white-500 dark:bg-background">
      {/* Progress indicator at the top */}
      {companion && (
        <ProgressIndicator
          progress={companion.scrollProgress}
          visitedSections={companion.visitedSections}
          currentSection={companion.currentSection}
        />
      )}
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between items-center">
          <NavigationMenuItem className="font-bold flex" key="Logo">
            <Link href="/" className="ml-2 font-bold text-4xl flex text-text-200" aria-label="Go to homepage">
              Pivotr.
            </Link>
          </NavigationMenuItem>

          {/* desktop */}
          <NavigationMenuItem key="DesktopNav" className="hidden md:flex justify-center flex-1">
            <nav className="flex gap-4 items-center">
              {routeList.map((route, i) => (
                <a
                  key={i}
                  href={route.href}
                  className={`text-[17px] ${buttonVariants({ variant: "ghost" })}`}
                  rel="noreferrer noopener"
                >
                  {route.label}
                </a> 
              ))}
              <ModeToggle />
            </nav>
          </NavigationMenuItem>

          {/* mobile */}
          <MobileMenu routes={routeList} />
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
