"use client";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
} from "react";
import { motion } from "framer-motion";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    if (containerRef.current) {
      containerRef.current.style.setProperty("--x", x.toString());
      containerRef.current.style.setProperty("--y", y.toString());
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={`relative ${containerClassName}`}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={() => {
            setIsMouseEntered(true);
          }}
          onMouseLeave={() => {
            setIsMouseEntered(false);
            if (containerRef.current) {
              containerRef.current.style.setProperty("--x", "0.5");
              containerRef.current.style.setProperty("--y", "0.5");
            }
          }}
          onMouseMove={handleMouseMove}
          className={`relative ${className}`}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const context = useContext(MouseEnterContext);
  
  if (!context) {
    throw new Error("CardBody must be used within a CardContainer");
  }
  
  const [isMouseEntered] = context;
  
  return (
    <motion.div
      className={className}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        transform: isMouseEntered
          ? "rotateX(calc(var(--y) * 20deg - 10deg)) rotateY(calc(var(--x) * 20deg - 10deg))"
          : "rotateX(0deg) rotateY(0deg)",
      }}
      transition={{
        duration: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
};

export const CardItem = ({
  as: Component = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  [key: string]: any;
}) => {
  const context = useContext(MouseEnterContext);
  
  if (!context) {
    throw new Error("CardItem must be used within a CardContainer");
  }
  
  const [isMouseEntered] = context;
  
  const transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
  
  return (
    <motion.div
      className={className}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        transform: isMouseEntered ? transform : "translateX(0px) translateY(0px) translateZ(0px)",
      }}
      transition={{
        duration: 0.2,
      }}
      {...rest}
    >
      <Component>{children}</Component>
    </motion.div>
  );
};