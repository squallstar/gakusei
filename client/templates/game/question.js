Template.question.helpers({
  showingFurigana: function () {
    return Session.get(SHOW_FURIGANA);
  },
  showFurigana: function () {
    return this.type === GAME.ENGLISH;
  }
});

Template.question.events({
  'change #furigana': function (event) {
    Session.set(SHOW_FURIGANA, $(event.target).is(':checked'));
  }
});