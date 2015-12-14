SHOW_FURIGANA = 'SHOW_FURIGANA';
SELECTED_STORIES = 'SELECTED_STORIES';
ENTRIES_LIMIT = 'ENTRIES_LIMIT';
ENTRIES_PER_PAGE = 10;

/* -------------------------------------------*/

Session.setDefaultPersistent(SHOW_FURIGANA, true);
Session.setDefaultPersistent(SELECTED_STORIES, []);
Session.setDefault(ENTRIES_LIMIT, ENTRIES_PER_PAGE);