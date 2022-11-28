class Timer {

    duration;
    isRunning;
    whiz;
    minutes;
    seconds;

    constructor (durationInSeconds, whiz) {
        this.duration = durationInSeconds;
        this.isRunning = false;
        this.whiz = whiz;
    }

    startTimer() {
        this.isRunning = true;
        this.setTime();
        this.interval = setInterval(this.updateTimer.bind(this), 1000);
    }

    updateHTML() {
        let timerHTML = document.getElementById("timer");
        timerHTML.innerHTML = '<strong>' + this.minutes + ":" + this.seconds + '</strong>';
    }

    setTime() {
        this.setMinutes();
        this.setSeconds();
        this.updateHTML();
    }

    setMinutes() {
        this.minutes = Math.floor(this.duration / 60);
    }

    setSeconds() {
        this.seconds = this.duration % 60;
        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
    }

    updateTimer() {
        --this.duration;
        this.setTime();

        if (this.duration <= 0) {
            this.isRunning = false;
            clearInterval(this.interval);
            this.whiz.giveUp();
        }
    }

    getIsTimerRunning() {
        return this.isRunning;
    }

    setTimer(durationInSeconds) {
        this.duration = durationInSeconds;
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    getDuration() {
        return this.duration;
    }
}