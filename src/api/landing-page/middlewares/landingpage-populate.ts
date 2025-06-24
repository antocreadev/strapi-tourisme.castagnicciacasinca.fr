/**
 * `landingpage-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = [
  "BarreDeNavigation.page_de_sections",
  "BarreDeNavigation.logo",
  "BarreDeNavigation.logo.image",
];

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.dir(ctx.query, { depth: null });
    ctx.query.populate = populate;
    strapi.log.info("In landingpage-populate middleware.");

    await next();
  };
};
