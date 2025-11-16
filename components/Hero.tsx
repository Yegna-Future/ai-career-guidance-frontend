"use client";

import { Bot, Globe, GraduationCap, MapIcon, Search } from "lucide-react";
import React, { ReactNode } from "react";
import { Badge } from "./ui/badge";
import { InteractiveGridPattern } from "./ui/interactive-grid-pattern";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { TypingAnimation } from "./ui/typing-animation";
import { Marquee } from "./ui/marquee";
import Link from "next/link";

// Floating Circle
interface FloatingCircleProps {
  size: number;
  color: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay?: string;
  opacity?: number;
}
const FloatingCircle: React.FC<FloatingCircleProps> = ({
  size,
  color,
  top,
  bottom,
  left,
  right,
  delay = "0s",
  opacity = 0.3,
}) => (
  <div
    className="absolute rounded-full animate-float"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      top,
      bottom,
      left,
      right,
      opacity,
      animationDelay: delay,
    }}
  />
);

// Floating Shape
interface FloatingShapeProps {
  size: number;
  children: ReactNode;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay?: string;
  opacity?: number;
  rotate?: string;
}
export const FloatingShape: React.FC<FloatingShapeProps> = ({
  size,
  children,
  top,
  bottom,
  left,
  right,
  delay = "0s",
  opacity = 0.3,
  rotate = "0deg",
}) => (
  <div
    className="absolute animate-float flex items-center justify-center"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top,
      bottom,
      left,
      right,
      opacity,
      animationDelay: delay,
      transform: `rotate(${rotate})`,
    }}
  >
    <div style={{ width: "100%", height: "100%" }}>{children}</div>
  </div>
);

export default function Hero() {
  return (
    <section className="relative cursor-pointer min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-white">
      {/* Background Grid */}
      <InteractiveGridPattern className="absolute inset-0 w-full h-full" />


      <div className="relative z-10 max-w-6xl mx-auto text-center mt-0 sm:mt-8 px-2">
        {/* Heading */}

        <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          <TypingAnimation
            words={["Find. Learn."]}
            as="span"
            className="inline-block"
            cursorStyle="line"
            loop
            showCursor={false}
          />{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Achieve.
          </span>
        </div>


        {/* Subtext */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
          One platform to explore universities, chat with AI advisors, and plan
          your future path.
        </p>

        <div className="flex items-center justify-center gap-5 mb-6">
          <Link href="/chatbot">
            <Button variant="primary" size="lg">
              <div className="flex items-center justify-center gap-1">
                <Bot /> <span>Chat</span>
              </div>
            </Button>
          </Link>

          <Link href="/universites">
            <Button variant="secondary" size="lg" className="text-white">
              <div className="flex items-center justify-center gap-1">
                <Search /> <span>Explore</span>
              </div>
            </Button>
          </Link>


        </div>


        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
          <Badge className="flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
            <Bot className="w-4 h-4" /> AI-Powered Guidance
          </Badge>

          <Badge className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
            <GraduationCap className="w-4 h-4" /> Personalized Matches
          </Badge>

          <Badge className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
            <MapIcon className="w-4 h-4" /> Career Mapping
          </Badge>

          <Badge className="flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
            <Globe className="w-4 h-4" /> Global Access
          </Badge>
        </div>
      </div>

      {/* Floating Shapes - hidden or resized on mobile */}
      <FloatingCircle
        size={70}
        color="rgba(59,130,246,0.25)"
        top="12%"
        left="5%"
        delay="0s"
      />
      <FloatingCircle
        size={60}
        color="rgba(139,92,246,0.25)"
        top="25%"
        right="10%"
        delay="1s"
      />
      <FloatingCircle
        size={80}
        color="rgba(72,187,120,0.3)"
        bottom="12%"
        left="70%"
        delay="1s"
      />

      <FloatingShape
        size={50}
        top="12%"
        left="8%"
        delay="0s"
        rotate="-10deg"
        opacity={0.3}
      >
        <GraduationCap className="w-full h-full text-blue-500" />
      </FloatingShape>

      <FloatingShape
        size={45}
        top="28%"
        right="12%"
        delay="1s"
        rotate="15deg"
        opacity={0.3}
      >
        <Bot className="w-full h-full text-purple-500" />
      </FloatingShape>

      <FloatingShape
        size={60}
        bottom="8%"
        left="18%"
        delay="0.5s"
        rotate="-15deg"
        opacity={0.3}
      >
        <MapIcon className="w-full h-full text-green-500" />
      </FloatingShape>

      {/* Floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
