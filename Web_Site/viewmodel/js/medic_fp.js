var jwt;
var id;
var userLogin;
var myPatientsArray = [];

$(document).ready(function () {

    cookie_array= document.cookie.split("&");
    var temp = cookie_array[0].trim();
    jwt = temp.substring("access_token=".length,temp.length);
    var temp = cookie_array[2].trim();
    id = temp.substring("id=".length,temp.length);

    userLogin = JSON.parse(localStorage.getItem('login'));
    allUsers = JSON.parse(localStorage.getItem('users'));

    console.log(jwt)

    $.ajax({
        url: "http://localhost:8080/api/professionals/" +  id + "/patients",
        //url: "http://192.168.160.217:8080/api/professionals/" +  id + "/patients",
        //headers:{"Access-Control-Allow-Origin":"http://192.168.160.217:8080"},
        headers:{
            "Access-Control-Allow-Origin":"http://localhost",
            "Authorization": "Bearer " + jwt
        },
        statusCode: {
            500: function(xhr){
                console.log("There was an error connecting to the server, please try again!");
                return;
            },
            403: function(xhr){
                console.log("Invalid Credentials!");
                return;
            }
        }

    }).then(function(data) {
    
        data.data.forEach(p=>{
            myPatientsArray.push(p);
            console.log(p)

            fillDash(p);
        })
        console.log(myPatientsArray);
        
       
    });
    
});

function sortAndFilterPositions(){
    var select_order = document.getElementById("select_order");
    var select_filter = document.getElementById("select_filter");
    var strOrder = select_order.value;
    var strFilter = select_filter.value;
    var input = document.getElementById("searchbox_patient");
    var filter = input.value.toUpperCase();

    if (strOrder == "status"){
        console.log("status");
        document.getElementById("patientSection").innerHTML = ""; 
        myPatientsArray.sort(function(a, b){
            var sort_array = ['healthy', 'normal', 'unhealthy', 'in-danger']
            return sort_array.indexOf(a['currentstate']) - sort_array.indexOf(b['currentstate'])
        });
    };

    if (strOrder == "default"){
        console.log("last");
        document.getElementById("patientSection").innerHTML = ""; 
        myPatientsArray.sort(function(a, b){
            console.log(new Date(a['lastCheck']).getTime() - new Date(b['lastCheck']).getTime())
            return new Date(a['lastCheck']).getTime() - new Date(b['lastCheck']).getTime()
        });
    };

    if (strFilter == "default"){
        console.log("default");

        myPatientsArray.forEach(p => {
            patientName = p['fullname'].toUpperCase();
            if(filter.length > 0){
                if(patientName.indexOf(filter) > -1){
                    $("#newPatientsDiv").fadeOut();
                    $("#allPatientsDiv").fadeOut();
                    fillDash(p);
                }
            }
            else{
                $("#newPatientsDiv").fadeOut();
                $("#allPatientsDiv").fadeOut();
                fillDash(p);
            } 
            });
        };

    if (strFilter == "diabetes"){
        console.log("diabetes"); 

        myPatientsArray.forEach(p => {
            p['med_conditions'].forEach(mc => {
                patientName = p['fullname'].toUpperCase();
                if(filter.length > 0){
                    if(patientName.indexOf(filter) > -1){
                        if(mc.toLowerCase() == "diabetes"){
                            $("#newPatientsDiv").fadeOut();
                            $("#allPatientsDiv").fadeOut();
                            fillDash(p);
                            }
                        }
                    }
                    else{
                        if(mc.toLowerCase() == "diabetes"){
                            $("#newPatientsDiv").fadeOut();
                            $("#allPatientsDiv").fadeOut();
                            fillDash(p);
                        }
                    }
                });
            });
        };

    if (strFilter == "obesity"){
        console.log("obesity");
        myPatientsArray.forEach(p => {
            p['med_conditions'].forEach(mc => {
                patientName = p['fullname'].toUpperCase();
                if(filter.length > 0){
                    if(patientName.indexOf(filter) > -1){
                        if(mc.toLowerCase() == "obesity"){
                            $("#newPatientsDiv").fadeOut();
                            $("#allPatientsDiv").fadeOut();
                            fillDash(p);
                            }
                        }
                    }
                    else{
                        if(mc.toLowerCase() == "obesity"){
                            $("#newPatientsDiv").fadeOut();
                            $("#allPatientsDiv").fadeOut();
                            fillDash(p);
                        }
                    }
                });
            });
        
    };

    if (strFilter == "asthma"){
        console.log("Asthma");
        myPatientsArray.forEach(p => {
            p['med_conditions'].forEach(mc => {
                patientName = p['fullname'].toUpperCase();
                if(filter.length > 0){
                    if(patientName.indexOf(filter) > -1){
                        if(mc.toLowerCase() == "asthma"){
                            $("#newPatientsDiv").fadeOut();
                            $("#allPatientsDiv").fadeOut();
                            fillDash(p);
                            }
                        }
                    }
                    else{
                        if(mc.toLowerCase() == "asthma"){
                            $("#newPatientsDiv").fadeOut();
                            $("#allPatientsDiv").fadeOut();
                            fillDash(p);
                        }
                    }
                });
            });

    };

}


// SEARCH FUNCTION
function search_patient(){
    console.log("search_patient");
    var input, filter, patientName;
    input = document.getElementById("searchbox_patient");
    filter = input.value.toUpperCase();
    document.getElementById("patientSection").innerHTML = ""; 

    myPatientsArray.forEach(p => {
        patientName = p['fullname'].toUpperCase();
        if(patientName.indexOf(filter) > -1){
            $("#newPatientsDiv").fadeOut();
            $("#allPatientsDiv").fadeOut();
            fillDash(p);
        }
    });
};

// SELECT PATIENT TO SHOW DETAILS
function selectPatient(id, profid){
    $.ajax({
        //url: "http://192.168.160.217:8080/api/patients",
        url: "http://localhost:8080/api/professionals/" + profid + "/patients",
        headers:{
            //"Access-Control-Allow-Origin":"http://192.168.160.217",
            "Access-Control-Allow-Origin":"http://localhost",
            "Authorization": "Bearer " + jwt
        },
        statusCode: {
            500: function(xhr){
                console.log("There was an error connecting to the server, please try again!");
                return;
            },
            403: function(xhr){
                console.log("Invalid Credentials!");
                return;
            }
        }
    }).then(function(data) {
        data.data.forEach(p=>{
            if(p.id == id){
                localStorage.setItem('currentPatient', p.id);
                updateLastCheck(profid, p.id);
                //console.log(localStorage.getItem('currentPatient'));
                //console.log("currentPatient"+id);
                document.getElementById("currentPatient"+id).setAttribute('href', 'utente_info.html');
                document.getElementById("currentPatient"+id).click();
                
                //window.location.replace("utente_info.html");
            }
            
        })
    })
};

// GET ALL PATIENTS ASSIGNED
function filter_doctorPatients(){
    var myPatients = [];
    $.ajax({
        //url: "http://192.168.160.217:8080/api/professionals/" +  userLogin["id"] + "/patients"
        url: "http://localhost:8080/api/professionals/" +  id + "/patients",
        headers:{
            //"Access-Control-Allow-Origin":"http://192.168.160.217",
            "Access-Control-Allow-Origin":"http://localhost",
            "Authorization": "Bearer " + jwt
        },
        statusCode: {
            500: function(xhr){
                console.log("There was an error connecting to the server, please try again!");
                return;
            },
            403: function(xhr){
                console.log("Invalid Credentials!");
                return;
            }
        }
    }).then(function(data) {
        data.data.forEach(p=>{
            myPatients.push(p);
            //console.log(myPatients);
        });
    });
    return myPatients;
}; 

// FILTER BASED ON MEDICAL CONDITIONS
function my_filter(myPatientsArray, condition){
    var myPatients = [];
    myPatientsArray.forEach(p => {
        // console.log(p);
        p['med_conditions'].forEach(mc => {
        //console.log(mc)
        if(mc.toLowerCase() == condition.toLowerCase()){
            myPatients.push(p);
        }
        //console.log("NEW ARRAY ", myPatients) 
        });
    });
    return myPatients;
}; 

function updateLastCheck(id, patientid) {
    $.ajax({
        type:"PUT",
        //url: "http://192.168.160.217:8080/api/professionals/" +  userLogin["id"] + "/patients"
        url: "http://localhost:8080/api/professionals/" +  id + "/patients/" + patientid,
        headers:{
            //"Access-Control-Allow-Origin":"http://192.168.160.217",
            "Access-Control-Allow-Origin":"http://localhost",
            "Authorization": "Bearer " + jwt
        },
        statusCode: {
            500: function(xhr){
                console.log("There was an error connecting to the server, please try again!");
                return;
            },
            403: function(xhr){
                console.log("Invalid Credentials!");
                return;
            }
        }
    }).then(function(data) {
        console.log(data);
    });
  };

  function fillDash(p){
    var danger=false
    var currentState=p['currentstate'];
    var color;
    if(currentState=="normal"){
        color="lightgreen";
    }
    if(currentState=="healthy"){
        color="Chartreuse";
    }
    if(currentState=="unhealthy"){
        color="#FFFF66";
    }
    if(currentState=="in-danger"){
        danger = true;
        color="red";
    }
    //Without danger icon
    if(danger == false){
        $("#patientSection").append(`<div class="row" style="margin-top: 3%;">
                                <div class="col-md-12">
                                    <a href="#" onClick="selectPatient(${p.id}, ${id});" id="currentPatient${p.id}" value="${p['id']}">
                                        <div class="card " style="background-color: ${color};" >
                                            <div class="card-body">
                                                <div class="row ">
                                                    <div class="col-md-2 my-auto">
                                                        <img src="./images/old_man.jpeg" style="max-width:100px; max-height:100px;">
                                                    </div>
                                                    <div class="col-md-3 my-auto"> 
                                                        <b>Name: </b> 
                                                        <em>${p['fullname']} </em>
                                                    </div>
                                                    <div class="col-md-2 my-auto">
                                                        <b>Age: </b>
                                                        <em>${p['age']} </em>
                                                    </div>
                                                    
                                                    <div class="col-md-3 my-auto" id="date">
                                                        <b>Last Check: </b>
                                                        <em>${new Date(p['lastCheck']).toLocaleDateString()} </em>
                                                    </div>
                                    
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>`);
    
    //With danger icon
    }else{
            $("#patientSection").append(`<div class="row" style="margin-top: 3%;">
                                <div class="col-md-12">
                                    <a href="#"  onClick="selectPatient(${p.id}, ${id});" id="currentPatient${p.id}" value="${p['id']}">
                                        <div class="card " style="background-color: ${color};" >
                                            <div class="card-body">
                                                <div class="row ">
                                                    <div class="col-md-2 my-auto">
                                                        <img src="./images/old_man.jpeg" style="max-width:100px; max-height:100px;">
                                                    </div>
                                                    <div class="col-md-3 my-auto"> 
                                                        <b>Name: </b> 
                                                        <em>${p['fullname']} </em>
                                                    </div>
                                                    <div class="col-md-2 my-auto">
                                                        <b>Age: </b>
                                                        <em>${p['age']} </em>
                                                    </div>
                                                    
                                                    <div class="col-md-3 my-auto" id="date">
                                                        <b>Last Check: </b>
                                                        <em>${new Date(p['lastCheck']).toLocaleDateString()} </em>
                                                    </div>
                                                    <div class="col-md-1 my-auto">
                                                        <img src="./images/danger.png" style="max-width:50px; max-height:50px;">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>`);
        }
    
  }