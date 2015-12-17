
describe('Getting questions from the server', function () {
  let previousQuestion;

  describe('when requesting a new question', function () {

    it('should return a random generated question', function () {
      previousQuestion = Meteor.call('getQuestion', {});
      expect(previousQuestion.title).not.toBeNull();
      expect(previousQuestion.description).not.toBeNull();
      expect(previousQuestion.type).not.toBeNull();
      expect(previousQuestion.story).not.toBeNull();
    });

  });

  describe('when requesting a follow-up question', function () {

    it('should return a new question', function () {
      let question = Meteor.call('getQuestion', {
        previousQuestion: previousQuestion
      });

      expect(question.title).not.toBeNull();
      expect(question.description).not.toBeNull();
      expect(question.type).not.toBeNull();
      expect(question.story).not.toBeNull();
    });

  });
});