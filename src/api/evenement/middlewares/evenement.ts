/**
 * `evenement` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = [
  "commune",
  "Liens",
  "Liens.image",
  "image"
];


export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    console.dir(ctx.query, { depth: null });
    strapi.log.info('In evenement middleware.');

    await next();
  };
};


// import type { Core } from "@strapi/strapi";
// const populate = [
//   "BarreDeNavigation.page_de_sections",
//   "BarreDeNavigation.logo",
//   "BarreDeNavigation.logo.image",
// ];

// export default (config, { strapi }: { strapi: Core.Strapi }) => {
//   // Add your own logic here.
//   return async (ctx, next) => {
//     console.dir(ctx.query, { depth: null });
//     ctx.query.populate = populate;
//     strapi.log.info("In global middleware.");

//     await next();
//   };
// };
