import $ from 'jquery';
import SC from 'soundcloud';

$(document).ready(() => {

  const client_id = '4a39a5fc90a81d598101eeaf122056bc';

  SC.initialize({
    client_id : client_id
  });

  SC.get('/users/1987006/tracks').then((tracks) => {
    console.log('tracks: ', tracks);

    const getTrackTemplate = tracks.map((track)=> {
      const trackUrl = track.stream_url + '?client_id=' + client_id;
      const imgUrl = track.artwork_url === null ? '/img/noImage.png' : track.artwork_url;
      const imgTag = `<a class="track-icon"><img src="${imgUrl}" /><i class="fa fa-play"></i></a>`;
      return `<div class="track">${imgTag}<div class="track-info"><h3 class="artist">zeesarOne</h3><span class="track-title">${track.title}</span></div><audio src="${trackUrl}" class="zeesarOneTrack"></audio></div>`;
    });

    console.log("getTrackTemplate: ", getTrackTemplate);

    $('.tracks-wrapper').append(getTrackTemplate);
  });


});

