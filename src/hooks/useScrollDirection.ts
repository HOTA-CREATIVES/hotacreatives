import { useState, useEffect } from "react";

/**
 * Custom hook to detect scroll direction
 * @returns 'up' or 'down' based on current scroll direction
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const toggleScrollDirection = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        setScrollDirection("up");
      }
      if (Math.abs(scrollY - prevOffset) < 10) {
        // Threshold to avoid jittering
        return;
      }
      const direction = scrollY > prevOffset ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - prevOffset > 10 || scrollY - prevOffset < -10)
      ) {
        setScrollDirection(direction);
      }
      setPrevOffset(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener("scroll", toggleScrollDirection);
    return () => {
      window.removeEventListener("scroll", toggleScrollDirection);
    };
  }, [scrollDirection, prevOffset]);

  return scrollDirection;
}
