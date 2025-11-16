"use client";

import FeaturedUniversities from "@/components/FeaturedUniversities";
import Hero from "@/components/Hero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Pillars from "@/components/Pillars";
import ProblemSolution from "@/components/ProblemSolution";
import { useUniversities } from "@/hooks/useUniversities";
import Image from "next/image";

export default function Home() {
  const { data, isLoading } = useUniversities();
  return (
    <>
      <Hero />


      <ProblemSolution />

      <Pillars />


      {/*!isLoading && data ? <FeaturedUniversities list={data.slice(0, 3)} /> : <div className="text-center py-12">Loading...</div>*/}


    </>
  );
}
