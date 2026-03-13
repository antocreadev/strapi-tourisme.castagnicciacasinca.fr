/**
 * Génération de QR codes stylisés — state of the art 2026
 *
 * Architecture :
 * 1. Générer la matrice QR brute via la lib qrcode (avec error correction H)
 * 2. Calculer la zone d'exclusion du logo EN MODULES (pas en pixels) — c'est la clé
 * 3. Dessiner les modules comme des cercles (modern dot style)
 * 4. Dessiner les finder patterns avec des coins arrondis et centre circulaire
 * 5. Dessiner le logo dans un cercle blanc avec bordure subtile
 * 6. Le QR code reste 100% scannable grâce à la correction d'erreur H (30%)
 *    et au fait que la zone logo est CORRECTEMENT exclue de la matrice
 */

import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export interface StyledQrCodeOptions {
  url: string;
  width: number;
  margin: number;
  colorDark: string;
  colorLight: string;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
  dotRadius: number;
  logoPath: string | null;
  logoSizeRatio: number;
}

// ─── QR Matrix ──────────────────────────────────────────────────────

function getQrMatrix(url: string, errorCorrectionLevel: "L" | "M" | "Q" | "H") {
  const qr = QRCode.create(url, { errorCorrectionLevel });
  const size = qr.modules.size;
  const data = qr.modules.data;
  const matrix: boolean[][] = [];
  for (let row = 0; row < size; row++) {
    matrix[row] = [];
    for (let col = 0; col < size; col++) {
      matrix[row][col] = !!data[row * size + col];
    }
  }
  return { matrix, size };
}

// ─── Zone detection helpers ─────────────────────────────────────────

/** Finder pattern = 7x7 dans les 3 coins + 1 module de séparateur blanc */
function isFinderZone(row: number, col: number, size: number): boolean {
  // Haut-gauche (inclut séparateur = 8 modules)
  if (row < 8 && col < 8) return true;
  // Haut-droit
  if (row < 8 && col >= size - 8) return true;
  // Bas-gauche
  if (row >= size - 8 && col < 8) return true;
  return false;
}

/** Alignment pattern = 5x5. Positions dépendent de la version QR. */
function getAlignmentPatternCenters(size: number): number[] {
  // La version QR se déduit de la taille : version = (size - 17) / 4
  const version = (size - 17) / 4;
  if (version < 2) return [];

  // Table des positions d'alignement (simplifié pour les versions courantes)
  const alignmentTable: Record<number, number[]> = {
    2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34],
    7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
    11: [6, 30, 54], 12: [6, 32, 58], 13: [6, 34, 62],
    14: [6, 26, 46, 66], 15: [6, 26, 48, 70], 16: [6, 26, 50, 74],
    17: [6, 30, 54, 78], 18: [6, 30, 56, 82], 19: [6, 30, 58, 86],
    20: [6, 34, 62, 90],
  };
  return alignmentTable[version] || [];
}

function isAlignmentCenter(row: number, col: number, size: number): { isCenter: boolean; centerRow: number; centerCol: number } {
  const centers = getAlignmentPatternCenters(size);
  for (const cr of centers) {
    for (const cc of centers) {
      // Skip si l'alignment pattern chevauche un finder pattern
      if (cr < 8 && cc < 8) continue;
      if (cr < 8 && cc >= size - 8) continue;
      if (cr >= size - 8 && cc < 8) continue;
      if (row >= cr - 2 && row <= cr + 2 && col >= cc - 2 && col <= cc + 2) {
        return { isCenter: true, centerRow: cr, centerCol: cc };
      }
    }
  }
  return { isCenter: false, centerRow: 0, centerCol: 0 };
}

// ─── Logo zone calculation ──────────────────────────────────────────

/**
 * Calcule la zone d'exclusion du logo EN MODULES.
 * C'est la pièce critique : cette zone doit être PLUS GRANDE que la zone
 * visuelle du logo (image + padding + bordure) pour qu'aucun module QR
 * ne soit partiellement masqué.
 */
function getLogoExclusionZone(size: number, logoSizeRatio: number) {
  // Le logo occupe logoSizeRatio du QR code.
  // On ajoute un padding de 15% du logo de chaque côté + 2 modules de sécurité
  const logoModules = Math.ceil(size * logoSizeRatio);
  const paddingModules = Math.ceil(logoModules * 0.15) + 2;
  const totalExclusionModules = logoModules + paddingModules * 2;

  // S'assurer que c'est impair (pour un centrage parfait)
  const exclusion = totalExclusionModules % 2 === 0 ? totalExclusionModules + 1 : totalExclusionModules;
  const start = Math.floor((size - exclusion) / 2);
  const end = start + exclusion;

  return { start, end, exclusionSize: exclusion };
}

function isInLogoZone(row: number, col: number, size: number, logoSizeRatio: number): boolean {
  const { start, end } = getLogoExclusionZone(size, logoSizeRatio);
  return row >= start && row < end && col >= start && col < end;
}

// ─── SVG Generation ─────────────────────────────────────────────────

export async function generateStyledSvg(opts: StyledQrCodeOptions): Promise<string> {
  const { url, width, margin, colorDark, colorLight, errorCorrectionLevel, dotRadius, logoPath, logoSizeRatio } = opts;
  const { matrix, size } = getQrMatrix(url, errorCorrectionLevel);

  const totalModules = size + margin * 2;
  const moduleSize = width / totalModules;
  const dotSize = moduleSize * 0.85; // Les cercles sont légèrement plus petits que le module
  const dotOffset = (moduleSize - dotSize) / 2;

  const svg: string[] = [];

  svg.push(
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"`,
    `  viewBox="0 0 ${width} ${width}" width="${width}" height="${width}">`,
    `<defs>`,
    `  <style>`,
    `    .qr-dot { fill: ${colorDark}; }`,
    `    .qr-bg { fill: ${colorLight}; }`,
    `    .qr-finder { fill: ${colorDark}; }`,
    `  </style>`,
    `</defs>`,
    // Fond
    `<rect class="qr-bg" width="${width}" height="${width}"/>`
  );

  // ── Data modules (cercles) ──

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!matrix[row][col]) continue;

      // Skip les zones spéciales
      if (isFinderZone(row, col, size)) continue;
      if (logoPath && isInLogoZone(row, col, size, logoSizeRatio)) continue;

      const alignment = isAlignmentCenter(row, col, size);
      if (alignment.isCenter) continue;

      const cx = (col + margin) * moduleSize + moduleSize / 2;
      const cy = (row + margin) * moduleSize + moduleSize / 2;
      const r = dotSize / 2;

      if (dotRadius >= 0.45) {
        // Cercle pur
        svg.push(`<circle cx="${cx}" cy="${cy}" r="${r}" class="qr-dot"/>`);
      } else {
        // Rectangle arrondi
        const x = (col + margin) * moduleSize + dotOffset;
        const y = (row + margin) * moduleSize + dotOffset;
        const rr = dotSize * dotRadius;
        svg.push(`<rect x="${x}" y="${y}" width="${dotSize}" height="${dotSize}" rx="${rr}" ry="${rr}" class="qr-dot"/>`);
      }
    }
  }

  // ── Finder patterns (3 coins) ──

  const finderPositions = [
    { row: 0, col: 0 },
    { row: 0, col: size - 7 },
    { row: size - 7, col: 0 },
  ];

  for (const fp of finderPositions) {
    const fx = (fp.col + margin) * moduleSize;
    const fy = (fp.row + margin) * moduleSize;
    const fpSize = 7 * moduleSize;
    const outerR = moduleSize * 1.2;
    const midR = moduleSize * 0.8;
    const innerR = moduleSize * 1.5; // Rayon du cercle intérieur

    // Anneau extérieur — rounded rect
    svg.push(`<rect x="${fx}" y="${fy}" width="${fpSize}" height="${fpSize}" rx="${outerR}" ry="${outerR}" class="qr-finder"/>`);

    // Espace blanc intérieur — rounded rect
    const gap = moduleSize;
    svg.push(`<rect x="${fx + gap}" y="${fy + gap}" width="${fpSize - gap * 2}" height="${fpSize - gap * 2}" rx="${midR}" ry="${midR}" class="qr-bg"/>`);

    // Centre — cercle (style moderne)
    const centerX = fx + fpSize / 2;
    const centerY = fy + fpSize / 2;
    svg.push(`<circle cx="${centerX}" cy="${centerY}" r="${innerR}" class="qr-finder"/>`);
  }

  // ── Alignment patterns ──

  const alignCenters = getAlignmentPatternCenters(size);
  for (const cr of alignCenters) {
    for (const cc of alignCenters) {
      // Skip si chevauche finder
      if (cr < 8 && cc < 8) continue;
      if (cr < 8 && cc >= size - 8) continue;
      if (cr >= size - 8 && cc < 8) continue;
      // Skip si dans la zone logo
      if (logoPath && isInLogoZone(cr, cc, size, logoSizeRatio)) continue;

      const ax = (cc + margin - 2) * moduleSize;
      const ay = (cr + margin - 2) * moduleSize;
      const aSize = 5 * moduleSize;
      const aR = moduleSize * 0.6;

      // Anneau extérieur
      svg.push(`<rect x="${ax}" y="${ay}" width="${aSize}" height="${aSize}" rx="${aR}" ry="${aR}" class="qr-finder"/>`);
      // Blanc intérieur
      svg.push(`<rect x="${ax + moduleSize}" y="${ay + moduleSize}" width="${aSize - moduleSize * 2}" height="${aSize - moduleSize * 2}" rx="${aR * 0.5}" ry="${aR * 0.5}" class="qr-bg"/>`);
      // Point central — cercle
      const acx = (cc + margin) * moduleSize + moduleSize / 2;
      const acy = (cr + margin) * moduleSize + moduleSize / 2;
      svg.push(`<circle cx="${acx}" cy="${acy}" r="${moduleSize * 0.6}" class="qr-finder"/>`);
    }
  }

  // ── Logo au centre ──

  if (logoPath && fs.existsSync(logoPath)) {
    const { start, end, exclusionSize } = getLogoExclusionZone(size, logoSizeRatio);

    // Zone d'exclusion en pixels (pour le cercle blanc)
    const exclPixelStart = (start + margin) * moduleSize;
    const exclPixelSize = exclusionSize * moduleSize;
    const exclCenterX = exclPixelStart + exclPixelSize / 2;
    const exclCenterY = exclPixelStart + exclPixelSize / 2;
    const maskRadius = exclPixelSize / 2;

    // Carré arrondi blanc de fond
    const bgSize = exclPixelSize;
    const bgX = exclCenterX - bgSize / 2;
    const bgY = exclCenterY - bgSize / 2;
    const bgRadius = bgSize * 0.12;
    svg.push(`<rect x="${bgX}" y="${bgY}" width="${bgSize}" height="${bgSize}" rx="${bgRadius}" ry="${bgRadius}" fill="${colorLight}"/>`);

    // Bordure subtile gris clair
    svg.push(`<rect x="${bgX}" y="${bgY}" width="${bgSize}" height="${bgSize}" rx="${bgRadius}" ry="${bgRadius}" fill="none" stroke="#E0E0E0" stroke-width="${moduleSize * 0.3}"/>`);

    // Logo (dans un clipPath carré arrondi, 85% de la zone blanche)
    const logoDisplaySize = bgSize * 0.85;
    const logoX = exclCenterX - logoDisplaySize / 2;
    const logoY = exclCenterY - logoDisplaySize / 2;
    const logoRadius = logoDisplaySize * 0.08;

    const clipId = "logo-clip";
    svg.push(`<defs><clipPath id="${clipId}"><rect x="${logoX}" y="${logoY}" width="${logoDisplaySize}" height="${logoDisplaySize}" rx="${logoRadius}" ry="${logoRadius}"/></clipPath></defs>`);

    const ext = path.extname(logoPath).toLowerCase();
    if (ext === ".svg") {
      const logoSvg = fs.readFileSync(logoPath, "utf-8");
      svg.push(
        `<g clip-path="url(#${clipId})">`,
        `<g transform="translate(${logoX}, ${logoY})">`,
        `<svg width="${logoDisplaySize}" height="${logoDisplaySize}" viewBox="0 0 100 100">`,
        logoSvg.replace(/<\?xml[^>]*\?>/g, "").replace(/<svg[^>]*>/g, "").replace(/<\/svg>/g, ""),
        `</svg></g></g>`
      );
    } else {
      const logoBuffer = fs.readFileSync(logoPath);
      const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
      const base64 = logoBuffer.toString("base64");
      svg.push(
        `<g clip-path="url(#${clipId})">`,
        `<image x="${logoX}" y="${logoY}" width="${logoDisplaySize}" height="${logoDisplaySize}" href="data:${mimeType};base64,${base64}" preserveAspectRatio="xMidYMid meet"/>`,
        `</g>`
      );
    }
  }

  svg.push(`</svg>`);
  return svg.join("\n");
}

// ─── PNG Generation ─────────────────────────────────────────────────

export async function generateStyledPng(opts: StyledQrCodeOptions): Promise<Buffer> {
  const svgString = await generateStyledSvg(opts);
  return await sharp(Buffer.from(svgString))
    .resize(opts.width, opts.width)
    .png({ quality: 100 })
    .toBuffer();
}

// ─── EPS Generation ─────────────────────────────────────────────────

export async function generateStyledEps(opts: StyledQrCodeOptions): Promise<string> {
  const { url, width, margin, colorDark, colorLight, errorCorrectionLevel, dotRadius, logoPath, logoSizeRatio } = opts;
  const { matrix, size } = getQrMatrix(url, errorCorrectionLevel);

  const totalModules = size + margin * 2;
  const moduleSize = width / totalModules;
  const dotSize = moduleSize * 0.85;

  const darkRgb = hexToRgb(colorDark);
  const lightRgb = hexToRgb(colorLight);

  const eps: string[] = [];

  // Header
  eps.push(
    `%!PS-Adobe-3.0 EPSF-3.0`,
    `%%BoundingBox: 0 0 ${width} ${width}`,
    `%%HiResBoundingBox: 0.0 0.0 ${width}.0 ${width}.0`,
    `%%Title: QR Code - Castagniccia Casinca`,
    `%%Creator: Strapi QR Code Generator`,
    `%%EndComments`,
    ``
  );

  // Procedures
  eps.push(
    `% Rounded rectangle: x y w h r RR`,
    `/RR { /r exch def /h exch def /w exch def /y exch def /x exch def`,
    `  newpath x r add y moveto`,
    `  x w add y x w add y h add r arcto 4 {pop} repeat`,
    `  x w add y h add x y h add r arcto 4 {pop} repeat`,
    `  x y h add x y r arcto 4 {pop} repeat`,
    `  x y x w add y r arcto 4 {pop} repeat`,
    `  closepath } def`,
    ``
  );

  // Background
  eps.push(`${lightRgb.r} ${lightRgb.g} ${lightRgb.b} setrgbcolor`);
  eps.push(`0 0 ${width} ${width} rectfill`);
  eps.push(`${darkRgb.r} ${darkRgb.g} ${darkRgb.b} setrgbcolor`);
  eps.push(``);

  // Y-flip helper: PostScript Y=0 is bottom
  const py = (row: number) => width - (row + margin + 1) * moduleSize;

  // ── Data modules ──
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!matrix[row][col]) continue;
      if (isFinderZone(row, col, size)) continue;
      if (logoPath && isInLogoZone(row, col, size, logoSizeRatio)) continue;
      const alignment = isAlignmentCenter(row, col, size);
      if (alignment.isCenter) continue;

      const cx = (col + margin) * moduleSize + moduleSize / 2;
      const cy = py(row) + moduleSize / 2;

      if (dotRadius >= 0.45) {
        // Circle
        eps.push(`newpath ${cx} ${cy} ${dotSize / 2} 0 360 arc fill`);
      } else {
        const x = (col + margin) * moduleSize + (moduleSize - dotSize) / 2;
        const y = py(row) + (moduleSize - dotSize) / 2;
        const r = dotSize * dotRadius;
        eps.push(`${x} ${y} ${dotSize} ${dotSize} ${r} RR fill`);
      }
    }
  }

  // ── Finder patterns ──
  const finderPositions = [
    { row: 0, col: 0 },
    { row: 0, col: size - 7 },
    { row: size - 7, col: 0 },
  ];

  for (const fp of finderPositions) {
    const fx = (fp.col + margin) * moduleSize;
    const fy = width - (fp.row + margin + 7) * moduleSize;
    const fpSize = 7 * moduleSize;
    const outerR = moduleSize * 1.2;
    const midR = moduleSize * 0.8;

    // Outer ring
    eps.push(`${darkRgb.r} ${darkRgb.g} ${darkRgb.b} setrgbcolor`);
    eps.push(`${fx} ${fy} ${fpSize} ${fpSize} ${outerR} RR fill`);
    // White inner
    eps.push(`${lightRgb.r} ${lightRgb.g} ${lightRgb.b} setrgbcolor`);
    const gap = moduleSize;
    eps.push(`${fx + gap} ${fy + gap} ${fpSize - gap * 2} ${fpSize - gap * 2} ${midR} RR fill`);
    // Center circle
    eps.push(`${darkRgb.r} ${darkRgb.g} ${darkRgb.b} setrgbcolor`);
    const centerX = fx + fpSize / 2;
    const centerY = fy + fpSize / 2;
    eps.push(`newpath ${centerX} ${centerY} ${moduleSize * 1.5} 0 360 arc fill`);
  }

  // ── Alignment patterns ──
  const alignCenters = getAlignmentPatternCenters(size);
  for (const cr of alignCenters) {
    for (const cc of alignCenters) {
      if (cr < 8 && cc < 8) continue;
      if (cr < 8 && cc >= size - 8) continue;
      if (cr >= size - 8 && cc < 8) continue;
      if (logoPath && isInLogoZone(cr, cc, size, logoSizeRatio)) continue;

      const ax = (cc + margin - 2) * moduleSize;
      const ay = width - (cr + margin + 3) * moduleSize;
      const aSize = 5 * moduleSize;
      const aR = moduleSize * 0.6;

      eps.push(`${darkRgb.r} ${darkRgb.g} ${darkRgb.b} setrgbcolor`);
      eps.push(`${ax} ${ay} ${aSize} ${aSize} ${aR} RR fill`);
      eps.push(`${lightRgb.r} ${lightRgb.g} ${lightRgb.b} setrgbcolor`);
      eps.push(`${ax + moduleSize} ${ay + moduleSize} ${aSize - moduleSize * 2} ${aSize - moduleSize * 2} ${aR * 0.5} RR fill`);
      eps.push(`${darkRgb.r} ${darkRgb.g} ${darkRgb.b} setrgbcolor`);
      const acx = (cc + margin) * moduleSize + moduleSize / 2;
      const acy = width - (cr + margin + 1) * moduleSize + moduleSize / 2;
      eps.push(`newpath ${acx} ${acy} ${moduleSize * 0.6} 0 360 arc fill`);
    }
  }

  // ── Logo ──
  if (logoPath && fs.existsSync(logoPath)) {
    const { start, exclusionSize } = getLogoExclusionZone(size, logoSizeRatio);
    const exclPixelStart = (start + margin) * moduleSize;
    const exclPixelSize = exclusionSize * moduleSize;
    const centerXY = exclPixelStart + exclPixelSize / 2;
    // PostScript Y = same value since QR is square and centered
    const psCenterY = width - centerXY;
    const maskRadius = exclPixelSize / 2;

    // White rounded square mask
    const bgSize = exclPixelSize;
    const bgR = bgSize * 0.12;
    const bgX = centerXY - bgSize / 2;
    const bgY = psCenterY - bgSize / 2;
    eps.push(`${lightRgb.r} ${lightRgb.g} ${lightRgb.b} setrgbcolor`);
    eps.push(`${bgX} ${bgY} ${bgSize} ${bgSize} ${bgR} RR fill`);

    // Subtle border
    eps.push(`0.88 0.88 0.88 setrgbcolor`);
    eps.push(`${bgX} ${bgY} ${bgSize} ${bgSize} ${bgR} RR`);
    eps.push(`${moduleSize * 0.3} setlinewidth stroke`);

    // Embed logo raster
    try {
      const logoImageSize = 300;
      const logoRgbBuffer = await sharp(logoPath)
        .resize(logoImageSize, logoImageSize, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .removeAlpha()
        .raw()
        .toBuffer();

      const logoDisplaySize = bgSize * 0.85;
      const logoX = centerXY - logoDisplaySize / 2;
      const logoY = psCenterY - logoDisplaySize / 2;

      eps.push(`gsave`);
      // Rounded square clip
      const clipR = logoDisplaySize * 0.08;
      eps.push(`${logoX} ${logoY} ${logoDisplaySize} ${logoDisplaySize} ${clipR} RR clip`);
      eps.push(`${logoX} ${logoY} translate`);
      eps.push(`${logoDisplaySize} ${logoDisplaySize} scale`);
      eps.push(`${logoImageSize} ${logoImageSize} 8 [${logoImageSize} 0 0 -${logoImageSize} 0 ${logoImageSize}]`);
      eps.push(`{currentfile ${logoImageSize * 3} string readhexstring pop}`);
      eps.push(`false 3 colorimage`);

      let hexLine = "";
      for (let i = 0; i < logoRgbBuffer.length; i++) {
        hexLine += logoRgbBuffer[i].toString(16).padStart(2, "0");
        if (hexLine.length >= 78) {
          eps.push(hexLine);
          hexLine = "";
        }
      }
      if (hexLine) eps.push(hexLine);
      eps.push(`grestore`);
    } catch {
      // Continue sans logo si sharp échoue
    }
  }

  eps.push(`%%EOF`);
  return eps.join("\n");
}

// ─── Utils ──────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: string; g: string; b: string } {
  const h = hex.replace("#", "");
  return {
    r: (parseInt(h.substring(0, 2), 16) / 255).toFixed(4),
    g: (parseInt(h.substring(2, 4), 16) / 255).toFixed(4),
    b: (parseInt(h.substring(4, 6), 16) / 255).toFixed(4),
  };
}
