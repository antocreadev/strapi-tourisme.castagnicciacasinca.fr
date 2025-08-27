/**
 * commune router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::commune.commune', {
  config: {
    find: {
      middlewares: ["api::commune.commune"],
    },
  },
});
