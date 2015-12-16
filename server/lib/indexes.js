// DB Indexes
Meteor.startup(function () {

  Phrase._ensureIndex({ story: 1 });
  Phrase._ensureIndex({
    kana: 'text'
  }, {
    name: 'text_index'
  });

  Story._ensureIndex({ slug: 1 });

  Answer._ensureIndex({ created_at: -1 });

});