$(document).ready(function() {
    $.ajax({
        url: "http://192.168.160.217:8080/api/users"
    }).then(function(data) {

        $('.patient-name').append(data[0].fullname);

    });
});