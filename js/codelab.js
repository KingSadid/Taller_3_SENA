/* Laboratorio y razones: resaltado, pestañas, copiar y demos. */

function highlightPhp(rawCode) {
  // Protege strings y comentarios antes de insertar marcas.
  const vault = [];
  const guard = (html) => `"__TOK" + (vault.push(html) - 1) + "__"`;
  let code = rawCode.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  code = code
    .replace(/("[^"\n]*"|'[^'\n]*')/g, (match) => guard(`<span class="tok-s">${match}</span>`))
    .replace(/(\/\/[^\n]*)/g, (match) => guard(`<span class="tok-c">${match}</span>`));
  code = code
    .replace(/\b(function|return|foreach|as|try|catch|throw|new|if|else)\b/g, '<span class="tok-k">$1</span>')
    .replace(/\b(echo|assert|array_sum|array_map|array_column|array_filter|array_reduce|number_format|filter_var|password_hash|password_verify|trim|strtolower|date|htmlspecialchars|json_encode|json_decode|mostrarError|guardarUsuario|calcularSubtotal|aplicarDescuento|formatearPrecio|procesarPedido|validarEdad|calcularDescuento|crearSaludo|registrarUsuario|mostrarFactura)\b/g, '<span class="tok-f">$1</span>')
    .replace(/(\$[a-zA-Z_]\w*)/g, '<span class="tok-v">$1</span>');
  return code.replace(/__TOK(\d+)__/g, (match, index) => vault[Number(index)]);
}

function reasonCard(reason) {
  const article = document.createElement("article");
  article.className = "file-card framed reason reveal";
  article.id = "razon-" + reason.id;
  article.dataset.numeral = reason.number;
  article.innerHTML = `
    <div class="reason-head">
      <div class="reason-number">${reason.number}</div>
      <div>
        <span class="tag">Razón ${reason.number}</span>
        <h3>${reason.title}</h3>
        <div class="reason-principle">${reason.principle}</div>
      </div>
    </div>
    <div class="reason-grid">
      <div>
        <p class="reason-why">${reason.why}</p>
        <p class="say">// Para decir en vivo: “${SAYS[reason.id]}”</p>
        <div class="demo-line">
          <button class="btn btn-wax" data-demo="${reason.id}">Ejecutar demo</button>
          <div class="demo-out" id="out-${reason.id}">${reason.demoLabel}…</div>
        </div>
      </div>
      <div>
        <div class="tabs">
          <button class="tab-btn" data-tab="before" aria-pressed="false">Antes</button>
          <button class="tab-btn active" data-tab="after" aria-pressed="true">Después</button>
        </div>
        <div class="codeblock">
          <header><span>PHP · ${reason.id}.php</span><button class="copy-btn">Copiar</button></header>
          <pre><code></code></pre>
        </div>
      </div>
    </div>`;
  connectReasonTabs(article, reason);
  connectCopyButton(article, reason);
  connectDemoButton(article, reason);
  return article;
}

function connectReasonTabs(article, reason) {
  // Alterna el código Antes / Después.
  const code = article.querySelector("code");
  const buttons = article.querySelectorAll(".tab-btn");
  const paint = (mode) => {
    code.innerHTML = highlightPhp(mode === "before" ? reason.before : reason.after);
    const pre = article.querySelector("pre");
    pre.classList.remove("swap");
    void pre.offsetWidth;
    pre.classList.add("swap");
    buttons.forEach((b) => {
      const on = b.dataset.tab === mode;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };
  buttons.forEach((b) => b.addEventListener("click", () => paint(b.dataset.tab)));
  paint("after");
}

function connectCopyButton(article, reason) {
  // Copia el ejemplo visible al portapapeles.
  const button = article.querySelector(".copy-btn");
  button.addEventListener("click", async () => {
    const active = article.querySelector(".tab-btn.active").dataset.tab;
    const text = active === "before" ? reason.before : reason.after;
    await navigator.clipboard.writeText(text).catch(() => { });
    button.textContent = "¡Copiado!";
    setTimeout(() => (button.textContent = "Copiar"), 1400);
  });
}

function connectDemoButton(article, reason) {
  // Ejecuta la demo espejo en JS y muestra el resultado.
  const button = article.querySelector("[data-demo]");
  const output = article.querySelector("#out-" + reason.id);
  button.addEventListener("click", () => {
    output.textContent = reason.demoRun();
  });
}

function renderReasons() {
  // Pinta las 7 razones desde los datos.
  const mount = document.querySelector("#reasonsMount");
  REASONS.forEach((reason) => mount.appendChild(reasonCard(reason)));
}

function communityCard(community) {
  // Construye la postal de una comunidad experta.
  const article = document.createElement("article");
  article.className = "file-card postcard reveal";
  article.innerHTML = `
    <div class="stamp-mini">${community.stamp}</div>
    <span class="tag">Comunidad experta</span>
    <h3>${community.name}</h3>
    <a class="url" href="${community.url}" target="_blank" rel="noopener">${community.url}</a>
    <div class="spec"><b>Propósito</b><p>${community.purpose}</p></div>
    <div class="spec"><b>Ventajas</b><ul>${community.pros.map((p) => `<li>${p}</li>`).join("")}</ul></div>
    <div class="spec"><b>Desventajas</b><ul>${community.cons.map((c) => `<li>${c}</li>`).join("")}</ul></div>
    <div class="spec"><b>Atributo innovador</b><p>${community.innovation}</p></div>`;
  return article;
}

function renderCommunities() {
  // Pinta las 3 comunidades desde los datos.
  const mount = document.querySelector("#communityMount");
  COMMUNITIES.forEach((item) => mount.appendChild(communityCard(item)));
}

function runLabDemo() {
  // Ejecuta la demo elegida en el laboratorio.
  const select = document.querySelector("#labSelect");
  const input = document.querySelector("#labInput");
  const output = document.querySelector("#labOutput");
  const reason = REASONS.find((r) => r.id === select.value);
  const extra = input.value.trim();
  output.textContent = `${reason.demoRun()}\n— ${reason.title}${extra ? `\n— Entrada del lector: ${extra}` : ""}`;
}

function connectLab() {
  // Conecta el laboratorio solo si existe en la página.
  const runButton = document.querySelector("#labRun");
  if (runButton) runButton.addEventListener("click", runLabDemo);
}

function connectStaticCopyButtons() {
  // Copia el código de bloques estáticos (página manifiesto).
  document.querySelectorAll("[data-static-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.closest(".codeblock").querySelector("code").innerText;
      await navigator.clipboard.writeText(text).catch(() => {});
      button.textContent = "¡Copiado!";
      setTimeout(() => (button.textContent = "Copiar"), 1400);
    });
  });
}

function rememberAuthorName() {
  // Guarda el nombre del autor en este equipo.
  const fields = document.querySelectorAll("[data-author]");
  const saved = localStorage.getItem("taller3-author");
  if (saved) fields.forEach((f) => (f.textContent = saved));
  fields.forEach((f) => f.addEventListener("input", () => {
    localStorage.setItem("taller3-author", f.textContent.trim());
  }));
}
