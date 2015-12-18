Meteor.methods({
  answersCount: function() {
    return Answer.find().count();
  }
});