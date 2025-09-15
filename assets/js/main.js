/**
 * Template Name: iportfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /* =========================
   * Header toggle
   * ========================= */
  const headerToggleBtn = document.querySelector(".header-toggle");
  function headerToggle() {
    document.querySelector("#header")?.classList.toggle("header-show");
    headerToggleBtn?.classList.toggle("bi-list");
    headerToggleBtn?.classList.toggle("bi-x");
  }
  if (headerToggleBtn) headerToggleBtn.addEventListener("click", headerToggle);

  // Hide mobile nav on same-page/hash links
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) headerToggle();
    });
  });

  // Toggle mobile nav dropdowns
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /* =========================
   * Preloader
   * ========================= */
  const preloader = document.querySelector("#preloader");
  if (preloader) window.addEventListener("load", () => preloader.remove());

  /* =========================
   * Scroll top button
   * ========================= */
  const scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (!scrollTop) return;
    (window.scrollY > 100)
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  }
  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /* =========================
   * AOS init
   * ========================= */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({ duration: 600, easing: "ease-in-out", once: true, mirror: false });
    }
  }
  window.addEventListener("load", aosInit);

  /* =========================
   * Pure Counter (initial)
   * ========================= */
  if (typeof PureCounter !== "undefined") new PureCounter();

  /* =========================
   * Skills bar animation with Waypoint
   * ========================= */
  document.querySelectorAll(".skills-animation").forEach((item) => {
    if (typeof Waypoint === "undefined") return;
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function () {
        item.querySelectorAll(".progress .progress-bar").forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /* =========================
   * GLightbox
   * ========================= */
  if (typeof GLightbox !== "undefined") GLightbox({ selector: ".glightbox" });

  /* =========================
   * Isotope + Filters
   * ========================= */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    const layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    const filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    const sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    const container = isotopeItem.querySelector(".isotope-container");
    if (!container || typeof imagesLoaded === "undefined" || typeof Isotope === "undefined") return;

    imagesLoaded(container, function () {
      initIsotope = new Isotope(container, {
        itemSelector: ".isotope-item",
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
      });
    });

    isotopeItem.querySelectorAll(".isotope-filters li").forEach(function (filters) {
      filters.addEventListener("click", function () {
        isotopeItem.querySelector(".isotope-filters .filter-active")?.classList.remove("filter-active");
        this.classList.add("filter-active");
        initIsotope?.arrange({ filter: this.getAttribute("data-filter") });
        aosInit();
      }, false);
    });
  });

  /* =========================
   * Swiper
   * ========================= */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      const cfgEl = swiperElement.querySelector(".swiper-config");
      if (!cfgEl) return;
      let config = {};
      try { config = JSON.parse(cfgEl.innerHTML.trim()); } catch (_) { }
      if (swiperElement.classList.contains("swiper-tab")) {
        if (typeof initSwiperWithCustomPagination !== "undefined") {
          initSwiperWithCustomPagination(swiperElement, config);
        }
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /* =========================
   * Correct scroll for hash links on load
   * ========================= */
  window.addEventListener("load", function () {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({ top: section.offsetTop - parseInt(scrollMarginTop), behavior: "smooth" });
      }, 100);
    }
  });

  /* =========================
   * Navmenu Scrollspy
   * ========================= */
  const navmenulinks = document.querySelectorAll(".navmenu a");
  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      const pos = window.scrollY + 200;
      if (pos >= section.offsetTop && pos <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll(".navmenu a.active").forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  /* ============================================================
   * Utilities
   * ============================================================ */
  function calculateAge(birthdate) {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  function escapeListItem(text) {
    const div = document.createElement("div");
    div.textContent = text;
    // Allow **bold** -> <strong>text</strong>
    return div.innerHTML.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }

  function renderEmail(val) {
    const isMailto = /^mailto:/i.test(val);
    const href = isMailto ? val : `mailto:${val}`;
    const text = val.replace(/^mailto:/i, "");
    return `<a href="${escapeHTML(href)}">${escapeHTML(text)}</a>`;
  }

  /* ============================================================
   * Renderers (dinamis dari JSON) – otomatis jalan jika container ada
   * ============================================================ */

  // Stats
  function renderStats(data) {
    const container = document.getElementById("stats-container");
    if (!container) return;

    const blocks = [
      { base: "stats.workplaces", icon: "bi bi-building" },
      { base: "stats.positions", icon: "bi bi-person-badge" },
      { base: "stats.projects", icon: "bi bi-clipboard-check" },
      { base: "stats.frameworks", icon: "bi bi-folder2-open" },
    ];

    container.innerHTML = "";
    blocks.forEach(({ base, icon }) => {
      const title = data[`${base}.title`] || "";
      const desc = data[`${base}.desc`] || "";
      const count = Number(data[`${base}.count`] || 0);
      const items = Array.isArray(data[`${base}.items`]) ? data[`${base}.items`] : [];

      const col = document.createElement("div");
      col.className = "col-lg-3 col-md-6";
      col.innerHTML = `
        <div class="stats-item">
          <i class="${icon}"></i>
          <span class="purecounter"
                data-purecounter-start="0"
                data-purecounter-end="${count}"
                data-purecounter-duration="1"></span>
          <p><strong style="font-size: 24px;">${escapeHTML(title)}</strong><br>${escapeHTML(desc)}</p>
          <ul>${items.map((t) => `<li>${escapeListItem(t)}</li>`).join("")}</ul>
        </div>
      `;
      container.appendChild(col);
    });

    // Refresh effects
    aosInit();
    if (typeof PureCounter !== "undefined") new PureCounter();
  }

  // Skills
  function renderSkills(data) {
    const wrap = document.getElementById("skills-container");
    if (!wrap || !Array.isArray(data["skills.items"])) return;

    wrap.innerHTML = "";
    const left = document.createElement("div");
    const right = document.createElement("div");
    left.className = "col-lg-6";
    right.className = "col-lg-6";

    data["skills.items"].forEach((item, i) => {
      const block = document.createElement("div");
      block.className = "progress";
      const value = Number(item.value ?? 0);
      block.innerHTML = `
        <span class="skill"><span>${escapeHTML(item.name ?? "")}</span> <i class="val">${value}%</i></span>
        <div class="progress-bar-wrap">
          <div class="progress-bar" role="progressbar"
               aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" style="width:0%"></div>
        </div>
      `;
      (i < Math.ceil(data["skills.items"].length / 2) ? left : right).appendChild(block);
    });

    wrap.appendChild(left);
    wrap.appendChild(right);

    // Set width immediately if waypoint sudah terpicu
    wrap.querySelectorAll(".progress .progress-bar").forEach((el) => {
      const val = el.getAttribute("aria-valuenow");
      el.style.width = val + "%";
    });

    aosInit();
  }

  // Resume
  function renderResume(data) {
    const left = document.getElementById("resume-left");
    const right = document.getElementById("resume-right");
    if (!left && !right) return;

    // LEFT: Summary + Education
    if (left) {
      const summaryTitle = data["resume.summary.title"] || "Summary";
      const name = data["resume.summary.name"] || "";
      const blurb = data["resume.summary.blurb"] || "";
      const location = data["resume.summary.location"] || "";
      const phone = data["resume.summary.phone"] || "";
      const email = data["resume.summary.email"] || "";

      const summaryBlock = document.createElement("div");
      summaryBlock.innerHTML = `
        <h3 class="resume-title">${escapeHTML(summaryTitle)}</h3>
        <div class="resume-item pb-0">
          <h4>${escapeHTML(name)}</h4>
          <p><em>${escapeHTML(blurb)}</em></p>
          <ul>
            ${location ? `<li>${escapeHTML(location)}</li>` : ""}
            ${phone ? `<li>${escapeHTML(phone)}</li>` : ""}
            ${email ? `<li>${renderEmail(email)}</li>` : ""}
          </ul>
        </div>
      `;

      const eduTitle = data["resume.education.title"] || "Education";
      const eduItems = Array.isArray(data["resume.education.items"]) ? data["resume.education.items"] : [];

      const eduBlock = document.createElement("div");
      eduBlock.innerHTML = `<h3 class="resume-title">${escapeHTML(eduTitle)}</h3>`;
      eduItems.forEach((it) => {
        const degree = it.degree || "";
        const period = it.period || "";
        const school = it.school || "";
        const desc = it.desc || "";
        const el = document.createElement("div");
        el.className = "resume-item";
        el.innerHTML = `
          <h4>${escapeHTML(degree)}</h4>
          <h5>${escapeHTML(period)}</h5>
          <p><em>${escapeHTML(school)}</em></p>
          <p>${escapeHTML(desc)}</p>
        `;
        eduBlock.appendChild(el);
      });

      left.innerHTML = "";
      left.appendChild(summaryBlock);
      left.appendChild(eduBlock);
    }

    // RIGHT: Experience
    if (right) {
      const expTitle = data["resume.experience.title"] || "Professional Experience";
      const expItems = Array.isArray(data["resume.experience.items"]) ? data["resume.experience.items"] : [];

      const expWrap = document.createElement("div");
      expWrap.innerHTML = `<h3 class="resume-title">${escapeHTML(expTitle)}</h3>`;

      expItems.forEach((it) => {
        const role = it.role || "";
        const period = it.period || "";
        const company = it.company || "";
        const bullets = Array.isArray(it.bullets) ? it.bullets : [];
        const el = document.createElement("div");
        el.className = "resume-item";
        el.innerHTML = `
          <h4>${escapeHTML(role)}</h4>
          <h5>${escapeHTML(period)}</h5>
          <p><em>${escapeHTML(company)}</em></p>
          <ul>${bullets.map((b) => `<li>${escapeHTML(b)}</li>`).join("")}</ul>
        `;
        expWrap.appendChild(el);
      });

      right.innerHTML = "";
      right.appendChild(expWrap);
    }

    if (typeof AOS !== "undefined") AOS.refresh();
  }

  // portfolio
  function renderportfolio(data) {
    const filtersEl = document.getElementById("portfolio-filters");
    const gridEl = document.getElementById("portfolio-container");
    const layoutEl = gridEl?.closest(".isotope-layout");
    if (!filtersEl || !gridEl || !layoutEl) return;

    // Filters
    const filters = [
      { key: "portfolio.filters.all", class: "filter-active", filter: "*" },
      { key: "portfolio.filters.web", class: "", filter: ".filter-app" },
      { key: "portfolio.filters.android", class: "", filter: ".filter-product" },
    ];
    filtersEl.innerHTML = filters
      .map(f => `<li data-filter="${f.filter}" class="${f.class}">${escapeHTML((data[f.key] ?? "").toString())}</li>`)
      .join("");

    // Items
    const items = Array.isArray(data["portfolio.items"]) ? data["portfolio.items"] : [];
    gridEl.innerHTML = "";

    items.forEach((item) => {
      const category = (item.category || "").toLowerCase();
      const catClass = category === "web" ? "filter-app" : category === "android" ? "filter-product" : "";
      const title = item.title ?? "";
      const image = item.image ?? "";
      const desc = item.description ?? "";
      const detailsLink = item.detailsLink ?? "#";
      const galleryTitle = item.galleryTitle ?? title;

      const col = document.createElement("div");
      col.className = `col-lg-4 col-md-6 portfolio-item isotope-item ${catClass}`;
      col.innerHTML = `
        <div class="portfolio-content h-100">
          <img src="${image}" class="img-fluid" alt="${escapeHTML(title)}">
          <div class="portfolio-info">
            <h4>${escapeHTML(title)}</h4>
            <p>${escapeHTML(desc)}</p>
            <a href="${image}" title="${escapeHTML(galleryTitle)}"
               data-gallery="portfolio-gallery-${category || "app"}"
               class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
            <a href="${detailsLink}" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
          </div>
        </div>
      `;
      gridEl.appendChild(col);
    });

    // Re-init GLightbox
    if (typeof GLightbox !== "undefined") GLightbox({ selector: ".glightbox" });

    // Re-init Isotope
    if (typeof Isotope !== "undefined" && typeof imagesLoaded !== "undefined") {
      const container = gridEl;
      imagesLoaded(container, function () {
        const iso = new Isotope(container, {
          itemSelector: ".isotope-item",
          layoutMode: layoutEl.getAttribute("data-layout") ?? "masonry",
          filter: layoutEl.getAttribute("data-default-filter") ?? "*",
          sortBy: layoutEl.getAttribute("data-sort") ?? "original-order",
        });

        // Bind filter clicks
        filtersEl.querySelectorAll("li").forEach((li) => {
          li.addEventListener("click", function () {
            filtersEl.querySelector(".filter-active")?.classList.remove("filter-active");
            this.classList.add("filter-active");
            iso.arrange({ filter: this.getAttribute("data-filter") });
            if (typeof AOS !== "undefined") AOS.refresh();
          });
        });
      });
    }

    if (typeof AOS !== "undefined") AOS.refresh();
  }

  /* ============================================================
   * i18n Loader (INDEX PAGE)
   * ============================================================ */

  /* Ambil locale dari ?lang=, localStorage, atau default 'en' */
  function getLocale() {
    const qsLang = new URLSearchParams(location.search).get('lang');
    return qsLang || localStorage.getItem('lang') || 'en';
  }

  /* Muat teks untuk halaman index: assets/content/{locale}/index.json
     -> return Promise yang resolve ke object i18n (biar bisa dipakai lanjut) */
  function loadI18n(locale = 'en') {
    return fetch(`assets/content/${locale}/index.json`)
      .then((res) => res.json())
      .then((data) => {
        // simpan global, kalau renderer lain butuh
        window.__i18n = data;

        // apply semua [data-i18n]
        document.querySelectorAll('[data-i18n]').forEach((el) => {
          const key = el.getAttribute('data-i18n');
          const val = data[key];
          if (val !== undefined) el.innerHTML = val; // pakai innerHTML agar <strong>/<em>/<a> di JSON tetap jalan
        });

        // Typed.js (pastikan .typed ada di HTML)
        const rolesStr = data['hero.roles'];
        if (typeof Typed !== 'undefined' && rolesStr) {
          let typedEl = document.querySelector('.typed');
          if (!typedEl) {
            const heroLine = document.getElementById('hero-line');
            if (heroLine) {
              typedEl = document.createElement('span');
              typedEl.className = 'typed';
              heroLine.appendChild(typedEl);
            }
          }
          if (typedEl) {
            const roles = rolesStr.split(',').map((s) => s.trim());
            window.__typedInstance && window.__typedInstance.destroy?.();
            window.__typedInstance = new Typed('.typed', {
              strings: roles,
              loop: true,
              typeSpeed: 100,
              backSpeed: 50,
              backDelay: 2000
            });
          }
        }

        // Umur otomatis (kalau ada)
        const ageSpan = document.getElementById('age');
        if (ageSpan && data['profile.birthday']) {
          ageSpan.textContent = calculateAge(data['profile.birthday']);
        }

        // Section lain yang memang sumbernya dari index.json
        renderStats?.(data);
        renderSkills?.(data);
        renderResume?.(data);

        aosInit?.();
        return data; // penting: supaya bisa di-then di bawah
      });
  }

  /* Muat daftar portfolio untuk INDEX:
     assets/content/{locale}/portfolio/list.json -> return Promise<Array> */
  function loadportfolioList(locale = 'en') {
    return fetch(`assets/content/${locale}/portfolio/list.json`)
      .then((res) => res.json())
      .then((payload) => payload.items || []);
  }

  /* Render grid portfolio: gabungkan label dari index.json + items dari list.json
     AGAR kompatibel dengan fungsi renderportfolio(data) milikmu saat ini
     (yang membaca data['portfolio.items'] dan label 'portfolio.filters.*')
  */
  function renderportfolioWithList(i18n, items) {
    const merged = { ...i18n, 'portfolio.items': items };
    renderportfolio?.(merged); // pakai fungsi yang sudah ada
  }

  /* DOM Ready: muat index.json dulu, lalu list.json */
  window.addEventListener('DOMContentLoaded', () => {
    const locale = getLocale();                 // 'en' / 'id'
    loadI18n(locale)
      .then((i18n) => loadportfolioList(locale).then((items) => renderportfolioWithList(i18n, items)))
      .catch((err) => console.error('i18n/portfolio load error:', err));
  });

})();
