/**
 * nav.js
 * Single source of truth for the site's navbar and footer.
 * Every page includes an empty <div id="site-header"></div> and
 * <div id="site-footer"></div>, and this file injects the same markup
 * into both on every page load — so the nav/footer only ever exist in
 * one place in the codebase, not copy-pasted per page.
 */

const NAV_LINKS = [
  { href: "index.html", label: "home" },
  { href: "projects.html", label: "projects" },
  { href: "about.html", label: "about" },
  { href: "contact.html", label: "contact" },
];

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function renderHeader() {
  const active = currentPage();
  const links = NAV_LINKS.map((link) => {
    const isActive = link.href === active;
    return `<li><a href="${link.href}"${isActive ? ' aria-current="page"' : ""}>${link.label}</a></li>`;
  }).join("");

  return `
    <nav class="nav">
      <a href="index.html" class="nav-brand" aria-label="Home">
        <span class="dot" aria-hidden="true"></span>
        sara.dev
      </a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navLinks" aria-label="Toggle navigation menu">
        <span></span>
      </button>
      <ul class="nav-links" id="navLinks">
        ${links}
      </ul>
    </nav>
  `;
}

function renderFooter() {
  const year = new Date().getFullYear();
  const active = currentPage().replace(".html", "").replace("index", "home");

  return `
    <div class="status-bar">
      <div class="status-segment">
        <span class="dot" aria-hidden="true"></span>
        available for freelance &amp; full-time work
      </div>
      <div class="status-segment">~/sara-malik/${active}</div>
      <div class="status-links">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">github</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">linkedin</a>
        <a href="mailto:hello@saramalik.dev">email</a>
      </div>
    </div>
    <div class="footer-secondary">
      <span>&copy; ${year} Sara Malik. Built from scratch, no framework.</span>
      <a href="#site-header" aria-label="Back to top">back to top ↑</a>
    </div>
  `;
}

function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu after a link is chosen
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function mountSharedChrome() {
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.innerHTML = renderHeader();
  if (footerMount) footerMount.innerHTML = renderFooter();
  initMobileNav();
}

document.addEventListener("DOMContentLoaded", mountSharedChrome);
