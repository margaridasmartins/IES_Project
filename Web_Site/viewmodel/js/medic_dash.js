$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/users"
    }).then(function(data) {
       console.log(data)


        for (i in data) {
            console.log(data[i])
        }

        $('.patient-name').append(data[0].fullname);

    });
});