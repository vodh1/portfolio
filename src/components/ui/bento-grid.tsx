import React from "react";
import { cn } from "../../utils/cn";

export type BentoGrid = React.FC<{
  className?: string;
  children?: React.ReactNode;
}>;

export const BentoGrid: BentoGrid = ({
  className,
  children,
}) => {
  return (
    <div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
};

export type BentoGridItem = React.FC<{
  className?: string;
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
}>;

export const BentoGridItem: BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  link,
}) => {
  const cardContent = (
    <div className={cn(
      "relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm p-4 md:p-6 h-full transition-all duration-300",
      "group-hover:border-white/20 group-hover:shadow-[0_0_30px_2px_rgba(139,92,246,0.2)]",
      className
    )}>
      <div className="z-10">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="font-sans text-xl font-bold text-neutral-200 group-hover:text-white transition-colors">{title}</div>
          {icon && (
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              {icon}
            </div>
          )}
        </div>
        <div className="font-sans text-sm font-normal text-neutral-300 mb-4 group-hover:text-neutral-200 transition-colors">
          {description}
        </div>
      </div>
      {header && (
        <div className="relative mt-auto pt-3">
          {header}
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}; 