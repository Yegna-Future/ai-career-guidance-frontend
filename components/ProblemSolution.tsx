"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProblemSolution() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -40, 40, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-12">
        {/* Problem Illustration */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            whileHover={{ rotate: 2, scale: 1.05 }}
            className="relative"
          >
            <Image
              src="/problem_bg_removed.png"
              alt="Confused Student"
              width={500}
              height={500}
              className="drop-shadow-2xl"
            />

          </motion.div>
          <h3 className="mt-6 text-xl font-semibold text-primary">
            Feeling Lost?
          </h3>
          <p className="text-gray-600 max-w-sm">
            Students often struggle to find the right path when choosing
            universities and careers.
          </p>
        </motion.div>

        {/* Journey Path */}
        <div className="flex-1 relative flex items-center justify-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 100"
            fill="none"
            className="w-full h-24"
          >
            <defs>
              {/* Gradient for the path */}
              <linearGradient id="lineGradient" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#9333EA" />
              </linearGradient>

              {/* Arrow marker */}
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="8"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="url(#lineGradient)" />
              </marker>
            </defs>

            {/* Broken S-path with arrow, last curve upward */}
            <path
              d="
        M10,50 S30,20 60,50 S90,80 120,50
        S150,20 180,50 S210,80 240,50
        S270,20 300,30
      "
              stroke="url(#lineGradient)"
              strokeWidth="3.5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              markerEnd="url(#arrow)"
              className="animated-path"
            />
          </svg>

          <style jsx>{`
    @keyframes dashMove {
      to {
        stroke-dashoffset: -500; /* slower motion */
      }
    }

    .animated-path {
      stroke-opacity: 0.95;
      animation: dashMove 10s linear infinite; /* calm, slow */
    }
  `}</style>
        </div>






        {/* Solution Illustration */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-end text-center md:text-right"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ rotate: -2, scale: 1.05 }}
            className="relative"
          >
            <Image
              src="/solution.png"
              alt="Confident Student"
              width={500}
              height={500}
              className="drop-shadow-2xl"
            />

          </motion.div>
          <h3 className="mt-6 text-xl font-semibold text-primary">
            Found Your Path!
          </h3>
          <p className="text-gray-600 max-w-sm">
            With YegnaFuture, students confidently choose universities and
            careers aligned with their goals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
