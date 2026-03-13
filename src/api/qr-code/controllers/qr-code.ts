/**
 * qr-code controller
 */

import { factories } from "@strapi/strapi";
import { QR_CODE_CONFIG, buildQrCodeUrl } from "../qr-code-config";
import {
  generateStyledSvg,
  generateStyledPng,
  generateStyledEps,
  type StyledQrCodeOptions,
} from "../qr-code-styled";

export default factories.createCoreController(
  "api::qr-code.qr-code",
  ({ strapi }) => ({
    /**
     * GET /api/qr-codes/:documentId/download-qrcode?format=png|svg|eps
     * Génère et télécharge le QR code stylisé
     * - PNG : haute résolution 300dpi pour impression 130x130mm
     * - SVG : vectoriel, qualité parfaite à toute taille
     * - EPS : vectoriel PostScript pour impression professionnelle
     */
    async downloadQrCode(ctx) {
      const { documentId } = ctx.params;
      const formatParam = (ctx.query.format as string)?.toLowerCase();
      const format = ["svg", "eps"].includes(formatParam) ? formatParam : "png";

      const entry = await strapi.documents("api::qr-code.qr-code").findOne({
        documentId,
        status: "published",
      });

      if (!entry) {
        return ctx.notFound("QR Code non trouvé");
      }

      const url = buildQrCodeUrl(documentId);
      const {
        width,
        margin,
        colorDark,
        colorLight,
        errorCorrectionLevel,
        dotRadius,
        logoPath,
        logoSizeRatio,
      } = QR_CODE_CONFIG;

      const safeTitle = (entry.Titre || "qrcode")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, "");

      const opts: StyledQrCodeOptions = {
        url,
        width,
        margin,
        colorDark,
        colorLight,
        errorCorrectionLevel,
        dotRadius,
        logoPath,
        logoSizeRatio,
      };

      if (format === "svg") {
        const svgString = await generateStyledSvg(opts);
        ctx.set("Content-Type", "image/svg+xml");
        ctx.set(
          "Content-Disposition",
          `attachment; filename="qrcode-${safeTitle}.svg"`
        );
        ctx.body = svgString;
      } else if (format === "eps") {
        const epsString = await generateStyledEps(opts);
        ctx.set("Content-Type", "application/postscript");
        ctx.set(
          "Content-Disposition",
          `attachment; filename="qrcode-${safeTitle}.eps"`
        );
        ctx.body = epsString;
      } else {
        const pngBuffer = await generateStyledPng(opts);
        ctx.set("Content-Type", "image/png");
        ctx.set(
          "Content-Disposition",
          `attachment; filename="qrcode-${safeTitle}.png"`
        );
        ctx.body = pngBuffer;
      }
    },
  })
);
