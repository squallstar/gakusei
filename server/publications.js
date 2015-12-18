const MAX_ENTRIES_LIMIT = 500;

Meteor.publish('answers', function (options) {
  check(options.limit, Number);

  return Answer.find({}, {
    sort: { created_at: -1 },
    limit: options.limit > MAX_ENTRIES_LIMIT ? MAX_ENTRIES_LIMIT : options.limit
  });
});

Meteor.publish.static('stories', function() {
  return Story.find();
});