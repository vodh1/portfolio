import React, { Fragment } from "react";
import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <Fragment key={item.title + idx}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="wait">
              {hoveredIndex === idx && (
                <motion.div
                  className="absolute inset-0 bg-neutral-900 rounded-lg z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
            <Card>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle
                    className="text-white"
                  >
                    {item.title}
                  </CardTitle>
                  {item.icon && (
                    <motion.div 
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900 text-white"
                      animate={{
                        backgroundColor: hoveredIndex === idx 
                          ? "rgba(139, 92, 246, 0.2)" // Light purple background when hovered
                          : "rgba(23, 23, 23, 1)", // Default dark background
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>
                  )}
                </div>
                <CardDescription
                  className={cn(
                    hoveredIndex === idx ? "text-neutral-200" : "text-neutral-400"
                  )}
                >
                  {item.description}
                </CardDescription>
                <div className="mt-auto pt-4">
                  <motion.span
                    className="inline-flex items-center text-sm font-medium"
                    animate={{
                      color: hoveredIndex === idx 
                        ? "rgb(167, 139, 250)" // Lighter purple when hovered (purple-400)
                        : "rgb(139, 92, 246)" // Default purple (purple-500)
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    View Project
                    <motion.svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      animate={{
                        x: hoveredIndex === idx ? 3 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </motion.svg>
                  </motion.span>
                </div>
              </div>
            </Card>
          </a>
        </Fragment>
      ))}
    </div>
  );
};

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-lg h-full w-full p-6 overflow-hidden bg-black border border-white/[0.08] group-hover:border-white/[0.2] transition-all duration-300 relative z-10",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3 className={cn("text-xl font-bold tracking-wide", className)}>
      {children}
    </h3>
  );
};

const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={cn("mt-2 leading-relaxed tracking-wide", className)}>
      {children}
    </p>
  );
};