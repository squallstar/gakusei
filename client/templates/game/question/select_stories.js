Template.selectStories.helpers({
  stories: function () {
    return Story.find({}, { sort: { title: 1 } });
  },
  selectedText: function () {
    return 'All topics selected';
  },
  isSelected: function (id) {
    let selected = Template.instance().selected;
    return !selected.length || selected.indexOf(id) !== -1;
  },
  isOpen: function () {
    return Template.instance().isOpen.get();
  }
});

Template.selectStories.onCreated(function () {
  this.selected = [];
  this.isOpen = new ReactiveVar(false);

  Meteor.subscribe('stories');
});

Template.selectStories.events({
  'click [data-toggle]': function (event, template) {
    event.preventDefault();
    template.isOpen.set(!template.isOpen.get());
  }
});