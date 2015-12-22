CURRENT_QUESTION = 'CURRENT_QUESTION';
CAN_SKIP_QUESTION = 'CAN_SKIP_QUESTION';
SHOW_FURIGANA = 'SHOW_FURIGANA';
SELECTED_STORIES = 'SELECTED_STORIES_V2';
ENTRIES_LIMIT = 'ENTRIES_LIMIT';
ENTRIES_PER_PAGE = 10;

/* -------------------------------------------*/

Session.setDefaultPersistent(CURRENT_QUESTION, undefined);
Session.setDefaultPersistent(CAN_SKIP_QUESTION, true);
Session.setDefaultPersistent(SHOW_FURIGANA, true);
Session.setDefaultPersistent(SELECTED_STORIES, []);
Session.setDefault(ENTRIES_LIMIT, ENTRIES_PER_PAGE);