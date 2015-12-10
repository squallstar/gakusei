SHOW_FURIGANA = 'SHOW_FURIGANA';
ENTRIES_LIMIT = 'ENTRIES_LIMIT';
ENTRIES_PER_PAGE = 10;

/* -------------------------------------------*/

Meteor.startup(function () {
  Session.set(SHOW_FURIGANA, true);
  Session.set(ENTRIES_LIMIT, ENTRIES_PER_PAGE);
});