/* Efectos: cargador y máquina de escribir. */

function runLoader() {
  // Anima la barra del cargador y lo retira.
  const loader = document.querySelector("#loader");
  const bar = document.querySelector("#loaderBar");
  let width = 0;
  const timer = setInterval(() => {
    width = Math.min(width + 8 + Math.random() * 14, 100);
    bar.style.width = width + "%";
    if (width >= 100) {
      clearInterval(timer);
      setTimeout(() => loader.classList.add("hidden"), 350);
    }
  }, 140);
}

function typeLine(element, text) {
  // Efecto de máquina de escribir en una línea.
  return new Promise((resolve) => {
    let index = 0;
    const timer = setInterval(() => {
      element.textContent = text.slice(0, ++index);
      if (index >= text.length) { clearInterval(timer); resolve(); }
    }, 34);
  });
}

async function runTypewriter() {
  // Escribe las líneas del cargador en secuencia.
  const line = document.querySelector("#loaderType");
  if (!line) return;
  await typeLine(line, "Cargando php.net 8.x…");
  await typeLine(line, "Montando ventanas del expediente…");
}

function initTopButton() {
  // Botón para volver a la portada.
  const button = document.querySelector("#toTop");
  button.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

function initEffects() {
  // Punto único de entrada de los efectos.
  runLoader();
  runTypewriter();
  initTopButton();
}
