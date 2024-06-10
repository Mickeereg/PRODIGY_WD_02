let hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    timer,
    running = false,
    lapCounter = 1;

const hourElem = document.querySelector('.hour_num');
const minuteElem = document.querySelector('.min_num');
const secondElem = document.querySelector('.sec_num');
const msecElem = document.querySelector('.msec_num');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');
const moonIcon = document.querySelector('.fa-moon');
const sunIcon = document.querySelector('.fa-sun');
const section = document.querySelector('section');

function updateDisplay() {
  hourElem.textContent = String(hours).padStart(2, '0');
  minuteElem.textContent = String(minutes).padStart(2, '0');
  secondElem.textContent = String(seconds).padStart(2, '0');
  msecElem.textContent = String(milliseconds).padStart(2, '0');
}

function startStopwatch() {
  timer = setInterval(() => {
    milliseconds += 1;
    if (milliseconds >= 100) {
      milliseconds = 0;
      seconds += 1;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours += 1;
    }
    updateDisplay();
  }, 10);
}

function stopStopwatch() {
  clearInterval(timer);
}

function toggleNightMode() {
  section.classList.toggle('dark');
}

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startStopwatch();
    startStopBtn.textContent = 'Stop';
    running = true;
  } else {
    stopStopwatch();
    startStopBtn.textContent = 'Start';
    running = false;
  }
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapCounter++;
  }
});

resetBtn.addEventListener('click', () => {
  stopStopwatch();
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  startStopBtn.textContent = 'Start';
  running = false;
  lapsList.innerHTML = '';
  lapCounter = 1;
});

moonIcon.addEventListener('click', toggleNightMode);
sunIcon.addEventListener('click', toggleNightMode);

updateDisplay();
