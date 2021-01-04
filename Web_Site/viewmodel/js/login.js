$(document).ready(function () {

    /* // If user is logged in already, redirect to app
    if (localStorage.getItem('login')!=null)
        window.location.replace('user.html'); */

    // Load users database
    $.getJSON("https://itskikat.github.io/ies_itskikat/DB/users.json", function(json) {
        //console.log(json)
        localStorage.setItem('users', JSON.stringify(json));
    });

    // Login
    $("#loginButton").click(function(){
        getPatients(function(patients){       
            console.log(patients)
            

            $("#loginError").removeClass("d-none");
                $("#loginError").hide();
            // Get data from "db"
            //users = JSON.parse(localStorage.getItem('users'));    //local
            //console.log(users)
            if (patients==null) {
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
            user = "";
            patients.forEach((value, index) => {
                if (value['email'] == $("#loginEmail").val().trim()) {
                    if (value['password'] == $("#loginPassword").val().trim()) {
                        registered = true;
                        user="patient";
                        localStorage.setItem('login', JSON.stringify(value));
                        return;
                    }
                }
            });
            getProfessionals(function(professionals){       
                console.log(professionals)
                registered = false;
                user = "";
                professionals.forEach((value, index) => {
                    if (value['email'] == $("#loginEmail").val().trim()) {
                        if (value['password'] == $("#loginPassword").val().trim()) {
                            registered = true;
                            user="professional";
                            localStorage.setItem('login', JSON.stringify(value));
                            return;
                        }
                    }
                });
                submit(user,registered)
                
            })
            submit(user,registered)
        });
    });

});
// Get Patients from API
function getPatients(handleData){
    $.ajax({
        url: "http://localhost:8080/api/patients"
    }).then(function(data) {
        handleData(data);
    });
};

// Get Professionals from API
function getProfessionals(handleData){
    $.ajax({
        url: "http://localhost:8080/api/professionals"
    }).then(function(data) {
        handleData(data);
    });
};

function submit(user,registered){
    if (registered) {
        console.log(user)
        if (user == "patient"){
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