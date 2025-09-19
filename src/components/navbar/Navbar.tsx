"use client";

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
import Image from "next/image";
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
    <header className="bg-background dark:border-b-white-500 dark:bg-background sticky top-0 z-40 w-full border-b">
      {/* Progress indicator at the top */}
      {companion && (
        <ProgressIndicator
          progress={companion.scrollProgress}
          visitedSections={[...companion.visitedSections]}
          currentSection={companion.currentSection}
        />
      )}
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen items-center justify-between px-4">
          <NavigationMenuItem className="flex font-bold" key="Logo">
            <Link
              href="/"
              className="text-text-200 ml-2 flex text-4xl font-bold"
              aria-label="Go to homepage"
            >
              {/* Show light logo in light mode, dark logo in dark mode */}
              <span className="block dark:hidden">
                <Image src="/pivotr_light_mode_1920x1080.svg" alt="Pivotr Logo Light" width={128} height={40} />
              </span>
              <span className="hidden dark:block">
                <Image src="/pivotr_dark_mode_1920x1080.svg" alt="Pivotr Logo Dark" width={128} height={40} />
              </span>
            </Link>
          </NavigationMenuItem>

          {/* desktop */}
          <NavigationMenuItem key="DesktopNav" className="hidden flex-1 justify-center md:flex">
            <nav className="flex items-center gap-4">
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