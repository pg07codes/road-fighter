import "./css/globalStyles.css";
import "./css/fontello.css";
import Game from "./gameComponents/Game";
import beepMP3 from "./sounds/beep.mp3";
import { Dimensions } from "./types";

let onMobile: boolean = window.innerWidth < 480 ? true : false;

if (onMobile) {
    document.getElementById("mobileController").style.display = "flex";
} else{
    document.getElementById("instructions").style.display = "block";
}

let gameArea: HTMLCanvasElement = document.querySelector("#gameArea");
gameArea.width = onMobile ? window.innerWidth : 800;
gameArea.height = onMobile ? window.innerHeight / 1.1 : 600;

let gameAreaDimensions: Dimensions = {
    width: gameArea.width,
    height: gameArea.height,
};

let ctx: CanvasRenderingContext2D = gameArea.getContext("2d");

let beep = new Audio(beepMP3);

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

export { gameArea, gameAreaDimensions, ctx, onMobile , playPauseElement};
