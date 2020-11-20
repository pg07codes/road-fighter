import Road from '../gameObjects/Road';
import { Dimensions } from '../types';
import './../css/globalStyles.css';
import Car from '../gameObjects/Car';
import EnemyCar from '../gameObjects/EnemyCar';
import EnemyCarFactory from './EnemyCarFactory';

export default class Game{

    private gameAreaCanvasElement:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private lastRenderTime:DOMHighResTimeStamp;
    private gameDimensions:Dimensions;
    private road:Road;
    private car:Car;
    private enemyCarFactory:EnemyCarFactory;

    public isGameInitialized:boolean;
    public isRunning:boolean;
    
    constructor(gameArea:HTMLCanvasElement){
        this.gameAreaCanvasElement = gameArea;
        this.ctx = gameArea.getContext("2d");
        this.lastRenderTime = 0;
        this.gameDimensions = {
            width: 800,
            height:600
        };

        this.gameAreaCanvasElement.width = 800;
        this.gameAreaCanvasElement.height = 600;

        this.isGameInitialized=false;
        this.isRunning = false;
    }

    private initialize():void{

        this.isGameInitialized = true;

        this.road = new Road(this.ctx,this.gameDimensions);
        
        this.car = new Car(this.ctx,this.road.getDimensions());
        this.car.initialiseInputHandler();
        
        this.enemyCarFactory = new EnemyCarFactory(this.ctx,this.road.getDimensions(), this.car);
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


        if(this.enemyCarFactory.detectCollision()){
            this.isGameInitialized = false;
            this.isRunning = false;
        }

        if(this.isRunning) {
            requestAnimationFrame(this.gameLoop.bind(this));
        }

    }


    public run():void {

        if(this.isRunning === true) return;
        this.initialize();
        this.isRunning = true;
        requestAnimationFrame(this.gameLoop.bind(this));

    }

    public continue():void {

        if(this.isRunning === true) return;
        this.isRunning = true;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public pause():void {
        if(this.isRunning === false) return;
        this.isRunning = false;
    }

}