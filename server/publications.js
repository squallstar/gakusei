Meteor.publish('answers', function () {
  return Answer.find({}, {
    sort: { created_at: -1 },
    limit: 15
  });
});