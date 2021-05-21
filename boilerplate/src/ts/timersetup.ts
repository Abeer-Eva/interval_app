import * as timers from '../index';


console.log(timers.timer);
console.log(timers.breakTimer);

const up: any = document.getElementById('up');
const down: any = document.getElementById('down');
const showTime: any = document.getElementById('showTime');
const intervals: any = document.getElementById('intervals');
const breaks: any = document.getElementById('break');
const abortButtonDigital: HTMLButtonElement = document.getElementById('abort__button--digital');
const abortButtonVisual: any = document.getElementById('abort__button--visual');
const abortButtonAnalog: any = document.getElementById('abort__button--analog');
const digitalTimer: any = document.getElementById('digital-timer');
const setTimerPage: any = document.getElementById('set-timer-page');
const startButton: any = document.getElementById('startButton');
const digitalTime: any = document.getElementById('digitalTime');
const alarmView: any = document.getElementById('alarm-view');
const pauseView: any = document.getElementById('pausvy');
const breakTime: any = document.getElementById('break-time');
const noPauseBtn: any = document.getElementById('no-pause');
const newTimer: any = document.getElementById('new-timer-btn');
const menuItem: any = document.getElementById('menu');
const menuAnalog: any = document.getElementById('menu-analog');
const menuDigital: any = document.getElementById('menu-digital');
const menuVisual: any = document.getElementById('menu-visual');
const navIconDigital: any = document.getElementById('navicon-digital');
const navIconAnalog: any = document.getElementById('navicon-analog');
const navIconVisual: any = document.getElementById('navicon-visual');
const naviconMenu: any = document.getElementById('navicon-menu');
const analogTimer: any = document.getElementById('timerAnalog');
const visualTimer: any = document.getElementById('visual-timer');
const blackBox: any = document.getElementById('timer');
const secondPointer: any = document.getElementById('second-pointer')
const minutePointer: any = document.getElementById('minute-pointer')
const logo: any = document.getElementById('logo');
const loadingPage: any = document.getElementById('loading-page');
let counter: number = 10;
let countDown: any = '';
let intervalChecked: boolean = false;
let breaksChecked: boolean = false;
let chosenNumber: number = 0;
let currentPage: string = 'digital';



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

function runTimer(counter: number): void {
    timers.timer.start({ countdown: true, startValues: { minutes: counter } });

    timers.timer.on('secondsUpdated', () => {
        console.log(timers.timer.getTimeValues().minutes + ':' + timers.timer.getTimeValues().seconds);
        countDown = timers.timer.getTimeValues().minutes + ':' + timers.timer.getTimeValues().seconds;
        digitalTime.innerHTML = countDown;

        // VISUAL

        //Function to move the black box on visual timer
        let countPercentage = () => {
            //Total amount of seconds currently
            let totalSeconds: number = (timers.timer.getTimeValues().minutes * 60) +
                timers.timer.getTimeValues().seconds;
            //Percentage of time reached
            let percent: number = 100 - (totalSeconds / (counter *60)) * 100;
            console.log(percent);
            //Change styling
            blackBox.style.height = `${percent}%`;

            
            //ANALOG 
            let totalDegreesSec: number = totalSeconds * 6;
            let totalDegreesMin: number =  totalSeconds * 6 / 60;
            secondPointer.style.transform = `rotate(${totalDegreesSec}deg)`;
            minutePointer.style.transform = `rotate(${totalDegreesMin}deg)`
        };
        //Run function
        countPercentage();
    });
}


startButton.addEventListener('click', () => {
    chosenNumber = counter;

    // On click start timer
    runTimer(counter);

    timers.timer.on('targetAchieved', () => {
        menuItem.classList = 'hide';
        blackBox.style.height = '0';
        if (intervalChecked === true && breaksChecked === false) {
            
            runTimer(counter);


        } else if (intervalChecked === false) {
            alarmView.classList.remove('hide');
            if (currentPage === 'analog') {
                console.log(currentPage);
                analogTimer.classList.add('hide');

            } else if (currentPage === 'digital') {
                console.log(currentPage);
                digitalTimer.classList.add('hide');

            } else if (currentPage === 'visual') {
                console.log(currentPage);
                visualTimer.classList.add('hide');

            }


        } else if (intervalChecked === true && breaksChecked === true) {
            pauseView.classList.remove('hide');

            if (currentPage === 'analog') {
                console.log(currentPage);
                analogTimer.classList.add('hide');

            } else if (currentPage === 'digital') {
                console.log(currentPage);
                digitalTimer.classList.add('hide');

            } else if (currentPage === 'visual') {
                console.log(currentPage);
                visualTimer.classList.add('hide');

            }

            timers.breakTimer.start({ countdown: true, startValues: { seconds: 5 } });
            timers.breakTimer.on('secondsUpdated', () => {
                console.log(timers.breakTimer.getTimeValues().minutes + ':' + timers.breakTimer.getTimeValues().seconds);
                let breakLeft = timers.breakTimer.getTimeValues().minutes + ':' + timers.breakTimer.getTimeValues().seconds;
                breakTime.innerHTML = breakLeft;
            });
            timers.breakTimer.on('targetAchieved', () => {
                pauseView.classList = 'hide';
                if (currentPage === 'analog') {
                    console.log(currentPage);
                    analogTimer.classList.remove('hide');
    
                } else if (currentPage === 'digital') {
                    console.log(currentPage);
                    digitalTimer.classList.remove('hide');
    
                } else if (currentPage === 'visual') {
                    console.log(currentPage);
                    visualTimer.classList.remove('hide');
    
                }
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

abortButtonVisual.addEventListener('click', () => {
    timers.timer.stop();
    setTimerPage.classList.remove('hide');
    visualTimer.classList = 'hide';
})

abortButtonAnalog.addEventListener('click', () => {
    timers.timer.stop();
    setTimerPage.classList.remove('hide');
    analogTimer.classList = 'hide';
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


//----Menu Icon
navIconAnalog.addEventListener('click', () => {
    analogTimer.classList = 'hide';
    menuItem.classList.toggle('hide');
    currentPage = 'analog';
})

navIconDigital.addEventListener('click', () => {
    digitalTimer.classList = 'hide';
    menuItem.classList.remove('hide');
    currentPage = 'digital';
})

navIconVisual.addEventListener('click', () => {
    visualTimer.classList = 'hide';
    menuItem.classList.remove('hide');
    currentPage = 'visual';
})
naviconMenu.addEventListener('click', () => {
    if (currentPage === 'analog') {
        menuItem.classList = 'hide';
        analogTimer.classList.remove('hide');

    } else if (currentPage === 'digital') {
        menuItem.classList = 'hide';
        digitalTimer.classList.remove('hide');

    } else if (currentPage === 'visual') {
        menuItem.classList = 'hide';
        visualTimer.classList.remove('hide');

    }

})

//menu 
menuDigital.addEventListener('click', () => {
    menuItem.classList = 'hide';
    digitalTimer.classList.remove('hide');
    currentPage = 'digital';
})

menuAnalog.addEventListener('click', () => {
    menuItem.classList = 'hide';
    analogTimer.classList.remove('hide');
    currentPage = 'analog';
})

menuVisual.addEventListener('click', () => {
    menuItem.classList = 'hide';
    visualTimer.classList.remove('hide');
    currentPage = 'visual';
})

logo.addEventListener('click', () => {
    loadingPage.classList = 'hide';
    setTimerPage.classList.remove('hide');
})
export { countDown, intervalChecked, breaksChecked };
