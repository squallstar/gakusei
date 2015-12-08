// DB Indexes
Meteor.startup(function () {

  Phrase._ensureIndex({ story: 1 });
  Phrase._ensureIndex({
    kana: 'text'
  }, {
    name: 'text_index'
  });

  Story._ensureIndex({ slug: 1 });

});