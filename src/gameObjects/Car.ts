import { Dimensions, Direction } from './../types';
import carPNG from './../images/car.png';

export default class Car {

    private roadDimensions: Dimensions;
    private dimensions: Dimensions;
    private ctx;
    private velocity:number;
    private maxSpeed:number;
    private carImage;

    constructor(ctx:CanvasRenderingContext2D, roadDimensions: Dimensions) {
        this.roadDimensions = roadDimensions;
        this.dimensions = {
            posX: roadDimensions.posX + roadDimensions.width/2 - 45/2,
            posY: roadDimensions.height - 75 - 50,
            height: 75,
            width: 45
        };
        this.ctx = ctx;
        this.maxSpeed = 3;
        this.velocity = 0;

        this.carImage = new Image();
        this.carImage.src=carPNG;
        
    }

    public getDimensions(){
        return this.dimensions;
    }

    public draw(): void {
        this.ctx.fillStyle = "#0f0";
        this.ctx.drawImage(this.carImage,this.dimensions.posX, this.dimensions.posY);
        // this.ctx.fillRect(this.dimensions.posX, this.dimensions.posY, this.dimensions.width, this.dimensions.height);
    }

    public updatePosition(){
        
        if(this.velocity<0){
            if(this.dimensions.posX > this.roadDimensions.posX){
                this.dimensions.posX +=this.velocity;
            }
        }

        if(this.velocity>0){  
            if(this.dimensions.posX + this.dimensions.width < this.roadDimensions.posX + this.roadDimensions.width ){
                this.dimensions.posX +=this.velocity;
            }
        }
            
    }

    public initialiseInputHandler():void{
        
        document.addEventListener('keydown',(e)=>{
            switch(e.code){
                case 'ArrowLeft':
                    this.velocity = -this.maxSpeed;
                    break;
                case 'ArrowRight':
                    this.velocity = this.maxSpeed;
                    break;
            }
            
        })

        document.addEventListener('keyup',(e)=>{
            switch(e.code){
                case 'ArrowLeft':
                    this.velocity = 0;
                    break;
                case 'ArrowRight':
                    this.velocity = 0;
                    break;
            }
            
        })

    }


}