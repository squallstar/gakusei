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
      errors += part.count;
      parts.push({
        type: part.added ? 'added' : (part.removed ? 'removed' : null),
        value: part.value
      });
    });

    accuracy = Math.round((answer.length - errors) * 100 / answer.length);

    return Answer.insert({
      correct: accuracy === 100,
      accuracy: accuracy,
      errors: parts,
      question: question,
      answer: userAnswer,
      created_at: Date.now()
    });
  }
});