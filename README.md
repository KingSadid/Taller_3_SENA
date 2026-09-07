# Taller_3 · Evidencia AA3 — Sesión virtual "Funciones PHP"

Presentación interactiva con **estética "PHP · El lenguaje que impulsa la web"**:
navegador retro Win9x/IE5 (barra de título azul cromo, botones — □ ×, barra de
direcciones, pestañas), papel crema con grano, terminales CRT con scanlines
verde/cian/ámbar, sellos circulares, notas adhesivas manuscritas (Caveat) y
tipografía Times New Roman + Courier New. Color de marca azul cromo `#3a4f8a`.

## Abrir

Abre `index.html` en cualquier navegador moderno (doble clic basta; no requiere servidor).
Para exponer: `F11` (pantalla completa) y navega por el membrete o los botones Siguiente.

## Páginas (una por pestaña)

| Página | Contenido |
|---|---|
| `index.html` | Portada: nombre, programa, índice, criterio |
| `manifiesto.html` | Capítulo I: qué es una función + manual oficial |
| `razones.html` | Capítulo II: 7 razones, Antes/Después, demo y frase en vivo c/u |
| `laboratorio.html` | Capítulo III: laboratorio ejecutable de 7 experimentos |
| `comunidades.html` | Capítulo IV: 3 postales + trincheras extra + cómo usarlas |
| `evaluacion.html` | Capítulo V: quiz calificable + lista de entrega + imprimir/PDF |

## Estructura

```
Taller_3/
├── index.html, manifiesto.html, razones.html,
│   laboratorio.html, comunidades.html, evaluacion.html
├── css/
│   ├── tokens.css      # Paleta navegador retro + tipografías (Times / Courier / Caveat)
│   ├── base.css        # Fondo papel crema con grano, capítulos
│   ├── components.css  # Marcos biselados Win9x, terminales CRT, post-its, sellos
│   ├── sections.css    # Titlebar + toolbar, hero, razones, lab, postales, quiz
│   └── effects.css     # Revelado, sello estampado, cursor CRT parpadeante
├── js/
│   ├── data.js         # Única fuente: 7 razones, frases en vivo, 3 comunidades, quiz
│   ├── navigation.js   # Progreso + revelado (se activa tras pintar el contenido)
│   ├── effects.js      # Loader, typewriter y botón superior
│   ├── codelab.js      # Render de razones/comunidades + lab + copiar + autor
│   ├── quiz.js         # Autoevaluación del criterio oficial
│   └── app.js          # Solo activa los módulos que existan en cada página
└── assets/img/         # Ornamentos generados en CSS/SVG (sin binarios)
```

## Contenido (lo que pide la evidencia)

- **Nombre + programa**: portada con campos editables (clic y escribe; se guardan en el equipo).
- **7 razones** con ejemplo PHP cada una: DRY, legibilidad narrativa, biblioteca
  nativa, errores aislados, testeabilidad, flexibilidad PHP 8, escala en equipo.
- **3 comunidades** con propósito / ventajas / desventajas / innovación:
  Stack Overflow (PHP), PHP.net + FIG + Foundation, Laracasts (+ Reddit, Discord, php-src).
- **Manual oficial**: https://www.php.net/manual/es/language.functions.php.
- **Socialización**: laboratorio ejecutable + quiz ★ para exponer en la sesión virtual.

## Clean Code aplicado (carpeta Obsidian)

- Funciones pequeñas (<20 líneas), una sola responsabilidad, identificadores en inglés.
- Comentarios solo en español y solo donde aportan intención.
- DRY: `data.js` es la única fuente; render, lab y quiz la consumen.
- El contenido se pinta ANTES de activar el observador de revelado (si no, queda invisible).

## Entrega en plataforma

1. Publica esta carpeta (p. ej. GitHub Pages / Netlify) o grábala en video navegándola.
2. Pega el link en Actividades → Actividad 3 → Evidencia sesión virtual “Funciones PHP”.
3. Socializa en la sesión virtual con el laboratorio + quiz en vivo.
