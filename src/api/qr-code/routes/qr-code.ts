/**
 * qr-code router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::qr-code.qr-code', {
  config: {
    find: {
      middlewares: ["api::qr-code.qr-code"],
    },
  },
});
