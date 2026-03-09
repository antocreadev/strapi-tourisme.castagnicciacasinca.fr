/**
 * `qr-code` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "commune",
  "images",
  "site",
];

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In qr-code middleware.');
    ctx.query.populate = populate;

    await next();
  };
};
