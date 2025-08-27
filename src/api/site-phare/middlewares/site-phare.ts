/**
 * `site-phare` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = [
  "site",
  "site.Images"
];


export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In randonnee middleware.');
    ctx.query.populate = populate;

    await next();
  };
};
