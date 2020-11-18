import Road from '../gameObjects/Road';
import { Dimensions } from '../types';
import './../css/globalStyles.css';
import Car from '../gameObjects/Car';
import EnemyCar from '../gameObjects/EnemyCar';
import EnemyCarFactory from './EnemyCarFactory';

export default class Game{

    private gameAreaCanvasElement:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private isRunning:boolean;
    private lastRenderTime:DOMHighResTimeStamp;
    private gameDimensions:Dimensions;
    private road:Road;
    private car:Car;
    private enemyCarFactory:EnemyCarFactory;
    
    constructor(gameArea:HTMLCanvasElement){
        this.gameAreaCanvasElement = gameArea;
        this.ctx = gameArea.getContext("2d");
        this.isRunning = false;
        this.lastRenderTime = 0;
        this.gameDimensions = {
            width: 800,
            height:600
        };
        
    }

    private initialize():void{
        this.gameAreaCanvasElement.width = this.gameDimensions.width;
        this.gameAreaCanvasElement.height = this.gameDimensions.height;

        this.road = new Road(this.ctx,this.gameDimensions);
        
        this.car = new Car(this.ctx,this.road.getDimensions());
        this.car.initialiseInputHandler();
        this.enemyCarFactory = new EnemyCarFactory(this.ctx,this.road.getDimensions());
    }

    private gameLoop(currentTime:DOMHighResTimeStamp):void{
        let delta = currentTime - this.lastRenderTime;
        this.lastRenderTime = currentTime;

        // draw 
        this.road.draw();
        this.road.drawStrips();  // this is implicit part of the road, so shouldnt be called seperately.
        
        this.car.draw();
        this.enemyCarFactory.draw();

        //update
        this.road.updateStrips(); // no need to be called. it should be inherent prop of road.
        this.enemyCarFactory.updatePosition();

        requestAnimationFrame(this.gameLoop.bind(this));
    }


    public run():void {

        if(this.isRunning === true) return;
        this.initialize();
        this.isRunning = true;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

}