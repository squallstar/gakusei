const API_KEY = Meteor.settings.public.voiceRssApiKey;

Tts = {
  speak: function (text) {
    var audio;

    if (!API_KEY || !Audio) {
      return;
    }

    try {
      audio = new Audio();

      audio.src = [
        'http://api.voicerss.org/',
        '?key=' + API_KEY,
        '&src=' + encodeURIComponent(text),
        '&hl=ja-jp',
        '&r=-1',
        '&f=44khz_16bit_stereo'
      ].join('');

      audio.play();
    }
    catch (err) {
      console.error(err);
    }
  }
};