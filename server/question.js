const REGEXP_STORY_SLUG = /\-([0-9]+)$/;
const REGEXP_OBJ_PLACEHOLDER = /{{[a-z\-]+}}/g;

Meteor.methods({
  getQuestion: function (previousQuestion) {
    let words = Word.find().fetch(),
        question = {},
        phrase,
        placeholders,
        story = previousQuestion && previousQuestion.story;

    // If given a story, we try to find the next one in the series
    if (story) {
      check(String, story);

      let number = story.match(REGEXP_STORY_SLUG);
      if (number.length === 2) {
        number = story.replace(REGEXP_STORY_SLUG, '-' + parseInt(number[1]));
        phrase = Phrase.findOne({ story: number });
      }
    }

    // Extract a random phrase
    if (!phrase) {
      phrase = _.sample(Phrase.find().fetch());
    }

    // Populate the story
    if (phrase.story) {
      phrase.story = Story.findOne({ slug: phrase.story.replace(REGEXP_STORY_SLUG, '') });
    }

    // Find placeholders
    placeholders = phrase.kana.match(REGEXP_OBJ_PLACEHOLDER)

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

    question.type = _.sample(['kana-to-english', 'english-to-kana', 'kana-to-romaji']);

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
      case 'kana-to-romaji':
        question.title = 'Translate the following Japanese text to Romaji.';
        question.description = phrase.kana;
        question.answer = phrase.romaji;
        break;
    }

    question.description = capitalizeFirstLetter(question.description);

    return question;
  }
});