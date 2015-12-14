Meteor.publish.static = function (publicationName, fn) {
  Meteor.publish(publicationName, function () {
    var sub = this,
        cursor = fn(),
        collectionName = cursor._cursorDescription.collectionName;

    cursor.forEach(function (doc) {
      sub.added(collectionName, doc._id, doc);
    });

    return sub.ready();
  });
};