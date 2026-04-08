import React, { useState } from "react";
import { motion as Motion } from "framer-motion";

export default function NotesSection({ range }) {
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState(() => {
    try {
      const raw = localStorage.getItem("calendarNotes");
      const stored = raw ? JSON.parse(raw) : [];
      return Array.isArray(stored) ? stored : [];
    } catch {
      localStorage.removeItem("calendarNotes");
      return [];
    }
  });

  const saveNote = () => {
    if (!note.trim()) return;
    const newNote = {
      id: Date.now(),
      text: note,
      range: range || null,
      timestamp: new Date().toLocaleString(),
    };
    const newNotes = [...savedNotes, newNote];
    setSavedNotes(newNotes);
    localStorage.setItem("calendarNotes", JSON.stringify(newNotes));
    setNote("");
  };

  const deleteNote = (id) => {
    const newNotes = savedNotes.filter((n) => n.id !== id);
    setSavedNotes(newNotes);
    localStorage.setItem("calendarNotes", JSON.stringify(newNotes));
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/50 bg-white/55 p-4 shadow-[0_20px_45px_-30px_rgba(0,0,0,0.45)] backdrop-blur sm:p-6">
      <h2 className="display-font mb-4 text-xl font-semibold">Notes</h2>
      {range && (
        <p className="mb-2 text-sm text-[var(--ink)]/70">
          Selected range: {range.start} – {range.end}
        </p>
      )}

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your note..."
        className="h-24 w-full resize-none rounded-xl border border-white/70 bg-white/80 p-3 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--ring)]"
      />

      <button
  onClick={saveNote}
  className="mt-3 rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-semibold text-black shadow-md transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] active:scale-95"
>
  Save Note
</button>


      <div className="mt-6">
        <h3 className="mb-3 font-semibold">Saved Notes</h3>
        {savedNotes.length === 0 ? (
          <p className="text-sm text-[var(--ink)]/60">No notes yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {savedNotes.map((n) => (
              <Motion.div
                key={n.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-xl border border-white/70 bg-white/80 p-4 shadow-sm"
              >
                <button
                  onClick={() => deleteNote(n.id)}
                  className="absolute right-2 top-2 text-rose-500 transition hover:text-rose-700"
                >
                  ✕
                </button>
                <p className="mb-2 text-sm">{n.text}</p>
                {n.range && (
                  <span className="block text-xs text-[var(--ink)]/60">
                    Range: {n.range.start} – {n.range.end}
                  </span>
                )}
                <span className="block text-xs text-[var(--ink)]/45">
                  {n.timestamp}
                </span>
              </Motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
