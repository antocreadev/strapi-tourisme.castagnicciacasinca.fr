/**
 * `information-pratique` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "type_information_pratique",
];
export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In information-pratique middleware.');
    ctx.query.populate = populate;

    await next();
  };
};
