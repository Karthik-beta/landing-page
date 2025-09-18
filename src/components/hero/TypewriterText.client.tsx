"use client";

import { useTypewriter } from "@/hooks/use-typewriter";

export interface TypewriterTextProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorClassName?: string;
}

export const TypewriterText = ({
  words,
  className = "",
  typeSpeed = 150,
  deleteSpeed = 100,
  delayBetweenWords = 2000,
  loop = true,
  showCursor = true,
  cursorClassName = "",
}: TypewriterTextProps) => {
  const { text, isDeleting } = useTypewriter({
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    loop,
  });

  return (
    <span className={className}>
      {text}
      {showCursor && (
        <span
          className={`ml-1 inline-block h-[1em] w-0.5 transition-colors duration-300 ${
            isDeleting
              ? "bg-destructive/70 animate-pulse"
              : "from-accent via-primary/80 to-primary animate-pulse bg-gradient-to-b"
          } ${cursorClassName}`}
          style={{
            animationDuration: isDeleting ? "0.5s" : "1s",
          }}
        />
      )}
    </span>
  );
};
