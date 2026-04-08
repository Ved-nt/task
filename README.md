## Mood Calendar

A **modern, interactive calendar application** built with **React, Three.js, and Framer Motion**, featuring smooth animations, range selection, and persistent notes.

Features
 1. Calendar
    Interactive monthly calendar UI
    Date range selection (start → end)
    Weekend & holiday highlighting
    Smooth animations using Framer Motion

 2. Notes System
    Add notes linked to selected date ranges
    Persistent storage using LocalStorage
    Timestamped entries
    Delete notes functionality

  3. UI / UX
    Glassmorphism-based modern design
    Responsive layout (mobile + desktop)
    Theme-aware styling using CSS variables
    Smooth hover + click animations

  4.Animated Background
    Built with **Three.js**
    Floating particle system
    Dynamic lighting effects
    Wave-based motion animation
    Fully responsive

Tech Stack

* **Frontend:** React.js
* **Animations:** Framer Motion
* **3D Graphics:** Three.js
* **Styling:** Tailwind CSS
* **State Management:** React Hooks
* **Storage:** LocalStorage

---

Project Structure

```
src/
│
├── components/
│   ├── BackgroundScene.jsx      # Three.js animated background
│   ├── CalendarGrid.jsx        # Calendar layout & logic
│   ├── DayCell.jsx             # Individual date cell
│   ├── NotesSection.jsx        # Notes + local storage
│   ├── HeroSVG.jsx             # Decorative UI element
│   └── Calendar.jsx            # Main container
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Ved-nt/task.git

# Navigate into the project
cd task

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

##  How It Works

###  Date Selection

 First click → Start date
 Second click → End date
 Automatically highlights range

###  Notes

* Notes are saved with:

   Selected range
   Timestamp
* Stored in browser using `localStorage`

###  Background Animation

* Uses **Three.js** to render particles
* Light sources move dynamically
* Particles animate in wave patterns

---

##  Future Improvements

  Month & year navigation
  Google Calendar integration
  Dark mode toggle
  Drag-to-select date range
  Backend storage (MongoDB / Firebase)
  Notifications & reminders

---

e

This project is licensed under the MIT License.
