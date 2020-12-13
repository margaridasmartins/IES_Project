$(document).ready(function () {

    userLogin = JSON.parse(localStorage.getItem('login'));
    allUsers = JSON.parse(localStorage.getItem('users'));

    if (userLogin['type']== "Medic"){
        $('#cstatus').text("Dashboard");
        $('#cstatus').attr('href','medic_fp.html');
    }
    else{
        $('#cstatus').text("Clinical Status");
        $('#cstatus').attr('href','utente.html');
    }
    // FIlter patients
    var allPatientsArray = [];
    $.each(allUsers, function(index, value) {
        if (value['type'] == "Patient" && value['doctorID'] == userLogin['id']){
            console.log(value);
            allPatientsArray.push(value);
        } 
    });

    allPatientsArray.forEach(p => {
        console.log(p);
        $("#patientSection").append(`<div class="row" style="margin-top: 3%;">
                                    <div class="col-md-12">
                                    <a href="utente_info.html" >
                                        <div class="card " style="background-color: lightgreen;" >
                                            <div class="card-body">
                                                <div class="row ">
                                                <div class="col-md-2 my-auto">
                                                    <img src="./images/old_man.jpeg" style="max-width:100px; max-height:100px;">
                                                </div>
                                                <div class="col-md-4 my-auto"> 
                                                    <b>Name: </b> 
                                                    <em id="patientName">${p['full_name']} </em>
                                                </div>
                                                <div class="col-md-2 my-auto">
                                                    <b>Age: </b>
                                                    <em id="patientAge">${p['age']} </em>
                                                </div>
                                                <div class="col-md-4 my-auto">
                                                    <p><b>Last Check: </b> None</p>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    </div>
                                </div>`);
    });

    console.log(allPatientsArray);
    

    /* $.each(allPatientsArray, function(index, value) {
        $("#patientDiv").fadeIn();
        console.log(value[0]);
        $("#patientDiv").append("<li>" + value[index]['full_name'] + "</li>");
    }); */




    $("#userFullName").text(userLogin['full_name']);
    $("#userId").text(userLogin['username']);
    $("#userEmail").text(userLogin['email']);
    $("#userAge").text(userLogin['age']);
    if (userLogin['genre']== "M"){
        $("#userGenre").text("Male");
    }
    else{
        $("#userGenre").text("Female");
    }
    $("#userWeight").text(userLogin['weight']);
    $("#userHeight").text(userLogin['height']);

   
    // Functionality not implemented yet
    $(".notImplemented").click(function () {
        alert("Sorry, but this functionality has not been implemented yet! :(");
    });

});
