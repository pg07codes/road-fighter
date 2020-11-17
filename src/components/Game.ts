import Road from '../gameObjects/Road';
import { Dimensions } from '../types';
import './../css/globalStyles.css'

export default class Game{

    private gameAreaCanvasElement:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private isRunning:boolean;
    private lastRenderTime:DOMHighResTimeStamp;
    private gameDimensions:Dimensions;
    private road:Road;
    
    constructor(gameArea:HTMLCanvasElement){
        this.gameAreaCanvasElement = gameArea;
        this.ctx = gameArea.getContext("2d");
        this.isRunning = false;
        this.lastRenderTime = 0;
        this.gameDimensions = {
            width: 800,
            height:600
        };
        this.road = new Road(this.ctx,this.gameDimensions);
    }

    private initialize():void{
        this.gameAreaCanvasElement.width = this.gameDimensions.width;
        this.gameAreaCanvasElement.height = this.gameDimensions.height;
    }
    private num =0;
    private gameLoop(currentTime:DOMHighResTimeStamp):void{
        let delta = currentTime - this.lastRenderTime;
        this.lastRenderTime = currentTime;

        // draw 
        this.road.draw();
        this.road.drawStrips()

        //update
        this.road.updateStrips();

        requestAnimationFrame(this.gameLoop.bind(this));
    }


    public run():void {

        if(this.isRunning === true) return;
        this.initialize();
        this.isRunning = true;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

}