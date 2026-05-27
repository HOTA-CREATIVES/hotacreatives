import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isFinePointerRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    isFinePointerRef.current = mediaQuery.matches;

    const setCursorMode = (enabled: boolean) => {
      document.body.classList.toggle("custom-cursor-enabled", enabled);
      if (!enabled) setIsHovering(false);
    };

    setCursorMode(isFinePointerRef.current);

    const onMediaQueryChange = (event: MediaQueryListEvent) => {
      isFinePointerRef.current = event.matches;
      setCursorMode(event.matches);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current) return;
      cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!isFinePointerRef.current) return;
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    mediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      mediaQuery.removeEventListener("change", onMediaQueryChange);
      setCursorMode(false);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? "hover" : ""}`}
      aria-hidden="true"
    />
  );
}
