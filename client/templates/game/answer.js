const WARN_ACCURACY = 50;

Template.answer.helpers({
  isShowingWords: function () {
    return Template.instance().showWords.get();
  },
  hasWords: function () {
    return !this.correct && this.question.words && this.question.words.length;
  },
  className: function () {
    if (this.correct) {
      return 'correct';
    } else if (this.accuracy > WARN_ACCURACY) {
      return 'partial';
    } else {
      return 'wrong';
    }
  },
  icon: function () {
    if (this.correct) {
      return 'check';
    } else if (this.accuracy > WARN_ACCURACY) {
      return 'exclamation';
    } else {
      return 'times';
    }
  }
});

Template.answer.onCreated(function () {
  this.showWords = new ReactiveVar(false);
});

Template.answer.events({
  'click a[data-toggle-words]': function (event, template) {
    event.preventDefault();
    template.showWords.set(!template.showWords.get());
  }
});