/**
 * `activites-nautique` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "Image",
  "commune",
  "plage",
];
export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In activites-nautique middleware.');
    ctx.query.populate = populate;

    await next();
  };
};
