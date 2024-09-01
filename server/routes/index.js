module.exports = [
  {
    method: 'GET',
    path: '/fetch/:uid/:field',
    handler: 'sortOrderController.fetch',
    config: {
      policies: [],
    },
  },
];
