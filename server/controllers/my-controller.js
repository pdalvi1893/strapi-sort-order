'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('sort-order')
      .service('myService')
      .getWelcomeMessage();
  },
});
