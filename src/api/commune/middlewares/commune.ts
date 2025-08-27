/**
 * `commune` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "pieve",
  "images",
];

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info('In commune middleware.');

    await next();
  };
};
