Template.answer.helpers({
  className: function () {
    return this.correct ? 'correct' : 'wrong';
  },
  icon: function () {
    return this.correct ? 'check': 'times';
  },
  perfectScore: function () {
    return this.accuracy === 100;
  }
});