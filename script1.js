// Selección de los elementos HTLM
const score = document.getElementById("score");
const timeLeft = document.getElementById("timeLeft");
const squares = document.querySelectorAll(".square");
const gameOver = document.querySelector(".gameOver");
const musicStarGame = new Audio("./musica/musicaStart.mp3");
const shootGame = new Audio("./musica/scifi002.mp3");

// Función que ejecuta el juego
const startGame = () => {
  // Creamos las variables de los valores iniciales del juego
  let result = 0;
  let currentTime = 15;
  let hitPosition = "";
  let timerId = null;
};

// Creamos el topo
const mole = document.createElement("div");
mole.innerHTML = `
    <img class="mole" src="./images/aliens/01.svg">
    `;

// Ubicacmos al topo en una casilla y le hacemos rotar, guardamos la posición
const randomSquare = () => {
  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.appendChild(mole);
  hitPosition = randomSquare.id;
};

// Función para calcular el tiempo en el que salen los topos
const getRandom = (min, max) => {
    return (max - min) + min;
}

// Función de movimiento del topo, invocación
const moveMole = () => {
    timerID = setInterval(randomSquare, getRandom(500, 1000))
}
moveMole()

// Escuchamos en qué casilla hace click el usuario
squares.forEach(item => {
    item.addEventListener('click', () => {
        if (squares.hasChildNodes()){
            if (item.id === hitPosition) {
                squares.firstChild.innerHTML = `
                <img class="mole" src="./images/aliens/08.svg" >
                `
            };
            if (item > 5) {
                squares.firstChild.innerHTML = `
                <img class="mole" src="./images/aliens/04.svg" >
                `
            }
        }
        shootGame.play();
        result++;
        score.textContent = result;
        hitPosition = null;
        squares.removeChild(mole);

    })
})

// Cuenta atrás del juego e invocación de la función
const countDown = () => {
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime === 1) {
        clearInterval(timerId)
    }
    if (currentTime === 0) {
        clearInterval(countDownTimerId)
        gameOver.innerHTML = `
        <div class="orden--gameOver">
        <h2>GAME OVER</h2>
        <h5 class="caja">Final score: ${result}</h5>
        </div>
        `
    }
    let countDownTimerId = setInterval(countDown, 1000);
}

// Se ejecuta el juego
document.getElementById('btn-start').addEventListener('click', () => {
    startGame()
    musicStarGame.play();
    setTimeout(() => {
        musicStarGame.pause()
    }, 15000);
})
