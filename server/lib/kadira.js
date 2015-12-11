const KADIRA_APP_ID = Meteor.settings.kadiraAppId;
const KADIRA_APP_SECRET = Meteor.settings.kadiraAppSecret;

if (KADIRA_APP_ID && KADIRA_APP_SECRET) {
  Meteor.startup(function() {
    Kadira.connect(KADIRA_APP_ID, KADIRA_APP_SECRET);
  });
}