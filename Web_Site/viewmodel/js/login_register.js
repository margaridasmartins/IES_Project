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
    $("#registerError").removeClass("d-none");
    $("#registerError").hide();
    var data_post={}
    
    var name = $("#registerName").val();
    var email = $("#registerEmail").val();
    var age = $("#registerAge").val();
    var gender = $("#registerGender").val();
    var weight = $("#registerWeight").val();
    var height = $("#registerHeight").val();
    var pass1 = $("#registerPass").val();
    var pass2 = $("#registerPass2").val();
    var assistant = $("#assis").val();
    
    data_post["fullname"]=name;
    data_post["username"]=email;
    data_post["email"]=email;
    data_post["age"]=age;
    data_post["password"]=pass1;
    data_post["gender"]=gender;
    data_post["weight"]=parseFloat(weight);
    data_post["height"]=parseFloat(height);
    data_post["last_check"]= new Date();
    //data_post["professional"]=assistant;

    if(name == "" || email == "" || age == ""){
        $("#registerError").text("Fill all the fields!");
        $("#registerError").fadeIn();
        return;
    }

    if(pass1 != pass2){
        $("#registerError").text("The passwords don't match!");
        $("#registerError").fadeIn();
        return;
    }

    

    $.ajax({
        url: "http://localhost:8080/api/users"
    }).then(function(data) {
        var email_exists=false;
        for(u in data){
            if(data[u].email == email){
                email_exists = true;
            };
        };
        if(email_exists == true){
            $("#registerError").text("This email is already registered!");
            $("#registerError").fadeIn();
            return;
        }
        else{
            //"Everything" is legal
            //console.log(data_post)
            
            postData(data_post);
            window.location.replace("login.html");
        };
    });
    
  });

//Post Users
function postData(data){

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/users",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data, status, jqXHR) {

                 alert(status);
             },

             error: function (jqXHR, status) {
                 // error handler
                 console.log(jqXHR);
                 alert('fail' + status.code);
             }
      });
}