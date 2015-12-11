const REGEXP_STORY_SLUG = /\-([0-9]+)$/;
const REGEXP_OBJ_PLACEHOLDER = /{{[a-z\-]+}}/g;

Meteor.methods({
  getQuestion: function (previousQuestion) {
    let words = Word.find().fetch(),
        question = { words: [], contexts: [] },
        phrase,
        placeholders,
        story;

    // When there is a story, we have 80% chance to keep on with the story
    if (previousQuestion && previousQuestion.story) {
      // 80% chance or following up from studying a kanji
      if (_.sample([1,2,3,4]) > 1 || previousQuestion.story.slug === 'kanji') {
        story = previousQuestion.story;
      }
    }

    // If given a story, we try to find the next one in the series
    if (story) {
      check(story.slug, String);

      if (story.slug === 'kanji' && previousQuestion.words) {
        // Try to find a phrase where this kanji can be used
        let wordType = '{{' + previousQuestion.words[0].type + '}}';
        phrase = Phrase.findOne({ $text: { $search: wordType } });
        phrase.story = 'kanji-use';
        question.type = GAME.KANA;
      } else {
        // Extract a follow up phrase from the same story
        let number = story.slug.match(REGEXP_STORY_SLUG);
        if (number && number.length === 2) {
          number = story.slug.replace(REGEXP_STORY_SLUG, '-' + (parseInt(number[1])+1));
          phrase = Phrase.findOne({ story: number });
        }
      }
    }

    // Extract a random phrase or word
    if (!phrase) {
      // 20% chance to get a kanji to translate
      if (_.sample([1,2,3,4]) === 1) {
        // Find a random kanji
        phrase = _.sample(_.filter(words, (w) => { return w.kanji }));

        // Push it to words used on this sentence
        question.words.push(phrase);

        // Set up references
        phrase.story = 'kanji';
        question.type = GAME.KANJI;
      } else {
        phrase = _.sample(Phrase.find().fetch());
      }
    }

    // Populate the story
    if (phrase.story) {
      question.story = Story.findOne({ slug: phrase.story.replace(REGEXP_STORY_SLUG, '') });
      question.story.slug = phrase.story;
    }

    // Find placeholders
    placeholders = phrase.kana.match(REGEXP_OBJ_PLACEHOLDER);

    // Replace placeholders
    _.each(placeholders, function (placeholder) {
      let wordType = placeholder.replace(/{{|}}/g, ''),
          word;

      // Check whether it's a kanji follow up story
      if (previousQuestion && previousQuestion.story && previousQuestion.story.slug === 'kanji' && wordType === previousQuestion.words[0].type) {
        word = previousQuestion.words[0];
      } else {
        // Get a random word of this type
        word = _.sample(_.filter(words, (w) => { return w.type === wordType; }));
      }

      // Push this word to our collection
      question.words.push(word);

      if (word.context) {
        question.contexts.push(word.context);
      }

      _.each(['english', 'romaji', 'kana'], function (locale) {
        let replaceWith = word[locale];

        if (locale === 'kana' && word.kanji) {
          // Furigana
          replaceWith = '<ruby><rb>' + word.kanji + '</rb><rp>(</rp><rt>' + word.kana + '</rt><rp>)</rp></ruby>';
        }

        phrase[locale] = phrase[locale].replace(placeholder, replaceWith);
      });
    });

    // Fix wording that may be wrong when words are merged together
    phrase.english = phrase.english.replace(/the (this|that)/gi, 'the');

    // The type could already have been set above when studying kanji
    if (!question.type) {
      question.type = _.sample([GAME.ENGLISH, GAME.KANA]);
    }

    switch (question.type) {
      case GAME.ENGLISH:
        question.title = 'Translate the following text to English.';
        question.description = phrase.kana;
        question.answer = phrase.english;
        break;
      case GAME.KANA:
        question.title = 'Translate the following text to Japanese.';
        question.description = phrase.english;
        question.answer = phrase.kana;
        question.answer_alternative = phrase.romaji;
        break;
      case GAME.KANJI:
        switch (_.sample(['to-kanji', 'to-kana', 'to-english'])) {
          case 'to-kanji':
            question.title = 'Translate the following word to its <u>kanji</u>.';
            question.description = phrase.english;
            question.answer = phrase.kanji;
            question.answer_alternative = phrase.romaji;
            break;
          case 'to-kana':
            question.title = 'Type the reading of the following kanji in <u>hiragana</u>.';
            question.description = phrase.kanji;
            question.answer = phrase.kana;
            question.answer_alternative = phrase.romaji;
            break;
          case 'to-english':
            question.title = 'Type the <u>english translation</u> of this kanji.';
            question.description = phrase.kanji;
            question.answer = phrase.english;
            break;
        };
        break;
    }

    question.description = capitalizeFirstLetter(question.description);

    return question;
  }
});