CURRENT_QUESTION = 'CURRENT_QUESTION';
SHOW_FURIGANA = 'SHOW_FURIGANA';
SELECTED_STORIES = 'SELECTED_STORIES';
ENTRIES_LIMIT = 'ENTRIES_LIMIT';
ENTRIES_PER_PAGE = 10;

/* -------------------------------------------*/

Session.setDefaultPersistent(CURRENT_QUESTION, undefined);
Session.setDefaultPersistent(SHOW_FURIGANA, true);
Session.setDefaultPersistent(SELECTED_STORIES, []);
Session.setDefault(ENTRIES_LIMIT, ENTRIES_PER_PAGE);