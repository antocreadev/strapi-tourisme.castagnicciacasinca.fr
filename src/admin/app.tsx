import type { StrapiApp } from "@strapi/strapi/admin";
import { Download } from "@strapi/icons";
import { createElement } from "react";

/**
 * Document Action : Télécharger QR Code PNG
 * C'est une fonction (DescriptionComponent) qui reçoit les props et retourne un objet description ou null.
 */
const DownloadQrCodePng = (props: any) => {
  if (props.model !== "api::qr-code.qr-code") return null;
  if (!props.documentId) return null;

  return {
    label: "Télécharger QR Code (PNG)",
    icon: createElement(Download),
    variant: "secondary" as const,
    disabled: !props.document?.publishedAt,
    onClick: () => {
      const url = `/api/qr-codes/${props.documentId}/download-qrcode?format=png`;
      window.open(url, "_blank");
    },
  };
};
DownloadQrCodePng.type = "download-qrcode-png";
DownloadQrCodePng.position = "panel";

/**
 * Document Action : Télécharger QR Code SVG
 */
const DownloadQrCodeSvg = (props: any) => {
  if (props.model !== "api::qr-code.qr-code") return null;
  if (!props.documentId) return null;

  return {
    label: "Télécharger QR Code (SVG)",
    icon: createElement(Download),
    variant: "secondary" as const,
    disabled: !props.document?.publishedAt,
    onClick: () => {
      const url = `/api/qr-codes/${props.documentId}/download-qrcode?format=svg`;
      window.open(url, "_blank");
    },
  };
};
DownloadQrCodeSvg.type = "download-qrcode-svg";
DownloadQrCodeSvg.position = "panel";

/**
 * Document Action : Télécharger QR Code EPS
 */
const DownloadQrCodeEps = (props: any) => {
  if (props.model !== "api::qr-code.qr-code") return null;
  if (!props.documentId) return null;

  return {
    label: "Télécharger QR Code (EPS)",
    icon: createElement(Download),
    variant: "secondary" as const,
    disabled: !props.document?.publishedAt,
    onClick: () => {
      const url = `/api/qr-codes/${props.documentId}/download-qrcode?format=eps`;
      window.open(url, "_blank");
    },
  };
};
DownloadQrCodeEps.type = "download-qrcode-eps";
DownloadQrCodeEps.position = "panel";

export default {
  config: {
    locales: ["fr"],
  },
  register(app: StrapiApp) {
    const contentManagerPlugin = app.getPlugin("content-manager");
    contentManagerPlugin.apis.addDocumentAction([
      DownloadQrCodePng,
      DownloadQrCodeSvg,
      DownloadQrCodeEps,
    ]);
  },
  bootstrap(app: StrapiApp) {},
};
