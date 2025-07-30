/**
 * `plage` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "commune",
  "Image",
  "activites_nautiques"
];

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info('In plage middleware.');

    await next();
  };
};
