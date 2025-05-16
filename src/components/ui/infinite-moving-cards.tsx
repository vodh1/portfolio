import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { motion, useReducedMotion } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    type: string;
    color: string;
    logo: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial render
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      
      // For performance on mobile, clone fewer items
      const cloneCount = isMobile ? 1 : 2;
      
      for (let i = 0; i < cloneCount; i++) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });
      }
      
      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (prefersReducedMotion) {
        // Greatly slow down or stop animation for users who prefer reduced motion
        containerRef.current.style.setProperty("--animation-duration", "200s");
      } else if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", isMobile ? "15s" : "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", isMobile ? "30s" : "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", isMobile ? "60s" : "80s");
      }
    }
  };

  // Basic motion prop for better performance
  const cardMotion = (!isMobile && !prefersReducedMotion) 
    ? { whileHover: { scale: 1.05 } } 
    : {};

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative max-w-7xl overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && !isMobile && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[250px] max-w-full flex-shrink-0 rounded-2xl border border-white/10 bg-black py-6 px-8 relative"
            key={item.title + idx}
          >
            <div
              className="absolute inset-x-0 h-px w-full mx-auto -top-px"
              style={{
                background: `linear-gradient(to right, transparent, ${item.color}, transparent)`,
              }}
            />
            <div
              className="absolute inset-x-0 h-px w-full mx-auto -bottom-px"
              style={{
                background: `linear-gradient(to right, transparent, ${item.color}, transparent)`,
              }}
            />
            <motion.div
              {...cardMotion}
              className="h-full flex flex-col justify-between"
            >
              <div className="tech-badge mb-2"
                style={{ color: item.color }}
              >
                {item.type}
              </div>
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={item.logo} 
                  alt={item.title} 
                  className="w-12 h-12"
                  loading="lazy"
                />
              </div>
              <div className="text-xl font-bold text-white mb-2 text-center">
                {item.title}
              </div>
              <div
                className="w-12 h-2 rounded-full mx-auto"
                style={{ backgroundColor: item.color }}
              />
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
};