import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-xl text-white w-full max-w-lg",
        className
      )}
    >
      <div className="relative z-10 h-full w-full bg-black/60 p-10 flex flex-col items-center justify-center overflow-hidden rounded-xl">
        <div className="flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <span className="text-3xl font-bold text-white">{text}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {revealText}
            </span>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">{children}</div>
    </div>
  );
};