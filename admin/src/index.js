import { prefixPluginTranslations } from "@strapi/helper-plugin";
//import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
//import PluginIcon from "./components/PluginIcon";
import SortSelectIcon from "./components/SortIcon";

import getTrad from "./utils/getTrad";

export default {
  register(app) {
    app.customFields.register({
      name: "sort-order",
      pluginId: "sort-order",
      type: "integer",
      intlLabel: {
        id: "sort-order.label",
        defaultMessage: "Sort Order",
      },
      intlDescription: {
        id: "sort-order.description",
        defaultMessage: "Set sort order for your collections",
      },
      icon: SortSelectIcon,
      components: {
        Input: async () => import("./components/SortSelect"), //import("./components/Input"),
      },
      options: {
        base: [
          {
            sectionTitle: null,
            items: [
              {
                name: "options-min",
                type: "number",
                intlLabel: {
                  id: getTrad("multi-select.enum.label"),
                  defaultMessage: "Min",
                },
                description: {
                  id: getTrad("multi-select.enum.description"),
                  defaultMessage: "Please enter a value here.",
                },
                placeholder: {
                  id: getTrad("multi-select.enum.placeholder"),
                  defaultMessage: "0",
                },
                required: true,
              },
              {
                name: "options-max",
                type: "number",
                value: 0,
                intlLabel: {
                  id: getTrad("multi-select.enum.label"),
                  defaultMessage: "Max",
                },
                description: {
                  id: getTrad("multi-select.enum.description"),
                  defaultMessage: "Please keep value higher than Min parameter",
                },
                placeholder: {
                  id: getTrad("multi-select.enum.placeholder"),
                  defaultMessage: "100",
                },
                required: true,
              },
              {
                name: "options-backend-check",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.requiredField",
                  defaultMessage: "Indicate Used Values",
                },
                description: {
                  id: "form.attribute.item.requiredField.description",
                  defaultMessage:
                    "Enables a backend check to indicate already used sort orders in the dropdown.",
                },
              },
            ],
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.requiredField",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "form.attribute.item.requiredField.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
