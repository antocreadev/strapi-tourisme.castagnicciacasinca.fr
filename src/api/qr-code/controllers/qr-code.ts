/**
 * qr-code controller
 */

import { factories } from "@strapi/strapi";
import QRCode from "qrcode";
import { QR_CODE_CONFIG, buildQrCodeUrl } from "../qr-code-config";

export default factories.createCoreController(
  "api::qr-code.qr-code",
  ({ strapi }) => ({
    /**
     * GET /api/qr-codes/:documentId/download-qrcode?format=png|svg
     * Génère et télécharge le QR code
     * - PNG : haute résolution 300dpi pour impression 130x130mm
     * - SVG : vectoriel, qualité parfaite à toute taille
     */
    async downloadQrCode(ctx) {
      const { documentId } = ctx.params;
      const format = (ctx.query.format as string)?.toLowerCase() === "svg" ? "svg" : "png";

      const entry = await strapi.documents("api::qr-code.qr-code").findOne({
        documentId,
        status: "published",
      });

      if (!entry) {
        return ctx.notFound("QR Code non trouvé");
      }

      const url = buildQrCodeUrl(documentId);
      const { width, margin, colorDark, colorLight, errorCorrectionLevel } =
        QR_CODE_CONFIG;

      const safeTitle = (entry.Titre || "qrcode")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, "");

      if (format === "svg") {
        const svgString = await QRCode.toString(url, {
          type: "svg",
          margin,
          color: {
            dark: colorDark,
            light: colorLight,
          },
          errorCorrectionLevel,
          width,
        });

        ctx.set("Content-Type", "image/svg+xml");
        ctx.set(
          "Content-Disposition",
          `attachment; filename="qrcode-${safeTitle}.svg"`
        );
        ctx.body = svgString;
      } else {
        const pngBuffer = await QRCode.toBuffer(url, {
          type: "png",
          width,
          margin,
          color: {
            dark: colorDark,
            light: colorLight,
          },
          errorCorrectionLevel,
        });

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
