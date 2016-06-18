import $ from 'jquery';
import SC from 'soundcloud';

$(document).ready(() => {

  const client_id = '4a39a5fc90a81d598101eeaf122056bc';

  SC.initialize({
    client_id: client_id
  });

  SC.get('/users/1987006/tracks').then((tracks) => {
    console.log('tracks: ', tracks);

    tracks.map((track)=> {
      const trackUrl = track.stream_url + '?client_id=' + client_id;
      const imgTag = track.artwork_url === null ? '' : `<img src="${track.artwork_url}" />`;
      const trackElement = `<div>${imgTag}<audio controls src="${trackUrl}" class="zeesarOneTrack"></audio></div>`;
      const $audioElement = $(trackElement);
      $('.trackWrapper').append($audioElement);
    })
  });
});

