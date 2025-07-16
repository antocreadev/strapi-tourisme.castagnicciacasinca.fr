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
  attributes: {
    Label: Schema.Attribute.String;
    Lien: Schema.Attribute.String;
    TextColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface PartagerLienBouton extends Struct.ComponentSchema {
  collectionName: 'components_partager_lien_boutons';
  info: {
    displayName: 'LienBouton';
  };
  attributes: {
    BorderColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    Couleur: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    Label: Schema.Attribute.String;
    Lien: Schema.Attribute.String;
    TexteColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
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
  attributes: {
    Titre: Schema.Attribute.String;
    type_artisanat_et_produits: Schema.Attribute.Relation<
      'oneToMany',
      'api::type-artisanat-et-produit.type-artisanat-et-produit'
    >;
  };
}

export interface SectionsAgenda extends Struct.ComponentSchema {
  collectionName: 'components_sections_agenda';
  info: {
    displayName: 'Agenda';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Titre: Schema.Attribute.String;
  };
}

export interface SectionsArtisanat extends Struct.ComponentSchema {
  collectionName: 'components_sections_artisanats';
  info: {
    displayName: 'Artisanat';
  };
  attributes: {
    bouton: Schema.Attribute.Component<'partager.lien-bouton', false>;
    Titre: Schema.Attribute.String;
    type_artisanat_et_produits: Schema.Attribute.Relation<
      'oneToMany',
      'api::type-artisanat-et-produit.type-artisanat-et-produit'
    >;
  };
}

export interface SectionsCarteInteractive extends Struct.ComponentSchema {
  collectionName: 'components_sections_carte_interactives';
  info: {
    displayName: 'CarteInteractive';
  };
  attributes: {
    Bouton: Schema.Attribute.Component<'partager.lien-bouton', false>;
    Description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files'>;
    Titre: Schema.Attribute.String;
  };
}

export interface SectionsDecouvrezLeTerritoire extends Struct.ComponentSchema {
  collectionName: 'components_sections_decouvrez_le_territoires';
  info: {
    displayName: 'D\u00E9couvrezLeTerritoire';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    DescriptionStat1: Schema.Attribute.Text;
    DescriptionStat2: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images' | 'files' | 'audios', true>;
    Stat1: Schema.Attribute.String;
    Stat2: Schema.Attribute.String;
    Titre: Schema.Attribute.String;
  };
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
  attributes: {
    Titre: Schema.Attribute.String;
    type_information_pratiques: Schema.Attribute.Relation<
      'oneToMany',
      'api::type-information-pratique.type-information-pratique'
    >;
  };
}

export interface SectionsLesIncontournables extends Struct.ComponentSchema {
  collectionName: 'components_sections_les_incontournables';
  info: {
    displayName: 'LesIncontournables';
  };
  attributes: {
    SousTitre1: Schema.Attribute.String;
    SousTitre2: Schema.Attribute.String;
    Titre: Schema.Attribute.String;
  };
}

export interface SectionsLesPlages extends Struct.ComponentSchema {
  collectionName: 'components_sections_les_plages';
  info: {
    displayName: 'LesPlages';
  };
  attributes: {
    bouton: Schema.Attribute.Component<'partager.lien-bouton', false>;
    Description: Schema.Attribute.RichText;
    Titre: Schema.Attribute.String;
  };
}

export interface SectionsSejourner extends Struct.ComponentSchema {
  collectionName: 'components_sections_sejourners';
  info: {
    displayName: 'S\u00E9journer';
  };
  attributes: {
    Bouton: Schema.Attribute.Component<'partager.lien-bouton', false>;
    Titre: Schema.Attribute.String;
    type_sejourners: Schema.Attribute.Relation<
      'oneToMany',
      'api::type-sejourner.type-sejourner'
    >;
  };
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
