// NPM libraries
const diff = Meteor.npmRequire('diff');

Meteor.methods({
  submitAnswer: function (question, userAnswer) {
    // Cleanup the answer before diffing
    let cleanAnswer = cleanupAnswer(question.answer),
        cleanUserAnswer = cleanupAnswer(userAnswer),
        diffs = diff.diffChars(cleanAnswer, cleanUserAnswer),
        parts = [],
        errors = 0,
        accuracy;

    // Parse differences
    diffs.forEach(function (part) {
      if (part.removed) {
        errors += part.count;
      }

      parts.push({
        type: part.added ? 'added' : (part.removed ? 'removed' : null),
        value: part.value
      });
    });

    accuracy = Math.round((cleanupAnswer.length - errors) * 100 / cleanupAnswer.length);
    if (accuracy < 0) {
      accuracy = 0;
    }

    // Normalize data
    userAnswer = capitalizeFirstLetter(userAnswer);
    question.answer = capitalizeFirstLetter(question.answer);

    return Answer.insert({
      correct: accuracy > 90,
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