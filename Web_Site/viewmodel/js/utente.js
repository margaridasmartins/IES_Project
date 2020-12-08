$(document).ready(function () {

    userLogin = JSON.parse(localStorage.getItem('login'));

    if (userLogin['type']== "medic"){
        $('#cstatus').text("Dashboard");
        $('#cstatus').attr('href','medic_fp.html');
    }
    else{
        $('#cstatus').text("Clinical Status");
        $('#cstatus').attr('href','utente.html');
    }
    // Add content to HTML
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

    var condArray = userLogin['health_data']['conditions'];
    $.each(condArray, function(index, value) {
        //console.log(value);
        $("#userConditionList").append("<li>" + value + "</li>");
    });

    var medicationArray = userLogin['health_data']['medication'];
    $.each(medicationArray, function(index, value) {
        //console.log(value);
        $("#userMedicationList").append("<li>" + value + "</li>");
    });

    // Functionality not implemented yet
    $(".notImplemented").click(function () {
        alert("Sorry, but this functionality has not been implemented yet! :(");
    });

});

// Heart Rate
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(draw_HeartRateChart);
var userLogin = localStorage.getItem('login');
console.log(userLogin);
function draw_HeartRateChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'Beats Per Minute');
    // Get users data
    (userLogin['health_data']['heart_rate']).forEach(element => {
        var date = element['when'].split("T")[0].split("-");
        var value = element['value'];
        //console.log(date, value);
        data.addRows([
            [new Date(date[0], date[1]-1, date[2]), value]
        ]);
    });
   
    var options = {
        title: 'Resting Heart Rate',
        height: 450,
        hAxis: { title: 'Time' },
        vAxis: { title: 'Heart Rate' }
    };
   
    var chart = new google.visualization.LineChart(document.getElementById('heartrate_chart'));
    chart.draw(data, options);
}

// Blood Pressure
google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(draw_BloodPressureChart);
function draw_BloodPressureChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'Diastolic');
    data.addColumn('number', 'Systolic');

    // Get users data
    (userLogin['health_data']['blood_pressure']).forEach(element => {
        var date = element['when'].split("T")[0].split("-");
        var value_diast = element['value_diast'];
        var value_sys = element['value_sys'];
        console.log(date, value_diast, value_sys);
        data.addRows([
            [new Date(date[0], date[1]-1, date[2]), value_diast, value_sys]
        ]);
    });

    var options = {
        char: {
            title: 'Blood Pressure',
            subtitle: 'Diastolic, Systolic: 2020'
        },
        height: 350,
        hAxis: { title: 'Day' },
        vAxis: { title: 'Blood Pressure' }
    };
    var chart = new google.charts.Bar(document.getElementById('bloodpressure_chart'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

// Temperatue
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(draw_TemperatureChart);

function draw_TemperatureChart() {
    var data = google.visualization.arrayToDataTable([
        ['Time',  'Temp'],
        ['1',  35.7],
        ['2',  35.3],
        ['3',  35.2],
        ['4',  35.6],
        ['5',  36.1],
        ['6',  36.5]
    ]);

    var options = {
    vAxis: {title: 'Body Temperature'}, 
    isStacked: true
    };

    var chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
}

