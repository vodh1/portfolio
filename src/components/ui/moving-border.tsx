import React from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export const Button = ({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 2500,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <Component
      className={cn(
        "relative p-[1px] overflow-hidden",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8]",
              borderClassName
            )}
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, #000000 0deg, #6d28d9 112.5deg, #7c3aed 228.75deg, rgba(0, 0, 0, 0.2) 360deg)",
            }}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-black text-white border border-neutral-800 flex items-center justify-center",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "10%",
  ry = "10%",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      {...otherProps}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "-100%",
          bottom: "-100%",
          left: "-100%",
          right: "-100%",
          transformOrigin: "center center",
        }}
        animate={{
          rotate: "360deg",
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          style={{
            width: "200%",
            height: "200%",
            position: "absolute",
            borderRadius: `${rx} / ${ry}`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};