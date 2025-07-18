/**
 * sejourner router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::sejourner.sejourner', {
  config: {
    find: {
      middlewares: ["api::sejourner.sejourner"],
    },
  },
});
