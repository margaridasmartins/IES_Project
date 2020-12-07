$(document).ready(function () {

    userLogin = JSON.parse(localStorage.getItem('login'));

    if (userLogin['type']== "medic"){
        $('#cstatus').text("Dashboard");
        $('#cstatus').attr('href','medic_fp.html');
    }
    else{
        $('#cstatus').text("Clinical Status");
        $('#cstatus').attr('href','utente.html');
    }
    // Add content to HTML
    $("#userFullName").text(userLogin['full_name']);
    $("#userId").text(userLogin['username']);
    $("#userEmail").text(userLogin['email']);
    
    // Functionality not implemented yet
    $(".notImplemented").click(function () {
        alert("Sorry, but this functionality has not been implemented yet! :(");
    });

});