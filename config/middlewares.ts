export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "script-src": [
            "'self'",
            "unsafe-inline",
          ],
          "media-src": [
            "'self'",
            "blob:",
            "data:",
          ],
          "img-src": [
            "'self'",
            "blob:",
            "data:",
            "market-assets.strapi.io",
            // Fond de carte IGN (Geoplateforme) du champ Coordonnees
            "https://data.geopf.fr",
            "https://unpkg.com/leaflet@1.9.4/dist/images/",
          ],
        },
      },
    },
  },
];
