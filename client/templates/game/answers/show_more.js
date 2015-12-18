const UPDATE_INTERVAL_SECONDS = 30;

Template.showMore.helpers({
  isVisible: function () {
    return Template.instance().count.get() > Session.get(ENTRIES_LIMIT);
  },
  answersCount: function () {
    return Template.instance().count.get();
  },
  currentLimit: function () {
    return Session.get(ENTRIES_LIMIT);
  }
});

Template.showMore.onCreated(function () {
  let template = this;
  template.count = new ReactiveVar(0);

  // Set up interval and update count
  template.timer = setInterval(updateCount, UPDATE_INTERVAL_SECONDS * 1000);
  updateCount();

  function updateCount () {
    Meteor.call('answersCount', function (err, count) {
      template.count.set(count);
    });
  }
});

Template.showMore.onDestroyed(function () {
  clearInterval(this.timer);
});

Template.showMore.events({
  'click a': function (event) {
    event.preventDefault();
    Session.set(ENTRIES_LIMIT, Session.get(ENTRIES_LIMIT) + ENTRIES_PER_PAGE);
  }
});