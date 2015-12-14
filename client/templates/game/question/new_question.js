Template.newQuestion.helpers({
  currentQuestion: function () {
    return Template.instance().question.get();
  },
  canSkip: function () {
    return Template.instance().canSkip.get();
  }
});

Template.newQuestion.onDestroyed(function () {
  clearInterval(this.timer);
});

Template.newQuestion.onCreated(function () {
  this.question = new ReactiveVar({});
  this.canSkip = new ReactiveVar(true);
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

      let $input = this.$('input');

      $input.val('').prop('disabled', false);

      // Focus input on desktop
      if (!Meteor.isMobile) {
        $input.focus();
      }

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
  'click [data-skip]': function (event, template) {
    event.preventDefault();
    template.canSkip.set(false);
    template.renderNextQuestion();
  },
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

    // Disable input while loading
    $input.prop('disabled', true);

    Meteor.call('submitAnswer', {
      question:  template.question.get(),
      userAnswer: answer,
      timeSpent: template.timeSpent
    }, function (err, correct) {
      // We allow the user to skip the next sentence if the previous one was correct
      // or he already had a credit to skip
      template.canSkip.set(correct || template.canSkip.get());
      // Proceed to the next qestion
      template.renderNextQuestion();
    });
  }
});
