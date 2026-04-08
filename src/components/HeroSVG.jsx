import React from "react";
import { motion as Motion } from "framer-motion";

export default function HeroSVG({ theme }) {
  const fill =
    theme === "spring"
      ? "#2f855a"
      : theme === "summer"
        ? "#c46a15"
        : theme === "autumn"
          ? "#a03f27"
          : "#255b8d";

  return (
    <div className="w-full md:w-[320px]">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/55 p-6 shadow-[0_24px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <div className="mb-5">
          <h1 className="display-font text-3xl font-semibold">Mood Calendar</h1>
          <p className="mt-2 text-sm text-[var(--ink)]/80">
            Pick a date range and save small moments. The scene and accents
            react to the selected season.
          </p>
        </div>

        <Motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="170"
          height="170"
          viewBox="0 0 24 24"
          className="mx-auto"
          animate={{ rotate: [0, 7, -6, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="12" cy="12" r="10" fill={fill} opacity="0.92" />
          <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="2" fill="white" />
        </Motion.svg>
      </Motion.div>
    </div>
  );
}
