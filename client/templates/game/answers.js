Template.answers.helpers({
  answers: function () {
    return Answer.find({}, {
      sort: { created_at: -1 }
    });
  }
});

Template.answers.onCreated(function () {
  this.autorun(function () {
    Meteor.subscribe('answers', {
      limit: Session.get(ENTRIES_LIMIT) || ENTRIES_PER_PAGE
    });
  });
});

Template.answers.onRendered(function () {
  const ANIMATION_SPEED = 500; // ms

  this.find('.answers')._uihooks = {
    insertElement: (node, next) => {
      var $node = $(node);
      $node.hide().insertBefore(next).slideDown(ANIMATION_SPEED);
    }
  }
});