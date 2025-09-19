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
  <span className="sr-only">Pivotr.</span>
  <span aria-hidden="true" className="inline-flex items-baseline">
    P
    <span className="relative inline-block leading-none">
      ı
      <span
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 -top-[-0.16em] w-[0.18em] h-[0.18em] rounded-full bg-primary pointer-events-none"
      />
    </span>
    votr
    {/* <span className="text-primary">.</span> */}
    <span
        aria-hidden="true"
        className="-top-[-0.2em] w-[0.18em] h-[0.18em] rounded-full bg-primary pointer-events-none"
      />
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
