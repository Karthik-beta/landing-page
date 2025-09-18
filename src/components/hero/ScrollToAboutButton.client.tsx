"use client";

import { PropsWithChildren } from "react";

export function ScrollToAboutButton({ children }: PropsWithChildren) {
  return (
    <span
      role="button"
      onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
    >
      {children}
    </span>
  );
}
