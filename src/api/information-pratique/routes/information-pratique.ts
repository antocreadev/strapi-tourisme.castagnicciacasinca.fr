/**
 * information-pratique router
 */

import { factories } from '@strapi/strapi';


export default factories.createCoreRouter('api::information-pratique.information-pratique', {
  config: {
    find: {
      middlewares: ["api::information-pratique.information-pratique"],
    },
  },
});
