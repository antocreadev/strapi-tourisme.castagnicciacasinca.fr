/**
 * `sejourner` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "commune",
  "type_sejourner",
  "liens",
  "liens.image",
  "images",
  "EtablissementCharteNote"
];

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info('In sejourner middleware.');

    await next();
  };
};
