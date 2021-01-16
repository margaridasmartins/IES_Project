var jwt;
var id;
var userLogin;


$(document).ready(function () {
    cookie_array= document.cookie.split("&");
    var temp = cookie_array[0].trim();
    jwt = temp.substring("access_token=".length,temp.length);
    var temp = cookie_array[2].trim();
    id = temp.substring("id=".length,temp.length);
    
    $.ajax({
        //http://192.168.160.217:8080
        url: "http://localhost:8080/api/patients/"+ id,
        headers:{"Access-Control-Allow-Origin":"http://localhost","Authorization":"Bearer "+ jwt},
        statusCode: {
            500: function(xhr){
                return;
            },
            403: function(xhr){
                return;
            }
        }
    }).then(function(user) {
        console.log(user)
        userLogin=user
    
        $("#latestInf").fadeOut();

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
        $("#userPhoto").attr("src",'data:image/gif;base64,'+ userLogin['image']);
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
        get_latestValues();
        loadCharts();
    });
});

// LATEST DATA
function get_latestValues(){
    $.ajax({
        //http://192.168.160.217:8080
        url: "http://localhost:8080/api/patients/"+ id+'/latest',
        headers:{"Access-Control-Allow-Origin":"http://localhost","Authorization":"Bearer "+ jwt},
        }).done(function (results) {
            console.log(results)
            document.getElementById('latest_bp').innerHTML = '-> '+results[0].low_value;
            document.getElementById('latest_bt').innerHTML = '-> '+results[1].bodyTemp;
            document.getElementById('latest_hr').innerHTML = '-> '+results[2].heartRate;
            document.getElementById('latest_sl').innerHTML = '-> '+results[3].sugarLevel;
            document.getElementById('latest_ol').innerHTML = '-> '+results[4].oxygenLevel;
        })
}

function loadCharts(){

    // Heart Rate
    google.charts.load('current', {packages: ['line']});
    google.charts.setOnLoadCallback(draw_HeartRateChart);

    // Blood Pressure
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(draw_BloodPressureChart);

    // Temperatue
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(draw_TemperatureChart);

    // Blood Sugar
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(draw_BloodSugarChart);

    // Oxygen Saturation
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(draw_OxygenSaturationChart);

}
// CHARTS

// Heart Rate
var userLogin = localStorage.getItem('login');
function draw_HeartRateChart() {
    $.ajax({
        //http://192.168.160.217:8080
        url: "http://localhost:8080/api/patients/"+ id+"/heartrate",
        headers:{"Access-Control-Allow-Origin":"http://localhost","Authorization":"Bearer "+ jwt},
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


function draw_BloodPressureChart() {
    $.ajax({
        //http://192.168.160.217:8080
        url: "http://localhost:8080/api/patients/"+ id+"/bloodpressure",
        headers:{"Access-Control-Allow-Origin":"http://localhost","Authorization":"Bearer "+ jwt},
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


function draw_TemperatureChart() {
    $.ajax({
        //http://192.168.160.217:8080
        url: "http://localhost:8080/api/patients/"+ id+"/bodytemperature",
        headers:{"Access-Control-Allow-Origin":"http://localhost","Authorization":"Bearer "+ jwt},
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


function draw_BloodSugarChart() {
    $.ajax({
        //http://192.168.160.217:8080
        url: "http://localhost:8080/api/patients/"+ id+"/sugarlevel",
        headers:{"Access-Control-Allow-Origin":"http://localhost","Authorization":"Bearer "+ jwt},
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


function draw_OxygenSaturationChart() {
    $.ajax({
        //http://192.168.160.217:8080
        url: "http://localhost:8080/api/patients/"+ id+"/oxygenlevel",
        headers:{"Access-Control-Allow-Origin":"http://localhost","Authorization":"Bearer "+ jwt},
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
