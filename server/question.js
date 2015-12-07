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

      _.each(['english', 'romaji', 'kana'], function (locale) {
        let replaceWith = word[locale];

        if (locale === 'kana' && word.kanji) {
          // Furigana
          replaceWith = '<ruby><rb>' + word.kanji + '</rb><rp>(</rp><rt>' + word.kana + '</rt><rp>)</rp></ruby>';
        }

        phrase[locale] = phrase[locale].replace(placeholder, replaceWith);
      });
    });

    question.type = _.sample(['kana-to-english', 'english-to-kana', 'romaji-to-kana']);

    switch (question.type) {
      case 'kana-to-english':
        question.title = 'Translate the following text to English.';
        question.description = phrase.kana;
        question.answer = phrase.english;
        break;
      case 'english-to-kana':
        question.title = 'Translate the following text to Japanese.';
        question.description = phrase.english;
        question.answer = phrase.kana;
        break;
      case 'romaji-to-kana':
        question.title = 'Translate the following romaji to Japanese.';
        question.description = phrase.romaji;
        question.answer = phrase.kana;
        break;
    }

    question.description = capitalizeFirstLetter(question.description);

    return question;
  }
});