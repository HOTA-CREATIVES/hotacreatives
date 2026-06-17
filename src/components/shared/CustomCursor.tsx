import { useEffect, useRef, useState, useCallback } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isFinePointerRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const sparksRef = useRef<Spark[]>([]);
  const sparkIdRef = useRef(0);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -200, y: -200 });
  const lastSpawnRef = useRef(0);

  const spawnSparks = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 20) return; // throttle to ~50fps spawn
    lastSpawnRef.current = now;

    const count = 2 + Math.floor(Math.random() * 3); // 2-4 sparks per move
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 2.5;
      sparksRef.current.push({
        id: sparkIdRef.current++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5, // slight upward bias
        life: 1,
        maxLife: 0.6 + Math.random() * 0.6,
        size: 1.5 + Math.random() * 2.5,
      });
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !canvas) return;

    // Size canvas to viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

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
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      spawnSparks(e.clientX, e.clientY);
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

    // Animation loop
    const ctx = canvas.getContext("2d");
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw sparks
      sparksRef.current = sparksRef.current.filter((spark) => {
        spark.life -= 0.035;
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.12; // gravity
        spark.vx *= 0.97; // drag
        return spark.life > 0;
      });

      for (const spark of sparksRef.current) {
        const alpha = spark.life;
        // Gold-to-white gradient based on remaining life
        const r = Math.round(244);
        const g = Math.round(194 + (255 - 194) * (1 - alpha));
        const b = Math.round(13 * alpha);

        ctx.save();
        ctx.globalAlpha = Math.min(alpha * 1.5, 1);
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(244, 194, 13, ${alpha})`;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    mediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      mediaQuery.removeEventListener("change", onMediaQueryChange);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(rafRef.current);
      setCursorMode(false);
    };
  }, [spawnSparks]);

  return (
    <>
      {/* Full-screen spark canvas — pointer-events: none so it never blocks clicks */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        aria-hidden="true"
      />
      {/* Ring cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? "hover" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
