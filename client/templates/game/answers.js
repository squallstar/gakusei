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