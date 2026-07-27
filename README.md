# Sara Malik — Portfolio

A multi-page personal portfolio (Home, Projects, About, Contact) with a shared navbar/footer, a dynamically rendered projects grid, a validated contact form, and an optional Node/Express backend that stores contact submissions.

## Structure

```
portfolio/
├── index.html          # Home
├── projects.html        # Projects (rendered from data.js)
├── about.html            # About
├── contact.html          # Contact form
├── assets/
│   ├── css/style.css     # All styles, mobile-first responsive
│   └── js/
│       ├── nav.js         # Injects shared navbar + footer on every page
│       ├── data.js        # Project data (single source of truth)
│       ├── projects.js    # Renders project cards + filtering
│       └── contact.js     # Client-side form validation + API call
└── server/
    ├── server.js          # Express backend for the contact form
    └── package.json
```

## Running the frontend

No build step — just open `index.html` in a browser, or serve the folder statically:

```bash
cd portfolio
python3 -m http.server 5500
# visit http://localhost:5500
```

## Running the backend (optional)

The contact form works with client-side validation with or without the backend. If you want submissions actually saved somewhere, run the backend:

```bash
cd portfolio/server
npm install
npm start
# API listens on http://localhost:4000
```

`POST /api/contact` validates the payload server-side and appends it to `server/submissions.json`. If the backend isn't running, the form falls back to opening a pre-filled `mailto:` link so a message is never silently lost.

## How the navbar/footer stay consistent

The navbar and footer markup exists in exactly one place: `assets/js/nav.js`. Every HTML page just has two empty mount points, `<div id="site-header">` and `<div id="site-footer">`, and on `DOMContentLoaded` the script injects the same header/footer template into both, using the current filename to highlight the active nav link. Because the markup is generated from one function instead of pasted into four files, a design or link change only has to happen once and every page picks it up automatically. This is a lightweight version of the "shared component" pattern frameworks give you for free — here it's done with a single injected partial instead of a build step or router.

## Next steps for you (can't be done by an AI assistant)

- Swap the placeholder name, bio, project links, and photo for your real details in `data.js`, `about.html`, and `contact.html`.
- Record a 1–2 min screen capture navigating every page in both desktop and mobile viewport (browser dev tools device toolbar works for the mobile half).
- Push this folder to a public GitHub repo.
- Upload the video to LinkedIn, tag Neurofive Solutions, and share the GitHub link in your submission — these are account actions only you can do from your own LinkedIn/GitHub accounts.
"# Portfolio" 
