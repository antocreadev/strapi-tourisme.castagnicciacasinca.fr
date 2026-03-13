/**
 * Configuration personnalisable du QR Code
 *
 * Format d'impression : plaques alu Dibond 3mm, 130x130mm
 * Résolution : 300 DPI → 1535px
 *
 * Modifiez ce fichier pour personnaliser l'apparence des QR codes :
 * - Couleurs, marges
 * - Taille et résolution
 * - URL de base du site frontend
 * - Style des modules (arrondis)
 * - Logo au centre
 */

import path from "path";

export const QR_CODE_CONFIG = {
  /** URL de base du site frontend */
  frontendBaseUrl: "https://tourisme.castagnicciacasinca.fr",

  /** Chemin de la page QR code côté frontend */
  frontendPath: "/qr-codes",

  /** Largeur en pixels (130mm à 300dpi = 1535px) */
  width: 1535,

  /** Marge autour du QR code (en modules QR) */
  margin: 2,

  /** Couleur des modules (carrés noirs) - hex */
  colorDark: "#000000",

  /** Couleur de fond - hex */
  colorLight: "#FFFFFF",

  /** Niveau de correction d'erreur : 'L' (7%), 'M' (15%), 'Q' (25%), 'H' (30%) */
  errorCorrectionLevel: "H" as const,

  /**
   * Rayon d'arrondi des modules QR (0 = carré, 0.5 = cercle)
   * Recommandé : 0.3 à 0.4 pour un style moderne
   */
  dotRadius: 0.4,

  /**
   * Chemin vers le fichier logo à placer au centre du QR code
   * Formats supportés : PNG, JPG, SVG
   * Mettre null pour désactiver le logo
   *
   * Exemple : path.resolve(__dirname, "../../../../public/logo.png")
   */
  logoPath: path.resolve(__dirname, "../../../../public/logo-castagniccia.jpg"),

  /**
   * Taille du logo par rapport au QR code (ex: 0.2 = 20%)
   * Ne pas dépasser 0.25 pour garder le QR lisible (avec correction H)
   */
  logoSizeRatio: 0.2,
};

/**
 * Construit l'URL frontend vers laquelle le QR code pointe
 */
export function buildQrCodeUrl(documentId: string): string {
  const { frontendBaseUrl, frontendPath } = QR_CODE_CONFIG;
  return `${frontendBaseUrl}${frontendPath}/${documentId}`;
}
