FlowRouter.route('/', {
  action: function (params, queryParams) {
    FlowLayout.render('layout', { main: 'game' });
  },
  name: 'game'
});