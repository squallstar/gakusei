Meteor.SecondsToTime = function (s) {
  if (isNaN(s)) {
    return '';
  }

  if (s < 60) {
    return s + 's';
  };

  return Math.round(s / 60) + 'm' + ( s % 60 > 0 ? ' ' + Math.round(s % 60) + 's': '' );
};