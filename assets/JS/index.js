var hours = document.querySelector('.hours');
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');
var ms = document.querySelector('.ms');

var start = document.querySelector('.start');
var pause = document.querySelector('.pause');
var reset = document.querySelector('.reset');
var lap = document.querySelector('.lap');

var ol = document.querySelector('ol');

var milliSeconds = 0;
var sec = 0;
var min = 0;
var hs = 0;

var timerInterval; // Zamanlayıcı aralığı

function formatTime(time) {
    return time.toString().padStart(2, '0');
}

function updateTimer() {
    seconds.innerText = formatTime(sec);
    minutes.innerText = formatTime(min);
    hours.innerText = formatTime(hs);
    ms.innerText = formatTime(milliSeconds);
}

function startTimer() {
    timerInterval = setInterval(function () {
        milliSeconds++;
        if (milliSeconds === 100) {
            sec++;
            milliSeconds = 0;
        }
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            hs++;
            min = 0;
        }
        updateTimer();
    }, 10);

    start.disabled = true;
    pause.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);

    start.disabled = false;
    pause.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    milliSeconds = 0;
    sec = 0;
    min = 0;
    hs = 0;
    updateTimer();
    ol.innerHTML = '';
    lapCounter = 1;
    lapSeconds = [];
    start.disabled = false;
    pause.disabled = true;
}

var lapCounter = 1; // Lap sayacı
var lapSeconds = []; // Lap saniyelerini tutan dizi

function addLap() {
    if (ol.childElementCount >= 10) {
        alert('Limit is 10. You cannot add more laps.');
        return;
    }

    var currentLapTime = formatTime(hs) + ':' + formatTime(min) + ':' + formatTime(sec) + '.' + formatTime(milliSeconds);
    if (lapSeconds.includes(currentLapTime)) {
        alert('You cannot use the same lap time again.');
    } else {
        lapSeconds.push(currentLapTime);
        var li = document.createElement('li');
        li.innerText = 'Lap ' + ' ' + currentLapTime;
        ol.append(li);
        lapCounter++;
    }
}

start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer);
lap.addEventListener('click', addLap);
updateTimer();
