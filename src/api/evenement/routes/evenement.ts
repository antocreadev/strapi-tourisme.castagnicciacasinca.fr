/**
 * evenement router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::evenement.evenement', {
  config: {
    find: {
      middlewares: ["api::evenement.evenement"],
    },
  },
});


