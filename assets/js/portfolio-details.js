(function () {
  "use strict";

  document.addEventListener('DOMContentLoaded', () => {
    const backInline = document.getElementById('back-inline');
    if (backInline) {
      backInline.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          if (document.referrer && new URL(document.referrer).origin === location.origin) {
            history.back(); return;
          }
        } catch (_) { }
        location.href = 'index.html#portfolio';
      });
    }
  });

  // Ambil locale dari ?lang= atau localStorage (fallback 'en')
  function getLocale() {
    const qs = new URLSearchParams(location.search).get("lang");
    return qs || localStorage.getItem("lang") || "en";
  }

  // Ambil id dari ?id=
  function getProjectId() {
    return new URLSearchParams(location.search).get("id");
  }

  // Render helper
  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = String(str ?? "");
    return div.innerHTML;
  }

  function renderInfoList({ category, date, links }) {
    const ul = document.getElementById("pd-info-list");
    ul.innerHTML = "";

    if (category) ul.insertAdjacentHTML("beforeend", `<li><strong>Category</strong>: ${escapeHTML(category)}</li>`);
    if (date) ul.insertAdjacentHTML("beforeend", `<li><strong>Project date</strong>: ${escapeHTML(date)}</li>`);

    // links: array of {label, href}
    if (Array.isArray(links)) {
      links.forEach((l) => {
        if (!l?.href) return;
        const label = escapeHTML(l.label || "Project URL");
        const href = escapeHTML(l.href);
        ul.insertAdjacentHTML("beforeend", `<li><strong>${label}</strong>: <a href="${href}" target="_blank" rel="noopener">Open</a></li>`);
      });
    }
  }

  function renderSlides(images) {
    const wrap = document.getElementById("pd-swiper-wrapper");
    wrap.innerHTML = "";
    (images || []).forEach((src) => {
      wrap.insertAdjacentHTML(
        "beforeend",
        `<div class="swiper-slide"><img src="${escapeHTML(src)}" alt="" /></div>`
      );
    });

    // Init/Re-init Swiper
    const slider = document.getElementById("pd-swiper");
    const cfgEl = slider.querySelector(".swiper-config");
    let config = {};
    try {
      config = JSON.parse(cfgEl.textContent.trim());
    } catch (_) { }
    // Buat instance baru
    if (typeof Swiper !== "undefined") new Swiper(slider, config);
  }

  function loadDetail() {
    const id = getProjectId();
    const locale = getLocale();

    if (!id) {
      // kalau id ga ada, balik ke index
      location.href = "index.html#portfolio";
      return;
    }

    const url = `assets/content/${locale}/portfolio/details/${id}.json`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        // Title halaman + judul project
        document.getElementById("pd-page-title").textContent = data.pageTitle || "Portfolio Details";
        document.getElementById("pd-title").textContent = data.title || "";
        document.title = data.title ? `${data.title} – Portfolio Details` : "Portfolio Details";

        // Deskripsi
        const descEl = document.getElementById("pd-description");
        descEl.innerHTML = data.descriptionHTML || escapeHTML(data.description || "");

        // Info list
        renderInfoList({
          category: data.category,
          date: data.date,
          links: data.links
        });

        // Slides
        renderSlides(data.images || []);

        // AOS refresh
        if (typeof AOS !== "undefined") AOS.refresh();
      })
      .catch((e) => {
        console.error("Failed to load detail JSON:", e);
        // Fallback minimal
        document.getElementById("pd-title").textContent = "Not Found";
        document.getElementById("pd-description").textContent = "The requested portfolio item was not found.";
      });
  }

  window.addEventListener("DOMContentLoaded", loadDetail);
})();
