
$(document).ready(function () {
    var key = 'AIzaSyAIZ6Ll9I7sNTrnBmELmgPtxuMsiR_BA7A';
    var playlistId = 'PLJYyuMTDI-iepsUos_KlQkDvA5JU3pd4c';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var items = {
        part: 'snippet',
        key: key,
        maxResults: 10,
        playlistId: playlistId
    }

    $('#register').click(function (e) {
        e.preventDefault();

        var name = $('#name').val();
        var password = $('#password').val();

        $.ajax({

            type: "POST",
            url: "http://localhost:3000/users",
            data: {
                name: name,
                password: password
            },

            success: function (res) {
                $('#form')[0].reset();
                alert("Admitted!");

            }

        })

    })



    $('#login').click(function (e) {
        e.preventDefault();

        var name = $('#name').val();
        var password = $('#password').val();

        $.ajax({

            type: "GET",
            url: "http://localhost:3000/users",
            data: {
                name: name,
                password: password
            },

            success: function (res) {
                console.log(res);
               for(let i=0;i<res.length;i++){
                   if(name==res[i].name && password==res[i].password){
                       alert("You're in!");
                       window.location.assign('home.html')
                   }else{alert("outside!");}
               }

            }

        })

    })
  
  
    
 
    getData();

    function getData() {
        $.getJSON(URL, items, function (data) {
          console.log(data);
            var id = data.items[0].snippet.resourceId.videoId;
            display(id);
            gallerySection(data);
        });
    }
 
    function display(id) {
        $('#video').html(`
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        `);
    }
  
    
    function gallerySection(data) {
  
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
  
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        display(id);
    });
   
})