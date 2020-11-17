import Game from './components/Game';

let gameArea:HTMLCanvasElement = document.querySelector("#gameArea");

let game:Game = new Game(gameArea);

game.run();