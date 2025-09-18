"use client";

import { useEffect, useRef, useState } from "react";

interface AboutParagraphProps {
  text: string;
  className?: string;
}

export const AboutParagraph = ({ text, className = "" }: AboutParagraphProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < text.length) {
      intervalRef.current = window.setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 25);
    }

    return () => {
      if (intervalRef.current) {
        window.clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentIndex, text, isVisible]);

  return (
    <p
      ref={(el) => {
        containerRef.current = el;
      }}
      className={className}
    >
      {displayedText}
      {currentIndex < text.length && (
        <span
          className="inline-block w-0.5 h-[1em] ml-1 bg-gradient-to-b from-[#61DAFB] to-[#03a3d7] animate-pulse"
          style={{ animationDuration: "1s" }}
        />
      )}
    </p>
  );
};
