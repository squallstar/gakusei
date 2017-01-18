Template.answer.helpers({
  isShowingWords: function () {
    return Template.instance().showWords.get();
  },
  hasWords: function () {
    return this.question.words && this.question.words.length;
  },
  className: function () {
    if (this.correct) {
      return 'correct';
    } else if (this.accuracy >= WARN_ACCURACY) {
      return 'partial';
    } else {
      return 'wrong';
    }
  },
  icon: function () {
    if (this.correct) {
      return 'check';
    } else if (this.accuracy >= WARN_ACCURACY) {
      return 'exclamation';
    } else {
      return 'times';
    }
  },
  timeSpent: function () {
    return Meteor.SecondsToTime(this.time_spent);
  },
  compiledDescription: function () {
    return (this.question.description || '').replace(/\[\]/g, '<span class="placeholder"><i class="fa fa-ellipsis-h"></i></span>');
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