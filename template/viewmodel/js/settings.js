$(document).ready(function () {

    // Add content to HTML
    $("#userName").text(userLogin['email']);
    $("#userId").text(userLogin['username']);
    $("#userEmail").text(userLogin['name']);
    
    // Functionality not implemented yet
    $(".notImplemented").click(function () {
        alert("Sorry, but this functionality has not been implemented yet! :(");
    });

});