Template.question.helpers({
  showingFurigana: function () {
    return Session.get(SHOW_FURIGANA);
  },
  showFurigana: function () {
    return this.type !== 'kanji-to-kana';
  }
});

Template.question.events({
  'change #furigana': function (event) {
    Session.set(SHOW_FURIGANA, $(event.target).is(':checked'));
  }
});