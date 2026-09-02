/*
  Fullscreen image viewer.

  The portfolio layout and content live in index.html.
  This file only handles opening, closing and moving through the images.
*/

(() => {
  const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));
  const heroButtons = Array.from(document.querySelectorAll(".hero-image"));

  const items = galleryCards.map((card) => {
    const media = card.querySelector("img, video");
    const caption = card.querySelector(".image-caption")?.textContent?.trim() || "Project image";

    return {
      type: media.tagName.toLowerCase(),
      src: media.getAttribute("src"),
      poster: media.getAttribute("poster"),
      alt: media.getAttribute("alt") || media.getAttribute("aria-label") || caption,
      caption,
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
      <button type="button" class="lightbox-close" aria-label="Close image viewer">×</button>
    </div>
    <button type="button" class="lightbox-arrow previous" aria-label="Previous image">‹</button>
    <div class="lightbox-media"></div>
    <button type="button" class="lightbox-arrow next" aria-label="Next image">›</button>
  `;

  document.body.appendChild(lightbox);

  const label = lightbox.querySelector(".lightbox-label");
  const mediaContainer = lightbox.querySelector(".lightbox-media");
  const closeButton = lightbox.querySelector(".lightbox-close");
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
    label.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")} · ${item.caption}`;
    lightbox.setAttribute("aria-label", item.caption);
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
      const heroSource = button.querySelector("img")?.getAttribute("src");
      const index = items.findIndex((item) => item.src === heroSource);
      if (index >= 0) openItem(index, button);
    });
  });

  closeButton.addEventListener("click", closeItem);
  lightbox.querySelector(".previous").addEventListener("click", () => move(-1));
  lightbox.querySelector(".next").addEventListener("click", () => move(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeItem();
  });

  window.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeItem();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
})();

