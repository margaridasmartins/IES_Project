$(document).ready(function () {
    $("#changeUser").fadeOut();
    $("#changeEma").fadeOut();
    $("#changePass").fadeOut();
    userLogin = JSON.parse(localStorage.getItem('login'));
    console.log(userLogin)
    // Add content to HTML
    $("#userFullName").text(userLogin['fullname']);
    $("#userId").text(userLogin['username']);
    $("#userEmail").text(userLogin['email']);
    
    // Functionality not implemented yet
    $(".notImplemented").click(function () {
        alert("Sorry, but this functionality has not been implemented yet! :(");
    });


    $("#changeUsername").click(function(){
        $("#changeUser").fadeToggle("slow");
    })
    $("#changeEmail").click(function(){
        $("#changeEma").fadeToggle("slow");
    })
    $("#changePassword").click(function(){
        $("#changePass").fadeToggle("slow");
    })

    $("#saveSettings").click(function(){
        var username = $("#usernameSet").val();
        var email = $("#emailSet").val();
        var pass1 = $("#passSet").val();
        var pass2 = $("#passSet2").val();
        console.log(username)
        console.log(email)
        console.log(pass1)
        console.log(pass2)

        if(pass1 != pass2){
            $("#setError").text("The passwords don't match!");
            $("#setError").fadeIn();
            return;
        }
        if(username != ''){
            userLogin['username'] = username;
        }
        if(email != ''){
            userLogin['email'] = email;
        }
        if(pass1 != ''){
            userLogin['password'] = pass1;
        }

        editPatient(userLogin)
        localStorage.setItem('login', JSON.stringify(userLogin));
        window.location.reload();
    })

});

//PUT Patient
function editPatient(data){
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/api/patients/"+userLogin['id'],
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data, status, jqXHR) {

                 alert("Saved!");
                 console.log(data)
             },

             error: function (jqXHR, status) {
                 // error handler
                 console.log(jqXHR);
                 alert('fail' + status.code);
             }
      });
}