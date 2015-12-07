Meteor.methods({
  getQuestion: function () {
    let phrase = _.sample(Phrase.find().fetch()),
        words = Word.find().fetch(),
        placeholders = phrase.kana.match(/{{[a-z\-]+}}/g),
        question = {};

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

    let question.type = _.sample(['translate-from', 'translate-to', 'reply']);

    switch (question.type) {
      case 'translate-from':
        question.question = 1; //todo
        break;
      case 'translate-to':
        break;
      case 'reply':
        break;
    }

    return phrase;
  }
});