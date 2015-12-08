ENTRIES_LIMIT = 'ENTRIES_LIMIT';
ENTRIES_PER_PAGE = 10;

Meteor.startup(function () {
  Session.set(ENTRIES_LIMIT, ENTRIES_PER_PAGE);
});