/**
 * Created by Yoga on 1/15/17.
 */
$(document).ready(function () {


    function firstLoad() {
        $.getJSON("/api/light/status", function (result) {
            var status = result["status"];
            if (status == "on") {
                document.getElementById("light").innerHTML = "<button class='btn btn-success'>On</button>";
            } else {
                document.getElementById("light").innerHTML = "<button class='btn btn-warning'>Off</button>";
            }
        });
        $.getJSON("/api/fan/status", function (result) {
            var status = result["fan"];
            if (status == "on") {
                document.getElementById("fan").innerHTML = "<button class='btn btn-success'>Run</button>";
            } else {
                document.getElementById("fan").innerHTML = "<button class='btn btn-warning'>Stop</button>";
            }
        });
        $.getJSON("/api/door/status", function (result) {
            var status = result["door"];
            if (status == "open") {
                document.getElementById("door").innerHTML = "<button class='btn btn-success'>Open</button>";
            } else {
                document.getElementById("door").innerHTML = "<button class='btn btn-warning'>Close</button>";
            }
        });

        $.getJSON("/api/task/get", function (result) {
            var output = "";
            for (var i = 0; i < result.length; i++) {
                output += "<a class='list-group-item'>" + result[i]["content"] + "</a>";
            }
            document.getElementById("list").innerHTML = output;

        });
    }

    window.onload = firstLoad();

    window.setInterval(firstLoad, 1000);


});