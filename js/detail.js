(function () {
  const id = new URLSearchParams(location.search).get("id");
  const item = (window.ALL_RESOURCES || []).find(resource => resource.id === id);
  const root = document.querySelector("#detail-root");
  const esc = window.Dreamproy.escapeHtml;
  if (!item) {
    root.innerHTML = `<div class="empty-state show"><strong>Resource tidak ditemukan.</strong><span>Link detail mungkin sudah berubah atau resource belum ditambahkan.</span><br><a class="button button-primary" href="index.html">KEMBALI KE HOME</a></div>`;
    document.title = "Resource tidak ditemukan — Dreamproy_Mc";
    return;
  }
  document.title = `${item.title} — Dreamproy_Mc`;
  const screenshots = (item.screenshots || []).map((image, index) => `<button class="screenshot" type="button" data-lightbox="${esc(image)}"><img loading="lazy" src="${esc(image)}" alt="${esc(item.title)} screenshot ${index + 1}"></button>`).join("");
  root.innerHTML = `
    <div class="breadcrumb"><a href="index.html">Home</a><span>/</span><a href="${item.category.toLowerCase()}.html">${esc(item.category)}</a><span>/</span><span>${esc(item.title)}</span></div>
    <div class="detail-top">
      <div class="detail-cover reveal"><img src="${esc(item.thumbnail)}" alt="${esc(item.title)} thumbnail"></div>
      <div class="detail-info reveal"><span class="badge" style="position:static;display:inline-block">${esc(item.category)}</span><h1>${esc(item.title)}</h1><p>${esc(item.shortDescription)}</p>
        <div class="detail-stats"><div class="stat"><small>Author</small><strong>${esc(item.author)}</strong></div><div class="stat"><small>Version</small><strong>${esc(item.version)}</strong></div><div class="stat"><small>Update</small><strong>${esc(item.date)}</strong></div><div class="stat"><small>Downloads</small><strong>${Number(item.downloads || 0).toLocaleString("id-ID")}</strong></div></div>
        <div class="detail-actions"><a class="button button-primary button-wide" href="${esc(item.downloadUrl)}" target="_blank" rel="noopener">⬇ DOWNLOAD</a><div class="share-row"><button class="button button-secondary" id="share-btn" type="button">↗ SHARE</button><button class="button button-secondary" id="copy-btn" type="button">▣ COPY LINK</button></div></div>
      </div>
    </div>
    <div class="detail-content"><main>
      <section class="content-block reveal"><h2>About this resource</h2><p>${esc(item.description)}</p></section>
      <section class="content-block reveal"><h2>Features</h2><ul class="feature-list">${(item.features || []).map(feature => `<li>${esc(feature)}</li>`).join("")}</ul></section>
      <section class="content-block reveal"><h2>Screenshots</h2><div class="screenshots">${screenshots}</div></section>
      <section class="content-block reveal"><h2>Installation guide</h2><ol class="install-list">${(item.installGuide || []).map(step => `<li>${esc(step)}</li>`).join("")}</ol></section>
    </main><aside>
      <section class="content-block reveal"><h2>File information</h2><div class="file-box"><div class="file-row"><span>File name</span><strong>${esc(item.fileName)}</strong></div><div class="file-row"><span>File size</span><strong>${esc(item.fileSize)}</strong></div><div class="file-row"><span>Format</span><strong>${esc(item.fileFormat)}</strong></div><div class="file-row"><span>Minecraft version</span><strong>${esc(item.version)}</strong></div></div></section>
      <section class="content-block reveal"><h2>Need more?</h2><p>Ikuti Dreamproy_Mc untuk update resource terbaru dari TikTok dan Saluran WhatsApp.</p></section>
    </aside></div>`;
  document.querySelectorAll("[data-lightbox]").forEach(button => button.addEventListener("click", () => {
    const lightbox = document.querySelector("#lightbox"); lightbox.querySelector("img").src = button.dataset.lightbox; lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden", "false");
  }));
  const closeLightbox = () => { const lightbox = document.querySelector("#lightbox"); lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); };
  document.querySelector("#lightbox-close")?.addEventListener("click", closeLightbox);
  document.querySelector("#lightbox")?.addEventListener("click", event => { if (event.target.id === "lightbox") closeLightbox(); });
  document.querySelector("#copy-btn")?.addEventListener("click", async event => { try { await navigator.clipboard.writeText(location.href); event.currentTarget.textContent = "✓ COPIED"; setTimeout(() => event.currentTarget.textContent = "▣ COPY LINK", 1600); } catch { event.currentTarget.textContent = "COPY MANUALLY"; } });
  document.querySelector("#share-btn")?.addEventListener("click", async () => { if (navigator.share) await navigator.share({ title: item.title, text: item.shortDescription, url: location.href }); else document.querySelector("#copy-btn")?.click(); });
})();