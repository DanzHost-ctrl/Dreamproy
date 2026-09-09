(function () {
  const input = document.querySelector("#search-input");
  const results = document.querySelector("#search-results");
  const count = document.querySelector("#search-count");
  const empty = document.querySelector("#search-empty");
  const esc = window.Dreamproy.escapeHtml;
  const render = () => {
    const query = input.value.trim().toLowerCase();
    const matches = (window.ALL_RESOURCES || []).filter(item => !query || [item.title, item.category, item.author, item.version, item.shortDescription, ...(item.keywords || [])].join(" ").toLowerCase().includes(query));
    count.textContent = `${matches.length} resource${matches.length === 1 ? "" : "s"} ditemukan`;
    results.innerHTML = matches.map(window.renderResourceCard).join("");
    empty.classList.toggle("show", matches.length === 0);
    document.querySelectorAll(".reveal").forEach(item => item.classList.add("revealed"));
  };
  const query = new URLSearchParams(location.search).get("q");
  if (query) input.value = query;
  input.addEventListener("input", render);
  document.querySelector("#search-form").addEventListener("submit", event => { event.preventDefault(); history.replaceState(null, "", `search.html?q=${encodeURIComponent(input.value)}`); render(); });
  render();
})();