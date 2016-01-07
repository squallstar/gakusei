const API_KEY = Meteor.settings.public.voiceRssApiKey;

function play (url) {
  if (!Audio) {
    return;
  }

  var audio = new Audio();
  audio.src = url;
  audio.play();
}

Sound = {
  sfx: function (name) {
    play('/assets/sfx/' + name + '.mp3');
  },
  speak: function (text) {
    if (!API_KEY) {
      return;
    }

    play([
      'http://api.voicerss.org/',
      '?key=' + API_KEY,
      '&src=' + encodeURIComponent(text),
      '&hl=ja-jp',
      '&r=-1',
      '&f=44khz_16bit_stereo'
    ].join(''));
  }
};