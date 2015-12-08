Template.newQuestion.helpers({
  currentQuestion: function () {
    return Template.instance().question.get();
  }
});

Template.newQuestion.onCreated(function () {
  this.question = new ReactiveVar({});

  this.nextQuestion = (next) => {
    Meteor.call('getQuestion', this.question.get(), (err, question) => {
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
        answer = $input.val().trim();

    if (!answer) {
      return;
    }

    // Hide keyboard on mobile so the user can see the result
    if (Meteor.isMobile) {
      $input.blur();
    }

    Meteor.call('submitAnswer', template.question.get(), answer, function () {
      template.nextQuestion(() => {
        $input.val('');
      });
    });
  }
});