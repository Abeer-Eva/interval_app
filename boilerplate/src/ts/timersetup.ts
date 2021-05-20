import * as timers from '../index';


console.log(timers.timer);
console.log(timers.breakTimer);

const up: any = document.getElementById('up');
const down: any = document.getElementById('down');
const showTime: any = document.getElementById('showTime');
const intervals: any = document.getElementById('intervals');
const breaks: any = document.getElementById('break');
const abortButtonDigital: any = document.getElementById('abort__button--digital');
const digitalTimer: any = document.getElementById('digital-timer');
const setTimerPage: any = document.getElementById('set-timer-page');
const startButton: any = document.getElementById('startButton');
const digitalTime: any = document.getElementById('digitalTime');
const alarmView: any = document.getElementById('alarm-view');
const pauseView: any = document.getElementById('pausvy');
const breakTime: any = document.getElementById('break-time');
const noPauseBtn: any = document.getElementById('no-pause');
const newTimer: any = document.getElementById('new-timer-btn');
let counter: number = 10;
let countDown: any = '';
let intervalChecked: boolean = false;
let breaksChecked: boolean = false;
let chosenNumber = 0;


up.addEventListener('click', () => {
    counter++;
    console.log(counter);
    showTime.innerHTML = counter + ':00'
});

down.addEventListener('click', () => {
    counter--;
    console.log(counter);
    showTime.innerHTML = counter + ':00'
});

intervals.addEventListener('click', () => {
    intervalChecked = !intervalChecked;
    breaks.disabled = !breaks.disabled;

    if (breaks.disabled === true) {
        breaksChecked = false;
        console.log(breaksChecked);
    } else if (breaks.disabled === false && intervalChecked === true) {
        breaks.checked = false;
        console.log(breaksChecked);
    }

    console.log(intervalChecked);
})

breaks.addEventListener('click', () => {
    breaksChecked = !breaksChecked;
    console.log(breaksChecked);
})

if (intervalChecked === false) {
    breaks.disabled = true;
}

function runTimer (counter:number):void {
    timers.timer.start({ countdown: true, startValues: { seconds: counter } });

    timers.timer.on('secondsUpdated', () => {
    console.log(timers.timer.getTimeValues().minutes + ':' + timers.timer.getTimeValues().seconds);
    countDown = timers.timer.getTimeValues().minutes + ':' + timers.timer.getTimeValues().seconds;
    digitalTime.innerHTML = countDown;
});
}


startButton.addEventListener('click', () => {
    chosenNumber = counter;
    
    // On click start timer
  
   runTimer(counter);

   timers.timer.on('targetAchieved', () => {
        if (intervalChecked === true && breaksChecked === false) {
            timers.timer.start({ countdown: true, startValues: { minutes: counter } });

            timers.timer.on('secondsUpdated', () => {
                console.log(timers.timer.getTimeValues().minutes + ':' + timers.timer.getTimeValues().seconds);
                countDown = timers.timer.getTimeValues().minutes + ':' + timers.timer.getTimeValues().seconds;
                digitalTime.innerHTML = countDown;
            });

        } else if (intervalChecked === false) {
            alarmView.classList.remove('hide');
            digitalTimer.classList = 'hide';

        } else if (intervalChecked === true && breaksChecked === true) {
            pauseView.classList.remove('hide');
            digitalTimer.classList = 'hide';
            timers.breakTimer.start({ countdown: true, startValues: { seconds: 5 } });
            timers.breakTimer.on('secondsUpdated', () => {
                console.log(timers.breakTimer.getTimeValues().minutes + ':' + timers.breakTimer.getTimeValues().seconds);
                let breakLeft = timers.breakTimer.getTimeValues().minutes + ':' + timers.breakTimer.getTimeValues().seconds;
                breakTime.innerHTML = breakLeft;
            });
            timers.breakTimer.on('targetAchieved', () => {
                pauseView.classList = 'hide';
                digitalTimer.classList.remove('hide');
                console.log(counter);
                runTimer(chosenNumber);
                });
            }
        });

    digitalTimer.classList.remove('hide');
    setTimerPage.classList = 'hide';
});

abortButtonDigital.addEventListener('click', () => {
    timers.timer.stop();
   setTimerPage.classList.remove('hide');
   digitalTimer.classList = 'hide';
   digitalTime.innerHTML = ':'
})

noPauseBtn.addEventListener('click', () => {
    timers.breakTimer.stop();
    runTimer(chosenNumber);
    pauseView.classList = 'hide';
    digitalTimer.classList.remove('hide');
    breakTime.innerHTML = ':'
});

newTimer.addEventListener('click', () => {
    setTimerPage.classList.remove('hide');
    alarmView.classList = 'hide';
})

export { countDown, intervalChecked, breaksChecked };