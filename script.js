
$(document).ready(function() {

    

    $('#register').click(function(e) {
        e.preventDefault();

        var name = $('#name').val();
        var password = $('#password').val();

    $.ajax({

        type: "POST",
        url: "http://localhost:3000/users",
        data: {name : name,
               password: password},
       
        success : function(res) {
            $('#form')[0].reset();
            alert("Admitted!");

        }

    })

    })


    $('#login').click(function(e) {
        e.preventDefault();
        var name = $('#name').val();
        var password = $('#password').val();
    

    $.ajax({

        type: "GET",
        url: "http://localhost:3000/users",
        
              
        success : function(obj){
            
            console.log(obj);
            console.log(obj[0].name);
                console.log(obj[0].password);
                console.log(name,password);
            for(let i=0; i<obj.length; i++){
                
                if(obj[i].name == name && obj[i].password == password){
                    alert ("You're welcome");
                    window.location.replace('home.html');
                }else{
                    $('#form')[0].reset();
                    // alert("You've got to try again");
                    
                }
            }
        }

    })

    })


})