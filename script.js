
$(document).ready(function () {


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
   
})