/**
 * `artisanat-et-produit` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "type_artisanat_et_produit",
  "image",
  "Liens",
  "Liens.image",
];
export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info('In artisanat-et-produit middleware.');

    await next();
  };
};
