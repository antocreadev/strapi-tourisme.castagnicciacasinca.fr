/**
 * Règles de cohérence des dates d'un événement.
 *
 * - "Date" (début) est facultative : un événement sans date est affiché
 *   « Date à venir » sur le site.
 * - "DateFin" est facultative : à renseigner pour un événement sur plusieurs
 *   jours (foire, festival…). Elle doit être postérieure ou égale à "Date".
 */
import { errors } from '@strapi/utils';

const { ApplicationError } = errors;

type EventData = { Date?: string | null; DateFin?: string | null };

const validate = (data: EventData, current?: EventData) => {
  if (!data) return;
  const start = data.Date !== undefined ? data.Date : current?.Date;
  const end = data.DateFin !== undefined ? data.DateFin : current?.DateFin;

  if (end && !start) {
    throw new ApplicationError(
      'Une « Date de fin » ne peut pas être renseignée sans « Date » de début.'
    );
  }
  if (start && end && String(end) < String(start)) {
    throw new ApplicationError(
      'La « Date de fin » doit être postérieure ou égale à la « Date » de début.'
    );
  }
};

export default {
  beforeCreate(event) {
    validate(event.params.data);
  },
  async beforeUpdate(event) {
    const { data, where } = event.params;
    // Mise à jour partielle : compléter avec les valeurs déjà enregistrées
    let current: EventData | undefined;
    if (data && (data.Date === undefined || data.DateFin === undefined) && where?.id) {
      current = await strapi.db
        .query('api::evenement.evenement')
        .findOne({ where: { id: where.id }, select: ['Date', 'DateFin'] });
    }
    validate(data, current);
  },
};
