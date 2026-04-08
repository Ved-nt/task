import React from "react";
import { motion as Motion } from "framer-motion";

export default function DayCell({
  day,
  isSelected,
  isInRange,
  isHoliday,
  weekend,
  onClick,
}) {
  const base =
    "relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border text-sm font-semibold transition sm:h-14 sm:w-14";
  const state = isSelected
    ? "border-transparent bg-[var(--accent)] text-white shadow-lg"
    : isInRange
      ? "border-transparent bg-[var(--accent-soft)] text-[var(--ink)]"
      : weekend
        ? "border-white/60 bg-white/65 text-rose-600 hover:bg-white"
        : "border-white/60 bg-white/65 text-[var(--ink)] hover:-translate-y-0.5 hover:bg-white";

  return (
    <Motion.div
      variants={{ hidden: { opacity: 0, y: 5 }, show: { opacity: 1, y: 0 } }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${state}`}
      onClick={() => onClick(day)}
    >
      {day}
      {isHoliday && (
        <span className="absolute right-1 top-1 text-[10px] text-amber-500">
          ★
        </span>
      )}
    </Motion.div>
  );
}
