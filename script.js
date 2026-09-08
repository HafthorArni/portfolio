/*
  Gallery indexing and fullscreen media viewer.
  The visible portfolio content and ordering remain in index.html.
*/

(() => {
  const sections = Array.from(document.querySelectorAll(".project-section"));
  const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));
  const heroButtons = Array.from(document.querySelectorAll(".hero-frame[data-gallery-src]"));

  sections.forEach((section) => {
    const sectionNumber = section.querySelector(".section-id span")?.textContent?.trim() || "00";
    const cards = Array.from(section.querySelectorAll(".gallery-card"));

    cards.forEach((card, index) => {
      const label = card.querySelector(".image-index");
      if (label) label.textContent = `${sectionNumber}.${String(index + 1).padStart(2, "0")}`;
    });
  });

  const total = document.querySelector("#media-total");
  if (total) total.textContent = String(galleryCards.length);

  const items = galleryCards.map((card) => {
    const media = card.querySelector("img, video");
    const section = card.closest(".project-section");
    const caption = card.querySelector(".image-caption")?.textContent?.trim() || "Project media";

    return {
      type: media.tagName.toLowerCase(),
      src: media.getAttribute("src"),
      poster: media.getAttribute("poster"),
      alt: media.getAttribute("alt") || media.getAttribute("aria-label") || caption,
      caption,
      detail: card.dataset.detail || media.getAttribute("alt") || "",
      kind: card.dataset.kind || "Project",
      section: section?.querySelector("h2")?.textContent?.replace(/\s+/g, " ").trim() || "Selected work",
      indexLabel: card.querySelector(".image-index")?.textContent?.trim() || "",
    };
  });

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");

  lightbox.innerHTML = `
    <div class="lightbox-topbar">
      <p class="lightbox-label"></p>
      <button type="button" class="lightbox-close" aria-label="Close media viewer">×</button>
    </div>
    <button type="button" class="lightbox-arrow previous" aria-label="Previous project media">‹</button>
    <div class="lightbox-media"></div>
    <button type="button" class="lightbox-arrow next" aria-label="Next project media">›</button>
    <div class="lightbox-copy">
      <p class="lightbox-title"></p>
      <p class="lightbox-detail"></p>
    </div>
  `;

  document.body.appendChild(lightbox);

  const label = lightbox.querySelector(".lightbox-label");
  const mediaContainer = lightbox.querySelector(".lightbox-media");
  const title = lightbox.querySelector(".lightbox-title");
  const detail = lightbox.querySelector(".lightbox-detail");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const previousButton = lightbox.querySelector(".previous");
  const nextButton = lightbox.querySelector(".next");
  let activeIndex = 0;
  let lastTrigger = null;

  function renderItem() {
    const item = items[activeIndex];
    mediaContainer.replaceChildren();

    let media;
    if (item.type === "video") {
      media = document.createElement("video");
      media.controls = true;
      media.autoplay = true;
      media.loop = true;
      media.playsInline = true;
      if (item.poster) media.poster = item.poster;
      media.setAttribute("aria-label", item.alt);
    } else {
      media = document.createElement("img");
      media.alt = item.alt;
    }

    media.src = item.src;
    mediaContainer.appendChild(media);

    label.replaceChildren();
    const counter = document.createElement("span");
    counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
    label.append(counter, document.createTextNode(` · ${item.indexLabel} · ${item.section}`));
    title.textContent = `${item.kind} · ${item.caption}`;
    detail.textContent = item.detail;
    lightbox.setAttribute("aria-label", item.caption);

    [items[(activeIndex + 1) % items.length], items[(activeIndex - 1 + items.length) % items.length]]
      .filter((neighbor) => neighbor.type === "img")
      .forEach((neighbor) => {
        const preload = new Image();
        preload.src = neighbor.src;
      });
  }

  function openItem(index, trigger) {
    activeIndex = index;
    lastTrigger = trigger;
    renderItem();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeItem() {
    lightbox.hidden = true;
    mediaContainer.replaceChildren();
    document.body.style.overflow = "";
    lastTrigger?.focus();
  }

  function move(direction) {
    activeIndex = (activeIndex + direction + items.length) % items.length;
    renderItem();
  }

  galleryCards.forEach((card, index) => {
    card.addEventListener("click", () => openItem(index, card));
  });

  heroButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = items.findIndex((item) => item.src === button.dataset.gallerySrc);
      if (index >= 0) openItem(index, button);
    });
  });

  closeButton.addEventListener("click", closeItem);
  previousButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeItem();
  });

  window.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") closeItem();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);

    if (event.key === "Tab") {
      const controls = [closeButton, previousButton, nextButton];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
