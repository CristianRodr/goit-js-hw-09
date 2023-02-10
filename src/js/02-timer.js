'use strict';

import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('input[type="text"]');
const btnStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Por favor, elija una fecha futura');
    } else {
      btnStart.disabled = false;
    }

    function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = Math.floor(ms / day);
      // Remaining hours
      const hours = Math.floor((ms % day) / hour);
      // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
      // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    }

    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }

    let tiempoSelector = null;

    btnStart.addEventListener('click', () => {
      tiempoSelector = setInterval(() => {
        const miliEpoca = Date.now(); // Date.now() -> devuelve el número de milisegundos transcurridos desde la época
        const operaConteo = selectedDates[0].getTime() - miliEpoca; //selecteDates[0] -> Fecha actual en milisegundos

        if (operaConteo <= 0) {
          clearInterval(tiempoSelector);
          return;
        }

        const contenFuncion = [convertMs(operaConteo)];
        for (const contenElement of contenFuncion) {
          dataDays.textContent = addLeadingZero(contenElement.days);
          dataHours.textContent = addLeadingZero(contenElement.hours);
          dataMinutes.textContent = addLeadingZero(contenElement.minutes);
          dataSeconds.textContent = addLeadingZero(contenElement.seconds);
        }
      }, 1000);
    });
  },
};

flatpickr(input, options);
