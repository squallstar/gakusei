Template.question.helpers({
  showingFurigana: function () {
    return Session.get(SHOW_FURIGANA);
  },
  showFurigana: function () {
    return this.type === 'kana-to-english';
  }
});

Template.question.events({
  'change #furigana': function (event) {
    Session.set(SHOW_FURIGANA, $(event.target).is(':checked'));
  }
});