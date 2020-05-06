window.onload = function () {
    var display = document.querySelector('#time'),
        event = new Event('timer-finish'),
        pomCount = 0,
        seconds = 0,
        shortRest = false,
        longRest = false,
        pomTime = true,
        timer = new CountDownTimer(5, display, event), //change to 25 * 60
        timeObj = CountDownTimer.parse(5);

    format(timeObj.minutes, timeObj.seconds);

    timer.onTick(format);

    document.querySelector('#start').addEventListener('click', function () {
        if (pomTime) {
            seconds = 5;//document.querySelector('#work-time').value * 60;
        }
        else if (shortRest){
            seconds = 1;//document.querySelector('#short-time').value * 60;
        }
        else if (longRest){
            seconds = document.querySelector('#long-time').value * 60;
        }
        timer.setDuration(seconds);
        timer.start();
    });
    document.querySelector('#pause').addEventListener('click', function () {
        timer.pause();
    });
    document.querySelector('#reset').addEventListener('click', function () {
        if (pomTime) {
            seconds = 5;//document.querySelector('#work-time').value * 60;
        }
        else if (shortRest){
            seconds = 1;////document.querySelector('#short-time').value * 60;
        }
        else if (longRest){
            seconds = document.querySelector('#long-time').value * 60;
        }
        timer.setDuration(seconds);
        timeObj = CountDownTimer.parse(seconds);
        format(timeObj.minutes, timeObj.seconds);
        timer.reset();
    });
    display.addEventListener('timer-finish', function () {
        seconds = 0;
        if (shortRest || longRest) { //if a rest just finished, que up another pomodoro
            shortRest = false;
            pomTime = true;
            longRest = false;
            seconds = document.querySelector('#work-time').value * 60;
            console.log("finished a rest");
        }
        else if (!shortRest && pomCount < 3) { //if we just finished a pomodoro that wasn't our 4th que a short rest
            shortRest = true;
            pomTime = false;
            longRest = false;
            seconds = document.querySelector('#short-time').value * 60
            pomCount++;
            console.log("finished a pomodoro time for a short rest");
            console.log("pomCount: ",pomCount);
        }
        else if (!shortRest && pomCount >= 3){ //time for a long rest
            shortRest = false;
            pomTime = false;
            longRest = true;
            pomCount = 0;
            seconds = document.querySelector('#long-time').value * 60;
            console.log("finished a pomodoro tome for a long rest");
        }
        timer.setDuration(seconds);
        timeObj = CountDownTimer.parse(seconds);
        format(timeObj.minutes, timeObj.seconds);
        timer.reset();
    });

    function format(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;
    }
};