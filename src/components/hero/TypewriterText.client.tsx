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
          className={`inline-block w-0.5 h-[1em] ml-1 transition-colors duration-300 ${
            isDeleting
              ? "bg-red-400 animate-pulse"
              : "bg-gradient-to-b from-[#61DAFB] to-[#03a3d7] animate-pulse"
          } ${cursorClassName}`}
          style={{
            animationDuration: isDeleting ? "0.5s" : "1s",
          }}
        />
      )}
    </span>
  );
};
