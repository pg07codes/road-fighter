import Road from '../gameObjects/Road';
import { Dimensions } from '../types';
import './../css/globalStyles.css';
import Car from '../gameObjects/Car';
import EnemyCar from '../gameObjects/EnemyCar';
import EnemyCarFactory from './EnemyCarFactory';
import carCrashMP3 from './../sounds/carCrash.mp3';
import grassSpritePNG from './../sprites/grass.png';

export default class Game{

    private gameAreaCanvasElement:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private lastRenderTime:DOMHighResTimeStamp;
    private gameDimensions:Dimensions;
    private road:Road;
    private car:Car;
    private enemyCarFactory:EnemyCarFactory;
    private carCrash;
    private grassSprite;

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

        this.carCrash = new Audio(carCrashMP3);
        
        this.grassSprite = new Image();
        this.grassSprite.src=grassSpritePNG;

    }

    private initialize():void{

        this.isGameInitialized = true;

        this.road = new Road(this.ctx,this.gameDimensions);
        
        this.car = new Car(this.ctx,this.road.getDimensions());
        this.car.initialiseInputHandler();
        
        this.enemyCarFactory = new EnemyCarFactory(this.ctx,this.road.getDimensions(), this.car);

        // creating background from grass sprites
        let pattern = this.ctx.createPattern(this.grassSprite, 'repeat');
        this.ctx.rect(0, 0, this.gameAreaCanvasElement.width, this.gameAreaCanvasElement.height);
        this.ctx.fillStyle = pattern;
        this.ctx.fill();
        
    }

    private gameLoop(currentTime:DOMHighResTimeStamp):void{
        let delta = currentTime - this.lastRenderTime;
        this.lastRenderTime = currentTime;

        // draw 
        this.road.draw();
        this.road.drawStripes();  // this is implicit part of the road, so shouldnt be called seperately.
        
        this.car.draw();
        this.enemyCarFactory.draw();

        //update
        this.road.updateStripes(); // no need to be called. it should be inherent prop of road.
        this.enemyCarFactory.updatePosition();
        this.car.updatePosition();


        if(this.enemyCarFactory.detectCollision()){
            this.carCrash.play();
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