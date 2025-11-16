"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  cellSize?: number;
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  cellSize = 60,
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);

  return (
    <svg
      className={cn("absolute inset-0 w-full h-full", className)}
      {...props}
    >
      <defs>
        <pattern
          id="grid"
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={cellSize}
            height={cellSize}
            className="stroke-indigo-100/30 fill-transparent transition-all duration-500"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />

      {Array.from({ length: 500 }).map((_, index) => {
        const x = (index % 50) * cellSize;
        const y = Math.floor(index / 50) * cellSize;
        const id = `${x}-${y}`;
        return (
          <rect
            key={id}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            className={cn(
              "stroke-indigo-100/30 transition-all ease-in-out [&:not(:hover)]:duration-1000",
              hoveredSquare === id ? "fill-indigo-300/30" : "fill-transparent",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(id)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}
