import { useState, useEffect } from "react";

export function useRotatingText(texts: string[], intervalMs = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [texts.length, intervalMs]);

  return texts[index];
}
