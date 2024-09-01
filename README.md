# 🚀 Introduction

This custom field is used to facilitate adding of sort orders to a strapi collection. Strapi has a very good mechanism of maintaining sort orders however there are times when you may feel the need to add custom sort order to smaller collections. This plugin will be handy in handing such scenarios.

### `Installing the Sort Order field`

Please run the below command to install the custom sort order field. 

```
npm i strapi-plugin-sort-order
```

### `1. Enabling the field`

Enable the field by navigating to Custom options. This is the place where all the custom fields are made available. The plugin options for the field are explained below.

![Logo](public/uploads/AdminApplication.png)

a. **Min** : This is the start range for the custom field. The sort orders dropdown values will start from this range.

b. **Max** : This is the maximum value for the sort values dropdown. The highest number available is decided by this value.

c. **Indicate Used Values** : This is an important option is the sense that if this is enabled it makes an api call internally to check which sort orders have already been assigned to entities and gives an indication with a blue dot for used sort orders. This is shown in subsequent screenshots below.


### `2. Used values indication ON`

This is how the dropdown will look like if some sort orders have been used already.

### `3. Used values indication OFF`

Shown when used values indication is turned off from settings. This is useful to avoid database queries being to show which values are used.
