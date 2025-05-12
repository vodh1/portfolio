"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface StickyScrollProps {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[40rem] overflow-y-auto flex justify-center relative p-4"
      ref={ref}
    >
      <div className="div max-w-7xl flex flex-col md:flex-row gap-10 relative">
        <div className="w-full md:w-1/2 sticky top-0 h-screen flex items-center">
          <div className="bg-black/70 backdrop-blur p-6 md:p-10 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              {content[activeCard].title}
            </h2>
            <p className="text-gray-400 mb-6">
              {content[activeCard].description}
            </p>
            <div
              className={cn(
                "prose prose-sm prose-invert",
                contentClassName
              )}
            >
              {content[activeCard].content}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full">
          <div className="grid grid-cols-1 gap-10">
            {content.map((item, index) => (
              <div
                key={item.title + index}
                className="h-screen flex items-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                    y: activeCard === index ? 0 : 20,
                  }}
                  className={cn(
                    "bg-black/50 backdrop-blur p-6 md:p-10 rounded-2xl",
                    activeCard === index && "border border-purple-500/30"
                  )}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h2>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};