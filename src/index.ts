import Game from './components/Game';
import beepMP3 from './sounds/beep.mp3';

let gameArea:HTMLCanvasElement = document.querySelector("#gameArea");
let beep= new Audio(beepMP3);

let game:Game = new Game(gameArea);

document.addEventListener('keydown',(e)=>{

    if(e.code ==='Space'){
        if(!game.isGameInitialized){
            beep.play();
            game.run();
        }
        else if(!game.isRunning){
            beep.play();
            game.continue();
        } 
        else {
            beep.play();
            game.pause();
        }
    }
    
})
