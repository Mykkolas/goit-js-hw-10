import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.getElementById("datetime-picker")
const submitBtn = document.querySelector("button")

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let userSelectedDate = null
let countdownInterval = null

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            submitBtn.disabled = true;
          iziToast.show({
            message: "Please choose a date in the future",
            position: 'topRight',
            backgroundColor: 'red',
            messageColor: 'white',
            progressBar: false,
            })
          
        }
        else {
            submitBtn.disabled = false;
            userSelectedDate = selectedDates[0]            
        }       
  },
};

flatpickr(input, options)

function handleSubmit() {
 
  countdownInterval = setInterval(() => {
    submitBtn.disabled = true;
    input.disabled = true
    const timeRemained = convertMs(+userSelectedDate - Date.now());

    if (+userSelectedDate <= Date.now()) {
      clearInterval(countdownInterval);
    input.disabled = false
      resetCountdown();
      return;
    }

    updateCountdown(timeRemained);
  }, 1000);
}


function updateCountdown({ days, hours, minutes, seconds }) {
  daysEl.innerHTML = formatTime(days)
  hoursEl.innerHTML = formatTime(hours)
  minutesEl.innerHTML = formatTime(minutes)
  secondsEl.innerHTML = formatTime(seconds)
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

function resetCountdown() {
  daysEl.innerHTML = "00";
  hoursEl.innerHTML = "00";
  minutesEl.innerHTML = "00";
  secondsEl.innerHTML = "00";
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

submitBtn.addEventListener("click", handleSubmit);
