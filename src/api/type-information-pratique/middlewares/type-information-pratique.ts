/**
 * `type-information-pratique` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "Icone",
  "Lien",
];

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info('In type-information-pratique middleware.');

    await next();
  };
};
