$(document).ready(function () {

    currentPatient = JSON.parse(localStorage.getItem('currentPatient'));
    userLogin = JSON.parse(localStorage.getItem('login'));
    console.log(currentPatient);
    console.log(userLogin);

    
    // Add content to HTML
    $("#patientFullName").text(currentPatient['fullname']);
    $("#patientAge").text(currentPatient['age']);
    if (currentPatient['gender']== "Male"){
        $("#patientGender").text("Male");
    }
    else{
        $("#patientGender").text("Female");
    }
    $("#patientWeight").text(currentPatient['weight']);
    $("#patientHeight").text(currentPatient['height']);
    var condArray = currentPatient['med_conditions'];
    $.each(condArray, function(index, value) {
        //console.log(value);
        $("#patientConditionList").append("<li>" + value + "</li>");
    });
    var medicationArray = currentPatient['medication'];
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
        currentPatient['med_conditions'].push($("#patientNewDisease").val());
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
        var index = currentPatient['med_conditions'].indexOf(old);
        currentPatient['med_conditions'].splice(index, 1);
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
        currentPatient['medication'].push($("#patientNewMedication").val());
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
        var index = currentPatient['medication'].indexOf(old);
        currentPatient['medication'].splice(index, 1);
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
    $.ajax({
        url: 'http://localhost:8080/api/patients/'+currentPatient['id']+'/heartrate',
        dataType: 'json',
     }).done(function (results) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Day');
        data.addColumn('number', 'Beats Per Minute');
        // Get users data
        console.log(results)
        results.data.forEach(elem =>{
            //console.log(elem)

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
        url: 'http://localhost:8080/api/patients/'+currentPatient['id']+'/bloodpressure',
        dataType: 'json',
     }).done(function (results) {
        //console.log(results)
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
        url: 'http://localhost:8080/api/patients/'+currentPatient['id']+'/bodytemperature',
        dataType: 'json',
     }).done(function (results) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Day');
        data.addColumn('number', 'C*');

        // Get users data
        results.data.forEach(element =>{
            var date = element['date'].split("-");
            var value = element['bodyTemp'];
            console.log(date, value);
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
        url: 'http://localhost:8080/api/patients/'+currentPatient['id']+'/sugarlevel',
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
        url: 'http://localhost:8080/api/patients/'+currentPatient['id']+'/oxygensaturation',
        dataType: 'json',
     }).done(function (results) {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Day');
        data.addColumn('percentage', '%');

        // Get users data
        results.data.forEach(element =>{
            var date = element['date'].split("-");
            var value = element['oxygensaturation'];
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