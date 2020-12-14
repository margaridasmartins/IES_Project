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


    $.ajax({
        url: "http://localhost:8080/api/users"
    }).then(function(data) {

        data.forEach(p=>{
            //console.log(p)

            var currentState=p['current_state'];
            console.log(currentState);
            var color;
            if(currentState=="good"){
                color="lightgreen";
            }
            if(currentState=="very good"){
                color="Chartreuse";
            }
            if(currentState=="bad"){
                color="#FFFF66";
            }
            if(currentState=="very bad"){
                color="red";
            }
                $("#patientSection").append(`<div class="row" style="margin-top: 3%;">
                                        <div class="col-md-12">
                                            <a href="#" id="currentPatient" value="${p['id']}">
                                                <div class="card " style="background-color: ${color};" >
                                                    <div class="card-body">
                                                        <div class="row ">
                                                            <div class="col-md-2 my-auto">
                                                                <img src="./images/old_man.jpeg" style="max-width:100px; max-height:100px;">
                                                            </div>
                                                            <div class="col-md-4 my-auto"> 
                                                                <b>Name: </b> 
                                                                <em>${p['fullname']} </em>
                                                            </div>
                                                            <div class="col-md-2 my-auto">
                                                                <b>Age: </b>
                                                                <em>${p['age']} </em>
                                                            </div>
                                                            <div class="col-md-4 my-auto">
                                                                <b>Last Check: </b>
                                                                <em>${new Date(p['last_check']).toLocaleDateString()} </em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>`);
            
        })
        
       
    });
    // FIlter patients
    /*var allPatientsArray = [];
    $.each(allUsers, function(index, value) {
        if (value['type'] == "Patient" && value['doctorID'] == userLogin['id']){
            console.log(value);
            allPatientsArray.push(value);
        } 
    });
    console.log(allPatientsArray);

    allPatientsArray.forEach(p => {
        console.log(p);
        var today = new Date().toLocaleDateString(); 
        if (new Date(p['last_check']).toLocaleDateString() < today ){
            $("#patientSection").append(`<div class="row" style="margin-top: 3%;">
                                    <div class="col-md-12">
                                        <a href="#" id="currentPatient" value="${p['id']}">
                                            <div class="card " style="background-color: lightgreen;" >
                                                <div class="card-body">
                                                    <div class="row ">
                                                        <div class="col-md-2 my-auto">
                                                            <img src="./images/old_man.jpeg" style="max-width:100px; max-height:100px;">
                                                        </div>
                                                        <div class="col-md-4 my-auto"> 
                                                            <b>Name: </b> 
                                                            <em>${p['full_name']} </em>
                                                        </div>
                                                        <div class="col-md-2 my-auto">
                                                            <b>Age: </b>
                                                            <em>${p['age']} </em>
                                                        </div>
                                                        <div class="col-md-4 my-auto">
                                                            <b>Last Check: </b>
                                                            <em>${new Date(p['last_check']).toLocaleDateString()} </em>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>`);
        }
    });*/
    
    
    $("#currentPatient").click(function() {
        var id = document.getElementById("currentPatient").getAttribute("value");
        for(var i in allPatientsArray){
            if (allPatientsArray[i]['id'] == id){
                localStorage.setItem('currentPatient', JSON.stringify(allPatientsArray[i]));
            }
        }
        console.log(localStorage.getItem('currentPatient'))
        document.getElementById("currentPatient").setAttribute('href', 'utente_info.html');
    });
    

});
