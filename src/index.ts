import Game from './components/Game';

let gameArea:HTMLCanvasElement = document.querySelector("#gameArea");

let game:Game = new Game(gameArea);

document.addEventListener('keydown',(e)=>{

    switch(e.code){
        case 'Space':
            if(!game.isGameInitialized) game.run();
            else if(!game.isRunning) game.continue();
            else game.pause();
            break;
    }
    
})
