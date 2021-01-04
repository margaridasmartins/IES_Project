function switchSignupAssistente() {

    document.getElementById("left-form").style.display = "block";
    document.getElementById("left-cover").style.display = "none";
    document.getElementById("right-form").style.display = "none";
    document.getElementById("right-cover").style.display = "block"; 
}

function switchSignupPaciente() {
    document.getElementById("right-form").style.display = "block";
    document.getElementById("right-cover").style.display = "none";
    document.getElementById("left-form").style.display = "none";
    document.getElementById("left-cover").style.display = "block";

}
//Patient Register
$("#registerPatient").click(function(){
    $("#registerErrorPat").removeClass("d-none");
    $("#registerErrorPat").hide();
    var data_post={}
    
    var name = $("#registerName").val();
    var email = $("#registerEmail").val();
    var age = $("#registerAge").val();
    var gender = $("#registerGender").val();
    var weight = $("#registerWeight").val();
    var height = $("#registerHeight").val();
    var pass1 = $("#registerPass").val();
    var pass2 = $("#registerPass2").val();
    var professional = $("#registerProf").val(); 

    if(name == "" || email == "" || age == ""){
        $("#registerErrorPat").text("Fill all the fields!");
        $("#registerErrorPat").fadeIn();
        return;
    }

    if(pass1 != pass2){
        $("#registerErrorPat").text("The passwords don't match!");
        $("#registerErrorPat").fadeIn();
        return;
    }

    data_post["fullname"]=name;
    data_post["username"]=email.split("@")[0];
    data_post["email"]=email;
    data_post["age"]=age;
    data_post["password"]=pass1;
    data_post["gender"]=gender;
    data_post["weight"]=parseFloat(weight);
    data_post["height"]=parseFloat(height);
    data_post["lastcheck"]= new Date();
    
    $.ajax({
        url: "http://localhost:8080/api/professionals"
    }).then(function(dataPro) {
        pro_exists=true;                                //Associar o paciente ao medico
        /*dataPro.forEach((value, index) => {
            if(value["email"]==professional){
                pro_exists=true;
                data_post["professional"]=value;
            }
        })*/
        if (pro_exists){
            $.ajax({
                url: "http://localhost:8080/api/patients"
            }).then(function(data) {
                var email_exists=false;
                for(u in data){
                    if(data[u].email == email){
                        email_exists = true;
                    };
                };
                if(email_exists){
                    $("#registerErrorPat").text("This email is already registered!");
                    $("#registerErrorPat").fadeIn();
                    return;
                }
                else{
                    //"Everything" is legal
                    //console.log(data_post)
                    
                    postPatient(data_post);
                    alert("Patient saved!");
                    window.location.replace("index.html");
                };
            });
        }
        else{
            $("#registerErrorPat").text("This Professional is not registered!");
            $("#registerErrorPat").fadeIn();
        }
    })
  });

$("#registerProfessional").click(function(){
    $("#registerErrorPro").removeClass("d-none");
    $("#registerErrorPro").hide();
    var data_post={}
    
    var name = $("#regName").val();
    var email = $("#regEmail").val();
    var age = $("#regAge").val();
    var gender = $("#regGender").val();
    var pass1 = $("#regPass").val();
    var pass2 = $("#regPass2").val();
    var workplace = $("#regWorkplace").val();
    var speciality = $("#regSpeciality").val();
    
    data_post["fullname"]=name;
    data_post["username"]=email.split("@")[0];
    data_post["email"]=email;
    data_post["age"]=age;
    data_post["password"]=pass1;
    data_post["gender"]=gender;
    data_post["workplace"]=workplace;
    data_post["speciality"]=speciality;

    if(name == "" || email == "" || age == "" || workplace == "" || speciality == "" || pass1 == ""){
        $("#registerErrorPro").text("Fill all the fields!");
        $("#registerErrorPro").fadeIn();
        return;
    }

    if(pass1 != pass2){
        $("#registerErrorPro").text("The passwords don't match!");
        $("#registerErrorPro").fadeIn();
        return;
    }

    

    $.ajax({
        url: "http://localhost:8080/api/professionals"
    }).then(function(data) {
        var email_exists=false;
        for(u in data){
            if(data[u].email == email){
                email_exists = true;
            };
        };
        if(email_exists){
            $("#registerErrorPro").text("This email is already registered!");
            $("#registerErrorPro").fadeIn();
            return;
        }
        else{
            //"Everything" is legal
            console.log(data_post)
            
            postProfessional(data_post);
            alert("Patient saved!");
            window.location.replace("index.html");
        };
    });
    
  });

//Post Patient
function postPatient(data){

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/patients",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data, status, jqXHR) {

                 alert(status);
                 console.log(data)
             },

             error: function (jqXHR, status) {
                 // error handler
                 console.log(jqXHR);
                 alert('fail' + status.code);
             }
      });
}

//Post Professional
function postProfessional(data){

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/professionals",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data, status) {

                 alert(status);
                 console.log(data)
             },

             error: function (jqXHR, status) {
                 // error handler
                 console.log(jqXHR);
                 alert('fail' + status.code);
             }
      });
}