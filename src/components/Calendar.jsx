import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion as Motion } from "framer-motion";
import HeroSVG from "./HeroSVG";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";
import BackgroundScene from "./BackgroundScene";

export default function Calendar() {
  const [range, setRange] = useState(null);
  const [theme, setTheme] = useState("spring");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const shellRef = useRef(null);
  const heroRef = useRef(null);
  const panelRef = useRef(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (!shellRef.current || !heroRef.current || !panelRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(shellRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .fromTo(
        heroRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "<0.1",
      )
      .fromTo(
        panelRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        "<0.1",
      );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { boxShadow: "0 0 0 0 var(--ring)" },
      {
        boxShadow: "0 0 0 14px rgba(0,0,0,0)",
        duration: 0.65,
        ease: "power2.out",
      },
    );
  }, [theme]);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div
      className={`theme-${theme} relative min-h-screen pb-10`}
      ref={shellRef}
    >
      <BackgroundScene theme={theme} />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-8 md:flex-row md:px-8">
        <Motion.div
          ref={heroRef}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroSVG theme={theme} />
        </Motion.div>

        <div
          ref={panelRef}
          className="flex-1 rounded-3xl border border-white/40 bg-[var(--card)] p-4 shadow-[0_22px_55px_-28px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={prevMonth}
              className="rounded-full border border-white/50 bg-white/65 px-4 py-2 text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Prev
            </button>
            <h2 className="display-font text-2xl font-semibold sm:text-3xl">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="rounded-full border border-white/50 bg-white/65 px-4 py-2 text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Next
            </button>
          </div>

          <CalendarGrid year={year} month={month} onRangeSelect={setRange} />

          <NotesSection range={range} />

          <div className="mt-5 flex flex-wrap gap-2">
            {["spring", "summer", "autumn", "winter"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                  theme === t
                    ? "bg-[var(--accent)] text-white shadow-lg"
                    : "border border-white/60 bg-white/70 text-[var(--ink)] hover:bg-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
