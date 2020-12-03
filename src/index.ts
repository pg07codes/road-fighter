import "./css/globalStyles.css";
import "./css/fontello.css";
import Game from "./gameComponents/Game";
import beepMP3 from "./sounds/beep.mp3";
import { Dimensions } from "./types";

// loading images
import carPNG from "./images/car.png";
import enemyCarPNG from "./images/enemyCar.png";
import enemyTruckPNG from "./images/enemyTruck.png";
import enemyRaceCarPNG from "./images/enemyRaceCar.png";

let carImg: HTMLImageElement, enemyCarImg: HTMLImageElement, enemyTruckImg: HTMLImageElement, enemyRaceCarImg: HTMLImageElement;

(function loadImages() {
    carImg = new Image();
    carImg.src = carPNG;

    enemyCarImg = new Image();
    enemyCarImg.src = enemyCarPNG;

    enemyTruckImg = new Image();
    enemyTruckImg.src = enemyTruckPNG;

    enemyRaceCarImg = new Image();
    enemyRaceCarImg.src = enemyRaceCarPNG;
})();

(function loadingBanner() {
    setTimeout(() => {
        document.getElementById("loader-div").style.display = "none";
    }, 770);
})();

(function onWindowResize() {
    window.onresize = () => {
        location.reload();
    };
})();

let onMobile: boolean = window.innerWidth < 480 ? true : false;

if (onMobile) {
    document.getElementById("mobileController").style.display = "flex";
} else {
    document.getElementById("instructions").style.display = "block";
}

let gameArea: HTMLCanvasElement = document.querySelector("#gameArea");
gameArea.width = onMobile ? window.innerWidth : Math.floor(window.innerWidth / 2);
gameArea.height = onMobile ? Math.floor(window.innerHeight / 1.1) : Math.floor(window.innerHeight / 1.25);

let gameAreaDimensions: Dimensions = {
    width: gameArea.width,
    height: gameArea.height,
};

let ctx: CanvasRenderingContext2D = gameArea.getContext("2d");

let beep = new Audio(beepMP3);
beep.volume = 0.1;

let game: Game = new Game(gameArea, ctx);

let playPauseElement = document.getElementById("playpause");

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        if (!game.isGameInitialized) {
            playPauseElement.className = "icon-pause";
            beep.play();
            game.run();
        } else if (!game.isRunning) {
            playPauseElement.className = "icon-pause";
            beep.play();
            game.continue();
        } else {
            playPauseElement.className = "icon-play";
            beep.play();
            game.pause();
        }
    }
});

playPauseElement.addEventListener("click", (_) => {
    if (!game.isGameInitialized) {
        playPauseElement.className = "icon-pause";
        beep.play();
        game.run();
    } else if (!game.isRunning) {
        playPauseElement.className = "icon-pause";
        beep.play();
        game.continue();
    } else {
        playPauseElement.className = "icon-play";
        beep.play();
        game.pause();
    }
});

export { gameArea, gameAreaDimensions, ctx, onMobile, playPauseElement, carImg, enemyCarImg, enemyTruckImg, enemyRaceCarImg };
