// NPM libraries
const diff = Meteor.npmRequire('diff');

Meteor.methods({
  submitAnswer: function (options) {
    let { question, userAnswer, timeSpent } = options;

    if (!question) {
      return false;
    }

    // Find out whether the user is submitting romaji
    if (question.answer_alternative && userAnswer.match(/([a-z]+)/)) {
      question.answer = question.answer_alternative;
    }

    // Cleanup the answer before diffing
    let cleanAnswer = cleanupSentence(question.answer),
        cleanUserAnswer = cleanupSentence(userAnswer),
        diffs = diff.diffChars(cleanAnswer, cleanUserAnswer),
        parts = [],
        errors = 0,
        corrects = 0,
        accuracyForCorrect = question.type === GAME.KANJI ? 100 : 80,
        accuracy;

    // Parse differences
    diffs.forEach(function (part) {
      if (part.value !== '') {
        if (part.removed || part.added) {
          errors += part.count;
        } else {
          corrects += part.count;
        }
      }

      parts.push({
        type: part.added ? 'added' : (part.removed ? 'removed' : null),
        value: part.value
      });
    });

    accuracy = Math.round(100 * (corrects - (errors*0.1)) / (corrects + errors));
    if (accuracy < 0) {
      accuracy = 0;
    }

    // Normalize data
    userAnswer = capitalizeFirstLetter(userAnswer);
    question.answer = capitalizeFirstLetter(question.answer);

    let answerData = {
      correct: accuracy >= accuracyForCorrect,
      accuracy: accuracy,
      parts: parts,
      question: question,
      answer: userAnswer,
      time_spent: timeSpent,
      created_at: Date.now()
    };

    Answer.insert(answerData);

    return answerData.correct;
  }
});