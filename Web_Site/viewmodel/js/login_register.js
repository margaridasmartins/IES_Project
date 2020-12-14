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
    
    var data={}
    
    var name = $("#registerName").val();
    var email = $("#registerEmail").val();
    var age = $("#registerAge").val();
    var genre = $("#registerGenre").val();
    var pass1 = $("#registePass").val();
    var pass2 = $("#registePass2").val();
    var assistant = $("#assis").val();
    
    data["fullname"]=name;
    data["username"]=email;
    data["email"]=email;
    data["age"]=age;
    data["password"]=pass1;
    //data["professional"]=assistant;
    
    console.log(JSON.stringify(data)    )
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
  });