Template.newQuestion.helpers({
  currentQuestion: function () {
    return Template.instance().question.get();
  },
  canSkip: function () {
    return Session.get(CAN_SKIP_QUESTION);
  },
  isTypeOrder: function () {
    return Template.instance().question.get().type === GAME.ORDER;
  },
  isTypeKanji: function () {
    return Template.instance().question.get().type === GAME.KANJI;
  },
  showAnswer: function () {
    return Template.instance().showAnswer.get();
  },
  words: function () {
    return _.shuffle(Template.instance().question.get().words);
  }
});

Template.newQuestion.onDestroyed(function () {
  clearInterval(this.timer);
});

Template.newQuestion.onCreated(function () {
  this.question = new ReactiveVar({});
  this.showAnswer = new ReactiveVar(false);

  this.timeSpent = 0;
  this.selectedWords = [];

  // Timer fires every second, increasing seconds
  // spent answering this question
  this.timer = setInterval(() => {
    this.timeSpent++;
  }, 1000);

  this.renderQuestion = (question) => {
    this.showAnswer.set(false);
    this.question.set(question);
    this.timeSpent = 0;

    let $input = this.$('#new_answer');

    // Clear the data
    $input.val('').prop('disabled', false);
    this.selectedWords = [];
    this.$('.words li.selected').removeClass('selected');

    // Scroll to the top of the viewport
    Meteor.ScrollToTop();

    // Focus input on desktop
    if (!Meteor.isMobile) {
      $input.focus();
    }

    if (typeof next === 'function') {
      next();
    }

    this.speak();
  };

  this.fetchNextQuestion = () => {
    Meteor.call('getQuestion', {
      previousQuestion: this.question.get(),
      selectedStories: Session.get(SELECTED_STORIES)
    }, (err, question) => {
      Session.setPersistent(CURRENT_QUESTION, question);
      this.renderQuestion(question);
    });
  };

  this.autorun(() => {
    // Tracked variables
    if (Session.get(SELECTED_STORIES_CHANGED)) {
      Tracker.nonreactive(() => {
        this.fetchNextQuestion();
      });
    }
  });

  this.submitAnswer = (answer) => {
    Meteor.call('submitAnswer', {
      question:  this.question.get(),
      userAnswer: answer,
      timeSpent: this.timeSpent
    }, (err, correct) => {
      // We allow the user to skip the next sentence if the previous one was correct
      // or he already had a credit to skip
      Session.setPersistent(CAN_SKIP_QUESTION, correct || Session.get(CAN_SKIP_QUESTION));

      // Proceed to the next qestion
      this.fetchNextQuestion();
    });
  };

  this.speak = () => {
    var question = this.question.get(),
        src;

    if ([GAME.ENGLISH].indexOf(question.type) === -1) {
      return;
    }

    Tts.speak(cleanupSentence(question.description));
  };
});

Template.newQuestion.onRendered(function () {
  let lastQuestion = Session.get(CURRENT_QUESTION);
  if (lastQuestion) {
    // Reload the last question
    this.renderQuestion(lastQuestion);
  } else {
    // Loads a new question when the user first come in
    this.fetchNextQuestion();
  }
});

Template.newQuestion.events({
  'click [data-skip]': function (event, template) {
    event.preventDefault();
    Session.setPersistent(CAN_SKIP_QUESTION, false);
    template.fetchNextQuestion();
  },
  'click [data-show-answer]': function (event, template) {
    event.preventDefault();
    template.showAnswer.set(true);
  },
  'submit form': function (event, template) {
    event.preventDefault();

    var $input = template.$('form input'),
        answer = $input.val().trim();

    // The user can't send empty answers
    if (!answer) {
      return;
    }

    // Hide keyboard on mobile so the user can see the result
    if (Meteor.isMobile) {
      $input.blur();
    }

    // Disable input while loading
    $input.prop('disabled', true);

    template.submitAnswer(answer);
  },
  'selected:word .words': function (event, template, word) {
    template.selectedWords.push(word);

    var $question = template.$('#question-description');

    $question
      .find('.placeholder')
      .not('.chosen')
      .first()
      .addClass('chosen')
      .html(word);

    if (template.selectedWords.length === template.question.get().words.length) {
      template.submitAnswer($question.text());
    }
  }
});
