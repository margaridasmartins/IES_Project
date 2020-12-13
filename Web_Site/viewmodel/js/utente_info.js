$(document).ready(function () {

    currentPatient = JSON.parse(localStorage.getItem('currentPatient'));
    userLogin = JSON.parse(localStorage.getItem('login'));
    console.log(currentPatient);
    console.log(userLogin);

    if (userLogin['type']== "Medic"){
        $('#cstatus').text("Dashboard");
        $('#cstatus').attr('href','medic_fp.html');
    }
    else{
        $('#cstatus').text("Clinical Status");
        $('#cstatus').attr('href','utente.html');
    }
    // Add content to HTML
    $("#patientFullName").text(currentPatient['full_name']);
    $("#patientAge").text(currentPatient['age']);
    if (currentPatient['genre']== "M"){
        $("#patientGenre").text("Male");
    }
    else{
        $("#patientGenre").text("Female");
    }
    $("#patientWeight").text(currentPatient['weight']);
    $("#patientHeight").text(currentPatient['height']);
    var condArray = currentPatient['health_data']['conditions'];
    $.each(condArray, function(index, value) {
        //console.log(value);
        $("#patientConditionList").append("<li>" + value + "</li>");
    });
    var medicationArray = currentPatient['health_data']['medication'];
    $.each(medicationArray, function(index, value) {
        //console.log(value);
        $("#patientMedicationList").append("<li>" + value + "</li>");
    });


    // EDIT INFORMATION
    $("#editInformation").click(function(){
        $("#patientNewWeight").fadeIn();
        $("#patientNewHeight").fadeIn();
        $("#editInformation").attr('style', 'display: none;');
        $("#editInformationDone").fadeIn();
        // Get data from "db"
        console.log(currentPatient)
    }); 
    $("#editInformationDone").click(function(){
        // Get data from "db"
        console.log(currentPatient)
        // Validate user data
        if ($("#patientNewWeight").val().trim()=="" || $("#patientNewHeight").val().trim()=="") {
            $("#editInformationError").text("Please enter new data");
            $("#editInformationError").fadeIn();
            return;
        }
        currentPatient['weight'] = $("#patientNewWeight").val();
        currentPatient['height'] = $("#patientNewHeight").val();
        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));

        $("#patientNewWeight").fadeOut();
        $("#patientNewHeight").fadeOut();
        $("#editInformationDone").fadeOut();
        $("#editInformation").fadeIn();
        window.location.reload();
    }); 

    // ADD DISEASE
    $("#addDisease").click(function(){
        $("#patientNewDisease").fadeIn();
        $("#addDisease").attr('style', 'display: none;');
        $("#addDiseaseDone").fadeIn();
        // Get data from "db"
        console.log(currentPatient)
    }); 
    $("#addDiseaseDone").click(function(){
        // Get data from "db"
        console.log(currentPatient)
        // Validate user data
        if ($("#patientNewDisease").val().trim()=="") {
            $("#addDiseaseError").text("Please enter new data");
            $("#addDiseaseError").fadeIn();
            return;
        }
        currentPatient['health_data']['conditions'].push($("#patientNewDisease").val());
        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));

        $("#patientNewDisease").fadeOut();
        $("#addDiseaseDone").fadeOut();
        //$("#addDisease").fadeIn();
        window.location.reload();
    }); 
    // REMOVE DISEASE
    $("#removeDisease").click(function(){
        $("#patientRemovedDisease").fadeIn();
        $("#removeDisease").attr('style', 'display: none;');
        $("#removeDiseaseDone").fadeIn();
        // Get data from "db"
        console.log(currentPatient)
    }); 
    $("#removeDiseaseDone").click(function(){
        // Get data from "db"
        console.log(currentPatient)
        // Validate user data
        if ($("#patientRemovedDisease").val().trim()=="") {
            $("#removeDiseaseError").text("Please enter new data");
            $("#removeDiseaseError").fadeIn();
            return;
        }

        var old = $("#patientRemovedDisease").val();
        var index = currentPatient['health_data']['conditions'].indexOf(old);
        currentPatient['health_data']['conditions'].splice(index, 1);
        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));
        $("#patientRemovedDisease").fadeOut();
        $("#removeDiseaseDone").fadeOut();
        //$("#removeDisease").fadeIn();
        window.location.reload();
    }); 

    // ADD MEDICATION
    $("#addMedication").click(function(){
        $("#patientNewMedication").fadeIn();
        $("#addMedication").attr('style', 'display: none;');
        $("#addMedicationDone").fadeIn();
        // Get data from "db"
        console.log(currentPatient)
    }); 
    $("#addMedicationDone").click(function(){
        // Get data from "db"
        console.log(currentPatient)
        // Validate user data
        if ($("#patientNewMedication").val().trim()=="") {
            $("#addMedicationError").text("Please enter new data");
            $("#addMedicationError").fadeIn();
            return;
        }
        currentPatient['health_data']['medication'].push($("#patientNewMedication").val());
        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));

        $("#patientNewMedication").fadeOut();
        $("#addMedicationDone").fadeOut();
        //$("#addDisease").fadeIn();
        window.location.reload();
    });
    // REMOVE MEDICATION
    $("#removeMedication").click(function(){
        $("#patientRemovedMedication").fadeIn();
        $("#removeMedication").attr('style', 'display: none;');
        $("#removeMedicationDone").fadeIn();
        // Get data from "db"
        console.log(currentPatient)
    }); 
    $("#removeMedicationDone").click(function(){
        // Get data from "db"
        console.log(currentPatient)
        // Validate user data
        if ($("#patientRemovedMedication").val().trim()=="") {
            $("#removeMedicationError").text("Please enter new data");
            $("#removeMedicationError").fadeIn();
            return;
        }

        var old = $("#patientRemovedDisease").val();
        var index = currentPatient['health_data']['medication'].indexOf(old);
        currentPatient['health_data']['medication'].splice(index, 1);
        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));
        $("#patientRemovedMedication").fadeOut();
        $("#removeMedicationDone").fadeOut();
        //$("#removeDisease").fadeIn();
        window.location.reload();
    }); 


    // Functionality not implemented yet
    $(".notImplemented").click(function () {
        alert("Sorry, but this functionality has not been implemented yet! :(");
    });

});


// CHARTS

// Heart Rate
google.charts.load('current', {packages: ['line']});
google.charts.setOnLoadCallback(draw_HeartRateChart);
var currentPatient = localStorage.getItem('currentPatient');
//console.log(userLogin);
function draw_HeartRateChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'Beats Per Minute');
    // Get users data
    (currentPatient['health_data']['heart_rate']).forEach(element => {
        var date = element['when'].split("T")[0].split("-");
        var value = element['value'];
        //console.log(date, value);
        data.addRows([
            [new Date(date[0], date[1]-1, date[2]), value]
        ]);
    });
   
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
    
}

// Blood Pressure
google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(draw_BloodPressureChart);
function draw_BloodPressureChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'Diastolic, mm Hg');
    data.addColumn('number', 'Systolic, mm Hg');

    // Get users data
    (currentPatient['health_data']['blood_pressure']).forEach(element => {
        var date = element['when'].split("T")[0].split("-");
        var value_diast = element['value_diast'];
        var value_sys = element['value_sys'];
        //console.log(date, value_diast, value_sys);
        data.addRows([
            [new Date(date[0], date[1]-1, date[2]), value_diast, value_sys]
        ]);
    });

    var options = {
        chart: {
            title: 'Blood Pressure',
            subtitle: 'Diastolic and Systolic'
        },
        height: 350,
        hAxis: { title: 'Day' },
        vAxis: { title: 'Blood Pressure, in mm Hg' },
        legend: { position: "top" }
    };
    var chart = new google.charts.Bar(document.getElementById('bloodpressure_chart'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

// Temperatue
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(draw_TemperatureChart);
function draw_TemperatureChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'C*');

    // Get users data
    (currentPatient['health_data']['body_temperature']).forEach(element => {
        var date = element['when'].split("T")[0].split("-");
        var value = element['value'];
        console.log(date, value);
        data.addRows([
            [new Date(date[0], date[1]-1, date[2]), value]
        ]);
    });

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
}

// Blood Sugar
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(draw_BloodSugarChart);
function draw_BloodSugarChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'mg/dL');

    // Get users data
    (currentPatient['health_data']['blood_glucose']).forEach(element => {
        var date = element['when'].split("T")[0].split("-");
        var value = element['value'];
        console.log(date, value);
        data.addRows([
            [new Date(date[0], date[1]-1, date[2]), value]
        ]);
    });

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
}