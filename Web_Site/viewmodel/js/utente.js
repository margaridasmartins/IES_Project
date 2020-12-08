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
   
function draw_HeartRateChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Beats');
   
    data.addRows([
        [0, 0],   [0.9, 0], 
        [1, 10],  [1.1, 0],  [1.9, 0],  
        [2, 10],  [2.1, 0], [2.9, 0],  
        [3, 10],  [3.1, 0], [3.9, 0],
        [4, 10],  [4.1, 0], [4.9, 0], 
        [5, 10],  [5.1, 0], [5.9, 0], 
        [6, 10],  [6.1, 0], [6.9, 0],   
   ]);
   
    var options = {
        hAxis: { title: 'Time' },
        vAxis: { title: 'Heart Rate' }
    };
   
    var chart = new google.visualization.LineChart(document.getElementById('heartrate_chart'));
    chart.draw(data, options);
}

// Blood Pressure
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(draw_BloodPressureChart);
   
function draw_BloodPressureChart() {
    var data = google.visualization.arrayToDataTable([
        ['Time', 'Blood Pressure'],
        ['1',  130],
        ['5',  133],
        ['10',  135],
        ['15',  132],
        ['20',  130],
        ['25',  127]
    ]);

    var options = {
        title: 'Blood Pressure',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
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

