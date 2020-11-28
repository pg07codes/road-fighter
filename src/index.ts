import "./css/globalStyles.css";
import Game from "./gameComponents/Game";
import beepMP3 from "./sounds/beep.mp3";
import { Dimensions } from "./types";

let onMobile: boolean = window.innerWidth < 480 ? true : false;
// let onMobile: boolean =true;

if (onMobile) {
    document.getElementById("mobileController").style.display = "block";
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

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        if (!game.isGameInitialized) {
            beep.play();
            game.run();
        } else if (!game.isRunning) {
            beep.play();
            game.continue();
        } else {
            beep.play();
            game.pause();
        }
    }
});

document.getElementById("playpause").addEventListener("click", (_) => {
    if (!game.isGameInitialized) {
        beep.play();
        game.run();
    } else if (!game.isRunning) {
        beep.play();
        game.continue();
    } else {
        beep.play();
        game.pause();
    }
});

export { gameArea, gameAreaDimensions, ctx, onMobile };
