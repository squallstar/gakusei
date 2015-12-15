function valueForWord (word) {
  return word.kanji || word.kana;
}

Template.questionWord.helpers({
  word: function () {
    return valueForWord(this);
  }
});

Template.questionWord.events({
  'click a': function (event, template) {
    event.preventDefault();

    let $li = template.$('li');

    if ($li.hasClass('selected')) {
      return;
    }

    $li
      .addClass('selected')
      .closest('.words')
      .trigger('selected:word', valueForWord(this));
  }
});