Template.questionWord.helpers({
  word: function () {
    return this.kanji || this.kana;
  }
});