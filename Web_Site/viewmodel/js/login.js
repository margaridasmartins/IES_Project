$(document).ready(function () {

    // If user is logged in already, redirect to app
    if (localStorage.getItem('login')!=null){
        if (localStorage.getItem('type') == 'patient'){
            window.location.replace('utente.html'); 
        } else {
            window.location.replace('medic_fp.html'); 
        }
    }



    /* LOCAL TESTING ONLY!
    // Load users database
    /* $.ajax({
        url: "http://192.168.160.217:8080/api/patients"
    }).then(function(patient) {
        localStorage.setItem('users', JSON.stringify(patient))
        }
    )

    $.ajax({
        url: "http://192.168.160.217:8080/api/professionals"
    }).then(function(professional) {
        localStorage.getItem('users').append(professional)
        }
    )


    $.getJSON("https://itskikat.github.io/ies_itskikat/DB/users.json", function(json) {
        //console.log(json)
        localStorage.setItem('users', JSON.stringify(json));
    });
    */

    // Login
    $("#loginButton").click(function(){
        // Validate user data
        if ($("#loginEmail").val().trim()=="" || $("#loginPassword").val().trim()=="") {
            $("#loginError").text("Please enter your data to sign in.");
            $("#loginError").fadeIn();
            return;
        }
        $.ajax({
            //http://192.168.160.217:8080
            url: "http://localhost:8080/api/login?username=" + $("#loginEmail").val().trim() + "&password=" + $("#loginPassword").val().trim(),
            headers:{"Access-Control-Allow-Origin":"http://localhost"},
            statusCode: {
                500: function(xhr){
                    $("#loginError").text("There was an error connecting to the server, please try again!");
                    $("#loginError").fadeIn();
                    return;
                },
                403: function(xhr){
                    $("#loginError").text("Invalid Credentials!");
                    $("#loginError").fadeIn();
                    return;
                }
            }
        }).then(function(user) {
            $("#loginError").removeClass("d-none");
            $("#loginError").hide();
            jwt_value = user['token'];
            role_value = user['role'];
            document.cookie='access_token='+jwt_value+';';
            document.cookie+='role='+role_value+';';
            if (user['role']="Patient"){
                window.location.replace("utente.html");
            }
            else{
                window.location.replace("medic_fp.html");
            }
        });
    });

});


function submit(user,registered){
    if (registered) {
        if (document.cookie.includes("Patient")){
            window.location.replace("utente.html");
        }
        else{
            window.location.replace("medic_fp.html");
        }
        
    } else {
        $("#loginError").text("The credentials inserted are invalid!");
        $("#loginError").fadeIn();
    }

}
