import type { Core } from '@strapi/strapi';
import { seed } from '../database/seed';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Optionally seed database on startup (set SEED_ON_STARTUP=true in .env)
    if (process.env.SEED_ON_STARTUP === 'true') {
      await seed(strapi);
    }
  },
};
