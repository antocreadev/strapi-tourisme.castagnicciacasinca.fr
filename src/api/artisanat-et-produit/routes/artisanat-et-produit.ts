/**
 * artisanat-et-produit router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::artisanat-et-produit.artisanat-et-produit', {
  config: {
    find: {
      middlewares: ["api::artisanat-et-produit.artisanat-et-produit"],
    },
  },
});
