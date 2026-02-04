"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const ratingData = [
  { x: 0, y: 90 },
  { x: 20, y: 75 },
  { x: 40, y: 85 },
  { x: 60, y: 40 },
  { x: 80, y: 30 },
  { x: 100, y: 10 },
];

const features = [
  {
    title: "Live 1v1 Coding Duels",
    desc: "Compete against real players in real time.",
  },
  {
    title: "Fair ELO Rankings",
    desc: "Transparent rating changes after every match.",
  },
  {
    title: "Multiple Game Modes",
    desc: "Solve problems, predict outputs, and crack complexity battles.",
  },
  {
    title: "Performance Analytics",
    desc: "Track speed, accuracy, win-streaks, and overall growth.",
  },
];

const ScrollStatsSection = ({ scrollRef }) => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: scrollRef,
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  const pathData = `M ${ratingData.map((p) => `${p.x},${p.y}`).join(" L ")}`;

  return (
    <section
      ref={sectionRef}
      style={{ minHeight: `${features.length * 80}vh` }}
      className="relative w-full px-6 md:px-16"
    >
      {/* 🔥 HEADING */}
      <div className="flex flex-col items-center gap-4 scale-80 pt-32">
        <h1 className="text-center text-[90px] font-bold text-black dark:text-white leading-[1.1]">
          Features built for experience like{" "}
          <span className="text-[#F2613F]">never</span>{" "}
          <span className="text-[#F2613F]">before !!</span>
        </h1>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* ================= LEFT: GRAPH ================= */}
        <div className="sticky top-12 h-screen flex flex-col justify-start pt-24">
          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-6 bg-[#F2613F] rounded-full" />
              <h3 className="text-lg font-semibold text-white">
                Rating Progress
              </h3>
            </div>

            {/* Graph */}
            <div className="relative w-full h-[50vh] min-h-[380px] max-h-[520px]">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                {/* GRID */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={`y-${y}`}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="#262626"
                    strokeDasharray="2 2"
                  />
                ))}

                {[0, 25, 50, 75, 100].map((x) => (
                  <line
                    key={`x-${x}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="100"
                    stroke="#1f2933"
                    strokeDasharray="2 2"
                  />
                ))}

                {/* AXES */}
                <line x1="0" y1="0" x2="0" y2="100" stroke="#404040" />
                <line x1="0" y1="100" x2="100" y2="100" stroke="#404040" />

                {/* LINE */}
                <motion.path
                  d={pathData}
                  stroke="#F2613F"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pathLength: smoothProgress }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: FEATURES ================= */}
        <div className="flex flex-col py-[20vh] gap-[40vh]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-md"
            >
              <h2 className="text-3xl font-bold text-[#F2613F]">
                {feature.title}
              </h2>
              <p className="mt-3 text-xl text-white/80">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollStatsSection;
