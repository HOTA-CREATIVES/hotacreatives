import { useState, useEffect } from "react";

/**
 * Custom hook that tracks state of a CSS media query
 * @param query CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    // Listen for changes
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", documentChangeHandler);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(documentChangeHandler);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", documentChangeHandler);
      } else {
        mediaQueryList.removeListener(documentChangeHandler);
      }
    };
  }, [query]);

  return matches;
}
