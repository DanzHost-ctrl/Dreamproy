(function () {
  "use strict";
  const allResources = [
    ...(window.ADDONS || []), ...(window.MAPS || []), ...(window.SHADERS || []),
    ...(window.TEXTURES || []), ...(window.SKINS || [])
  ];
  window.ALL_RESOURCES = allResources;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const formatDownloads = n => Number(n || 0).toLocaleString("id-ID");
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char]));
  window.Dreamproy = { $, $$, formatDownloads, escapeHtml };

  function resourceCard(item) {
    return `<article class="resource-card reveal">
      <a class="resource-thumb" href="detail.html?id=${encodeURIComponent(item.id)}" aria-label="Lihat detail ${escapeHtml(item.title)}">
        <span class="badge">${escapeHtml(item.category)}</span>
        <img loading="lazy" src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)} thumbnail">
      </a>
      <div class="resource-body">
        <h3><a href="detail.html?id=${encodeURIComponent(item.id)}">${escapeHtml(item.title)}</a></h3>
        <p>${escapeHtml(item.shortDescription)}</p>
        <div class="resource-meta"><span>◈ ${escapeHtml(item.version)}</span><span>↓ ${formatDownloads(item.downloads)}</span><span>◷ ${escapeHtml(item.date)}</span></div>
        <div class="resource-footer"><span class="resource-author">by ${escapeHtml(item.author)}</span><a class="button button-secondary" href="detail.html?id=${encodeURIComponent(item.id)}">VIEW DETAILS</a></div>
      </div>
    </article>`;
  }
  window.renderResourceCard = resourceCard;

  const resourceGrid = $("#resource-grid");
  if (resourceGrid) {
    const pageCategory = resourceGrid.dataset.category || "all";
    const source = pageCategory === "all" ? allResources : allResources.filter(item => item.category.toLowerCase() === pageCategory);
    const featured = $("#featured-grid");
    const latest = [...allResources].sort((a,b) => new Date(b.date) - new Date(a.date));
    if (featured) featured.innerHTML = latest.slice(0, 3).map(resourceCard).join("");
    let current = [...source];
    const render = () => {
      resourceGrid.innerHTML = current.map(resourceCard).join("");
      const empty = $(".empty-state");
      if (empty) empty.classList.toggle("show", current.length === 0);
      revealItems();
    };
    render();
    $$(".filter-tab").forEach(tab => tab.addEventListener("click", () => {
      $$(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      current = (filter === "all" ? source : source.filter(item => item.category.toLowerCase() === filter));
      sortCurrent();
    }));
    const sortSelect = $("#sort-select");
    function sortCurrent() {
      const mode = sortSelect ? sortSelect.value : "newest";
      current.sort((a,b) => mode === "oldest" ? new Date(a.date) - new Date(b.date) :
        mode === "az" ? a.title.localeCompare(b.title) : mode === "downloads" ? b.downloads - a.downloads : new Date(b.date) - new Date(a.date));
      render();
    }
    if (sortSelect) sortSelect.addEventListener("change", sortCurrent);
  }

  const searchForm = $("#global-search-form");
  if (searchForm) searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const value = $("#global-search-input", searchForm)?.value.trim();
    window.location.href = `search.html?q=${encodeURIComponent(value || "")}`;
  });

  const header = $(".site-header");
  const backTop = $(".back-top");
  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
    if (backTop) backTop.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
  if (backTop) backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  const menuToggle = $(".menu-toggle"), navLinks = $(".nav-links");
  if (menuToggle && navLinks) menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open"); navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
  });
  $$(".nav-links a").forEach(link => link.addEventListener("click", () => { menuToggle?.classList.remove("open"); navLinks?.classList.remove("open"); }));

  function revealItems() {
    const reveal = $$(".reveal:not(.revealed)");
    if (!("IntersectionObserver" in window)) return reveal.forEach(el => el.classList.add("revealed"));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    reveal.forEach(el => observer.observe(el));
  }
  revealItems();
  window.addEventListener("load", () => setTimeout(() => $(".loading-screen")?.classList.add("is-hidden"), 350), { once: true });
  document.addEventListener("click", event => {
    const anchor = event.target.closest("a[href^='#']");
    if (!anchor || anchor.getAttribute("href") === "#") return;
    const target = $(anchor.getAttribute("href"));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
  });
})();