/**
 * server.js
 * Minimal backend for the portfolio's contact form.
 *
 * - POST /api/contact  -> validates + stores a submission in submissions.json
 * - GET  /api/contact   -> lists stored submissions (for your own use, not linked from the UI)
 * - GET  /api/health    -> quick check that the server is up
 *
 * Run:
 *   cd server
 *   npm install
 *   npm start
 * Server listens on http://localhost:4000
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const DB_FILE = path.join(__dirname, "submissions.json");

app.use(cors());
app.use(express.json());

function readSubmissions() {
  if (!fs.existsSync(DB_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeSubmissions(list) {
  fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};

  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Name must be at least 2 characters.");
  if (!email || !isValidEmail(email)) errors.push("A valid email is required.");
  if (!subject || subject.trim().length < 3) errors.push("Subject must be at least 3 characters.");
  if (!message || message.trim().length < 20) errors.push("Message must be at least 20 characters.");

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(" ") });
  }

  const submission = {
    id: Date.now().toString(36),
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  const submissions = readSubmissions();
  submissions.push(submission);
  writeSubmissions(submissions);

  console.log(`New contact submission from ${submission.name} <${submission.email}>`);

  res.status(201).json({ success: true, id: submission.id });
});

app.get("/api/contact", (req, res) => {
  res.json(readSubmissions());
});

app.listen(PORT, () => {
  console.log(`Contact API running at http://localhost:${PORT}`);
});
