Template.selectStories.helpers({
  stories: function () {
    return Story.find();
  },
  selectedText: function () {
    return 'All stories selected';
  },
  isSelected: function (id) {
    let selected = Template.instance().selected;
    return !selected.length || selected.indexOf(id) !== -1;
  },
  listIsOpen: function () {
    Template.instance().listIsOpen.get();
  }
});

Template.selectStories.onCreated(function () {
  this.selected = [];
  this.listIsOpen = new ReactiveVar(false);

  Meteor.subscribe('stories');
});

Template.selectStories.events({
  'click [data-toggle]': function (event, template) {
    event.preventDefault();
    template.listIsOpen.set(!template.listIsOpen.get());
  }
});