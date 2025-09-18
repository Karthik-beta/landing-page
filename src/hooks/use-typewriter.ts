"use client";

import { useEffect, useRef, useState } from "react";

export interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number; // ms per typed character
  deleteSpeed?: number; // ms per deleted character
  delayBetweenWords?: number; // ms to wait after finishing a word before deleting
  loop?: boolean;
}

type Phase = "typing" | "pausing" | "deleting";

export const useTypewriter = ({
  words,
  typeSpeed = 120,
  deleteSpeed = 80,
  delayBetweenWords = 1800,
  loop = true,
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  const timeoutRef = useRef<number | null>(null);
  const clearTimer = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[currentWordIndex] ?? "";

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeoutRef.current = window.setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing the word, pause before deleting
        timeoutRef.current = window.setTimeout(() => setPhase("pausing"), delayBetweenWords);
      }
    } else if (phase === "pausing") {
      // Transition to deleting phase after the pause
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setText(text.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Word fully deleted → move to next
        const nextIndex = currentWordIndex + 1;
        if (!loop && nextIndex >= words.length) {
          // Stop at the last word deleted (empty)
          clearTimer();
          return;
        }
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimer();
  }, [words, currentWordIndex, text, phase, typeSpeed, deleteSpeed, delayBetweenWords, loop]);

  return {
    text,
    isDeleting: phase === "deleting",
    isComplete: !loop && currentWordIndex === words.length - 1 && phase === "pausing",
  };
};
