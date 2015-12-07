const WARN_ACCURACY = 50;

Template.answer.helpers({
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