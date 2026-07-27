/**
 * projects.js
 * Renders <article class="project-card"> elements from PROJECTS (data.js).
 * No project markup is hardcoded in projects.html — everything comes from
 * this template function, so adding a project only means adding a data entry.
 */

function projectCardTemplate(project) {
  const tagsHtml = project.tags
    .map((tag, i) => `<span class="tag${i === 0 ? " tag-accent" : ""}">${tag}</span>`)
    .join("");

  const linksHtml = `
    ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer">live site ↗</a>` : ""}
    ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer">source ↗</a>` : ""}
  `;

  return `
    <article class="project-card" data-category="${project.category}">
      <div class="p-top">
        <h3>${project.title}</h3>
        <span class="p-year">${project.year}</span>
      </div>
      <p class="p-desc">${project.description}</p>
      <div class="tag-row">${tagsHtml}</div>
      <div class="p-links">${linksHtml}</div>
    </article>
  `;
}

function renderProjects(list, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  if (list.length === 0) {
    mount.innerHTML = `<div class="empty-state">No projects match this filter yet.</div>`;
    return;
  }
  mount.innerHTML = list.map(projectCardTemplate).join("");
}

function initProjectsPage() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return; // not on the projects page

  renderProjects(PROJECTS, "projectsGrid");

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");

      const category = btn.dataset.filter;
      const filtered =
        category === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === category);
      renderProjects(filtered, "projectsGrid");
    });
  });
}

function initHomeFeatured() {
  const mount = document.getElementById("featuredGrid");
  if (!mount) return; // not on the home page

  const featured = PROJECTS.filter((p) => p.featured);
  renderProjects(featured, "featuredGrid");
}

document.addEventListener("DOMContentLoaded", () => {
  initProjectsPage();
  initHomeFeatured();
});
