import React, { useEffect, useRef, useState, memo } from "react";
import { cn } from "../../utils/cn";

interface BackgroundBeamsProps extends React.HTMLAttributes<HTMLDivElement> {
  initialCentered?: boolean;
}

// Export default for lazy loading
const BackgroundBeams = memo(({
  className,
  initialCentered = false,
  ...props
}: BackgroundBeamsProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const backgroundBeamsRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewportDimensions = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    // Throttle pointer move to reduce performance impact
    const handlePointerMove = (event: PointerEvent) => {
      const now = Date.now();
      // Only update cursor position every 50ms to reduce CPU usage
      if (now - lastMoveTimeRef.current > 50) {
        lastMoveTimeRef.current = now;
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        animationFrameRef.current = requestAnimationFrame(() => {
          setCursorPosition({ x: event.clientX, y: event.clientY });
        });
      }
    };

    // Debounce resize event
    let resizeTimer: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updateViewportDimensions, 250);
    };

    // Set initial position to center of screen if initialCentered is true
    if (initialCentered) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setCursorPosition({ x: centerX, y: centerY });
    }

    updateViewportDimensions();
    window.addEventListener("resize", debouncedResize);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimer);
    };
  }, [initialCentered]);

  // Calculate normalized mouse position with reduced intensity
  const normalizedMouseX = cursorPosition.x / viewportWidth;
  const normalizedMouseY = cursorPosition.y / viewportHeight;
  
  // Reduced cursor influence
  const cursorInfluence = 40; // Reduced from 100

  return (
    <div
      className={cn(
        "pointer-events-none z-0 absolute inset-0 overflow-hidden bg-black opacity-30",
        className
      )}
      {...props}
      ref={backgroundBeamsRef}
    >
      <div
        className="absolute inset-0 z-10 bg-black [mask-image:radial-gradient(transparent,white)] mix-blend-overlay"
        style={{
          opacity: 0.6,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square"
        style={{
          top: `calc(50% + ${
            normalizedMouseY > 0.5
              ? (normalizedMouseY - 0.5) * cursorInfluence
              : (normalizedMouseY - 0.5) * cursorInfluence
          }px)`,
          left: `calc(50% + ${
            normalizedMouseX > 0.5
              ? (normalizedMouseX - 0.5) * cursorInfluence
              : (normalizedMouseX - 0.5) * cursorInfluence
          }px)`,
          backgroundImage: `conic-gradient(
                from 180deg at 50% 50%,
                #9333ea 0deg,
                #7c3aed 72deg,
                #6366f1 144deg,
                #3b82f6 216deg,
                #8b5cf6 288deg
              )`,
          filter: "blur(60px)",
        }}
      />
    </div>
  );
});

// Named export for direct imports
export { BackgroundBeams };

// Default export for lazy loading
export default { BackgroundBeams }; 