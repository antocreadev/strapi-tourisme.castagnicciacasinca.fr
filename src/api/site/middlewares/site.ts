/**
 * `site` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "commune",
  "Liens",
  "Liens.image",
  "Images"
];
export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info('In site middleware.');

    await next();
  };
};
