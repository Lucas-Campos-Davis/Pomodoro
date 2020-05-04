function CountDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFuncs = [];
    this.running = false;
    this.timerId = 0;
    this.paused = false;
    this.currentTime = 0;
}

CountDownTimer.prototype.start = function () {
    if (this.running) {
        console.log("timer is already runing");
        return;
    }
    this.running = true;
    var current = this.duration;
    let funcs = this.tickFuncs;
    var that = this;
    if(this.paused){
        this.paused = false;
        current = this.currentTime;
    }

    function go() {
        obj = CountDownTimer.parse(current);
        funcs.forEach(function (ftn) {
            ftn.call(this, obj.minutes, obj.seconds);
        }, that);
        if (current <= 0) {
            that.running = false;
            clearInterval(timerId);
        }
        current--;
        that.currentTime = current;
    }

    go();
    let timerId = setInterval(go, 1000);
    this.timerId = timerId;
};

CountDownTimer.prototype.pause = function () {
    if(!this.running){
        return;
    }
    this.running = false;
    this.paused = true;
    clearInterval(this.timerId);
    this.timerId = 0;
};

CountDownTimer.prototype.reset = function () {
    this.running = false;
    this.paused = false;
    clearInterval(this.timerId);
    this.timerId = 0;
    this.currentTime = 0;
};

CountDownTimer.prototype.setDuration = function (newDuration) {
    this.duration = newDuration;
    console.log(newDuration);
}

CountDownTimer.prototype.onTick = function (ftn) {
    if (typeof ftn === 'function') {
        this.tickFuncs.push(ftn);
    }
    return this;
};

CountDownTimer.prototype.expired = function () {
    return !this.running;
};

CountDownTimer.parse = function (seconds) {
    return {
        'minutes': (seconds / 60) | 0,
        'seconds': (seconds % 60) | 0
    };
};