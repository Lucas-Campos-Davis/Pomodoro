window.onload = function () {
    var display = document.querySelector('#time'),
        timer = new CountDownTimer(5),
        timeObj = CountDownTimer.parse(5);

    format(timeObj.minutes, timeObj.seconds);

    timer.onTick(format);

    document.querySelector('#start').addEventListener('click', function () {
        var seconds = document.querySelector('#minutes').value * 60;
        timer.setDuration(seconds);
        timer.start();
    });
    document.querySelector('#pause').addEventListener('click', function () {
        timer.pause();
    });
    document.querySelector('#reset').addEventListener('click', function () {
        var seconds = document.querySelector('#minutes').value * 60;
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