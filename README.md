# 🧩 Live Collaborative Kanban Board

A high-performance Kanban board built with React, implementing drag-and-drop, global state management, undo/redo, real-time simulation, and performance optimizations.

---

## 🚀 Live Demo
https://resilient-sable-a99034.netlify.app/

--- 

## 📸 Screenshots
* Profiler Screenshot (React DevTools)
<img width="1838" height="352" alt="profiler" src="https://github.com/user-attachments/assets/e52b8542-8d2a-486c-9850-8a53878722b3" />

* UI Screenshot (Light/Dark Mode)
<img width="1842" height="1080" alt="light_mode" src="https://github.com/user-attachments/assets/fef045a8-deb9-42b8-87f2-9cc96b752fb7" />
<img width="1842" height="1080" alt="dark_mode" src="https://github.com/user-attachments/assets/36d43d6f-c5fa-45bb-9f15-4dd09e1618b6" />

---

## ⚙️ Tech Stack

* React (Vite)
* Redux Toolkit (Global State)
* Native HTML5 Drag & Drop API
* LocalStorage (Persistence)
---

## ✨ Features

### 🔹 Drag & Drop (No Libraries)

* Implemented using native HTML5 Drag API
* Smooth card movement across columns
* Handles edge cases (empty columns, invalid drops)

---

### 🔹 State Management (Redux Toolkit)

* Centralized global state
* No prop drilling
* Predictable state updates

---

### 🔹 Undo / Redo

* Keyboard shortcuts:

  * Ctrl + Z → Undo
  * Ctrl + Y → Redo
* Implemented using past / present / future state pattern

---

### 🔹 Persistence (localStorage)

* Board state saved automatically
* Data restored on refresh
* Optimistic UI updates

---

### 🔹 Real-time Simulation

* Simulates another user via `setInterval`
* Random card moves every 10 seconds
* Conflict detection:

  * If same card is being dragged → warning shown

---

### 🔹 Search & Highlight

* Live search with 300ms debounce
* Case-insensitive filtering
* Matching text highlighted inside cards

---

### 🔹 Performance Optimization

* `React.memo` to prevent unnecessary re-renders
* `useMemo` for derived data (filtered cards)
* `useCallback` for stable function references
* Verified using React DevTools Profiler

👉 Result:

* Efficient rendering even with 100+ cards
* Average render time ~18ms

---

### 🔹 Accessibility (Basic)

* Keyboard interaction (Enter to open card)
* ARIA roles:

  * `role="list"`
  * `role="listitem"`
* Focusable cards (tab navigation)

---

### 🔹 UI Enhancements

* Dark / Light mode (persisted)
* Inline card creation UI
* Delete card with icon
* Hover animations for cards
* Clean responsive layout

---

## 📊 Performance Proof

Using React DevTools Profiler:

* Only necessary components re-render
* No full board re-renders
* Smooth interaction with 100+ cards

  <img width="1838" height="352" alt="profiler" src="https://github.com/user-attachments/assets/1cb69530-4f33-4fec-b1da-eb4b0b86501a" />


---

## 🧠 Architecture Overview

* Global state managed via Redux Toolkit
* Board state structured as:

  ```
  {
    past: [],
    present: { data: { todo, inProgress, done } },
    future: []
  }
  ```
* Undo/Redo implemented using time-travel state pattern
* Components:

  * `App` → Main container
  * `Column` → Column wrapper (memoized)
  * `Card` → Individual card (memoized)

---

## ⚡ Scalability

The application handles 100+ cards efficiently.

For larger datasets (1000+ cards), virtualization (e.g., react-window) can be integrated to further optimize rendering performance.

---


## 📌 Future Improvements

* Virtualized rendering for 1000+ cards
* Backend integration (real-time collaboration)
* Advanced filtering (labels/tags)
* Drag preview animation improvements

---

## 👨‍💻 Author

Shiv Sonwane

---

## ⭐ Notes

This project focuses on performance, scalability, and clean state architecture while maintaining a smooth user experience.
