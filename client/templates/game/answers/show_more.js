Template.showMore.helpers({
  isVisible: function () {
    return Counts.get('answersCount') > Session.get(ENTRIES_LIMIT);
  },
  answersCount: function () {
    return Counts.get('answersCount');
  },
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