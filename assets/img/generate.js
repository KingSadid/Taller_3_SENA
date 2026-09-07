// Genera variantes del logo PHP a partir del JPEG original.
// Salidas:
//   · php-logo.png          → 256px sin fondo (header Retina)
//   · php-logo@2x.png       → 128px sin fondo (header estándar)
//   · favicon-32.png        → 32×32 (favicon ICO principal)
//   · favicon-180.png       → 180×180 (Apple touch)
//   · favicon.svg           → SVG vectorial (favicon moderno)

const path = require('path');
const fs   = require('fs');

const src = path.join(__dirname, 'php-logo.jpg');
const out = (n) => path.join(__dirname, n);

const sharp = require('sharp');

/** Elimina el fondo blanco/blanquecino dejando transparente. */
async function removeWhiteBackground(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 235 && g > 225 && b > 215) {
      // transparente
    } else {
      px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = 255;
    }
  }
  return { buffer: px, info };
}

/** Redimensiona el logo, le quita el blanco y le da un padding transparente. */
async function makeLogo(width, fileName, padding) {
  const resized = await sharp(src).resize({ width }).png().toBuffer();
  const { buffer: transparent, info } = await removeWhiteBackground(resized);
  await sharp(transparent, { raw: info })
    .extend({
      top: padding, bottom: padding, left: padding, right: padding,
      background: 'transparent'
    })
    .png({ compressionLevel: 9 })
    .toFile(out(fileName));
}

(async () => {
  try {
    const meta = await sharp(src).metadata();
    console.log(`Origen: ${meta.width}×${meta.height} ${meta.format}`);

    await makeLogo(256, 'php-logo.png',     18);
    await makeLogo(128, 'php-logo@2x.png',   12);
    await makeLogo(32,  'favicon-32.png',     3);
    await makeLogo(180, 'favicon-180.png',  14);

    // SVG vectorial — escalable infinito, pesa 600 bytes
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 42" role="img" aria-label="Logo de PHP">
  <defs>
    <linearGradient id="phpGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a6fc6"/>
      <stop offset="1" stop-color="#2c3e80"/>
    </linearGradient>
  </defs>
  <ellipse cx="32" cy="21" rx="31" ry="20" fill="url(#phpGrad)" stroke="#1f2c5c" stroke-width="1.2"/>
  <text x="32" y="29.5" text-anchor="middle"
        font-family="'Times New Roman', Georgia, serif" font-style="italic"
        font-weight="700" font-size="22" fill="#f5ecd1">php</text>
</svg>`;
    fs.writeFileSync(out('favicon.svg'), svg, 'utf8');

    console.log('✔ Variantes generadas:');
    for (const f of ['php-logo.png','php-logo@2x.png','favicon-32.png','favicon-180.png','favicon.svg']) {
      const s = fs.statSync(out(f));
      console.log(`   ${f.padEnd(20)} ${(s.size/1024).toFixed(1).padStart(6)} kB`);
    }
  } catch (e) {
    console.error('✘ Error:', e.message);
    process.exit(1);
  }
})();
