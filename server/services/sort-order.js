"use strict";

const axios = require("axios");

module.exports = ({ strapi }) => ({
  async fetch(ctx) {
    const { uid, field } = ctx.request.params;

    let result = await strapi.db.query(uid).findMany({
      limit: -1,
      select: [field],
      // uid syntax: 'api::api-name.content-type-name'
      // where: {
      //   title: {
      //     $startsWith: "2021",
      //     $endsWith: "v4",
      //   },
      // },
      // populate: {
      //   category: true,
      // },
    });
    let ttt = result.map((item) => item[field]);

    return result.map((item) => item[field]);

    try {
      return [
        {
          key: 1,
          value: 1,
          is_selected: true,
        },
        {
          key: 2,
          value: 2,
          is_selected: true,
        },
        {
          key: 3,
          value: 3,
          is_selected: false,
        },
        {
          key: 4,
          value: 4,
          is_selected: true,
        },
      ];

      return "Test 123";
    } catch (err) {
      console.log(err.response);
    }
  },
});
