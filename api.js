
$(document).ready(function () {

    var key = 'AIzaSyAIZ6Ll9I7sNTrnBmELmgPtxuMsiR_BA7A';
    var playlistId = 'PLJYyuMTDI-iepsUos_KlQkDvA5JU3pd4c';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  
  
    var options = {
        part: 'snippet',
        key: key,
        maxResults: 10,
        playlistId: playlistId
    }
 
    getData();

    function getData() {
        $.getJSON(URL, options, function (data) {
          console.log(data);
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }
  
    function mainVid(id) {
        $('#video').html(`
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        `);
    }
  
    
    function resultsLoop(data) {
  
        $.each(data.items, function (i) {
  
            var thumb = data.items[i].snippet.thumbnails.medium.url;
            var title = data.items[i].snippet.title;
            var desc = data.items[i].snippet.description.substring(0, 100);
            var vid = data.items[i].snippet.resourceId.videoId;
  
  
            $('main').append(`
              <article class="item" data-key="${vid}">
  
                <img src="${thumb}" alt="" class="thumb">
                <div class="details">
                  <h4>${title}</h4>
                  <p>${desc}</p>
                </div>
  
              </article>
            `);
        });
    }
  
    // CLICK EVENT
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });
  
  
  });