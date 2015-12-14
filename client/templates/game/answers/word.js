Template.word.helpers({
  title: function () {
    return this.kanji || this.kana;
  },
  subtitle: function () {
    return this.kanji ? this.kana : null;
  },
  description: function () {
    return this.english;
  }
});