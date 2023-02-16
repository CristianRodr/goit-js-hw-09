import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

let dela;
let ste;
let amoun;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay }); //operacion exitosa
      } else {
        reject({ position, delay }); //caso de error
      }
    }, dela);

  });
}

function handleSubmit(event) { //
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  dela = Number(delay.value);
  ste = Number(step.value);
  amoun = Number(amount.value);

  for (let i = 1; i <= amoun; i++) {
    createPromise(i, dela)
      .then(({ position, delay }) => {
        Notify.success(`✅ Promesa cumplida ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Promesa rechazada ${position} in ${delay}ms`);
      });
    dela += ste;
  }
  event.currentTarget.reset();

}

form.addEventListener('submit', handleSubmit); //evento al
