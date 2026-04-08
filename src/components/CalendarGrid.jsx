import React, { useMemo, useState } from "react";
import DayCell from "./DayCell";
import { motion as Motion } from "framer-motion";

export default function CalendarGrid({ year, month, onRangeSelect }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const weekdays = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    [],
  );

  const holidays = [5, 14, 21]; // demo holidays

  const handleClick = (day) => {
    if (!start || (start && end)) {
      setStart(day);
      setEnd(null);
      onRangeSelect(null);
    } else if (day > start) {
      setEnd(day);
      onRangeSelect({ start, end: day });
    } else {
      setStart(day);
      setEnd(null);
      onRangeSelect(null);
    }
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected = d === start || d === end;
    const isInRange = start && end && d > start && d < end;
    const isHoliday = holidays.includes(d);
    const weekday = (firstDay + d - 1) % 7;

    cells.push(
      <Motion.div
        key={d}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <DayCell
          day={d}
          isSelected={isSelected}
          isInRange={isInRange}
          isHoliday={isHoliday}
          onClick={handleClick}
          weekend={weekday === 0 || weekday === 6}
        />
      </Motion.div>,
    );
  }

  return (
    <div className="rounded-2xl border border-white/50 bg-white/55 p-4 shadow-[0_20px_45px_-30px_rgba(0,0,0,0.45)] backdrop-blur sm:p-6">
      <div className="mb-4 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wider text-[var(--ink)]/70 sm:text-sm">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <Motion.div
        key={`${year}-${month}`}
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.015 } },
        }}
        className="grid grid-cols-7 gap-2 sm:gap-3"
      >
        {cells}
      </Motion.div>
    </div>
  );
}
