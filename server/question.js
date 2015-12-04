Meteor.methods({
  getQuestion: function () {
    let phrase = _.sample(Phrase.find().fetch()),
        words = Word.find().fetch(),
        placeholders = phrase.kana.match(/{{[a-z\-]+}}/g);

    // Replace placeholders
    _.each(placeholders, function (placeholder) {
      let wordType = placeholder.replace(/{{|}}/g, '');

      // Get a random word of this type
      let word = _.sample(_.filter(words, (w) => { return w.type === wordType; }));

      if (word) {
        phrase.kana = phrase.kana.replace(placeholder, _.sample(word.kana));
        phrase.romaji = phrase.romaji.replace(placeholder, _.sample(word.romaji));
      }
    });

    return phrase;
  }
});