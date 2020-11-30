$(document).ready(function () {

    /* // If user is logged in already, redirect to app
    if (localStorage.getItem('login')!=null)
        window.location.replace('user.html'); */

    // Load users database
    $.getJSON("http://itskikat.github.io/ies_itskikat/DB/users.json", function(json) {
        console.log(json)
        localStorage.setItem('users', JSON.stringify(json));
    });

    // Login
    $("#loginButton").click(function(){
        $("#loginError").removeClass("d-none");
        $("#loginError").hide();
        // Get data from "db"
        users = JSON.parse(localStorage.getItem('users'));
        console.log(users)
        if (users==null) {
            $("#loginError").text("There was an error connecting to the server, please try again!");
            $("#loginError").fadeIn();
            return;
        }
        // Validate user data
        if ($("#loginEmail").val().trim()=="" || $("#loginPassword").val().trim()=="") {
            $("#loginError").text("Please enter your data to sign in.");
            $("#loginError").fadeIn();
            return;
        }
        // Check user is registered
        registered = false;
        users.forEach((value, index) => {
            if (value['email'] == $("#loginEmail").val().trim()) {
                if (value['password'] == $("#loginPassword").val().trim()) {
                    registered = true;
                    localStorage.setItem('login', JSON.stringify(value));
                    return;
                }
            }
        });

        if (registered) {
            window.location.replace("user.html");
        } else {
            $("#loginError").text("The credentials inserted are invalid!");
            $("#loginError").fadeIn();
        }
    });

});