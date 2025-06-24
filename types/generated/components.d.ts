import type { Schema, Struct } from '@strapi/strapi';

export interface CardsActiviteLoisir extends Struct.ComponentSchema {
  collectionName: 'components_cards_activite_loisirs';
  info: {
    displayName: 'Activit\u00E9Loisir';
  };
  attributes: {};
}

export interface CardsAgenda extends Struct.ComponentSchema {
  collectionName: 'components_cards_agenda';
  info: {
    displayName: 'Agenda';
  };
  attributes: {};
}

export interface CardsArtisanat extends Struct.ComponentSchema {
  collectionName: 'components_cards_artisanats';
  info: {
    displayName: 'Artisanat';
  };
  attributes: {};
}

export interface CardsHebergement extends Struct.ComponentSchema {
  collectionName: 'components_cards_hebergements';
  info: {
    displayName: 'H\u00E9bergement';
  };
  attributes: {};
}

export interface CardsItineraire extends Struct.ComponentSchema {
  collectionName: 'components_cards_itineraires';
  info: {
    displayName: 'Itin\u00E9raire';
  };
  attributes: {};
}

export interface CardsPlage extends Struct.ComponentSchema {
  collectionName: 'components_cards_plages';
  info: {
    displayName: 'Plage';
  };
  attributes: {
    Nom: Schema.Attribute.String;
  };
}

export interface CardsSitePhare extends Struct.ComponentSchema {
  collectionName: 'components_cards_site_phares';
  info: {
    displayName: 'SitePhare';
  };
  attributes: {};
}

export interface CardsTypeActiviteLoisir extends Struct.ComponentSchema {
  collectionName: 'components_cards_type_activite_loisirs';
  info: {
    displayName: 'TypeActivit\u00E9Loisir';
  };
  attributes: {};
}

export interface CardsTypeArtisanat extends Struct.ComponentSchema {
  collectionName: 'components_cards_type_artisanats';
  info: {
    displayName: 'TypeArtisanat';
  };
  attributes: {};
}

export interface CardsTypeHebergement extends Struct.ComponentSchema {
  collectionName: 'components_cards_type_hebergements';
  info: {
    displayName: 'TypeH\u00E9bergement';
  };
  attributes: {};
}

export interface CardsTypeInformationPratique extends Struct.ComponentSchema {
  collectionName: 'components_cards_type_information_pratiques';
  info: {
    displayName: 'TypeInformationPratique';
  };
  attributes: {};
}

export interface GlobalBarreDeNavigation extends Struct.ComponentSchema {
  collectionName: 'components_global_barre_de_navigations';
  info: {
    displayName: 'BarreDeNavigation';
  };
  attributes: {
    logo: Schema.Attribute.Component<'partager.lien-image', false>;
    page_de_sections: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-de-section.page-de-section'
    >;
  };
}

export interface PartagerLien extends Struct.ComponentSchema {
  collectionName: 'components_partager_liens';
  info: {
    displayName: 'Lien';
  };
  attributes: {};
}

export interface PartagerLienBouton extends Struct.ComponentSchema {
  collectionName: 'components_partager_lien_boutons';
  info: {
    displayName: 'LienBouton';
  };
  attributes: {
    Couleur: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    Label: Schema.Attribute.String;
    Lien: Schema.Attribute.String;
  };
}

export interface PartagerLienImage extends Struct.ComponentSchema {
  collectionName: 'components_partager_lien_images';
  info: {
    displayName: 'LienImage';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    lien: Schema.Attribute.Text;
  };
}

export interface SectionsActiviteLoisir extends Struct.ComponentSchema {
  collectionName: 'components_sections_activite_loisirs';
  info: {
    displayName: 'Activit\u00E9Loisir';
  };
  attributes: {};
}

export interface SectionsAgenda extends Struct.ComponentSchema {
  collectionName: 'components_sections_agenda';
  info: {
    displayName: 'Agenda';
  };
  attributes: {};
}

export interface SectionsArtisanat extends Struct.ComponentSchema {
  collectionName: 'components_sections_artisanats';
  info: {
    displayName: 'Artisanat';
  };
  attributes: {};
}

export interface SectionsCarteInteractive extends Struct.ComponentSchema {
  collectionName: 'components_sections_carte_interactives';
  info: {
    displayName: 'CarteInteractive';
  };
  attributes: {};
}

export interface SectionsDecouvrezLeTerritoire extends Struct.ComponentSchema {
  collectionName: 'components_sections_decouvrez_le_territoires';
  info: {
    displayName: 'D\u00E9couvrezLeTerritoire';
  };
  attributes: {};
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    Boutons: Schema.Attribute.Component<'partager.lien-bouton', true>;
    images: Schema.Attribute.Media<'images' | 'files', true>;
    texte: Schema.Attribute.RichText;
  };
}

export interface SectionsInformationsPratiques extends Struct.ComponentSchema {
  collectionName: 'components_sections_informations_pratiques';
  info: {
    displayName: 'InformationsPratiques';
  };
  attributes: {};
}

export interface SectionsLesIncontournables extends Struct.ComponentSchema {
  collectionName: 'components_sections_les_incontournables';
  info: {
    displayName: 'LesIncontournables';
  };
  attributes: {};
}

export interface SectionsLesPlages extends Struct.ComponentSchema {
  collectionName: 'components_sections_les_plages';
  info: {
    displayName: 'LesPlages';
  };
  attributes: {};
}

export interface SectionsSejourner extends Struct.ComponentSchema {
  collectionName: 'components_sections_sejourners';
  info: {
    displayName: 'S\u00E9journer';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cards.activite-loisir': CardsActiviteLoisir;
      'cards.agenda': CardsAgenda;
      'cards.artisanat': CardsArtisanat;
      'cards.hebergement': CardsHebergement;
      'cards.itineraire': CardsItineraire;
      'cards.plage': CardsPlage;
      'cards.site-phare': CardsSitePhare;
      'cards.type-activite-loisir': CardsTypeActiviteLoisir;
      'cards.type-artisanat': CardsTypeArtisanat;
      'cards.type-hebergement': CardsTypeHebergement;
      'cards.type-information-pratique': CardsTypeInformationPratique;
      'global.barre-de-navigation': GlobalBarreDeNavigation;
      'partager.lien': PartagerLien;
      'partager.lien-bouton': PartagerLienBouton;
      'partager.lien-image': PartagerLienImage;
      'sections.activite-loisir': SectionsActiviteLoisir;
      'sections.agenda': SectionsAgenda;
      'sections.artisanat': SectionsArtisanat;
      'sections.carte-interactive': SectionsCarteInteractive;
      'sections.decouvrez-le-territoire': SectionsDecouvrezLeTerritoire;
      'sections.hero': SectionsHero;
      'sections.informations-pratiques': SectionsInformationsPratiques;
      'sections.les-incontournables': SectionsLesIncontournables;
      'sections.les-plages': SectionsLesPlages;
      'sections.sejourner': SectionsSejourner;
    }
  }
}
