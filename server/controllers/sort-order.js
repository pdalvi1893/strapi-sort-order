'use strict';

module.exports = ({ strapi }) => ({
  async fetch(ctx) {
    ctx.body = await strapi
      .plugin('sort-order')
      .service('sortOrder')
      .fetch(ctx);
  },
});