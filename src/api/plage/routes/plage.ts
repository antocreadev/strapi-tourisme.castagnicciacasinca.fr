/**
 * plage router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::plage.plage', {
  config: {
    find: {
      middlewares: ["api::plage.plage"],
    },
  },
});
