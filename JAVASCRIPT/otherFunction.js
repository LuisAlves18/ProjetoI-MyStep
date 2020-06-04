function showpassw() {
    var x = document.getElementById("RegPassw");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showpassw2() {
    var y = document.getElementById("confpassw");
    if (y.type === "password") {
        y.type = "text";
    } else {
        y.type = "password";
    }
}

function showpassw3() {
    var y = document.getElementById("Logpassw");
    if (y.type === "password") {
        y.type = "text";
    } else {
        y.type = "password";
    }
}

function updateTimer() {
    document.getElementById("timer").innerHTML = ++value;
}

var timerInterval = null;

function start() {
    stop();
    value = 0;
    timerInterval = setInterval(updateTimer,1000);
}

var stop = function() {
    clearInterval(timerInterval);
}