import timer from '../index';

console.log(timer);

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
let counter: number = 10;
let countDown: any = '';
let intervalChecked: boolean = false;
let breaksChecked: boolean = false;

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

startButton.addEventListener('click', () => {
    // On click start timer
    timer.start({ countdown: true, startValues: { minutes: counter } });

    timer.on('secondsUpdated', () => {
        console.log(timer.getTimeValues().minutes + ':' + timer.getTimeValues().seconds);
        countDown = timer.getTimeValues().minutes + ':' + timer.getTimeValues().seconds;
        digitalTime.innerHTML = countDown;
    });

    timer.on('targetAchieved', () => {
        if (intervalChecked === true && breaksChecked === false) {
            timer.start({ countdown: true, startValues: { minutes: counter } });

            timer.on('secondsUpdated', () => {
                console.log(timer.getTimeValues().minutes + ':' + timer.getTimeValues().seconds);
                countDown = timer.getTimeValues().minutes + ':' + timer.getTimeValues().seconds;
                digitalTime.innerHTML = countDown;
            });

        } else if (intervalChecked === false) {
            alarmView.classList.remove('hide');
            digitalTimer.classList = 'hide';

        } else if (intervalChecked === true && breaksChecked === true) {
            pauseView.classList.remove('hide');
            digitalTimer.classList = 'hide';
        }
    })

    digitalTimer.classList.remove('hide');
    setTimerPage.classList = 'hide';
});

abortButtonDigital.addEventListener('click', () => {
   timer.stop();
   setTimerPage.classList.remove('hide');
   digitalTimer.classList = 'hide';
   digitalTime.innerHTML = ':'
})

export { countDown, intervalChecked, breaksChecked };