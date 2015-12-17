describe('Collection: Words', function () {

  describe('When the system is up and running', function () {

    it('should have many words in the database', function () {
      expect(Word.find().count()).toBeGreaterThan(100);
    });

  });

});