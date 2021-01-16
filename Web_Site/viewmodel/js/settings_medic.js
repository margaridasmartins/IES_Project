$(document).ready(function () {
    $("#changeUserMed").fadeOut();
    $("#changeEmaMed").fadeOut();
    $("#changePassMed").fadeOut();
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


    $("#changeUsernameMed").click(function(){
        $("#changeUserMed").fadeToggle("slow");
    })
    $("#changeEmailMed").click(function(){
        $("#changeEmaMed").fadeToggle("slow");
    })
    $("#changePasswordMed").click(function(){
        $("#changePassMed").fadeToggle("slow");
    })

    $("#saveSettingsMed").click(function(){
        var username = $("#usernameSetMed").val();
        var email = $("#emailSetMed").val();
        var pass1 = $("#passSetMed").val();
        var pass2 = $("#passSetMed2").val();
        console.log(username)
        console.log(email)
        console.log(pass1)
        console.log(pass2)

        if(pass1 != pass2){
            $("#setErrorMed").text("The passwords don't match!");
            $("#setErrorMed").fadeIn();
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

        editPro(userLogin)
        localStorage.setItem('login', JSON.stringify(userLogin));
        window.location.reload();
    })

});

//PUT Patient
function editPro(data){
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/api/professionals/"+userLogin['id'],
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