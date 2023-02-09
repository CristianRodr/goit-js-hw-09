
const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerColor = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function crearStyle() {
  return body.style.backgroundColor = getRandomHexColor();
}

function ocultarBtn(ocultar) {
  ocultar.addEventListener('click', (event) => {
    if (event.target === btnStart) {
      btnStart.disabled = true;
      btnStop.disabled = false;
    } else if (event.target === btnStop) {
      btnStart.disabled = false;
      btnStop.disabled = true;
    }
  });
}

const onClik = () => {
  timerColor = setInterval(() => {
    crearStyle();
  }, 1000);
};

const ofClik = () => {
  clearInterval(timerColor);
};

btnStart.addEventListener('click', onClik);

btnStop.addEventListener('click', ofClik);

ocultarBtn(body);