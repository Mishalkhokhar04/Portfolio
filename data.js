/**
 * data.js
 * All project content lives here as plain data. Both index.html (featured
 * preview) and projects.html (full grid) read from this same array and
 * render cards with a template function — nothing is hand-written per project.
 */

const PROJECTS = [
  {
    id: "expensewise",
    title: "ExpenseWise",
    year: "2026",
    description:
      "A budgeting app that auto-categorizes bank transactions and forecasts month-end balance. Built the rules engine and the sync layer.",
    tags: ["React", "Node.js", "PostgreSQL"],
    category: "web",
    github: "https://github.com/",
    live: "https://example.com/",
    featured: true,
  },
  {
    id: "queueless",
    title: "Queueless",
    year: "2025",
    description:
      "Mobile check-in system for clinics that replaces paper token numbers with SMS updates and live wait-time estimates.",
    tags: ["React Native", "Express", "Twilio"],
    category: "mobile",
    github: "https://github.com/",
    live: "https://example.com/",
    featured: true,
  },
  {
    id: "gridsight",
    title: "GridSight",
    year: "2025",
    description:
      "Dashboard that visualizes household solar/battery output in real time, with alerts for panel underperformance.",
    tags: ["Vue", "D3.js", "MQTT"],
    category: "web",
    github: "https://github.com/",
    live: "https://example.com/",
    featured: true,
  },
  {
    id: "readloop",
    title: "ReadLoop",
    year: "2024",
    description:
      "Spaced-repetition reading tracker that turns book highlights into daily review cards, similar to a flashcard deck.",
    tags: ["Next.js", "SQLite", "PWA"],
    category: "web",
    github: "https://github.com/",
    live: "",
    featured: false,
  },
  {
    id: "shiftmate",
    title: "ShiftMate",
    year: "2024",
    description:
      "Shift-scheduling tool for small retail teams — drag-and-drop rota builder with automatic overtime warnings.",
    tags: ["React", "Firebase"],
    category: "web",
    github: "https://github.com/",
    live: "https://example.com/",
    featured: false,
  },
  {
    id: "pawtrail",
    title: "PawTrail",
    year: "2023",
    description:
      "Location-sharing app for dog walkers, showing live route, distance covered, and a shareable walk summary card.",
    tags: ["Flutter", "Google Maps API"],
    category: "mobile",
    github: "https://github.com/",
    live: "",
    featured: false,
  },
  {
    id: "cli-snap",
    title: "cli-snap",
    year: "2023",
    description:
      "A tiny command-line tool that snapshots a project's dependency tree and diffs it against the last snapshot before every deploy.",
    tags: ["Node.js", "CLI"],
    category: "tools",
    github: "https://github.com/",
    live: "",
    featured: false,
  },
];
