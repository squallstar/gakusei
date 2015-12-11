Template.newQuestion.helpers({
  currentQuestion: function () {
    return Template.instance().question.get();
  }
});

Template.newQuestion.onDestroyed(function () {
  clearInterval(this.timer);
});

Template.newQuestion.onCreated(function () {
  this.question = new ReactiveVar({});
  this.timeSpent = 0;

  // Timer fires every second, increasing seconds
  // spent answering this question
  this.timer = setInterval(() => {
    this.timeSpent++;
  }, 1000);

  // Helper function to load the next question
  this.renderNextQuestion = (next) => {
    Meteor.call('getQuestion', this.question.get(), (err, question) => {
      this.question.set(question);
      this.timeSpent = 0;

      if (typeof next === 'function') {
        next();
      }
    });
  };

  // Loads the first question when the template loads
  this.renderNextQuestion();
});

Template.newQuestion.onRendered(function () {
  if (!Meteor.isMobile) {
    this.$('input').focus();
  }
});

Template.newQuestion.events({
  'submit form': function (event, template) {
    event.preventDefault();

    var $input = template.$('form input'),
        answer = $input.val().trim(),
        params;

    if (!answer) {
      return;
    }

    // Hide keyboard on mobile so the user can see the result
    if (Meteor.isMobile) {
      $input.blur();
    }

    // Disable input while loading
    $input.prop('disabled', true);

    params = {
      question:  template.question.get(),
      userAnswer: answer,
      timeSpent: template.timeSpent
    };

    Meteor.call('submitAnswer', params, function () {
      template.renderNextQuestion(() => {
        $input.val('').prop('disabled', false);

        // Focus input on desktop
        if (!Meteor.isMobile) {
          $input.focus();
        }
      });
    });
  }
});