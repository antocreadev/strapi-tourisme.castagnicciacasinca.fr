/**
 * activites-nautique router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::activites-nautique.activites-nautique', {
  config: {
    find: {
      middlewares: ["api::activites-nautique.activites-nautique"],
    },
  },
});
