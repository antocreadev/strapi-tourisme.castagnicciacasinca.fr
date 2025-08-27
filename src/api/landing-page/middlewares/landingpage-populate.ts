/**
 * `landingpage-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = [
  "Hero.Boutons",
  "Hero.images",
  "Hero.Boutons",
  "Agenda",
  "Agenda.Bouton",
  "CarteInteractive",
  "CarteInteractive.image",
  "CarteInteractive.Bouton",
  "LesIncontournables",
  "LesIncontournables.LienSection1",
  "LesIncontournables.LienSection2",
  "DecouvrezLeTerritoire",
  "DecouvrezLeTerritoire.media",
  "Sejourner",
  "Sejourner.type_sejourners",
  "Sejourner.type_sejourners.lien",
  "Sejourner.type_sejourners.Icone",
  "Sejourner.Bouton",
  "LesPlages",
  "LesPlages.image",
  "LesPlages.bouton",
  "ArtisanatEtProduitsDuTerroir",
  "ArtisanatEtProduitsDuTerroir.bouton", 
  "ArtisanatEtProduitsDuTerroir.type_artisanat_et_produits",
  "ArtisanatEtProduitsDuTerroir.type_artisanat_et_produits.lien",  
  "ArtisanatEtProduitsDuTerroir.type_artisanat_et_produits.image",  
  "ActiviteLoisir",
  "ActiviteLoisir.type_activite_loisirs",
  "ActiviteLoisir.type_activite_loisirs.Lien",
  "ActiviteLoisir.type_activite_loisirs.Icone",
  "InformationsPratiques",
  "InformationsPratiques.type_information_pratiques",
  "InformationsPratiques.type_information_pratiques.Lien",
  "InformationsPratiques.type_information_pratiques.Icone",
  "guideSections",
  "guideSections.PDF",
  "guideSections.PDF.Lien",
  "guideSections.PDF.image"
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
