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
        url: "http://192.168.160.217:8080/api/professionals/" +  userLogin["id"] + "/patients"
    }).then(function(data) {

        data.data.forEach(p=>{
            //show the patients associated with the doctor       null -> userLogin['email']

            console.log(p)
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
                                            <a href="#" onClick="selectPatient(${p.id});" id="currentPatient${p.id}" value="${p['id']}">
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
                                                                <em>${new Date(p['lastcheck']).toLocaleDateString()} </em>
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
                                            <a href="#"  onClick="selectPatient(${p.id});" id="currentPatient${p.id}" value="${p['id']}">
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
                                                                <em>${new Date(p['lastcheck']).toLocaleDateString()} </em>
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
        })
        
       
    });
    
});

function sortPositions(){
    console.log("sortPositions");
    var select, strValue, myPatientsArray, currentState;
    select = document.getElementById("select_order");
    strValue = select.value;
    myPatientsArray = filter_doctorPatients();
    if (strValue == "status"){
        console.log("status");
        document.getElementById("patientOrder").innerHTML = ""; 
        myPatientsArray.sort(function(a, b){return a.currentState - b.currentState});
        //console.log("SORTED ", myPatientsArray);
        myPatientsArray.forEach(p => {
            $("#newPatientsDiv").fadeOut();
            $("#allPatientsDiv").fadeOut();
            $("#patientOrder").append(`<div class="row" style="margin-top: 3%;">
                                            <div class="col-md-12">
                                                <a class="currentP" href="#" value="${p['id']}">
                                                    <div class="card " style="background-color: lightgreen;" >
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
                                                                    <em>${new Date(p['lastcheck']).toLocaleDateString()} </em>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>`)
            });
        };
        if (strValue == "last"){
            console.log("last");
            document.getElementById("patientOrder").innerHTML = ""; 
            myPatientsArray.sort(function(a, b){return new Date(a.lastcheck).toLocaleDateString() - new Date(b.lastcheck).toLocaleDateString()});
            //console.log("SORTED ", myPatientsArray);
            myPatientsArray.forEach(p => {
                $("#newPatientsDiv").fadeOut();
                $("#allPatientsDiv").fadeOut();
                $("#patientOrder").append(`<div class="row" style="margin-top: 3%;">
                                                <div class="col-md-12">
                                                    <a class="currentP" href="#" value="${p['id']}">
                                                        <div class="card " style="background-color: lightgreen;" >
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
                                                                        <em>${new Date(p['lastcheck']).toLocaleDateString()} </em>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>`)
            });
        };
}


function filterPositions(){
    console.log("filterPositions");
    var select, strValue, myPatientsArray, currentState;
    select = document.getElementById("select_filter");
    strValue = select.value;
    myPatientsArray = filter_doctorPatients();
    if (strValue == "diabetes"){
        console.log("diabetes");
        document.getElementById("patientOrder").innerHTML = ""; 
        myPatientsArray.filter(patient => patient.med_conditions.includes("Diabetes"));
        // console.log("SORTED ", myPatientsArray);
        myPatientsArray.forEach(p => {
            $("#newPatientsDiv").fadeOut();
            $("#allPatientsDiv").fadeOut();
            $("#patientOrder").append(`<div class="row" style="margin-top: 3%;">
                                            <div class="col-md-12">
                                                <a class="currentP" href="#" value="${p['id']}">
                                                    <div class="card " style="background-color: lightgreen;" >
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
                                                                    <em>${new Date(p['lastcheck']).toLocaleDateString()} </em>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>`)
            });
        };
        if (strValue == "obesity"){
            console.log("obesity");
            document.getElementById("patientOrder").innerHTML = ""; 
            myPatientsArray.filter(patient => patient.med_conditions.includes("Obesity"));
            //console.log("SORTED ", myPatientsArray);
            myPatientsArray.forEach(p => {
                $("#newPatientsDiv").fadeOut();
                $("#allPatientsDiv").fadeOut();
                $("#patientOrder").append(`<div class="row" style="margin-top: 3%;">
                                                <div class="col-md-12">
                                                    <a class="currentP" href="#" value="${p['id']}">
                                                        <div class="card " style="background-color: lightgreen;" >
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
                                                                        <em>${new Date(p['lastcheck']).toLocaleDateString()} </em>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>`)
            });
        };
        if (strValue == "asthma"){
            console.log("Asthma");
            document.getElementById("patientOrder").innerHTML = ""; 
            myPatientsArray.filter(patient => patient.med_conditions.includes("Asthma"));
            //console.log("SORTED ", myPatientsArray);
            myPatientsArray.forEach(p => {
                $("#newPatientsDiv").fadeOut();
                $("#allPatientsDiv").fadeOut();
                $("#patientOrder").append(`<div class="row" style="margin-top: 3%;">
                                                <div class="col-md-12">
                                                    <a class="currentP" href="#" value="${p['id']}">
                                                        <div class="card " style="background-color: lightgreen;" >
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
                                                                        <em>${new Date(p['lastcheck']).toLocaleDateString()} </em>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>`)
            });
        };
}


function search_patient(){
    console.log("search_patient");
    var input, filter, patientName, myPatientsArray;
    input = document.getElementById("searchbox_patient");
    filter = input.value.toUpperCase();
    myPatientsArray = filter_doctorPatients();

    myPatientsArray.forEach(p => {
        patientName = p['fullname'].toUpperCase();
        if(patientName.indexOf(filter) > -1){
            $("#newPatientsDiv").fadeOut();
            $("#allPatientsDiv").fadeOut();
            $("#patientFilter").append(`<div class="row" style="margin-top: 3%;">
                                            <div class="col-md-12">
                                                <a class="currentP" href="#" value="${p['id']}">
                                                    <div class="card " style="background-color: lightgreen;" >
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
                                                                    <em>${new Date(p['lastcheck']).toLocaleDateString()} </em>
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
    });

    
};

function selectPatient(id){
    $.ajax({
        url: "http://192.168.160.217:8080/api/patients"
    }).then(function(data) {
        data.forEach(p=>{
            if(p.id == id){
                localStorage.setItem('currentPatient', JSON.stringify(p));
                //console.log(localStorage.getItem('currentPatient'));
                //console.log("currentPatient"+id);
                document.getElementById("currentPatient"+id).setAttribute('href', 'utente_info.html');
            }
            
        })
    })
};

function filter_doctorPatients(){
    $.ajax({
        url: "http://192.168.160.217:8080/api/professionals/" +  userLogin["id"] + "/patients"
    }).then(function(data) {
        var myPatients = [];
        data.data.forEach(p=>{
            if(p.doctorID == userLogin['id']){
                myPatients.push(p);
                //console.log(myPatients);
            }
            
        });
        return myPatients;
    });
}; 


// FOR LOCAL TESTING
/* function filter_doctorPatients(){
    //console.log(allUsers);
    var myPatients = [];
    allUsers.forEach(p => {
        if(p['doctorID'] == userLogin.id){
            myPatients.push(p);   
        }
    });
    //console.log("MY PATIENTS ", myPatients);
    return myPatients;
}; */