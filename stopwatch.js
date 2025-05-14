
let interval;
let stopDate;
let initialDate;
let freezeMilliSeconds;
let display;
let isRunning;

let startButton = document.getElementById("start");
startButton.addEventListener('click', startTimer);
let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", stopTimer);

let resetButton = document.getElementById("reset");
resetButton.addEventListener('click', reset);

let lapButton = document.getElementById("lap");
lapButton.addEventListener('click', takeLapTime);

function reset() {
    let lapsListItems = document.querySelectorAll("li");
    for(let item of lapsListItems) {
        item.remove();
    }
    freezeMilliSeconds = 0;
    clearInterval(interval);
    display.textContent = "00:00:00";
    isRunning = false;
}

function takeLapTime() {
    let lapsList = document.getElementById("laps");
    let newLapsListItem = document.createElement("li");
    newLapsListItem.textContent = display.textContent;
    lapsList.appendChild(newLapsListItem);
}

function stopTimer() {
    if(isRunning) {
        stopDate = new Date();
        freezeMilliSeconds = stopDate.getTime() - initialDate.getTime();
        clearInterval(interval);
        isRunning = false;
    }
}

function startTimer() {
    if(!isRunning) {
        isRunning = true;
        initialDate = new Date();
        interval = setInterval(function () {
            displayTimer(initialDate)
        }, 10);
    }
}

function displayTimer(initialDate) {
    let currentDate = new Date();
    let totalMilliseconds;
    if(stopDate) {
        totalMilliseconds = freezeMilliSeconds + currentDate.getTime() - initialDate.getTime();
    } else {
        totalMilliseconds = currentDate.getTime() - initialDate.getTime(); // Get the difference in milliseconds
    }
    let minutes = Math.floor(totalMilliseconds/(1000*60));
    let seconds = Math.floor ((totalMilliseconds % (60*1000)) / 1000);
    let milliSeconds = (totalMilliseconds % (60*1000)) % 1000;
    let milliSeconds2digits = Math.floor(milliSeconds / 10);

    display = document.getElementById("timer");
    display.textContent = String(minutes).padStart(2,"0") + ':' + String(seconds).padStart(2,"0") + ':' + String(milliSeconds2digits).padStart(2,"0");
}