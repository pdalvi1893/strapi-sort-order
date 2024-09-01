"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "sort-order",
    plugin: "sort-order",
    type: "integer",
  });
};
