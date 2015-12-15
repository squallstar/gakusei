Template.question.helpers({
  showingFurigana: function () {
    return Session.get(SHOW_FURIGANA);
  },
  showFurigana: function () {
    return this.type === GAME.ENGLISH;
  },
  context: function () {
    return this.contexts ? this.contexts.join(', ') : null;
  },
  compiledDescription: function () {
    return (this.description || '').replace(/\[\]/g, '<span class="placeholder"><i class="fa fa-question"></i></span>');
  }
});

Template.question.events({
  'change #furigana': function (event) {
    Session.setPersistent(SHOW_FURIGANA, $(event.target).is(':checked'));
  }
});