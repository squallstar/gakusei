// NPM libraries
const diff = Meteor.npmRequire('diff');

Meteor.methods({
  submitAnswer: function (question, userAnswer) {
    // Find out whether the user is submitting romaji
    if (question.answer_alternative && userAnswer.match(/([a-z]+)/)) {
      question.answer = question.answer_alternative;

      // Let's also replace long wovels
      // TODO: do it better and with all wovels
      question.answer = question.answer
        .replace('aa |aa\.', 'ā');
        .replace('ou |ou\.', 'ō');
    }

    // Cleanup the answer before diffing
    let cleanAnswer = cleanupAnswer(question.answer),
        cleanUserAnswer = cleanupAnswer(userAnswer),
        diffs = diff.diffChars(cleanAnswer, cleanUserAnswer),
        parts = [],
        errors = 0,
        corrects = 0,
        accuracy;

    // Parse differences
    diffs.forEach(function (part) {
      if (part.removed) {
        errors += part.count;
      } else if (!part.added) {
        corrects += part.count;
      }

      parts.push({
        type: part.added ? 'added' : (part.removed ? 'removed' : null),
        value: part.value
      });
    });

    accuracy = Math.round(100 * corrects / (corrects + errors));
    if (accuracy < 0) {
      accuracy = 0;
    }

    // Normalize data
    userAnswer = capitalizeFirstLetter(userAnswer);
    question.answer = capitalizeFirstLetter(question.answer);

    return Answer.insert({
      correct: accuracy > 80,
      accuracy: accuracy,
      parts: parts,
      question: question,
      answer: userAnswer,
      created_at: Date.now()
    });
  }
});

function cleanupAnswer (str) {
  return str.replace(/(<([^>]+)>)|[\.,。 ]/ig, '').toLowerCase();
}