"use client"

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "../ui/button";
import { ModeToggle } from "./mode-toggle";

interface RouteProps {
  href: string;
  label: string;
}

export default function MobileMenu({ routes }: { routes: RouteProps[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex md:hidden justify-end items-center gap-2">
      <ModeToggle />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="px-2" aria-label="Toggle navigation menu">
          <Menu className="h-5 w-5" aria-hidden onClick={() => setIsOpen(true)} />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="font-bold text-xl">Pivotr.</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col items-center gap-2 mt-4">
            {routes.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className={buttonVariants({ variant: "ghost" })}
              >
                {label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}


