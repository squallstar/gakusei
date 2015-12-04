Template.newQuestion.helpers({
  currentQuestion: function () {
    return Template.instance().question.get();
  }
});

Template.newQuestion.onCreated(function () {
  this.question = new ReactiveVar({});

  this.nextQuestion = (next) => {
    Meteor.call('getQuestion', (err, question) => {
      this.question.set(question);

      if (typeof next === 'function') {
        next();
      }
    });
  };

  this.nextQuestion();
});

Template.newQuestion.events({
  'submit form': function (event, template) {
    event.preventDefault();

    var $input = template.$('form input'),
        answer = $input.val();

    template.nextQuestion(() => {
      $input.val('');
    });
  }
});