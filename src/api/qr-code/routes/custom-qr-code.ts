export default {
  routes: [
    {
      method: "GET",
      path: "/qr-codes/:documentId/download-qrcode",
      handler: "api::qr-code.qr-code.downloadQrCode",
      config: {
        auth: false,
      },
    },
  ],
};
