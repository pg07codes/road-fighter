import Game from "./gameComponents/Game";
import beepMP3 from "./sounds/beep.mp3";
import { Dimensions } from "./types";
import constants from "./constants";

let gameArea: HTMLCanvasElement = document.querySelector("#gameArea");
gameArea.width = constants.GAME_WIDTH;
gameArea.height = constants.GAME_HEIGHT;

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

export { gameArea, gameAreaDimensions, ctx };
