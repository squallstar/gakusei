Meteor.startup(function () {

  let fixtures = [
    [Phrase, 'phrases'],
    [Word, 'words']
  ];

  _.each(fixtures, (fixture) => {
    let [ collection, fileName ] = fixture;

    // Cleanup collection
    collection.remove({});

    // Read fixtures
    let data = JSON.parse(Assets.getText('fixtures/' + fileName + '.json'));

    // Insert data
    _.each(data, (datum) => {
      collection.insert(datum);
    });
  });

});