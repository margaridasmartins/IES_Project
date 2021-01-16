$(document).ready(function () {

    $("#latestInf").fadeOut();
    userLogin = JSON.parse(localStorage.getItem('login'));
    if (userLogin['type']== "Medic"){
        $('#cstatus').text("Dashboard");
        $('#cstatus').attr('href','medic_fp.html');
    }
    else{
        $('#cstatus').text("Clinical Status");
        $('#cstatus').attr('href','utente.html');
    }
    // Add content to HTML
    $("#userFullName").text(userLogin['fullname']);
    $("#userId").text(userLogin['username']);
    $("#userEmail").text(userLogin['email']);
    $("#userAge").text(userLogin['age']);
    if (userLogin['gender']== "Male"){
        $("#userGender").text("Male");
    }
    else{
        $("#userGender").text("Female");
    }
    $("#userWeight").text(userLogin['weight']);
    $("#userHeight").text(userLogin['height']);

    var condArray = userLogin['med_conditions'];
    $.each(condArray, function(index, value) {
        //console.log(value);
        $("#userConditionList").append("<li>" + value + "</li>");
    });

    var medicationArray = userLogin['medication'];
    $.each(medicationArray, function(index, value) {
        //console.log(value);
        $("#userMedicationList").append("<li>" + value + "</li>");
    });

    // Functionality not implemented yet
    $(".notImplemented").click(function () {
        alert("Sorry, but this functionality has not been implemented yet! :(");
    });

    $("#latestInfo").click(function(){
        $("#latestInf").fadeToggle("slow");
    })

});

// LATEST DATA
window.onload = function get_latestValues(){
    $.ajax({
        url: 'http://192.168.160.217:8080/api/patients/'+userLogin['id']+'/latest',
        }).done(function (results) {
            console.log(results)
            document.getElementById('latest_bp').innerHTML = '-> '+results[0].low_value;
            document.getElementById('latest_bt').innerHTML = '-> '+results[1].bodyTemp;
            document.getElementById('latest_hr').innerHTML = '-> '+results[2].heartRate;
            document.getElementById('latest_sl').innerHTML = '-> '+results[3].sugarLevel;
            document.getElementById('latest_ol').innerHTML = '-> '+results[4].oxygenLevel;
        })
}


// CHARTS

// Heart Rate
google.charts.load('current', {packages: ['line']});
google.charts.setOnLoadCallback(draw_HeartRateChart);
var userLogin = localStorage.getItem('login');
console.log(userLogin)
console.log("Certo!")
function draw_HeartRateChart() {
    $.ajax({
        url: 'http://192.168.160.217:8080/api/patients/'+userLogin['id']+'/heartrate',
        dataType: 'json',
     }).done(function (results) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Day');
        data.addColumn('number', 'Beats Per Minute');
        // Get users data
        results.data.forEach(elem =>{
            console.log(elem)

            var date = elem['date'].split("-");
            var value = elem['heartRate'];
            //console.log(date, value);
            data.addRows([
                [new Date(date[0], date[1]-1, date[2].split("T")[0]), value]
            ]);
        })
        
        var options = {
            title: 'Resting Heart Rate',
            height: 350,
            hAxis: { title: 'Time' },
            vAxis: { title: 'Heart Raten in BPM' },
            legend: { position: "none" },
            tooltip: {isHtml: true}
        };
        
        var chart = new google.visualization.LineChart(document.getElementById('heartrate_chart'));
        chart.draw(data, options);
     })
}

// Blood Pressure
google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(draw_BloodPressureChart);
function draw_BloodPressureChart() {
    $.ajax({
        url: 'http://192.168.160.217:8080/api/patients/'+userLogin['id']+'/bloodpressure',
        dataType: 'json',
     }).done(function (results) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Day');
        data.addColumn('number', 'Diastolic, mm Hg');

        // Get users data
        results.data.forEach(elem =>{
            var date = elem['date'].split("-");
            var high_value = elem['high_value'];
            var low_value = elem['low_value'];
            //console.log(date, value_diast, value_sys);
            data.addRows([
                [new Date(date[0], date[1]-1, date[2].split("T")[0]), low_value]
            ]);
        })

        var options = {
            chart: {
                title: 'Blood Pressure',
                subtitle: 'Diastolic'
            },
            height: 350,
            hAxis: { title: 'Day' },
            vAxis: { title: 'Blood Pressure, in mm Hg' },
            legend: { position: "top" }
        };
     
        var chart = new google.charts.Bar(document.getElementById('bloodpressure_chart'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    })
}

// Temperatue
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(draw_TemperatureChart);
function draw_TemperatureChart() {
    $.ajax({
        url: 'http://192.168.160.217:8080/api/patients/'+userLogin['id']+'/bodytemperature',
        dataType: 'json',
     }).done(function (results) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Day');
        data.addColumn('number', 'C*');

        // Get users data
        results.data.forEach(element =>{
            var date = element['date'].split("-");
            var value = element['bodyTemp'];
            //console.log(date, value);
            data.addRows([
                [new Date(date[0], date[1]-1, date[2].split("T")[0]), value]
            ]);
        })

        var options = {
            title: 'Body Temperature',
            height: 350,
            hAxis: { title: 'Day' },
            vAxis: { title: 'Temperature, in C*' },
            legend: { position: "none" },
            tooltip: {isHtml: true}
        };

        var chart = new google.visualization.LineChart(document.getElementById('bodytemperature_chart'));
        chart.draw(data, options);
    })
}

// Blood Sugar
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(draw_BloodSugarChart);
function draw_BloodSugarChart() {
    $.ajax({
        url: 'http://192.168.160.217:8080/api/patients/'+userLogin['id']+'/sugarlevel',
        dataType: 'json',
     }).done(function (results) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Day');
        data.addColumn('number', 'mg/dL');

        // Get users data
        results.data.forEach(element =>{
            var date = element['date'].split("-");
            var value = element['sugarLevel'];
            //console.log(date, value);
            data.addRows([
                [new Date(date[0], date[1]-1, date[2].split("T")[0]), value]
            ]);
        })

        var options = {
            title: "Blood Glucose Level",
            height: 350,
            hAxis: { title: 'Day' },
            vAxis: { title: 'Blood Glucose, in mg/dL' },
            legend: { position: "none" },
            tooltip: {isHtml: true}
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('bloodglucose_chart'));
        chart.draw(data, options);
     })
}

// Oxygen Saturation
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(draw_OxygenSaturationChart);
function draw_OxygenSaturationChart() {
    $.ajax({
        url: 'http://localhost:8080/api/patients/'+userLogin['id']+'/oxygenlevel',
        dataType: 'json',
     }).done(function (results) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Day');
        data.addColumn('number', '%');

        // Get users data
        results.data.forEach(element =>{
            var date = element['date'].split("-");
            var value = element['oxygenLevel'];
            //console.log(date, value);
            data.addRows([
                [new Date(date[0], date[1]-1, date[2].split("T")[0]), value]
            ]);
        })

        var options = {
            title: "Oxygen Saturation",
            height: 350,
            hAxis: { title: 'Day' },
            vAxis: { title: 'Oxygen Saturation, in %' },
            legend: { position: "none" },
            tooltip: {isHtml: true}
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('oxygensaturation_chart'));
        chart.draw(data, options);
     })
}