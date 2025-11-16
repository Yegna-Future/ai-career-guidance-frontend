import React from "react";
import { Card } from "./ui/card";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "University Explorer",
    desc: "Streamline university discovery with intelligent matching for optimal educational pathways.",
    icon: "/discover.png",
    bg: "bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100",
    border: "border-l-4 border-blue-500",
    textColor: "text-primary",
    descColor: "text-gray-700",
    span: "md:col-span-1 md:row-span-1",
    layout: "centered",
    imgSize: { w: 120, h: 100 },
    cta: "Explore",
  },
  {
    title: "Scholarships",
    desc: "Access university and global scholarships, helping you fund your education worldwide.",
    icon: "/scholarship.png",
    bg: "bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700",
    border: "border-l-4 border-purple-300",
    textColor: "text-white",
    descColor: "text-indigo-100",
    span: "md:col-span-2 md:row-span-1",
    layout: "image-left-text-right",
    imgSize: { w: 150, h: 130 },
    cta: "Find Funds",
  },
  {
    title: "Career Mapper",
    desc: "Power your career journey with seamless pathway mapping for exceptional outcomes.",
    icon: "/career-mapper.jpg",
    bg: "bg-gradient-to-br from-purple-50 via-teal-50 to-purple-100",
    border: "border-l-4 border-purple-500",
    textColor: "text-primary",
    descColor: "text-gray-700",
    span: "md:col-span-2 md:row-span-1",
    layout: "text-top-image-bottom",
    imgSize: { w: 100, h: 80 },
    cta: "Map Career",
  },
  {
    title: "AI Assistant",
    desc: "Personalized guidance with consistent support for optimal student success.",
    icon: "/ai-chatbot.jpg",
    bg: "bg-gradient-to-br from-violet-50 via-purple-50 to-violet-100",
    border: "border-l-4 border-violet-500",
    textColor: "text-primary",
    descColor: "text-gray-700",
    span: "md:col-span-1 md:row-span-1",
    layout: "image-top-text-bottom",
    imgSize: { w: 80, h: 80 },
    cta: "Chat Now",
  },
];

function PillarCard({ feature }: { feature: typeof features[0] }) {
  const layouts: Record<string, React.ReactNode> = {
    centered: (
      <div className="flex flex-col items-center text-center gap-4 w-full h-full justify-between py-4">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm"></div>
            <Image
              src={feature.icon}
              alt={feature.title}
              width={feature.imgSize.w}
              height={feature.imgSize.h}
              className="rounded-lg relative z-10"
            />
          </div>
          <div className="space-y-2">
            <h3 className={`text-2xl font-bold ${feature.textColor}`}>
              {feature.title}
            </h3>
            <p className={`text-xs leading-relaxed ${feature.descColor} line-clamp-2`}>
              {feature.desc}
            </p>
          </div>
        </div>
        <Link href="/universities">
          <Button
            variant="primary"
            size="lg"
            className={`mt-2 cursor-pointer ${feature.textColor} text-white text-xs h-8 px-3`}
          >
            {feature.cta}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>

      </div>
    ),
    "image-left-text-right": (
      <div className="flex items-center justify-between gap-2 w-full h-full py-2">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-white/10 rounded-lg blur-sm"></div>
          <Image
            src={feature.icon}
            alt={feature.title}
            width={feature.imgSize.w}
            height={feature.imgSize.h}
            className="rounded-lg relative z-10"
          />
        </div>
        <div className="flex flex-col items-end gap-2 flex-1">
          <div className="text-right space-y-2">
            <h3 className={`text-3xl font-bold ${feature.textColor}`}>
              {feature.title}
            </h3>
            <p className={`text-lg leading-relaxed ${feature.descColor} line-clamp-2`}>
              {feature.desc}
            </p>
          </div>
          <Link href="/scholarships">
            <Button
              variant="secondary"
              className={`mt-2 cursor-pointer ${feature.textColor} text-white text-xs h-8 px-3`}
            >
              {feature.cta}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    ),
    "text-top-image-bottom": (
      <div className="flex flex-col justify-between h-full gap-3 py-3">
        <div className="space-y-2">
          <h3 className={`text-2xl font-bold ${feature.textColor}`}>
            {feature.title}
          </h3>
          <p className={` leading-relaxed ${feature.descColor} line-clamp-2`}>
            {feature.desc}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm"></div>
            <Image
              src={feature.icon}
              alt={feature.title}
              width={feature.imgSize.w}
              height={feature.imgSize.h}
              className="rounded-lg relative z-10"
            />
          </div>
          <Link href="/career-mapper">
            <Button
              variant="secondary"
              size="lg"
              className={`mt-2 cursor-pointer ${feature.textColor} text-white text-xs h-8 px-3`}
            >
              {feature.cta}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>

        </div>
      </div>
    ),
    "image-top-text-bottom": (
      <div className="flex flex-col justify-between h-full gap-3 py-3">
        <div className="flex justify-between items-start gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm"></div>
            <Image
              src={feature.icon}
              alt={feature.title}
              width={feature.imgSize.w}
              height={feature.imgSize.h}
              className="rounded-lg relative z-10"
            />
          </div>
          <Link href="/chatbot">
            <Button
              variant="primary"
              className={`mt-2 cursor-pointer ${feature.textColor} text-white text-xs h-8 px-3`}
            >
              {feature.cta}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>

        </div>
        <div className="space-y-2">
          <h3 className={`text-2xl font-bold ${feature.textColor}`}>
            {feature.title}
          </h3>
          <p className={`text-xs leading-relaxed ${feature.descColor}`}>
            {feature.desc}
          </p>
        </div>
      </div>
    ),
  };

  return (
    <Card
      className={`${feature.span} ${feature.bg} ${feature.border} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex items-center justify-center h-full group hover:scale-[1.02] backdrop-blur-sm min-h-[180px]`}
    >
      {layouts[feature.layout]}
    </Card>
  );
}

export default function Pillars() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decorations - smaller and less intrusive */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute top-10 right-10 w-48 h-48 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-48 h-48 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>

      <MaxWidthWrapper>

        {/* Bento Grid - more compact with 5 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  mx-auto">
          {features.map((f, i) => (
            <PillarCard key={i} feature={f} />
          ))}
        </div>

      </MaxWidthWrapper>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}