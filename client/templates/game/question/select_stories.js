Template.selectStories.helpers({
  stories: function () {
    return Story.find({}, { sort: { title: 1 } });
  },
  selectedText: function () {
    let selected = Session.get(SELECTED_STORIES),
        stories;

    if (!selected.length) {
      return 'All topics selected';
    }

    stories = Story
      .find({ slug: { $in: selected } }, { sort: { title: 1 } })
      .fetch();

    if (!stories.length && !Story.find().count()) {
      return 'Loading topics...';
    }

    switch (stories.length) {
      case 1:
        return 'Topic: ' + _.first(stories).title;
      case 2:
        return _.map(stories, (s) => { return s.title; }).join(', ');
      default:
        return stories.length + ' topics selected';
    }
  },
  isSelected: function (slug) {
    let selected = Session.get(SELECTED_STORIES);
    return !selected.length || selected.indexOf(slug) > -1;
  },
  isOpen: function () {
    return Template.instance().isOpen.get();
  }
});

Template.selectStories.onCreated(function () {
  this.isOpen = new ReactiveVar(false);
  this.subscribe('stories');
});

Template.selectStories.events({
  'click [data-toggle]': function (event, template) {
    let isOpen = template.isOpen.get();
    event.preventDefault();

    template.isOpen.set(!isOpen);

    if (isOpen) {
      let slugs = [],
          stories = template.$('input'),
          checked = stories.filter(':checked');

      // If the user didn't select any story, we treat it
      // like he selected all stories
      if (stories.length !== checked.length) {
        checked.each(function() {
          slugs.push($(this).val());
        });
      }

      Session.setPersistent(SELECTED_STORIES, slugs);
    }
  }
});