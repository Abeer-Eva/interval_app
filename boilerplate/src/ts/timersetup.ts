import timer from '../index';

console.log(timer);

const up: HTMLElement = document.getElementById('up');
const down: HTMLElement = document.getElementById('down');
const showTime: HTMLElement = document.getElementById('showTime');
const intervals: HTMLElement = document.getElementById('intervals');
const breaks: HTMLElement = document.getElementById('break');
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
    console.log(intervalChecked);
})
breaks.addEventListener('click', () => {
    breaksChecked = !breaksChecked;
    console.log(breaksChecked);
})

const startButton: HTMLElement = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    // On click start timer
    timer.start({ countdown: true, startValues: { minutes: counter } });

    timer.on('secondsUpdated', () => {
        console.log(timer.getTimeValues().minutes + ':' + timer.getTimeValues().seconds);
        countDown = timer.getTimeValues().minutes + ':' + timer.getTimeValues().seconds;
    });

    document.querySelector('#digital-timer').classList -= 'hide';
});

export { countDown, intervalChecked, breaksChecked };

