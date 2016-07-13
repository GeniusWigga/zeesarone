import $ from 'jquery';
import SC from 'soundcloud';
import SoundCloudAudio from 'soundcloud-audio';

$(document).ready(function () {
  const client_id = '4a39a5fc90a81d598101eeaf122056bc';

  SC.initialize({
    client_id : client_id
  });

  // TODO find a better way to stream soundcloud tracks
  var scPlayer = new SoundCloudAudio(client_id);

  SC.get('/users/1987006/tracks').then((tracks) => {
    console.log("tracks: ", tracks);
    const getTrackTemplate = tracks.map((track)=> {
      const imgUrl = track.artwork_url === null ? '/img/noImage.png' : track.artwork_url;
      const imgTag = `<a class="track-icon" data-url="${track.id}"><img src="${imgUrl}" /><i class="fa"></i></a>`;
      return `<div class="track">${imgTag}<div class="track-info"><h3 class="artist">zeesarOne</h3><span class="track-title">${track.title}</span></div></div>`;
    });

    $('.tracks-wrapper').append(getTrackTemplate);

    const $trackIcon = $('.track-icon');
    $trackIcon.on('click', function () {
      const url = $(this).data('url');
      if (!$(this).hasClass('playing')) {
        $trackIcon.each(function () {
          if ($trackIcon.hasClass('playing')) {
            $trackIcon.removeClass('playing');
          }
        });
        scPlayer.play({streamUrl : `https://api.soundcloud.com/tracks/${url}/stream`});
        $(this).addClass('playing');
      } else {
        scPlayer.stop();
        $(this).removeClass('playing');
      }
    });
  });
});

