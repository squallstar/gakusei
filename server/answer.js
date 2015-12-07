const diff = Meteor.npmRequire('diff');

Meteor.methods({
  submitAnswer: function (question, userAnswer) {
    // Replace tags
    let answer = question.answer.replace(/<([a-z]+) ?\/?>/g, '');

    let diffs = diff.diffChars(answer, userAnswer),
        parts = [],
        errors = 0,
        accuracy;

    // Parse differences
    diffs.forEach(function (part) {
      if (part.added || part.removed) {
        errors += part.count;
      }

      parts.push({
        type: part.added ? 'added' : (part.removed ? 'removed' : null),
        value: part.value
      });
    });

    accuracy = Math.round((answer.length - errors) * 100 / answer.length);
    if (accuracy < 0) {
      accuracy = 0;
    }

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