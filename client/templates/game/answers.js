Template.answers.helpers({
  answers: function () {
    return Answer.find({}, {
      sort: { created_at: -1 }
    });
  }
});

Template.answers.onCreated(function () {
  Meteor.subscribe('answers');
});

Template.answers.onRendered(function () {
  const ANIMATION_SPEED = 750; // ms

  this.find('.answers')._uihooks = {
    insertElement: (node, next) => {
      var $node = $(node);
      $node.hide().insertBefore(next).slideDown(ANIMATION_SPEED);
    }
  }
});