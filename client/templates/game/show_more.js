Template.showMore.helpers({
  currentLimit: function () {
    return Session.get(ENTRIES_LIMIT);
  }
});

Template.showMore.events({
  'click a': function (event) {
    event.preventDefault();
    Session.set(ENTRIES_LIMIT, Session.get(ENTRIES_LIMIT) + ENTRIES_PER_PAGE);
  }
});