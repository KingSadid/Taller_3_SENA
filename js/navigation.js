/* Navegación: progreso, espionaje de sección y revelado. */

function currentProgress() {
  // Calcula el avance de lectura de la página.
  const max = document.documentElement.scrollHeight - innerHeight;
  return max > 0 ? (scrollY / max) * 100 : 0;
}

function paintProgress(bar) {
  // Pinta la cinta de progreso dorada.
  bar.style.width = currentProgress() + "%";
}

function watchRevealedItems() {
  // Revela las tarjetas al entrar en pantalla.
  const items = document.querySelectorAll(".reveal");
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  items.forEach((item) => watcher.observe(item));
}

function watchActiveLink(links) {
  // Marca el capítulo visible en el membrete.
  const sections = [...document.querySelectorAll("[data-chapter]")];
  if (!sections.length || !links.length) return;
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach((link) => link.classList.toggle("active", link.hash === "#" + id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((section) => spy.observe(section));
}

function initNavigation() {
  // Conecta barra de progreso y espionaje de capítulos.
  const bar = document.querySelector("#progressBar");
  const links = [...document.querySelectorAll(".nav-links a")];
  addEventListener("scroll", () => paintProgress(bar), { passive: true });
  paintProgress(bar);
  watchRevealedItems();
  watchActiveLink(links);
}
