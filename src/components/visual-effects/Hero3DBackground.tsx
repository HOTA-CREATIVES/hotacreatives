import { useCallback, useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Hero3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionStart = useRef(0);

  const onRender = useCallback((state: Record<string, number>) => {
    if (pointerInteracting.current === null) {
      phiRef.current += 0.0035; // slowly rotate the globe automatically
    }
    state.phi = phiRef.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      if (canvas) {
        widthRef.current = canvas.offsetWidth;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: 0.25,
      dark: 1, // dark background
      diffuse: 1.2,
      mapSamples: 12000,
      mapBrightness: 6.0,
      // baseColor: dark golden-brown for the background dot-matrix grid
      baseColor: [0.15, 0.12, 0.02],
      // markerColor: HOTA gold accent (#f4c20d)
      markerColor: [244 / 255, 194 / 255, 13 / 255],
      // glowColor: HOTA gold accent (#f4c20d)
      glowColor: [244 / 255, 194 / 255, 13 / 255],
      markers: [
        { location: [19.0760, 72.8777], size: 0.08 }, // Mumbai
        { location: [12.9716, 77.5946], size: 0.08 }, // Bangalore
        { location: [28.7041, 77.1025], size: 0.08 }, // Delhi
        { location: [13.0827, 80.2707], size: 0.06 }, // Chennai
        { location: [22.5726, 88.3639], size: 0.06 }, // Kolkata
      ],
      onRender,
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [onRender]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = e.clientX - pointerInteractionStart.current;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
  };

  const onPointerUp = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null && canvasRef.current) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionStart.current = delta;
      phiRef.current = delta / 220; // adjust drag sensitivity
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-12 pointer-events-none overflow-hidden select-none">
      <div className="w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] aspect-square relative opacity-45 transition-opacity duration-700 hover:opacity-60">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerOut={onPointerUp}
          onPointerMove={onPointerMove}
          className="w-full h-full [contain:layout_paint_size] pointer-events-auto cursor-grab transition-all duration-300"
        />
      </div>
    </div>
  );
}
