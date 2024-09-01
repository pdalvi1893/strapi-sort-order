"use strict";

const axios = require("axios");

module.exports = ({ strapi }) => ({
  async fetch(ctx) {
    const { uid, field } = ctx.request.params;

    let result = await strapi.db.query(uid).findMany({
      limit: 10000,
      select: [field],
    });

    result = result.filter((item) => item[field]);

    return result.map((item) => item[field]);
  },
});
