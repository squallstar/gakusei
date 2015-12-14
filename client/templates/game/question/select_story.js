Template.selectStory.helpers({
  checked: function () {
    let selected = Session.get(SELECTED_STORIES);
    return !selected.length || selected.indexOf(this._id) > -1;
  }
});